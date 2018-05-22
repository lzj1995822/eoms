<template>
    <el-container>
        <el-header style="text-align: right">
            <span style="float: left;">&emsp;IT运维管理系统的设计与实现</span>
            <el-dropdown trigger="hover">
                <span style='color:#787878;line-height:16px;'><img src="../static/img/user.png" style="vertical-align: middle;max-height:25px;">&nbsp;&nbsp;欢迎您，{{user.name}}</span>
                <span class="el-dropdown-link hidden-sm-and-down userinfo-inner">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>我的消息</el-dropdown-item>
                    <el-dropdown-item >设置</el-dropdown-item>
                    <el-dropdown-item divided >退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-container>
            <el-aside width="136px" style="background-color: rgb(238, 241, 246);overflow-y:hidden">
                <div style="overflow:hidden;max-width:134px;background: #fff">
                    <img src="../static/img/logo.png" style="max-width:120px;vertical-align: middle;"/>
                </div>
                <el-menu :default-openeds="['1', '3']">
                    <el-menu-item index="1" @click="navRoter('dashbord')">
                        <template slot="title"><i class="el-icon-menu"></i>仪 表 盘</template>
                    </el-menu-item>
                    <el-menu-item index="1" @click="navRoter('terminalManagement')">
                        <template slot="title"><i class="el-icon-menu"></i>终端管理</template>
                    </el-menu-item>
                    <el-menu-item index="2" @click="navRoter('realtimeBynamic')">
                        <template slot="title"><i class="el-icon-menu"></i>实时动态</template>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <template slot="title"><i class="el-icon-menu"></i>数据分析</template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
                <!-- <el-table :data="termialList">
                    <el-table-column label="终端名称" prop="terminalName"></el-table-column>
                    <el-table-column label="终端描述" prop="terminalDes"></el-table-column>
                    <el-table-column label="运行时间" prop="terminalUpTime"></el-table-column>
                    <el-table-column label="服务层" prop="terminalServices"></el-table-column>
                </el-table> -->
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            termialList:[],
            user: JSON.parse(sessionStorage.getItem("token"))
        }
    },
    methods: {
        scanTerminal() {
            axios({
                method: "get",
                url: "/api/terminals/scan"
                }).then(res => {
                    this.termialList = res.data;
                })
        },
        navRoter(path) {
            this.$router.push(
                {
                    path: path
                }
            )
        }
    }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
.el-header, .el-footer {
    background-color: #f5f5f5;
    color: #6dc6f3;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
    border-bottom: 1px solid #eaeaea;
}

.el-aside {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 100%;
}

.el-main {
    background-color: white;
    color: #333;
    text-align: center;
}

body > .el-container {
    margin-bottom: 40px;
}
.el-container {
    height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
.el-menu{
    height: 100%;
}
.el-table thead tr,
.el-table th
{   
    color: #2a2a2b;
    background: rgba(204, 204, 204, 0.3) !important;
     
}
.el-table thead tr,
.el-table th div {
    background: transparent !important;
    opacity: 0.7;
}
.el-table td, .el-table th.is-leaf{
    border: none ! important;
    
}
</style>
