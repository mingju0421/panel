<template>
  <div class="about">
    <Header  @update='update'></Header>
    <component :is="reportData.type" ref="tool" :index='id'></component>
  </div>
</template>


<script>
const Graph = () => import('@/components/Graph.vue')
const Header = () => import('@/components/header')
const Row = () => import('@/components/Row.vue')
const Singlestat = () => import('@/components/Singlestat.vue')
export default {
  components: {
    Graph,
    Header,
    Row,
    Singlestat
  },
  data() {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    reportData() {
        return this.$store.getters.reportData[this.id]
    },
  },
  methods: {
    update() {
        this.$refs.tool.update()
    }
  }
}
</script>


<style lang="stylus" scoped>

</style>