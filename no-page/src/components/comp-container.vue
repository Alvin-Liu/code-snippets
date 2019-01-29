<template>
  <div class="container">
    <component
      v-for="comp in container.components"
      :key="comp.id"
      :is="comp.componentName"
      v-bind="comp.attrs">
      {{ comp.content }}
    </component>

    <el-button type="primary" @click="openDialog">添加组件</el-button>

    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <el-radio-group v-model="currentComponentName">
        <el-radio
          v-for="comp in componentList"
          :key="comp.componentName"
          :label="comp.componentName">
          {{ comp.name }}
        </el-radio>
      </el-radio-group>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addComponent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {componentList} from '@/const/components'
import {getRandomId} from '@/const/utils'

const defaultComponentName = componentList[0] && componentList[0].componentName

export default {
  name: 'comp-container',
  props: {
    containerId: {
      type: [String, Number],
      default: getRandomId(32)
    }
  },
  data () {
    return {
      dialogVisible: false,
      currentComponentName: defaultComponentName,
      componentList
    }
  },
  computed: {
    container () {
      return this.$store.getters.getContainer(this.containerId)
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
    },
    addComponent () {
      const component = componentList.find(comp => comp.componentName === this.currentComponentName)

      this.dialogVisible = false
      this.currentComponentName = defaultComponentName
      if (!component) {
        return
      }

      this.$store.commit('addComponent', {
        containerId: this.containerId,
        component: component
      })
    }
  }
}
</script>
