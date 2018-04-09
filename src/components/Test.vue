<template>
<section>
  <el-input></el-input>
  <el-button @click="login">陈琴红是zz</el-button>
</section>
</template>
<script>
import axios from 'axios';
export default {
    methods:{
        login() {
            axios({
                method: "post",
                url: `/api/user/add`,
                data: {
                    name: "asher",
                    password: "q24348590"
                    }
            }).then(res => {
                console.log(res);
            })
        }
    }
}
</script>
