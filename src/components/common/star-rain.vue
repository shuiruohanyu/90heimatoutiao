<template>
  <el-card style='width:600px; height:500px'>
      <el-row type='flex' justify="center">
          <el-button v-if="!beginRain" @click="beginRain = true" type="primary">开始流星雨</el-button>
          <el-button v-else type="info" @click="beginRain = false">停止</el-button>
      </el-row>
      <canvas ref="myCanvas" width="500" height="400" style="border: 2px dashed #ccc"></canvas>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      beginRain: false
    }
  },
  mounted () {
    this.Canvas = this.$refs.myCanvas.getContext('2d')
  },
  watch: {
    beginRain () {
      this.beginRain ? this.start() : this.stop()
    }
  },
  methods: {
    start () {
    //   流星雨 就是一根根斜着的线 从画布飘过
    //   要随机生成若干根线 可以有前后事件的顺序 可根据单位时间的产出
    },
    stop () {}
  }
}
</script>

<style>

</style>
