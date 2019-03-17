<template>
  <div id="app">
    <div class="containers">
      <comp-container
        v-if="rootContainer"
        class="container"
        :containerId="rootContainer.id">
        {{rootContainer.name}}
      </comp-container>
    </div>
    <el-button type="primary" @click="addContainer">添加容器</el-button>
  </div>
</template>

<script>
import CompContainer from './components/comp-container'
import {componentList} from '@/const/components'

export default {
  name: 'app',
  components: {
    CompContainer
  },
  data () {
    return {
      dialogVisible: false,
      currentComponentName: componentList[0] && componentList[0].componentName,
      componentList
    }
  },
  computed: {
    containers () {
      return this.$store.getters.containers
    },
    rootContainer () {
      return this.containers[0]
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
    },
    addContainer () {
      this.$store.commit('addContainer')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  width: 100%;
  border: 1px solid #f00
}
</style>
