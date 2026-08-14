import { useEffect, useRef } from 'react'

function ProjectVideo({ src, ariaLabel, shouldPlay, loop = false, restartOnMount = false }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    video.muted = true

    if (!shouldPlay) {
      video.pause()
      video.currentTime = 0
      return undefined
    }

    if (restartOnMount) video.currentTime = 0
    const playPromise = video.play()
    playPromise?.catch((error) => {
      if (error.name !== 'AbortError') console.error('Motion playback failed:', error)
    })

    return () => {
      video.pause()
      if (restartOnMount) video.currentTime = 0
    }
  }, [restartOnMount, shouldPlay, src])

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay={shouldPlay}
      muted
      loop={loop}
      playsInline
      preload="auto"
      aria-label={ariaLabel}
      onError={(event) => console.error('Video error', event.currentTarget.error)}
    />
  )
}

export default ProjectVideo
