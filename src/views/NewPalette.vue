<template>
  <div class="NewPalette">
    <div class="list">
      <div class="item" @click="addReport('Graph')">Graph</div>
      <div class="item" @click="addReport('Singlestat')">Singlestat</div>
      <div class="item" @click="addReport('Row')">Row</div>
      <!-- <div class="item">Pie</div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div> -->
    </div>
    <div class="grid">
      <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      >

      <grid-item v-for="(item, index) in layout"
      class="gridItem"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.i">
        <component :is="item.type" :index='index'></component>
      </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
const Graph = () => import('@/components/Graph.vue')
const Row = () => import('@/components/Row.vue')
const Singlestat = () => import('@/components/Singlestat.vue')

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    Graph,
    Row,
    Singlestat
  },
  data() {
    return {
      
    }
  },
  computed: {
    layout() {
      return this.$store.getters.reportData
    }
  },
  methods: {
    addReport(type) {
      this.$store.commit('addReport', type)
    }
  }
}
</script>

<style scoped lang="stylus">
.NewPalette
  display flex
  height 100%
  .list
    width 30%
    height 100%
    border-right 1px solid #ccc
    .item
      width calc(50% - 10px)
      height 150px
      display inline-block
      border 1px solid #cccccc
      margin  5px

  .grid
    width 70%
    .gridItem
      border 1px solid #ccc
</style>
