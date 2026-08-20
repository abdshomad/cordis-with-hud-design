/**
 * Annotations Panel Controller
 * Displays detected objects, labels, confidence scores, and visibility toggles.
 */

export class AnnotationsController {
  constructor(containerEl, onChange) {
    this.container = containerEl
    this.onChange = onChange
    this.annotations = []
  }

  setAnnotations(annotations) {
    this.annotations = annotations || []
    this.render()
  }

  toggleVisibility(index) {
    if (this.annotations[index]) {
      this.annotations[index].visible = !this.annotations[index].visible
      this.render()
      if (this.onChange) this.onChange(this.annotations)
    }
  }

  render() {
    this.container.innerHTML = ''
    if (this.annotations.length === 0) {
      this.container.innerHTML = '<div style="padding:16px; color:var(--text-muted); font-size:12px; text-align:center;">No annotations detected for this frame</div>'
      return
    }

    this.annotations.forEach((ann, idx) => {
      const isVis = ann.visible !== false
      const item = document.createElement('div')
      item.className = 'annotation-item'
      item.innerHTML = `
        <div class="annotation-item__label">
          <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:${ann.color || '#00e5ff'};"></span>
          <span>${ann.label || 'Object'}</span>
          <span class="annotation-item__tag">${Math.round((ann.confidence || 0.9) * 100)}%</span>
        </div>
        <div style="display:flex; align-items:center; gap:6px;">
          <button class="hud-btn hud-btn--icon" style="width:24px; height:24px; font-size:10px;" title="Toggle Visibility">
            ${isVis ? '👁' : '🚫'}
          </button>
        </div>
      `
      item.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation()
        this.toggleVisibility(idx)
      })
      this.container.appendChild(item)
    })
  }
}
