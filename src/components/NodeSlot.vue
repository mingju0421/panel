<template>
  <div class="nodeSlo">
      <header>
          <el-dropdown @command="handleCommand"  trigger="click">
            <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">查看</el-dropdown-item>
                <el-dropdown-item command="b">编辑</el-dropdown-item>
                <el-dropdown-item command="c">移除</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-select :value="value" placeholder="请选择" size='mini' @change='select'>
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select> -->
      </header>
      <slot name="center" class="center"></slot>
      <slot name="config"></slot>
  </div>
</template>

<script>

export default {
    components: {
        
    },
    data() {
        return {
            options: [
                {
                    value: '查看',
                    label: '查看',
                },
                {
                    value: '编辑',
                    label: '编辑',
                },
                {
                    value: '移除',
                    label: '移除',
                },
            ],
            value: '编辑面板'
        }
    },
    props: ['index'],
    methods: {
        handleCommand(command) {
            if (command == 'a' || command == 'b') {
                this.$router.push({'path': `/edit/${this.index}`})
            }else if (command == 'c') {
                this.$store.commit('移除面板', this.index)
            }
        }
        
    }
}
</script>

<style lang="stylus" scoped>
.nodeSlo
    height 100%
header
    text-align center
    padding 5px 0
    border-bottom 1px solid #ccc

</style>