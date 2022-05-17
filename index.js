import { fabric } from 'fabric'

const fabricCanvas = new fabric.Canvas('canvas')

// mine clearance 扫雷

// 尺寸， 布雷， 计算数字， 渲染， 事件

const levels = {
  big: {
    x: 30,
    y: 16,
    mines: 99
  }
}

// class MineClearance {
//   constructor(options) {
//     this.size = options.size
//   }
//   initScreen() {}
//   createScreenData() {}
// }

const blockWidth = 40
const screenXBlocks = 30
const screenYBlocks = 16
const canvasWidth = blockWidth * screenXBlocks + (screenXBlocks - 1)
const canvasHeight = blockWidth * screenYBlocks + (screenYBlocks - 1)
fabricCanvas.setWidth(canvasWidth)
fabricCanvas.setHeight(canvasHeight)

// function createData() {
//   for (let i = 0; i < screenXBlocks; i++) {
//     screenData[i] = []
//     for (let j = 0; j < screenYBlocks; j++) {
//       screenData[i].push({
//         x: i,
//         y: j
//       })
//     }
//   }
// }

fabricCanvas.on('mouse:down', (e) => {
  const target = e.target
  const time = Date.now()
  fabricCanvas.on('mouse:up', (ev) => {
    const upTime = Date.now()
    const { left, top } = target
    const { left: upLeft, top: upTop } = ev.target

    if (upTime - time < 300 && left === upLeft && top === upTop) {
      fabricCanvas.fire('click', ev)
    }
  })
})

fabricCanvas.on('click', (e) => {
  const target = e.target
  target.set('fill', 'red')
  target.set('open', true)
  fabricCanvas.renderAll()
})

fabricCanvas.on('mouse:move', (e) => {
  const target = e.target
  if (target && !target.open) {
    target.set('fill', 'yellow')
    fabricCanvas.renderAll()
  }
})
fabricCanvas.on('mouse:out', (e) => {
  const target = e.target
  if (target && !target.open) {
    target.set('fill', 'blue')
    fabricCanvas.renderAll()
  }
})

function createData() {
  const screenData = []
  for (let i = 0; i < screenXBlocks; i++) {
    for (let j = 0; j < screenYBlocks; j++) {
      screenData.push({
        x: i,
        y: j
      })
    }
  }
  return screenData
}

function renderScreen() {
  const data = createData()
  const pointers = data.map((item) => {
    const { x, y } = item
    const left = x * blockWidth + x
    const top = y * blockWidth + y
    // return { left, top, width: blockWidth, height: blockWidth }

    const rect = new fabric.Rect({
      left,
      top,
      width: blockWidth,
      height: blockWidth,
      selectable: false,
      fill: 'blue'
    })
    fabricCanvas.add(rect)
  })

  fabricCanvas.renderAll()
}

renderScreen()
