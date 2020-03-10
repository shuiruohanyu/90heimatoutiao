class star {
  pointX = 0 // x坐标
  pointY = 10 // y坐标
  length = 0 // 长度
  canvas = null
  direction = '' // 方向 left / right
  flying = false // 飞行状态
  maxWidth = 0
  maxHeight = 0
  constructor ({ maxWidth, maxHeight, canvas, direction, callBack, index, speed }) {
    //   props传入起始坐标点 长度 canvasContext对象
    this.maxWidth = maxWidth
    this.maxHeight = maxHeight
    this.canvas = canvas
    this.direction = direction
    this.callBack = callBack
    this.index = index
    this.speed = speed
    this.startFlay() // 初始化完毕后开始飞翔
  }
  /***
   * 开始飞
   * ****/
  startFlay () {
    if (!this.flying) {
      this.flying = true
      this.angel = 45 // 随机的角度
      this.length = Math.floor(Math.random() * 70) + 40 // 随机的长度
      this.pointX = Math.floor(Math.random() * this.maxWidth) + 1

      let { width, height } = this.getXYLength(this.length)
      this.width = width
      this.height = height
      // 随机的开始坐标点
      window.requestAnimationFrame(this.animateFrame.bind(this))
    }
  }
  //   动画
  animateFrame () {
    // this.canvas.save()
    // 计算坐标
    // 向左时 流星坐标的x起始坐标 大于 终点坐标
    // 向右时 x坐标大于终点坐标
    // 根据勾股定理 推理 起始x y 坐标 (长度) => 终点x y坐标
    // 最终得到 x y 坐标的唯一解 做两侧坐标绝对值
    //   this.direction === 'left' ?
    // this.clearPath()

    // this.canvas.save()
    let next = this.getXYLength(this.speed)
    let newPoint = this.getEndPoint(next.width, next.height)
    this.pointX = newPoint.endX
    this.pointY = newPoint.endY

    let endPoint = this.getEndPoint(this.width, this.height)
    this.canvas.beginPath()
    // 分段设置颜
    var line = this.canvas.createLinearGradient(this.pointX, this.pointY,
      endPoint.endX,
      endPoint.endY)
    // 分段设置颜色
    line.addColorStop(1, '#fff')
    line.addColorStop(0, '#090723')
    this.canvas.lineWidth = 1
    this.canvas.strokeStyle = line

    this.canvas.moveTo(this.pointX, this.pointY)
    this.canvas.lineTo(endPoint.endX, endPoint.endY)
    this.canvas.closePath()
    this.canvas.stroke()
    // this.canvas.restore()

    if (this.pointX > 0 && this.pointX < this.maxWidth && this.pointY < this.maxHeight && this.flying) {
      window.requestAnimationFrame(this.animateFrame.bind(this))
    } else {
      this.stopFlay()
      // this.clearPath()

      this.callBack && this.callBack(this.index)
    }
  }
  step () {
    this.animateFrame()
  }
  clearPath () {
    this.canvas.clearRect(this.pointX - this.width - 3, this.pointY - 3, this.width + 5, this.height + 5)
  }
  // 计算结束的坐标点
  getEndPoint (width, height) {
    //  数学公式
    let endY = this.pointY + height
    let endX = this.pointX + (this.direction === 'left' ? -(width) : width)
    return {
      endX, endY
    }
  }
  getXYLength (length) {
    let width = length * Math.sin(this.angel / 180 * Math.PI) // 算出直角边上 也就是x竖直高度
    let height = length * Math.cos(this.angel / 180 * Math.PI)
    return {
      width, height
    }
  }
  /****
   *停止飞
   * *****/
  stopFlay () {
    this.flying = false // 停止飞行
  }
}
export default star
