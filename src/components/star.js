class star {
  pointX = 0 // x坐标
  pointY = 0 // y坐标
  length = 0 // 长度
  canvas = null
  direction = '' // 方向 left / right
  flying = false // 飞行状态
  constructor ({ pointX, pointY, length, canvas, direction }) {
    //   props传入起始坐标点 长度 canvasContext对象
    this.pointX = pointX
    this.pointY = pointY
    this.length = length
    this.canvas = canvas
    this.direction = direction
    this.startFlay() // 初始化完毕后开始飞翔
  }
  /***
   * 开始飞
   * ****/
  startFlay () {
    if (!this.flying) {

    }
  }
  //   动画
  animateFrame () {
    // 计算坐标
    // 向左时 流星坐标的x起始坐标 大于 终点坐标
    // 向右时 x坐标大于终点坐标
    // 根据勾股定理 推理 起始x y 坐标 (长度) => 终点x y坐标
    // 最终得到 x y 坐标的唯一解 做两侧坐标绝对值
    //   this.direction === 'left' ?
  }
  /****
   *停止飞
   * *****/
  stopFlay () {

  }
}
export default star
