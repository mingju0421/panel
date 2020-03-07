<template>
    <NodeSlot class="graph" :index='index'>
        <div slot='center' :class="[routerName ==='EditPalette' ? 'center' : 'view' ]">
            <div ref="chart" class="chart"></div>
        </div>
        <div class="config" slot="config" v-if="routerName ==='EditPalette'">
            <el-tabs v-model="activeName">
                <el-tab-pane label="Option" name="first">
                    <el-row>
                        <el-col :span="6">
                            <h3>Draw Modes</h3>
                            <label class="configItem">
                                <span>Bars</span>
                                <el-checkbox v-model="config.bar"></el-checkbox>
                            </label>
                            <label class="configItem">
                                <span>Lines</span>
                                <el-checkbox v-model="config.line"></el-checkbox>
                            </label>
                            <label class="configItem">
                                <span>Points</span>
                                <el-checkbox v-model="config.point"></el-checkbox>
                            </label>
                        </el-col>
                        <el-col :span="6">
                            <h3>Mode Option</h3>
                            <label class="configItem">
                                <span>Fill</span>
                                <el-select v-model="config.fill" placeholder="请选择"  :disabled='!config.line'>
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </label>
                            <label class="configItem">
                                <span>Line Width</span>
                                <el-select v-model="config.lineWidth" placeholder="请选择"  :disabled='!config.line'>
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </label>
                            <label class="configItem">
                                <span>Staircase</span>
                                <el-checkbox v-model="config.staircase" :disabled='!config.line'></el-checkbox>
                            </label>
                            <label class="configItem">
                                <span>Point Radius</span>
                                <el-select v-model="config.pointRadius" placeholder="请选择"  :disabled='!config.point'>
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </label>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </div>
        
    </NodeSlot>
</template>


<script>
const NodeSlot = () => import('./NodeSlot.vue')
export default {
    components: {
        NodeSlot
    },
    props: ['index'],
    computed: {
        chartOption() {
            let option = {
                xAxis: {type: 'category'},
                yAxis: {type: 'value'},
                series: []
            }
            if (this.config.line) {
                let obj = {
                    step: this.config.staircase,
                    type: 'line',
                    areaStyle: {
                        color: `rgba(128, 128, 128, ${this.config.fill / 10})`
                    },
                    lineStyle: {
                        width: this.config.lineWidth
                    },
                    data: [['Mon', 820], ['Tue', 935], ['Wed', 901], ['The', 934], ['Fri', 1290], ['Sat', 1330], ['Sun', 1320]]
                }
                option.series.push(obj)
            }
            if (this.config.bar) {
                let obj = {
                    type: 'bar',
                    data: [['Mon', 820], ['Tue', 935], ['Wed', 901], ['The', 934], ['Fri', 1290], ['Sat', 1330], ['Sun', 1320]]
                }
                option.series.push(obj)
            }
            if (this.config.point) {
                let obj = {
                    type: 'scatter',
                    symbolSize: this.config.pointRadius * 3,
                    data: [['Mon', 820], ['Tue', 935], ['Wed', 901], ['The', 934], ['Fri', 1290], ['Sat', 1330], ['Sun', 1320]]
                }
                option.series.push(obj)
            }
            return option
        }
    },
    data() {
        return {
            config: {

                barShow: false,
                bar: false,
                line: false,
                point: false,
                staircase: false,
                fill: 1,
                lineWidth: 1,
                pointRadius: 1,
            },
            chart: null,
            routerName: this.$router.currentRoute.name,
            activeName: 'first',
            options: [
                {value: 1, label: 1},
                {value: 2, label: 2},
                {value: 3, label: 3},
            ]
        }
    },
    methods: {
        chartInit() {
            this.chart = this.$echarts.init(this.$refs.chart)
            // this.chart.setOption(this.chartOption)
        },
        update() {
            this.$store.commit('update', {config: this.config, index: this.index})
        },
        getData() {
            let data = this.$store.getters.reportData[this.index].config
            if (data ) {
                this.config = data
            }
            console.log(data)
        }
    },
    mounted() {
        this.getData()
        setTimeout(() => {
            
        }, 200)
    },
    watch: {
        chartOption(value) {
            setTimeout(() => {
                if (!this.chart) {
                    this.chartInit()
                }
                this.chart.setOption(value, true)
            }, 300)
        },
    }

}
</script>

<style lang="stylus" scoped>
.center
    height calc(60% - 99px)
    padding-bottom 10px
.chart
    height 100%
.view
    height calc(100% - 39px)
.config
    height 40%
    padding 0 40px
    .configItem
        display block
        margin 5px 0
</style>
