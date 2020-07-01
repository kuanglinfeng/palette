const canvas = document.getElementById('canvas')
const pen = document.getElementById('pen')
const eraser = document.getElementById('eraser')
const context = canvas.getContext('2d')
let eraserEnabled = false


autoSetCanvasSize(canvas)

listenToUser(canvas)

pen.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}

eraser.onclick = function () {
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}

red.onclick = function () {
  context.strokeStyle = 'red'
  red.classList.add('active')
  blue.classList.remove('active')
  green.classList.remove('active')
}

green.onclick = function () {
  context.strokeStyle = 'green'
  green.classList.add('active')
  blue.classList.remove('active')
  red.classList.remove('active')
}

blue.onclick = function () {
  context.strokeStyle = 'blue'
  blue.classList.add('active')
  green.classList.remove('active')
  red.classList.remove('active')
}




function listenToUser(canvas) {
  let isUsing = false
  let previousPoint = { x: undefined, y: undefined }

  // 特性检测
  if (document.body.ontouchstart !== undefined) {
    // 触屏设备
    canvas.ontouchstart = function (e) {
      const x = e.touches[0].clientX
      const y = e.touches[0].clientY
      isUsing = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        previousPoint = { x, y }
      }
    }

    canvas.ontouchmove = function (e) {
      e.preventDefault()
      const x = e.touches[0].clientX
      const y = e.touches[0].clientY
      if (!isUsing) return
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        const currentPoint = { x, y }
        drawLine(previousPoint.x, previousPoint.y, currentPoint.x, currentPoint.y, 5)
        previousPoint = currentPoint
      }
    }

    canvas.ontouchend = function () {
      isUsing = false
    }
  } else {
    // 非触屏设备
    canvas.onmousedown = function (e) {
      const x = e.clientX
      const y = e.clientY
      isUsing = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        previousPoint = { x, y }
      }
    }

    canvas.onmousemove = function (e) {
      e.preventDefault()
      const x = e.clientX
      const y = e.clientY
      if (!isUsing) return
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        const currentPoint = { x, y }
        drawLine(previousPoint.x, previousPoint.y, currentPoint.x, currentPoint.y, 5)
        previousPoint = currentPoint
      }
    }

    canvas.onmouseup = function () {
      isUsing = false
    }
  }


  eraser.onclick = function () {
    eraserEnabled = !eraserEnabled
  }
}


function drawLine(x1, y1, x2, y2, width) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = width
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}


function autoSetCanvasSize(canvas) {
  function setCanvasSize() {
    const pageWidth = document.documentElement.clientWidth
    const pageHeight = document.documentElement.clientHeight
    canvas.setAttribute('width', pageWidth.toString())
    canvas.setAttribute('height', pageHeight.toString())
  }
  setCanvasSize()
  window.onresize = function () {
    setCanvasSize()
  }
}

