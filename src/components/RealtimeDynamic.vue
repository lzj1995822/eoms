<template>
    <section>
        <el-col :span="24" class="breadcrumb-container">
            <!-- 面包屑部分 -->
            <el-breadcrumb separator="/" class="breadcrumb-inner">
                <div class="tools">
                    <i class="el-icon-menu"></i>
                </div>
                <el-breadcrumb-item :to="{ path: '/' }">&nbsp;&nbsp;首页</el-breadcrumb-item>
                <el-breadcrumb-item>实时动态</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <div class="toolbar top-title" style="padding-bottom: 0px;">
        </div>
        <section style="display:flex;width:100%;overflow:hidden;">
            <section class="terminal-management" v-show="tableInterface">
                <el-table :data="termialList" align="center" style="width:150px;">
                    <!-- <el-table-column label="终端名称" prop="terminalName"></el-table-column>
                    <el-table-column label="终端描述" width="300" prop="terminalDes"></el-table-column>
                    <el-table-column label="系统类型" width="120" prop="terminalDes">
                        <template slot-scope="scope">
                            <span v-if="scope.row.terminalDes.toLowerCase().indexOf('window') > -1">
                                Window
                            </span>
                            <span v-else-if="scope.row.terminalDes.toLowerCase().indexOf('linux') > -1">
                                Linux
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="系统对象ID" prop="terminalObjectId"></el-table-column>
                    <el-table-column label="运行时间" width="120" prop="terminalUpTime"></el-table-column>
                    <el-table-column label="服务层" prop="terminalServices"></el-table-column> -->
                    <el-table-column label="终端列表" align="center">
                        <template slot-scope="scope">
                            <img src="../../static/img/pc.png" class="img-style"/>
                            <el-button size="small" type="text" @click="terminalDetailInter(scope.row)">{{scope.row.terminalIp}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </section>
            <transition name="el-zoom-in-center">
                <section class="terminal-detail"  v-if="terminalDetailInterface">
                    <terminal-detail 
                        @back="back()"
                        v-if="terminalDetailInterface"
                        :terminalId="terminalId"
                        :headerVis = "false"
                        :systemdDto = "system"
                        :showInfo = "true"
                        ></terminal-detail>
                </section>
            </transition>
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
            system: {}
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
                url: "/api/terminals/scan/null"
                }).then(res => {
                    this.termialList = res.data;
                })
        },
        terminalDetailInter(row){
            this.terminalDetailInterface = false;
            this.terminalId = row.id;
            this.system =  row;
            setTimeout( ()=>{
                this.terminalDetailInterface = true;
            },500)
        }
    },
    mounted() {
        this.scanTerminal();
    },
    components: {
        terminalDetail
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
.img-style {
    width: 25px;
    height: 25px;
    vertical-align: middle;
}
.terminal-management{
    flex: 1
}
.terminal-detail{
    flex: 7
}
.terminal-management .el-table::before{
    left: 0;
    bottom: 0;
    width: 0%;
    height: 0%;
}
.terminal-management .el-table{
    height: 670px;
    background: #fff;
    border: 1px solid #dcdfe6;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
</style>

