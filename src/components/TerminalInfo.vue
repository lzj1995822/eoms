<template>
    <section class="terminal-management" style="display:flex;">
        <transition name="el-zoom-in-center">
            <div class="el-table" style="width:250px;height:auto;margin:10px 20px 10% 0px;flex:2">
                <span style="display:inline-block; width:100%;height: 35px;padding-top:10px;background-color: rgba(245,247,249,0.9)">常规信息</span>
                <el-row>
                    终端名称：{{systemdDto.terminalName}}
                </el-row>
                <el-row>
                    终端描述：{{systemdDto.terminalDes}}
                </el-row>
                <el-row>
                    终端类型：{{systemdDto.terminalType}}
                </el-row>
                <el-row>
                    联系信息：{{systemdDto.terminalContact}}
                </el-row>
                <el-row>
                    位置信息：{{systemdDto.terminalLocation}}
                </el-row>
                <el-row>
                    IP地址：{{systemdDto.terminalIp}}
                </el-row>
            </div>
        </transition>
        <transition name="el-zoom-in-center">
            <div class="el-table ci" style="width:400px;height:auto;margin:10px 0 10% 0;flex:10">
                <span style="display:inline-block; width:100%;height: 35px;padding-top:10px;background-color: rgba(245,247,249,0.9)">动态信息</span>
                <div style="width:260px;height:auto;padding:20px;float:left">
                    <div class="tuoyuan">{{sysDate}}</div>
                    <span>系统时间</span>
                </div>
                <div style="width:260px;height:auto;padding:20px;float:left">
                    <div class="tuoyuan">{{runningTime}}</div>
                    <span>运行时长</span>
                </div>
                <div style="width:260px;height:auto;padding:20px;float:left">
                    <div class="tuoyuan" style="font-size:14px;line-height:34px;">
                        内存：{{(Number(systemdDto.hrSystem.hrMemorySize)/(1024*1024)).toFixed(2)}}GB<br/>
                        最大用户数：{{systemdDto.hrSystem.hrSystemNumUsers}}<br/>
                        系统进程数：{{systemdDto.hrSystem.hrSystemProcesses}}<br/>
                    </div>
                    <span>其他信息</span>
                </div>
                <div id="cpuUzi" class="cpuUzi"></div>
                <!-- <div id="virtualMem" class="cpuUzi"></div>
                <div id="phyMem" class="cpuUzi"></div> -->
                <div id="virtualUzi" class="cpuUzi"></div>
                <div id="phyUzi" class="cpuUzi"></div>
                <div id="diskUzi" class="cpuUzi"></div>
            </div>
        </transition>            
    </section>
</template>
<script>
import echarts from "echarts"
import axios from "axios"
export default {
    props:{
        systemdDto:{
            type: Object,
            default: null
        }
    },
    data() {
        return {
            sysAbi:{},
            myChart: {},
            myChartVir: {},
            myChartPhy: {},
            myChartDisk: {},
            timerTask: {},
            clockTask: {},
            sysDate: "",
            runningTime: ''
        }
    },
    methods: {
        showCpuUzi() {
            let _this = this;
            _this.myChart = echarts.init(document.getElementById('cpuUzi'));
            _this.myChartVir = echarts.init(document.getElementById('virtualUzi'));
            _this.myChartPhy = echarts.init(document.getElementById('phyUzi'));
            _this.myChartDisk = echarts.init(document.getElementById('diskUzi'));
            diskUzi
            let optionPhy = {
                tooltip : {
                    formatter: "{a} <br/>{b} : {c}%"
                },
                toolbox: {
                    feature: {
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name: '物理内存利用率',
                        type: 'gauge',
                        detail: {formatter:'{value}%'},
                        data: [{value: 0, name: '物理内存利用率'}]
                    }
                ]
            }
            let optionVir = {
                tooltip : {
                    formatter: "{a} <br/>{b} : {c}%"
                },
                toolbox: {
                    feature: {
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name: '虚拟内存利用率',
                        type: 'gauge',
                        detail: {formatter:'{value}%'},
                        data: [{value: 0, name: '虚拟内存利用率'}]
                    }
                ]
            }
            let optionDisk = {
                tooltip : {
                    formatter: "{a} <br/>{b} : {c}%"
                },
                toolbox: {
                    feature: {
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name: '硬盘利用率',
                        type: 'gauge',
                        detail: {formatter:'{value}%'},
                        data: [{value: 0, name: '硬盘利用率'}]
                    }
                ]
            }
            let option = {
                    tooltip : {
                        formatter: "{a} <br/>{b} : {c}%"
                    },
                    toolbox: {
                        feature: {
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    series: [
                        {
                            name: 'CPU利用率',
                            type: 'gauge',
                            detail: {formatter:'{value}%'},
                            data: [{value: 0, name: 'CPU利用率'}]
                        }
                    ]
                }
            _this.getSysAbli().then((sys)=>{
                option.series[0].data[0].value = sys.cpuUzi;
                optionPhy.series[0].data[0].value = sys.phyUzi;
                optionVir.series[0].data[0].value = sys.virtualUzi;
                optionDisk.series[0].data[0].value = sys.diskUzi;
                _this.myChartPhy.setOption(optionPhy,true);
                _this.myChartVir.setOption(optionVir,true);
                _this.myChart.setOption(option, true);
                _this.myChartDisk.setOption(optionDisk,true);
                
            })
            
            this.timerTask = setInterval( () => {
                _this.getSysAbli().then((sys)=>{
                    option.series[0].data[0].value = sys.cpuUzi;
                    optionPhy.series[0].data[0].value = sys.phyUzi;
                    optionVir.series[0].data[0].value = sys.virtualUzi;
                    optionDisk.series[0].data[0].value = sys.diskUzi;
                    _this.myChartDisk.setOption(optionDisk,true);
                    _this.myChartPhy.setOption(optionPhy,true);
                    _this.myChartVir.setOption(optionVir,true);
                    _this.myChart.setOption(option, true);
                })
            },5000);
        },
        getSysAbli() {
            return new Promise((resolve,reject)=>{
               axios({
                        method: 'post',
                        url:"/api/terminals/getSysAbli",
                        data:this.systemdDto
                    }).then(
                    res => {
                        this.sysAbi = res.data;
                        resolve(res.data)
                    }
                )
            })
        }
    },
    mounted() {
        let timeArr = this.systemdDto.terminalUpTime.split(" ");
        let minArr = {};
        let teval = {};
        if (timeArr.length>1) {
            minArr = timeArr[2].split(":");
            teval = timeArr[0]*24*60*60*1000 + minArr[0]*60*60*1000+minArr[1]*60*1000 + minArr[2].split("\\.")[0]*1000;
        }else{
            minArr = timeArr[0].split(":")
            teval = minArr[0]*60*60*1000+minArr[1]*60*1000 + minArr[2].split("\\.")[0]*1000;
        }
        let beginDate = new Date(new Date(this.systemdDto.hrSystem.hrSystemDate).getTime() - teval);
        this.systemdDto.hrSystem.hrSystemDate = new Date(this.systemdDto.hrSystem.hrSystemDate).getTime() + 1000;
        this.clockTask = setInterval( () => {
            this.systemdDto.hrSystem.hrSystemDate = new Date(this.systemdDto.hrSystem.hrSystemDate).getTime() + 1000;
            this.sysDate = new Date(this.systemdDto.hrSystem.hrSystemDate).toLocaleString();
            let newTer = this.systemdDto.hrSystem.hrSystemDate - beginDate.getTime();
            let day = Math.floor(newTer/(24*60*60*1000));
            let hours = Math.floor((newTer-(day*24*60*60*1000))/(60*60*1000));
            let min = Math.floor((((newTer-(day*24*60*60*1000))%(60*60*1000))/(60*1000)));
            let sec = Math.floor((((newTer-(day*24*60*60*1000))%(60*60*1000)%(60*1000))/1000));
            this.runningTime = day + "days "+hours+":"+min+":"+sec;
        },1000)
        this.showCpuUzi();
    },
    beforeDestroy(){
        window.clearInterval(this.timerTask);
        window.clearInterval(this.clockTask);
    }
}
</script>
<style>
.terminal-management .el-row{
    text-align: left;
    margin: 15px 0;
    padding: 0 20px;
    /* text-align:  justify;
    text-justify: auto; */
}
.cpuUzi {
    width: 302px;
    height: 300px;
    float: left;
}
.tuoyuan{
    width: 200px;
    height: 100px;
    border-radius: 100px;
    background:-webkit-gradient(linear, 0 0, 0 bottom, from(#f7f5f5), to(rgba(133, 233, 232, 0.59)));
    text-align: center;
    vertical-align: middle;
    margin-top:15px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 18px;
    line-height: 100px;
    margin: 10px auto;
}
.ci span {
    letter-spacing: 0.4em;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 18px;
}
</style>


