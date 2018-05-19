<template>
    <section class="interface-detail">
        <br />
        <h4 style="color:#777777;margin-left:-30%">{{interfaceObj.ifDescr}} 接口详情</h4>
        <br />        
        <div style="display: flex;width:90%;margin-left:20px">
        <table class="el-table text-left" style="flex:1">
            <tr>
                <td>属性</td>
                <td>值</td>
            </tr>
            <tr v-for="(val, key, index) in interfaceObj" :key="key+index" v-if="key != 'id'&& key != 'terminalId'
            && key != 'terminal'&& key != 'createdAt'&& key != 'updateAt' && index <= 15">
                <td style="width:150px;">{{key}}</td>
                <td style="width:300px;">{{val}}</td>
            </tr>
        </table>
        <table class="el-table text-left" style="flex:1">
            <tr>
                <td>属性</td>
                <td>值</td>
            </tr>
            <tr v-for="(val, key, index) in interfaceObj" :key="key+index" v-if="key != 'id'&& key != 'terminalId'
            && key != 'terminal'&& key != 'createdAt'&& key != 'updateAt' && index > 15">
                <td style="width:150px;">{{key}}</td>
                <td style="width:300px;">{{val}}</td>
            </tr>
        </table>
        </div>
        <section>
        
        <!-- <el-button @click="flushData()">开启自动刷新 </el-button>
        <el-button @click="closeData()">关闭自动刷新 </el-button> -->
        <section style="margin-left:2%">
            <el-switch
                style="float:right"
                v-model="switcher"
                active-color="#13ce66"
                inactive-text="自动刷新"
                :active-value="true"
                :inactive-value="false">
            </el-switch>
            <div id="interface-utilization" :style="{width: '1000px', height: '300px'}"></div>
            <div id="input-flow" :style="{width: '1000px', height: '300px'}"></div> 
            <div id="output-flow" :style="{width: '1000px', height: '300px'}"></div>
        </section>
        </section>
        <section>
            <el-button plain type="success" size="mini" @click="back()">返回</el-button>
        </section>           
    </section>
</template>
<script>
import echarts from "echarts"
import axios from "axios"
export default {
    props:{
        interfaceId: {
            type: String,
            default: "40288285634fb2c501634fb432150011"
        },
        interfaceObj: {
            type: Object,
            default: null
        }
    },
    watch: {
        switcher() {
            console.log(this.switcher,"sdf")
            if (this.switcher) {
                this.flushData()
            } else{
                this.closeData()
            }
        }
    },
    data() {
        return {
            utilizationData:[],//接口利用率记录
            switcher:false
        }
    },
    methods: {
        back() {
            this.$emit("back")
        },
        flushData() {
            this.timer = setInterval(() => {
                this.loadData()
            },60000);
            console.log("自动刷新开启")
        },
        closeData() {
            clearInterval(this.timer);
            console.log("自动刷新关闭")
        },
        loadData() {
            console.log("数据加载中")
            axios.get(`api/interfaceDetails/interface/100/${this.interfaceId}`).then(
                res => {
                    this.utilizationData = res.data;
                    this.$nextTick( ()=>{
                        this.showCharts();
                        this.showChartsInflow();
                        this.showChartsOutflow();
                    })
                }
            )
                
        },
        transfer(arr,key) {
            var tempArr = [];
            for (var i in arr){
                let now = new Date(arr[i].createdAt);
                var temp = {
                    value:[
                        [now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),arr[i][key]
                    ]
                }
                tempArr.push(temp);
            }
            return tempArr;
        },
        transferDatex(arr,key) {
            var tempArr = [];
            for (var i in arr){
                let now = new Date(arr[i].createdAt);
                var temp = {
                    value:[
                        [now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),arr[i][key]
                    ]
                }
                tempArr.push(temp.value[0]);
            }
            return tempArr;
        },
        showChartsOutflow() {
            var data = this.transfer(this.utilizationData,"outputFlow");
            var date = this.transferDatex(this.utilizationData,"outputFlow");
            var myChart = echarts.init(document.getElementById('output-flow'));
            myChart.setOption({
                        title: {
                            text: '接口输出流量'
                        },
                        tooltip: {
                            trigger: 'axis',
                            formatter: function (params) {
                                params = params[0];
                                return params.value[0] + ' / ' + params.value[1];
                            },
                            axisPointer: {
                                animation: false
                            }
                        },
                        xAxis: {
                            type: 'category',
                            splitLine: {
                                show: false
                            },
                            data:date,
                            inverse:true
                        },
                        yAxis: {
                            type: 'value',
                            boundaryGap: [0, '50%'],
                            splitLine: {
                                show: false
                            },
                             axisLabel : {
                                formatter: '{value} bps'
                            }
                        },
                        series: [{
                            name: '模拟数据',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: false,
                            data: data
                        }]
                    });
        },
        showChartsInflow() {
            var data = this.transfer(this.utilizationData,"inputFlow");
            var date = this.transferDatex(this.utilizationData,"inputFlow");
            var myChart = echarts.init(document.getElementById('input-flow'));
            myChart.setOption({
                        title: {
                            text: '接口输入流量'
                        },
                        tooltip: {
                            trigger: 'axis',
                            formatter: function (params) {
                                params = params[0];
                                return params.value[0] + ' / ' + params.value[1];
                            },
                            axisPointer: {
                                animation: false
                            }
                        },
                        xAxis: {
                            type: 'category',
                            splitLine: {
                                show: false
                            },
                            data:date,
                            inverse:true
                        },
                        yAxis: {
                            type: 'value',
                            boundaryGap: [0, '50%'],
                            splitLine: {
                                show: false
                            },
                             axisLabel : {
                                formatter: '{value} bps'
                            }
                        },
                        series: [{
                            name: '模拟数据',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: false,
                            data: data
                        }]
                    });
        },
        showCharts() {
            console.log("sdsdaaa",this.utilizationData)
            var data = this.transfer(this.utilizationData,"interfaceUtilization");
            var date = this.transferDatex(this.utilizationData,"interfaceUtilization");
            console.log("day",data);
            var myChart = echarts.init(document.getElementById('interface-utilization'));
            myChart.setOption({
                        title: {
                            text: '实时接口利用率'
                        },
                        tooltip: {
                            trigger: 'axis',
                            formatter: function (params) {
                                params = params[0];
                                return params.value[0] + ' / ' + params.value[1];
                            },
                            axisPointer: {
                                animation: false
                            }
                        },
                        xAxis: {
                            type: 'category',
                            splitLine: {
                                show: false
                            },
                            data:date,
                            inverse:true
                        },
                        yAxis: {
                            type: 'value',
                            boundaryGap: [0, '50%'],
                            splitLine: {
                                show: false
                            },
                             axisLabel : {
                                formatter: '{value} %'
                            }
                        },
                        series: [{
                            name: '模拟数据',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: false,
                            data: data
                        }]
                    });
        }
    },
    mounted() {
        this.loadData();
        this.closeData();
    }
}
</script>

