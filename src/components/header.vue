<template>
    <header>
      <div>
        <el-button>保存</el-button>
        <el-button @click="goBack">返回</el-button>
      </div>
    </header>
</template>

<script>
export default {
    methods: {
    goBack() {
      this.$router.push('/')
      this.$emit('update')
    },
  }
}
</script>

<style lang="stylus" scoped>
header 
  padding-top 10px
  padding-right 20px
  height 60px
  border-bottom 1px solid #ccc
  display flex
  justify-content flex-end
  align-content center
</style>