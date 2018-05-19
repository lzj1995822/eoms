<template>
    <section>
        <el-table :data="routeList" height="350" border>
            <el-table-column label="序号" type="index">
            </el-table-column>
            <el-table-column label="连接状态" :formatter="getProto" align="center" prop="tcpConnState">
            </el-table-column>
            <el-table-column label="本地地址" align="center" prop="tcpConnLocalAddress">
            </el-table-column>
            <el-table-column label="本地端口" align="center" prop="tcpConnLocalPort">
            </el-table-column>
            <el-table-column label="远程地址" align="center" prop="tcpConnRemAddress">
            </el-table-column>
            <el-table-column label="远程端口" align="center" prop="tcpConnRemPort">
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
        //  closed(1),
        //         listen(2),
        //         synSent(3),
        //         established(5),
        //         finWait1(6),
        //         finWait2(7),
        //         closeWait(8),
        //         lastAck(9),
        //         closing(10),
        //         timeWait(11),
        //         deleteTCB(12)
        getProto(row) {
            switch(row.tcpConnState) {
                case 1:
                return "closed";
                case 2:
                return "listen";
                case 3:
                return "synSent";
                case 5:
                return "established";
                case 6:
                return "finWait1";
                case 7:
                return "finWait2";
                case 8:
                return "closeWait";
                case 9:
                return "lastAck";
                case 10:
                return "closing";
                case 11:
                return "timeWait";
                case 12:
                return "deleteTCB";
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
            axios.get('/api/tcpTables/'+this.terminalId).then(
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

