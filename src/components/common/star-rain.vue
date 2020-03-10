<template>
  <el-card style='width:700px; height:500px;position:relative'>
      <el-row type='flex' justify="center">
          <el-button v-if="!beginRain" @click="beginRain = true" type="primary">开始流星雨</el-button>
          <el-button v-else type="info" @click="beginRain = false">停止</el-button>
      </el-row>

     <el-slider
     style='position:absolute;right:50px'
      v-model="maxStar"
      :min="1"
      :max="10"
      vertical
      label="数量"
      height="200px">

    </el-slider>
     <el-slider
     style='position:absolute;right:0'
      v-model="speed"
      :min="1"
      :max="10"
      vertical
      label="速率"
      height="200px">

    </el-slider>
         <canvas ref="myCanvas" width="500" height="400" style="border: 2px dashed #ccc"></canvas>
  </el-card>
</template>

<script>
import Star from '../star'
export default {
  data () {
    return {
      beginRain: false,
      direction: 'left',
      stars: [],
      maxStar: 1,
      speed: 1
    }
  },
  mounted () {
    this.Canvas = this.$refs.myCanvas.getContext('2d')
  },
  watch: {
    beginRain () {
      this.beginRain ? this.start() : this.stop()
    },
    maxStar () {
      this.stop()
      this.start()
    },
    speed () {
      this.stop()
      this.start()
    }
  },
  methods: {
    next () {
      this.stars[0].step && this.stars[0].step()
    },
    start () {
    //   流星雨 就是一根根斜着的线 从画布飘过
    //   要随机生成若干根线 可以有前后事件的顺序 可根据单位时间的产出
      this.Canvas.fillStyle = '#090723'
      this.Canvas.fillRect(0, 0, 500, 400)
      this.starFlag = setInterval(() => this.createStar(), 1000 / this.maxStar)
    },
    // 创建星星
    createStar () {
      let obj = new Star({
        maxWidth: 500,
        maxHeight: 400,
        canvas: this.Canvas,
        direction: this.direction,
        callBack: this.destoryStar,
        index: this.stars.length,
        speed: this.speed
      })
      this.stars.push(obj)
    },
    stop () {
      clearInterval(this.starFlag)
      this.stars.map(item => {
        item.stopFlay()
        item = null
      })
      this.Canvas.fillStyle = '#fff'
      this.Canvas.clearRect(0, 0, 500, 400)
    },
    destoryStar (index) {
      this.stars[index] = null // 设置为空 释放空间
      this.stars.splice(index, 1) // 删除对应的对象
    }
  }
}
</script>

<style>

</style>
