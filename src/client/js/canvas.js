/**
 * Canvas Viewport Controller
 * Manages frame image loading, scaling, and polygon/box segmentation overlay.
 */

export class CanvasController {
  constructor(canvasEl) {
    this.canvas = canvasEl
    this.ctx = canvasEl.getContext('2d')
    this.currentImage = null
    this.annotations = []
    this.scale = 1.0
  }

  async loadFrame(imageSrc, annotations = []) {
    this.annotations = annotations
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        this.currentImage = img
        this.canvas.width = img.naturalWidth || 1920
        this.canvas.height = img.naturalHeight || 1080
        this.render()
        resolve()
      }
      img.onerror = () => {
        // Fallback: render procedural background if image asset is missing
        this.currentImage = null
        this.canvas.width = 1920
        this.canvas.height = 1080
        this.renderPlaceholder()
        resolve()
      }
      img.src = imageSrc
    })
  }

  renderPlaceholder() {
    const { ctx, canvas } = this
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#38bdf8'
    ctx.font = '24px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Native HUD Frame Viewport', canvas.width / 2, canvas.height / 2)
  }

  render() {
    const { ctx, canvas, currentImage } = this
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (currentImage) {
      ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height)
    }

    // Render polygon & bounding box annotations
    for (const ann of this.annotations) {
      if (ann.visible === false) continue
      this.drawAnnotation(ann)
    }
  }

  drawAnnotation(ann) {
    const { ctx } = this
    const color = ann.color || '#00e5ff'

    if (ann.polygon && ann.polygon.length > 2) {
      ctx.beginPath()
      ctx.moveTo(ann.polygon[0][0], ann.polygon[0][1])
      for (let i = 1; i < ann.polygon.length; i++) {
        ctx.lineTo(ann.polygon[i][0], ann.polygon[i][1])
      }
      ctx.closePath()
      ctx.fillStyle = color.replace(')', ', 0.25)').replace('rgb', 'rgba')
      ctx.fill()
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.stroke()
    }

    if (ann.bbox) {
      const [x, y, w, h] = ann.bbox
      ctx.strokeStyle = color
      ctx.lineWidth = 1.5
      ctx.strokeRect(x, y, w, h)

      // Label tag
      const label = `${ann.label || 'object'} ${Math.round((ann.confidence || 0.9) * 100)}%`
      ctx.font = 'bold 12px sans-serif'
      const textMetrics = ctx.measureText(label)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)'
      ctx.fillRect(x, y - 20, textMetrics.width + 10, 18)
      ctx.fillStyle = color
      ctx.fillText(label, x + 5, y - 6)
    }
  }
}
