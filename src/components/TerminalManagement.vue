<template>
    <section>
        <section class="terminal-management" v-show="tableInterface">
            <el-col :span="24" class="breadcrumb-container">
                <!-- 面包屑部分 -->
                <el-breadcrumb separator="/" class="breadcrumb-inner">
                    <div class="tools">
                        <i class="el-icon-menu"></i>
                    </div>
                    <el-breadcrumb-item :to="{ path: '/' }">&nbsp;&nbsp;首页</el-breadcrumb-item>
                    <el-breadcrumb-item>终端管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <div class="toolbar top-title" style="padding-bottom: 0px;">
            </div>
            <el-button  @click="scanTerminal" style="float: right;margin:10px 20px 10px 0;" >添加主机</el-button>
            <el-input v-model="ip" clearable placeholder="请输入需要扫描的主机IP" style="width:220px;float:right;margin: 10px 20px 10px 0px;"></el-input>
            <el-table :data="termialList" align="center" border>
                <el-table-column label="终端名称" align="center" prop="terminalName"></el-table-column>
                <el-table-column label="终端描述" align="center" width="300" prop="terminalDes"></el-table-column>
                <el-table-column label="系统类型" align="center" width="120" prop="terminalDes">
                    <template slot-scope="scope">
                        <span v-if="scope.row.terminalDes.toLowerCase().indexOf('window') > -1">
                            Window
                        </span>
                        <span v-else-if="scope.row.terminalDes.toLowerCase().indexOf('linux') > -1">
                            Linux
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="系统对象ID" align="center" prop="terminalObjectId"></el-table-column>
                <el-table-column label="运行时间" align="center" width="120" prop="terminalUpTime"></el-table-column>
                <el-table-column label="服务层" align="center" prop="terminalServices"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="terminalDetailInter(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </section>
        <section class="terminal-detail">
            <terminal-detail 
                @back="back()"
                :terminalId="terminalId"
                v-if="terminalDetailInterface"></terminal-detail>
        </section>
    </section>
</template>
<script>
import axios from 'axios';
import terminalDetail from "./TerminalDetail";
export default {
    data() {
        return {
            termialList:[], //终端列表
            terminalId:"",
            terminalDetailInterface: false,
            tableInterface: true,
            ip:null
        }
    },
    methods: {
        back() {
            this.terminalDetailInterface = false;
            this.tableInterface = true;
        },
        scanTerminal() {
            axios({
                method: "get",
                url: "/api/terminals/scan/"+this.ip
                }).then(res => {
                    this.termialList = res.data;
                })
        },
        terminalDetailInter(row){
            this.terminalDetailInterface = true;
            this.tableInterface = false;
            this.terminalId = row.id;
        }
    },
    components: {
        terminalDetail
    },
    mounted() {
        this.scanTerminal();
    }
}
</script>
<style>
.tools {
    float: left;
    color: #c9cbce;
}
.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
    color: #606266;
    font-weight: 400;
}
.el-breadcrumb__inner a, .el-breadcrumb__inner {
    line-height: 14px;
}
.toolbar {
  border-bottom: 1px solid #f04134;
  padding: 10px;
  margin: 10px 0px;
text-align: left;
}
.top-title{
  height: 15px;
  padding:5px 10px !important;
}
.fromMainTitle{
  color:rgba(54, 54, 80, 0.65);
  font-size: 16px;
  line-height: 36px;
  margin-left: 8px;
  font-style: "微软雅黑";
}
i{
    color:rgba(54, 54, 80, 0.65);    
}
</style>

