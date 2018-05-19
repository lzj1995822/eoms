<template>
    <section>
        <el-table :data="routeList" border>
            <el-table-column label="目标IP地址" align="center" prop="ipRouteDest">
            </el-table-column>
            <el-table-column label="本地接口索引" align="center" prop="ipRouteIfIndex">
            </el-table-column>
            <el-table-column label="主路由度量" align="center" prop="ipRouteMetric1">
            </el-table-column>
            <el-table-column label="可选路由度量" align="center" prop="ipRouteMetric2">
            </el-table-column>
            <el-table-column label="下跳IP地址" align="center" prop="ipRouteNextHop">
            </el-table-column>
            <el-table-column label="路由类型" align="center" prop="ipRouteType" :formatter="transfer">
            </el-table-column>
            <el-table-column label="路由选择机制" align="center" prop="ipRouteProto" :formatter="getProto">
            </el-table-column>
            <el-table-column label="目标地址掩码" align="center" prop="ipRouteMask" >
            </el-table-column>
            <el-table-column label="路由选择协议" align="center" prop="ipRouteInfo" :formatter="getInfo">
            </el-table-column>
        </el-table>
    </section>
</template>
<script>
import axios from 'axios'
export default {
    props: {
        terminalId: {
            type: String,
            default : "40288285634fb2c501634fb347160000"
        }
    },
    data() {
        return {
        routeList: [] ,//路由列表
            
        }
    },
    methods: {
        getInfo(row) {
            if (row.ipRouteInfo == '0.0') {
                return "不存在";
            }else {
                return row.ipRouteInfo;
            }
        },
        // INTEGER{other(1),local(2),netmgmt(3),icmp(4),egp(5),ggp(6),
        // hello(7),rip(8),is-is(9),es-is(10),ciscoIgrp(11),bbnSpfIgp(12),ospf(13),bgp(14)
        getProto(row) {
            switch(row.ipRouteProto) {
                case 1:
                return "other";
                case 2:
                return "local";
                case 3:
                return "netmgmt";
                case 4:
                return "icmp";
                case 5:
                return "egp";
                case 6:
                return "ggp";
                case 7:
                return "hello";
                case 8:
                return "rip";
                case 9:
                return "is-is";
                case 10:
                return "es-is";
                case 11:
                return "ciscoIgrp";
                case 12:
                return "bbnSpfIgp";
                case 13:
                return "ospf";
                case 14:
                return "bgp";
            }
        },
        // other(1)、invalid(2)、direct(3)和indirect(4)
        transfer(row) {
            if (row.ipRouteType == 1) {
                return "其他";
            } else if (row.ipRouteType == 2) {
                return "无效";
            } else if (row.ipRouteType == 3) {
                return "直连";
            } else if (row.ipRouteType == 4) {
                return "非直连";
            }
        },
        getRoute() {
            axios.get('/api/ipRouteTables/'+this.terminalId).then(
                res => {
                    this.routeList = res.data;
                }
            )
        }
    },
    mounted() {
        this.getRoute();
    }
}
</script>

