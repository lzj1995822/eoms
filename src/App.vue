<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
html{
    height: 100%;
    margin: 0;
}
body{
    height: 100%;
    margin: 0;
}
*::-webkit-scrollbar{
    width: 8px;
    height: 8px;
    background-color: #f5f5f5;
}
/*定义滚动条的轨道，内阴影及圆角*/
*::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    border-radius: 8px;
    background-color: #f5f7fa;
}
/*定义滑块，内阴影及圆角*/
*::-webkit-scrollbar-thumb{
    /*width: 10px;*/
    height: 20px;
    border-radius: 8px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #409eff80;
}
</style>
