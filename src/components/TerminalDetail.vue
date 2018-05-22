<template>
    <section class="terminal-detail">
        <div v-if="headerVis">
        <el-col :span="24" class="breadcrumb-container">
            <!-- 面包屑部分 -->
            <el-breadcrumb separator="/" class="breadcrumb-inner">
                <div class="tools">
                    <i class="el-icon-menu"></i>
                </div>
                <el-breadcrumb-item :to="{ path: '/' }">&nbsp;&nbsp;首页</el-breadcrumb-item>
                <el-breadcrumb-item>终端详情</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <div class="toolbar top-title" style="padding-bottom: 0px;">
        </div>
        </div>
        <el-tabs v-model="activeName" type="border-card" style="width:99%;margin: 0 0 0 10px;">
            <el-tab-pane label="终端信息" name="terInfo" v-if="showInfo">
                <terminal-info :systemdDto="systemdDto" v-if="activeName == 'terInfo'">
                </terminal-info>
            </el-tab-pane>
            <el-tab-pane label="接口列表" name="first">
                <section v-show="tableInterface" style="width:100%;margin-left:0px">
                    <div class="query">
                        <el-select v-model="status" placeholder="请选择" size="mini">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button type="danger" plain @click="clear" size="mini">清空</el-button>
                        <el-button type="success" plain @click="backList" size="mini">返回</el-button>
                    </div>
                    <el-table :data="interfaceList" align="center" border :row-class-name="tableRowClassName" height="600">
                        <el-table-column prop="ifIndex" label="序号" min-width="40" align="center">
                        </el-table-column>
                        <el-table-column prop="ifDescr" label="描述" align="center" min-width="160">
                        </el-table-column>
                        <el-table-column prop="ifSpeed" align="center"  label="速率（Mbps）" min-width="100">
                            <template slot-scope="scope">
                                {{scope.row.ifSpeed | format}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="ifPhysAddress" align="center" label="接口Mac地址" width="150">
                        </el-table-column>
                        <el-table-column prop="ifAdminStatus" label="接口状态" align="center" :formatter="transfer" min-width="60">
                        </el-table-column>
                        <el-table-column prop="ifInOctets" align="center" label="接受总字节数（KB）"  min-width="70">
                            <template slot-scope="scope">
                                {{scope.row.ifInOctets | formatKb}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="ifOutOctets" align="center" label="发送总字节数（KB）"  min-width="70">
                            <template slot-scope="scope">
                                {{scope.row.ifOutOctets | formatKb}}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" size="mini" @click="intDetBtn(scope.row)">接口详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </section>
                <interface-detail 
                    v-if="intDetVis" 
                    :interface-id="interfaceObj.id"    
                    :interface-obj="interfaceObj"
                    @back="back()">
                </interface-detail>
            </el-tab-pane>
            <el-tab-pane label="IP组信息" name="second">
                <ipview :terminalId='terminalId' v-if="activeName == 'second'"></ipview>
            </el-tab-pane>
            <el-tab-pane label="IP路由表" name="third">
                <route-table :terminalId='terminalId' v-if="activeName == 'third'"></route-table>
            </el-tab-pane>
            <el-tab-pane label="IP/MAC转换表" name="seven">
                <IPNtmTable :terminalId='terminalId' v-if="activeName == 'seven'"></IPNtmTable>
            </el-tab-pane>
            <el-tab-pane label="TCP组信息" name="fourth">
                <tcpGroup :terminalId='terminalId' v-if="activeName == 'fourth'"></tcpGroup>
            </el-tab-pane>
            <el-tab-pane label="TCP进程连接状态" name="six">
                <tcpTable :terminalId='terminalId' v-if="activeName == 'six'"></tcpTable>
            </el-tab-pane>
            <el-tab-pane label="UDP组信息" name="five">
            </el-tab-pane>
        </el-tabs>
    </section>
</template>
<script>
import axios from 'axios';
const  ipview = () => import("./IPView");
const  interfaceDetail = () => import('./InterfaceDetail.vue');
const  routeTable = () => import('./RouteTable');
const  IPNtmTable = () => import('./IPNtmTable');
const  tcpGroup = () => import('./TCPGroup');
const  tcpTable = () => import('./TCPConnectTable');
const terminalInfo = () => import('./TerminalInfo');
export default {
    props: {
        terminalId:String,
        headerVis:{
            type: Boolean,
            default: true
        },
        systemdDto: {
            type: Object,
            default: null
        },
        showInfo:{
            type: Boolean,
            default: false
        }
    },
    data (){
        return {
            interfaceList:[],
            normalList: [],
            bugList: [],
            options: [{
                label: "正常",
                value: "NORMAL"
            },{
                label: "故障",
                value: "BUG"
            }],
            status: "",
            tableInterface: true,
            intDetVis: false,
            interfaceObj: {},
            activeName: "first"
        }
    },
    watch: {
        terminalId:{
            handler:function(){
                this.getInterfaceList();
            }
        },
        status() {
            if (this.status == "NORMAL") {
                this.interfaceList = [];
                this.interfaceList = this.normalList;
            } else {
                this.interfaceList = [];
                this.interfaceList = this.bugList;
            }
        }
    },
    filters: {
        format(val) {
            return (val/8/1024/1024).toFixed(0) + "Mbps"
        },
        formatKb(val) {
            return (val/1024).toFixed(0) + " KB"
        }
    },
    methods: {
        back() {
            this.tableInterface = true;
            this.intDetVis = false;
        },
        backList() {
            this.$emit("back");
        },
        intDetBtn(row){
            this.interfaceObj = row
            this.tableInterface = false;
            this.intDetVis = true;
        },
        transfer(row){
            let flag = Number(row.ifAdminStatus)+Number(row.ifOperStatus)
            if (flag == 2) {
                return "正常"
            } else if (flag == 3) {
                return "故障"
            } else if (flag == 4) {
                return "停机"
            } else if (flag == 6) {
                return "测试"
            }
        },
        getInterfaceList() {
            axios({
                method: "get",
                url: "/api/interfaces/"+this.terminalId}).then(
                res => {
                    this.interfaceList = [];
                    this.interfaceList = res.data;
                    this.interfaceList.shift();
                    this.getNormalList();
                }
            )
        },
        getNormalList(){
            for (var i = 0;i < this.interfaceList.length;i++) {
                let flag = Number(this.interfaceList[i].ifAdminStatus)+Number(this.interfaceList[i].ifOperStatus)
                    if (flag == 2) {
                        this.normalList.push(this.interfaceList[i]);
                    }else {
                        this.bugList.push(this.interfaceList[i]);
                    }
            }
        },
        clear() {
            this.status = "";
            this.getInterfaceList();
        },
        tableRowClassName({row, rowIndex}) {
            console.log(row.ifAdminStatus,"dds")
            if (row.status == "故障") {
                return 'warning-row';
            } else if (row.status == "正常") {
                return 'success-row';
            }
            return '';
        }
    },
    mounted(){
        this.getInterfaceList();
    },
    components: {
        ipview,
        interfaceDetail,
        routeTable,
        IPNtmTable,
        tcpGroup,
        tcpTable,
        terminalInfo
    }
}
</script>
<style>
.query{
    float: right;
    display: block;
    margin-bottom: 10px;
}
</style>


