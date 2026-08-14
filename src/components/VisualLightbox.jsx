import { useEffect, useRef, useState } from 'react'
import ProjectVideo from './ProjectVideo.jsx'

function LightboxVisual({ asset }) {
  if (asset.type === 'interactive') {
    return <div className="lightbox-placeholder" data-interactive={asset.id} />
  }

  const source = asset.lightboxSrc ?? asset.src

  if (asset.type === 'video' && source) {
    return <ProjectVideo src={source} ariaLabel={asset.alt} shouldPlay loop restartOnMount />
  }

  if (asset.type === 'image-pair' && asset.relatedSources) {
    return (
      <div className="lightbox-pair">
        {asset.relatedSources.map((item) => (
          <figure key={item.label}>
            <img src={item.src} alt={`${asset.project} — ${item.label}`} />
            <figcaption>{item.label}</figcaption>
          </figure>
        ))}
      </div>
    )
  }

  if (asset.type === 'data' && asset.data) {
    return <pre className="lightbox-data"><code>{JSON.stringify(asset.data, null, 2)}</code></pre>
  }

  if (asset.type === 'image' && source) return <img src={source} alt={asset.alt} />

  return <div className="lightbox-placeholder" role="img" aria-label={asset.alt} data-asset={asset.id} />
}

function VisualLightbox({ asset, onClose, returnFocusRef }) {
  const [closing, setClosing] = useState(false)
  const closeButtonRef = useRef(null)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const returnFocusElement = returnFocusRef.current
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        if (reducedMotion) onClose()
        else setClosing(true)
      }

      if (event.key === 'Tab') {
        event.preventDefault()
        closeButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      returnFocusElement?.focus()
    }
  }, [onClose, reducedMotion, returnFocusRef])

  useEffect(() => {
    if (!closing) return undefined
    const timer = setTimeout(onClose, 140)
    return () => clearTimeout(timer)
  }, [closing, onClose])

  const requestClose = () => {
    if (reducedMotion) onClose()
    else setClosing(true)
  }

  return (
    <div className={`lightbox${closing ? ' is-closing' : ''}`} role="dialog" aria-modal="true" aria-labelledby="lightbox-caption" onMouseDown={(event) => event.target === event.currentTarget && requestClose()}>
      <div className="lightbox__content">
        <header className="lightbox__header">
          <p id="lightbox-caption">{asset.caption}</p>
          <button ref={closeButtonRef} type="button" onClick={requestClose} aria-label="Close">×</button>
        </header>
        <div className="lightbox__visual"><LightboxVisual asset={asset} /></div>
      </div>
    </div>
  )
}

export default VisualLightbox
