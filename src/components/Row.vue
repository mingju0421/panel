<template>
  <div>
      <el-button size='mini' @click="switching">{{flag ? '展开' : '收起'}}</el-button>
  </div>
</template>

<script>
export default {
    props: ['index'],
    data() {
        return {
            flag: false
        }
    },
    methods: {
        switching() {
            if (this.flag) {
                this.$store.commit('展开面板', this.index)
            }else {

                this.$store.commit('收起面板', this.index)
            }
            this.flag = !this.flag
        }
    }
}
</script>

<style>

</style>