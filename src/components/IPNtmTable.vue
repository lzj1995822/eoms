<template>
    <section>
        <el-table :data="routeList" border height="600">
            <el-table-column label="接口索引值" width="100px" align="center" prop="ipNetToMediaIfIndex">
            </el-table-column>
            <el-table-column label="IP地址" align="center" prop="ipNetToMediaNetAddress">
            </el-table-column>
            <el-table-column label="物理地址" align="center" prop="ipNetToMediaPhysAddress">
            </el-table-column>
            <el-table-column label="映射类型" align="center" prop="ipNetToMediaType" :formatter="transfer">
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
        // other(1),invalid(2),dynamic(3),static(4)
        transfer(row) {
            switch(row.ipNetToMediaType) {
                case 1:
                return "其他"
                break;
                case 2:
                return "无效"
                break;
                case 3:
                return "动态"
                break;
                case 4:
                return "静态"
                break;
            }
        },
        getRoute() {
            axios.get('/api/ipNtmTables/'+this.terminalId).then(
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

