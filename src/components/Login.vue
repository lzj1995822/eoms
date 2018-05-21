<template>
    <section>
    <div class="login">
        <div class="message">IT运维管理系统设计与实现-登录界面</div>
        <div id="darkbannerwrap"></div>
        <el-form>
            <el-form-item label="用户名">
                <el-input type="text" v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="密 码">
                <el-input type="password" v-model="password"></el-input>
            </el-form-item>
            <el-form-item style="margin-top:35px;">
                <el-button type="primary" @click="onSubmit">登录</el-button>
                <p style="display: inline-block;">&emsp;&emsp;&emsp;</p>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="copyright">©Copyright 苏州科技大学 计算机科学与技术 1411吕家正 毕业设计 -- IT运维管理系统设计与实现</div>
    </section>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
            username:"",
            password:""
        }
    },
    methods:{
        onSubmit() {
            axios.get(`/api/user/login?name=${this.username}&password=${this.password}`).then(res => {
                this.$router.push("TerminalManagement");
            })
        }
    }
}
</script>
<style scoped>
 section {
     width: 100%;
     height: 100%;
    background: url(../../static/img/web_login_bg.jpg) no-repeat center;
    background-size: cover;
    position: absolute;
 }
 .login {
    margin: 150px auto 0 auto;
    min-height: 380px;
    max-width: 380px;
    padding: 40px;
    background-color: #ffffff;
    margin-left: auto;
    margin-right: auto;
    border-radius: 4px;
    /* overflow-x: hidden; */
    box-sizing: border-box;
}
.message {
    margin: 10px 0 0 -58px;
    padding: 18px 10px 18px 0;
    background: #27A9E3;
    position: relative;
    color: #fff;
    font-size: 16px;
}
#darkbannerwrap {
    background: url(../../static/img/aiwrap.png);
    width: 18px;
    height: 10px;
    margin: 0 0 20px -58px;
    position: relative;
}
.copyright{
    margin-top:8%;
}
</style>


