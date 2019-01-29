<template>
  <div id="app">
    <div class="containers">
      <comp-container
        class="container"
        v-for="(ctn, index) in containers"
        :key="index"
        :containerId="ctn.id">
        {{ctn.name}}
      </comp-container>
    </div>
    <el-button type="primary" @click="addContainer">添加容器</el-button>

    <!--<el-dialog :visible.sync="dialogVisible" append-to-body>-->
      <!--<el-radio-group v-model="currentComponentName">-->
        <!--<el-radio v-for="comp in componentList" :key="comp.componentName" :label="comp.componentName">{{ comp.name }}</el-radio>-->
      <!--</el-radio-group>-->

      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
      <!--</span>-->
    <!--</el-dialog>-->
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
  height: 200px;
  border: 1px solid #f00
}
</style>
