<template>
 <el-row style="height:300px;" type='flex' justify="center" align="middle">
   <el-card style='width:400px; height: 200px'>
       <canvas @mousedown.stop="beginDraw" @mousemove.stop="movePoint" @mouseup.stop="endDraw" ref="myCanvas" style="width:100%;height:160px;border: 2px solid #ccc"></canvas>
   </el-card>
 </el-row>
</template>

<script>
export default {
  data () {
    return {
      pointX: 0, // 起始坐标点X
      pointY: 0, //  其实坐标点Y
      isDraw: false, // 是否已经开始画画
      list: []
    }
  },
  mounted () {
    this.CanvasObj = this.$refs.myCanvas.getContext('2d') // 画布对象
  },
  methods: {
    //  清空画布
    clearCanvas () {

    },
    // 开始下笔
    beginDraw (event) {
      console.log('开始画画')
      //        this.CanvasObj.beginPath()
      // this.CanvasObj.moveTo(20, 20)
      // this.CanvasObj.lineTo(20, 100)
      // this.CanvasObj.lineTo(70, 100)
      // this.CanvasObj.strokeStyle = 'green'
      // this.CanvasObj.stroke()
      this.isDraw = true
      this.CanvasObj.beginPath() // 开始画了
      this.CanvasObj.lineWidth = 2
      this.CanvasObj.strokeStyle = 'red'
      this.pointX = event.offsetX
      this.pointY = event.offsetY
      this.list.push({ x: event.offsetX, y: event.offsetY })
    },
    // 移动点
    movePoint (event) {
      if (this.isDraw) {
        console.log('画画中')
        //  只有开始画了 才在移动的时候做点
        this.CanvasObj.moveTo(this.pointX, this.pointY)
        this.CanvasObj.lineTo(event.offsetX, event.offsetY)

        this.pointX = event.offsetX
        this.pointY = event.offsetY
        this.CanvasObj.stroke() // 绘制路径
      }
    },
    // 画完
    endDraw () {
      this.isDraw = false
      console.log('结束画画')
    }

  }
}
</script>

<style>

</style>
