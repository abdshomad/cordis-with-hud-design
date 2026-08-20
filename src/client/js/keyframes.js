/**
 * Keyframe Strip Controller
 * Manages frame list rendering, active frame tracking, and frame navigation.
 */

export class KeyframeController {
  constructor(containerEl, onSelectFrame) {
    this.container = containerEl
    this.onSelect = onSelectFrame
    this.frames = []
    this.activeIndex = 0
  }

  setFrames(frames) {
    this.frames = frames
    this.render()
  }

  selectFrame(index) {
    if (index < 0 || index >= this.frames.length) return
    this.activeIndex = index
    this.render()
    if (this.onSelect) {
      this.onSelect(this.frames[index], index)
    }
  }

  nextFrame() {
    this.selectFrame((this.activeIndex + 1) % this.frames.length)
  }

  prevFrame() {
    this.selectFrame((this.activeIndex - 1 + this.frames.length) % this.frames.length)
  }

  render() {
    this.container.innerHTML = ''
    this.frames.forEach((frame, idx) => {
      const card = document.createElement('div')
      card.className = `keyframe-card ${idx === this.activeIndex ? 'keyframe-card--active' : ''}`
      card.innerHTML = `
        <img class="keyframe-card__thumb" src="${frame.thumb || frame.src}" alt="Frame ${idx}" onerror="this.style.display='none'">
        <div class="keyframe-card__meta">
          <span class="keyframe-card__title">F${idx} (${frame.time || `${idx}s`})</span>
          <span class="keyframe-card__tag">${frame.objectsCount || (frame.annotations ? frame.annotations.length : 0)} obj</span>
        </div>
      `
      card.addEventListener('click', () => this.selectFrame(idx))
      this.container.appendChild(card)
    })
  }
}
