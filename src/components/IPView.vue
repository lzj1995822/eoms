<template>
<section>
    <el-row :gutter="20" >
        <table class="el-table text-left" style="margin-left:5%; width:90%;">
            <tr>
                <td>属性</td>
                <td>值</td>
                <td>对象类型</td>
                <td>访问权限</td>
                <td>描述</td>
            </tr>
            <tr v-for="(val, key, index) in IPGroup" :key="key+index" v-if="val != null && key != 'id'&& key != 'terminalId'">
                <td>{{key}}</td>
                <td v-if="key == 'updateAt'" style="width:150px;">{{new Date(val).toLocaleDateString()}}</td>
                <td style="width:150px;" v-else>{{val}}</td>
                <td style="width:150px;">{{key | transfer("type")}}</td>
                <td style="width:120px;">{{key | transfer("auth")}}</td>
                <td style="width:500px;">{{key | transfer("des")}}</td>
            </tr>
        </table>
    </el-row>
</section>
</template>
<script>
import axios from "axios"
export default {
    props: {
        terminalId: {
            type:String,
            default: "40288285634fb2c501634fb347160000"
        }
    },
    filters: {
        transfer(key,pr) {
            let map = new Map([
                ["updateAt",{type: "Date",auth:"W/R",des:"数据查询时间"}],
                ["ipForwarding",{type: "Integer",auth:"W/R",des:"指出系统是否作为一个IP网关（路由器）或者仅作为一个不提供转发服务的正规主机。可取的值有Forwarding(1)和notForwarding(2)"}],
                ["ipDefaultTTL",{type: "Integer",auth:"W/R",des:"置于IP报文的TTL字段中的生存期值"}],
                ["ipInReceives",{type: "Long",auth:"R",des:"从系统所有可操作接口接收的输入报文的总数"}],
                ["ipInHdrError",{type: "Long",auth:"R",des:"由于IP报文头部错误而丢弃的输入报文数量"}],
                ["ipInaddrErrors",{type: "Long",auth:"R",des:"对该系统来说，因为最终IP目的地址无效而被丢弃的输入报文数量"}],
                ["ipForwDatagrams",{type: "Long",auth:"R",des:"本地系统作为网关或路由器试图转发的报文数量"}],
                ["ipInUnknownProtos",{type: "Long",auth:"R",des:"从网络上成功接收，但由于系统对报文所请求的网络层协议不支持或者未知，而丢弃的报文数量"}],
                ["ipInDiscards",{type: "Long",auth:"R",des:"由于缺乏缓冲空间或其他与报文自身无关的条件，而丢弃的输入报文的数量"}],
                ["ipInDelivers",{type: "Long",auth:"R",des:"描述：成功传递给上层协议的输入报文的数量"}],
                ["ipOutRequests",{type: "Long",auth:"R",des:"上层协议为发送而传递给IP协议的IP报文的数量"}],
                ["ipOutDiscards",{type: "Long",auth:"R",des:"由于缺乏缓冲空间或其他与报文自身无关的条件，而丢弃的输出报文"}],
                ["ipOutNoRoutes",{type: "Long",auth:"R",des:"因为没有路由到所需目标网络，而丢弃的报文数量"}],
                ["ipReasmTimeout",{type: "Long",auth:"R",des:"输入的IP分组报文在它们被重组之前保留的时间间隔（以秒为单位）"}],
                ["ipReasmReqds",{type: "Long",auth:"R",des:"接收到的必须重组的IP分组报文数量"}],
                ["ipReasmOKs",{type: "Long",auth:"R",des:"成功重组的IP分组报文的数量"}],
                ["ipReasmFails",{type: "Long",auth:"R",des:"检测到的重组失败的数量"}],
                ["ipFragOK",{type: "Long",auth:"R",des:"已经被成功分组的报文数量"}],
                ["ipFragsFails",{type: "Long",auth:"R",des:"因为IP头部包含不分组标志，使得没有分组的报文数量"}],
                ["ipFragsCreates",{type: "Long",auth:"R",des:"该系统上产生的IP报文分组的数量"}],
                ["ipRoutingDiscards",{type: "Long",auth:"R",des:"尽管事实上有效，但被丢弃的报文数量"}],
                ])
            return map.get(key)[pr];
        }
    },
    data(){
        return {
            IPGroup: {}, //IP组
        }
        
    },
    methods: {
        getIP(){
            axios({
                method: "get",
                url: "/api/IPGroups/"+this.terminalId}).then(
                res => {
                    this.IPGroup = res.data;
                }
            )
        }
        
    },
    mounted() {
        this.getIP();
    }
}
</script>
<style>
.text-left {
    text-align: left;
}
</style>


