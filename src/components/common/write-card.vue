<template>
 <el-row style="height:600px;position:relative" type='flex' justify="center" align="middle">
   <el-card style='width:500px; height: 400px'>
       <canvas width="448" height="360" style="width:100%;height:360px;border: 2px solid #ccc" @mousedown.stop="beginDraw" @mousemove.stop="movePoint" @mouseup.stop="endDraw" ref="myCanvas" ></canvas>
   </el-card>
    <div class='right'>
     <el-button size="mini" @click="drawLine">直线</el-button>
     <el-button size="mini" @click="drawCurve">曲线</el-button>
     <el-button size="mini" @click="drawArc">圆</el-button>

     <el-button size="mini" @click="drawRect">矩形</el-button>
     <el-button size="mini" @click="drawBall">抛物线</el-button>
     <el-button size="mini" @click="review" >签字动画</el-button>
     <el-button size="mini" @click="reset" >擦除</el-button>
     <el-button size="mini" @click="saveHeader">变成头像</el-button>
    </div>
     <img ref="myBall" style='display:none' src="../../assets/img/ball.jpg" alt="">
 </el-row>
</template>

<script>
import eventBus from '@/utils/eventBus'

export default {
  data () {
    return {
      pointX: 0, // 起始坐标点X
      pointY: 0, //  其实坐标点Y
      isDraw: false, // 是否已经开始画画
      list: [],
      size: 1, // 比例
      width: 448,
      height: 360
    }
  },
  mounted () {
    this.CanvasObj = this.$refs.myCanvas.getContext('2d') // 画布对象
  },
  methods: {
    // 抛物线
    drawBall () {
      let startX = 0
      let startY = 0
      let time = 0
      let func = () => {
        if (startY < this.height) {
          startY = 9.8 / 2 * time * time
          startX = 30 * time

          this.clearCanvas()
          this.CanvasObj.beginPath()
          this.CanvasObj.drawImage(this.$refs.myBall, startX, startY, 40, 40)
          this.CanvasObj.stroke()
          this.CanvasObj.closePath()
          time += 0.1

          window.requestAnimationFrame(func)
        }
      }
      window.requestAnimationFrame(func)
    },
    // 画矩形
    drawRect () {
      let startX = 10
      let startY = 10
      this.CanvasObj.beginPath()
      this.CanvasObj.rect(startX, startY, 200, 200)
      this.CanvasObj.stroke()
      this.CanvasObj.closePath()
    },
    // 画圆
    drawArc () {
      //  公式
      let startX = 224
      let startY = 180
      let index = 0.01
      let func = () => {
        if (index <= 2.01) {
          this.clearCanvas()
          this.CanvasObj.beginPath()
          this.CanvasObj.arc(startX, startY, 150, 0, index * Math.PI, false)
          this.CanvasObj.stroke()
          this.CanvasObj.closePath()
          index += 0.01
          window.requestAnimationFrame(func)
        }
      }
      window.requestAnimationFrame(func)
    },
    drawLine () {
      window.cancelAnimationFrame(this.loadingAnimate)

      this.list = []
      this.clearCanvas()
      let length = 200 // 画一个长度为300的坐标点
      let startX = 20 // 起始坐标X
      let startY = 20 // 起始坐标Y
      let linePointList = Array.from(Array(length), (v, k) => ({ x: startX + k, y: startY }))
      let func = () => {
        if (linePointList.length) {
          let p = linePointList.shift()
          this.CanvasObj.lineTo(p.x, p.y)
          this.CanvasObj.stroke()
          this.loadingAnimate = window.requestAnimationFrame(func) // 重新调用
        }
      }
      window.requestAnimationFrame(func)
      this.CanvasObj.beginPath()
      this.CanvasObj.moveTo(startX, startY)
    },
    // 画贝塞尔曲线
    drawCurve () {
      window.cancelAnimationFrame(this.loadingAnimate)
      this.list = []
      this.clearCanvas()
      // let length = 200 // 画一个长度为300的坐标点
      let startX = 20 // 起始坐标X
      let startY = 20 // 起始坐标Y
      this.CanvasObj.beginPath()
      this.CanvasObj.moveTo(startX, startY)
      this.CanvasObj.quadraticCurveTo(20, 100, 200, 20)
      this.CanvasObj.stroke()
    },
    //  清空画布
    clearCanvas () {
      this.CanvasObj.fillStyle = '#fff'
      this.CanvasObj.fillRect(0, 0, '448', '360')
    },
    // 开始下笔
    beginDraw (event) {
      console.log('开始画画')
      this.isDraw = true
      this.CanvasObj.beginPath() // 开始画了
      this.CanvasObj.lineWidth = 1
      this.CanvasObj.strokeStyle = 'red'
      this.pointX = event.offsetX
      this.pointY = event.offsetY
      this.list.push({ x: this.pointX, y: this.pointY, begin: true })

      var bbox = this.$refs.myCanvas.getBoundingClientRect()
      console.log(bbox)
      console.log(this.$refs.myCanvas.width)
      console.log(this.$refs.myCanvas.height)
    },
    // 移动点
    movePoint (event) {
      if (this.isDraw) {
        console.log(event)
        console.log('画画中')
        //  只有开始画了 才在移动的时候做点
        this.CanvasObj.moveTo(this.pointX, this.pointY)
        this.CanvasObj.lineTo(event.offsetX, event.offsetY)
        this.list.push({ x: event.offsetX, y: event.offsetY })
        this.CanvasObj.stroke() // 绘制路径
        this.pointX = event.offsetX
        this.pointY = event.offsetY
      }
    },
    // 画完
    endDraw (event) {
      this.isDraw = false
      this.list.push({ x: event.offsetX, y: event.offsetY, close: true })

      console.log('结束画画')
    },
    review () {
      this.clearCanvas()
      if (!this.drawFlag) {
        var func = () => {
          if (this.list.length) {
            let p = this.list.shift()
            if (p.begin) {
              this.CanvasObj.beginPath()
            }
            this.CanvasObj.lineTo(p.x, p.y)
            this.CanvasObj.stroke()
            this.drawFlag = window.requestAnimationFrame(func)
            if (p.close) {
              this.CanvasObj.closePath()
            }
          } else {
            this.drawFlag = null
          }
        }
        this.drawFlag = window.requestAnimationFrame(func)
      }
    },
    reset () {
      clearInterval(this.drawFlag)
      this.clearCanvas()
    },
    saveHeader () {
      let dataUrl = this.$refs.myCanvas.toDataURL('image/png')
      let file = this.dataURLtoFile(dataUrl, 'myHeader') // 头像
      let data = new FormData()
      data.append('photo', file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        // 认为保存成功 => 通知header组件 更新信息
        eventBus.$emit('updateUserInfo')
      })
    },
    dataURLtoFile (dataurl, filename) { // 将base64转换为文件
      var arr = dataurl.split(','); var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1]); var n = bstr.length; var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    }

  }
}
</script>

<style scoped>
 .right {
   display: flex;
   flex-direction: column;
   justify-content: center;
   height: 100%;
   margin-left: 20px;
 }
 .el-button {
   margin:10px
 }
</style>
