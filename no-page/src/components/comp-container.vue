<template>
  <div class="container">
    <component
      v-for="comp in container.components"
      :key="comp.id"
      :is="comp.componentName"
      :id="comp.id"
      v-bind="comp.attrs">
      {{ comp.content }}
    </component>

    <el-button type="primary" @click="openDialog">添加组件</el-button>

    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="组件" name="component">
          <el-radio-group v-model="currentComponentName">
            <el-radio
                v-for="comp in componentList"
                :key="comp.componentName"
                :label="comp.componentName">
              {{ comp.name }}
            </el-radio>
          </el-radio-group>
        </el-tab-pane>
        <el-tab-pane label="容器" name="container">
          <el-radio-group v-model="currentContainerName">
            <el-radio
              v-for="(ctn, index) in containerList"
              :key="index"
              :label="ctn.containerName">
              {{ ctn.name }}
            </el-radio>
          </el-radio-group>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {componentList, containerList} from '@/const/components'
import {getRandomId} from '@/const/utils'
import LayoutContainer from '@/components/layout-container'

const defaultComponentName = componentList[0] && componentList[0].componentName
const defaultContainerName = containerList[0] && containerList[0].containerName

const COMPONENT = 'component'

export default {
  name: 'comp-container',
  components: {
    LayoutContainer
  },
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
      currentContainerName: defaultContainerName,
      activeName: COMPONENT,
      componentList,
      containerList
    }
  },
  computed: {
    container () {
      return this.$store.getters.getContainer(this.containerId)
    }
  },
  methods: {
    handleTabClick () {

    },
    openDialog () {
      this.dialogVisible = true
    },
    onConfirm () {
      this.activeName === COMPONENT ? this.addComponent() : this.addContainer()
      this.dialogVisible = false

      this.currentComponentName = defaultComponentName
      this.currentContainerName = defaultContainerName
    },
    addComponent () {
      const component = componentList.find(comp => comp.componentName === this.currentComponentName)

      if (!component) {
        return
      }

      this.$store.commit('addComponent', {
        containerId: this.containerId,
        component: component
      })
    },
    addContainer () {
      const ctn = containerList.find(ctn => ctn.containerName === this.currentContainerName)

      if (!ctn) {
        return
      }

      const randomId = getRandomId(32)

      this.$store.commit('addComponent', {
        containerId: this.containerId,
        component: {
          id: randomId,
          name: '容器一',
          componentName: ctn.containerName
        }
      })

      this.$store.commit('addContainer', {
        id: randomId,
        name: '容器一',
        containerName: ctn.containerName
      })
    }
  }
}
</script>
