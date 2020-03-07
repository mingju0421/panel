<template>
    <NodeSlot :index=index>
        <div slot='center' :class="[routerName ==='EditPalette' ? 'center' : 'view' ]">
            <div ref="chart" class="chart"></div>
        </div>
    </NodeSlot>
</template>

<script>
const NodeSlot = () => import('./NodeSlot')
export default {
    components: {
        NodeSlot
    },
    props: ['index'],
    data() {
        return {
            routerName: this.$router.currentRoute.name,
        }
    },
    methods: {
        update() {
            this.$store.commit('update', {config: this.config, index: this.index})
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