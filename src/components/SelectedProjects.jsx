import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import VisualLightbox from './VisualLightbox.jsx'
import ProjectVideo from './ProjectVideo.jsx'
import lynkMain from '../assets/lynk-main.png'
import lynkOnboarding from '../assets/lynk-onboarding.png'
import lynkEventDetails from '../assets/lynk-event-details.png'
import lynkCreateEvent from '../assets/lynk-create-event.png'
import lynkMotion from '../assets/lynk-motion.mp4'
import lynkOnboardingFlow from '../assets/lynk-onboarding-flow.png'
import lynkCreateEventFlow from '../assets/lynk-create-event-flow.png'
import bluntMain from '../assets/blunt-main.png'
import bluntCard from '../assets/blunt-card.png'
import bluntCardHover from '../assets/blunt-card-hover.png'
import bluntFooter from '../assets/blunt-footer.png'

const bluntProductData = {
  id: 1,
  title: 'S/S Madison T-shirt',
  brand: 'Carhartt',
  color: 'Grey',
  price: 349,
  category: 'T-Shirts',
  inStock: true,
}

const lynkVisuals = {
  'lynk-main': { src: lynkMain, lightboxSrc: lynkMain, type: 'image', classIndex: 'main', annotationIndex: null },
  'lynk-onboarding': { src: lynkOnboarding, lightboxSrc: lynkOnboardingFlow, type: 'image', classIndex: 1, annotationIndex: 0 },
  'lynk-event-details': { src: lynkEventDetails, lightboxSrc: lynkEventDetails, type: 'image', classIndex: 2, annotationIndex: 1 },
  'lynk-create-event': { src: lynkCreateEvent, lightboxSrc: lynkCreateEventFlow, type: 'image', classIndex: 4, annotationIndex: 2 },
  'lynk-motion': { src: lynkMotion, lightboxSrc: lynkMotion, type: 'video', classIndex: 5, annotationIndex: 3 },
}

const bluntVisuals = {
  'blunt-main': { src: bluntMain, type: 'image', annotationIndex: 0 },
  'blunt-card': { src: bluntCard, type: 'image', annotationIndex: 2 },
  'blunt-card-hover': {
    src: bluntCardHover,
    type: 'image-pair',
    annotationIndex: 3,
    relatedSources: [
      { src: bluntCard, label: 'DEFAULT' },
      { src: bluntCardHover, label: 'HOVER' },
    ],
  },
  'blunt-data': { type: 'data', data: bluntProductData, annotationIndex: null },
  'blunt-footer': { src: bluntFooter, type: 'image', annotationIndex: 1 },
}

const entranceEase = [0.16, 1, 0.3, 1]

const workbenchVariants = {
  hidden: { opacity: 0.1, scale: 0.65, y: 180 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 2,
      ease: entranceEase,
      delayChildren: 0.18,
      staggerChildren: 0.22,
    },
  },
}

const frameEntranceOffsets = {
  main: { x: 20, y: 220, scale: 0.88 },
  1: { x: -260, y: -140, scale: 0.82 },
  2: { x: 250, y: -100, scale: 0.84 },
  3: { x: 220, y: -160, scale: 0.84 },
  4: { x: -190, y: 230, scale: 0.86 },
  5: { x: 300, y: 130, scale: 0.82 },
}

const frameEntranceVariants = {
  hidden: ({ classIndex }) => ({
    ...frameEntranceOffsets[classIndex],
    opacity: 0,
  }),
  visible: {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 1.8, ease: entranceEase },
  },
}

const annotationEntranceVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: entranceEase } },
}

const technicalEntranceVariants = {
  hidden: { opacity: 0, x: 190, y: 250 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 1.3, ease: entranceEase } },
}

function VisualFrame({ asset, className = '', onOpen, visible = true }) {
  return (
    <button className={`story-frame ${className}`} data-asset={asset.id} data-annotation={asset.annotationIndex ?? undefined} type="button" tabIndex={visible ? 0 : -1} aria-hidden={!visible} aria-label={asset.alt} onClick={(event) => onOpen(asset, event.currentTarget)}>
      <motion.span className="story-frame__entrance" custom={{ classIndex: asset.classIndex }} variants={frameEntranceVariants}>
        <span className="story-frame__asset">
          {asset.type === 'image' && asset.src && <img src={asset.src} alt="" />}
          {asset.type === 'image-pair' && asset.src && <img src={asset.src} alt="" />}
          {asset.type === 'video' && asset.src && <ProjectVideo src={asset.src} shouldPlay={false} />}
          {asset.type === 'data' && <pre className="story-data"><code>{JSON.stringify(asset.data, null, 2)}</code></pre>}
        </span>
      </motion.span>
    </button>
  )
}

function createVisualAssets(project) {
  const isLynk = project.slug === 'lynk'
  const isBlunt = project.slug === 'fashion'

  return project.story.frames.map((frame, index) => {
    const isMain = index === 0
    const baseDefinition = typeof frame === 'string' ? { id: frame, src: null, type: 'image' } : frame
    const definition = isLynk
      ? { ...baseDefinition, ...lynkVisuals[baseDefinition.id] }
      : (isBlunt ? { ...baseDefinition, ...bluntVisuals[baseDefinition.id] } : baseDefinition)
    const annotationIndex = Object.hasOwn(definition, 'annotationIndex') ? definition.annotationIndex : (isMain ? null : index - 1)
    const label = annotationIndex === null ? (isMain ? project.name : project.story.dataLabel) : project.story.annotations[annotationIndex]
    const number = annotationIndex === null ? null : String(annotationIndex + 1).padStart(2, '0')

    return {
      id: definition.id,
      project: project.name,
      label,
      src: definition.src ?? null,
      lightboxSrc: definition.lightboxSrc ?? definition.src ?? null,
      alt: `${project.name} — ${label}`,
      type: definition.type ?? 'image',
      data: definition.data ?? null,
      relatedSources: definition.relatedSources ?? null,
      classIndex: definition.classIndex ?? (index === 0 ? 'main' : index),
      annotationIndex,
      caption: number ? `${project.name} / ${number} / ${label}` : (isMain && (isLynk || isBlunt) ? `${project.name} / MAIN` : `${project.name} / ${label}`),
    }
  })
}

function ProjectComposition({ project, stage, onOpen, staticStory }) {
  const assets = createVisualAssets(project)
  const mainVisible = staticStory || project.slug === 'lynk' || project.slug === 'fashion' || stage === 0

  return (
    <div className={`story-composition story-composition--${project.slug} stage-${stage}`}>
      <VisualFrame asset={assets[0]} className="story-frame--main" onOpen={onOpen} visible={mainVisible} />
      {assets.slice(1).map((asset) => <VisualFrame key={asset.id} asset={asset} className={`story-frame--${asset.classIndex}`} onOpen={onOpen} visible={stage > 0} />)}
      <div className="story-annotations" aria-hidden="true">
        {project.story.annotations.map((annotation, index) => <motion.span key={annotation} variants={annotationEntranceVariants}>{String(index + 1).padStart(2, '0')} / {annotation}</motion.span>)}
      </div>
      <motion.div className="story-technical" aria-hidden="true" variants={technicalEntranceVariants}>
        {project.story.technical.map((item) => {
          const [label, value = ''] = item.split(' / ')
          return <p key={item}><span>{label}{label.endsWith('/') ? '' : ' /'}</span>{value}</p>
        })}
      </motion.div>
    </div>
  )
}

function SelectedProjects({ copy }) {
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [staticStory] = useState(() => reducedMotion || window.matchMedia('(max-width: 850px)').matches)
  const [finePointer] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  const [activeProject, setActiveProject] = useState(0)
  const [stage, setStage] = useState(staticStory ? 2 : 0)
  const [entranceStarted, setEntranceStarted] = useState(false)
  const [showEntranceBadge, setShowEntranceBadge] = useState(false)
  const [switchPhase, setSwitchPhase] = useState('idle')
  const [switchDirection, setSwitchDirection] = useState('forward')
  const [selectedAsset, setSelectedAsset] = useState(null)
  const stepsRef = useRef([])
  const workbenchRef = useRef(null)
  const hasStartedEntranceRef = useRef(false)
  const entranceBadgeTimer = useRef(null)
  const sceneRef = useRef(null)
  const switchTimers = useRef([])
  const pointerFrame = useRef(null)
  const lightboxOrigin = useRef(null)
  const project = copy.work.projects[activeProject]

  useEffect(() => {
    if (staticStory) return undefined
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setStage(Number(entry.target.dataset.stage))),
      { rootMargin: '-30% 0px -55% 0px' },
    )
    stepsRef.current.forEach((step) => step && observer.observe(step))
    return () => observer.disconnect()
  }, [activeProject, staticStory])

  useEffect(() => {
    const checkEntrancePosition = () => {
      if (hasStartedEntranceRef.current || !workbenchRef.current) return
      const { top } = workbenchRef.current.getBoundingClientRect()
      if (top > window.innerHeight * 0.82) return

      hasStartedEntranceRef.current = true
      setEntranceStarted(true)
      setShowEntranceBadge(true)
      entranceBadgeTimer.current = setTimeout(() => setShowEntranceBadge(false), 2000)
    }

    checkEntrancePosition()
    window.addEventListener('scroll', checkEntrancePosition, { passive: true })
    window.addEventListener('resize', checkEntrancePosition)
    return () => {
      window.removeEventListener('scroll', checkEntrancePosition)
      window.removeEventListener('resize', checkEntrancePosition)
      clearTimeout(entranceBadgeTimer.current)
    }
  }, [])

  useEffect(() => () => {
    switchTimers.current.forEach((timer) => clearTimeout(timer))
    cancelAnimationFrame(pointerFrame.current)
  }, [])

  const showProject = (targetIndex) => {
    if (targetIndex === activeProject || switchPhase !== 'idle') return
    setPointerDepth(0, 0)
    if (reducedMotion) {
      setSwitchPhase('leaving')
      const reducedSwapTimer = setTimeout(() => {
        setActiveProject(targetIndex)
        setSwitchPhase('entering')
        const reducedFinishTimer = setTimeout(() => setSwitchPhase('idle'), 140)
        switchTimers.current.push(reducedFinishTimer)
      }, 100)
      switchTimers.current.push(reducedSwapTimer)
      return
    }

    setSwitchDirection(targetIndex > activeProject ? 'forward' : 'backward')
    setSwitchPhase('leaving')
    const swapTimer = setTimeout(() => {
      setActiveProject(targetIndex)
      setSwitchPhase('entering')
      const finishTimer = setTimeout(() => setSwitchPhase('idle'), 1250)
      switchTimers.current.push(finishTimer)
    }, 650)
    switchTimers.current.push(swapTimer)
  }

  const setPointerDepth = (x, y) => {
    if (!sceneRef.current) return
    sceneRef.current.style.setProperty('--depth-front-x', `${x * 30}px`)
    sceneRef.current.style.setProperty('--depth-front-y', `${y * 30}px`)
    sceneRef.current.style.setProperty('--depth-middle-x', `${x * 20}px`)
    sceneRef.current.style.setProperty('--depth-middle-y', `${y * 20}px`)
    sceneRef.current.style.setProperty('--depth-back-x', `${x * 10}px`)
    sceneRef.current.style.setProperty('--depth-back-y', `${y * 10}px`)
    sceneRef.current.style.setProperty('--depth-rotation', `${x * 0.4}deg`)
  }

  const handlePointerMove = (event) => {
    if (!finePointer || reducedMotion || switchPhase !== 'idle' || !sceneRef.current) return
    const bounds = sceneRef.current.getBoundingClientRect()
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1))
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1))
    cancelAnimationFrame(pointerFrame.current)
    pointerFrame.current = requestAnimationFrame(() => setPointerDepth(x, y))
  }

  const handlePointerLeave = () => {
    cancelAnimationFrame(pointerFrame.current)
    pointerFrame.current = requestAnimationFrame(() => setPointerDepth(0, 0))
  }

  const openVisual = (asset, origin) => {
    lightboxOrigin.current = origin
    setSelectedAsset(asset)
  }

  const closeVisual = useCallback(() => setSelectedAsset(null), [])

  return (
    <article className={`selected-project switch-${switchPhase} switch-${switchDirection}`}>
      <header className="selected-project__header">
        <h3>{project.name}</h3>
        <p className="selected-project__discipline">{project.catalogueType}</p>
      </header>

      <div className="story-layout">
        <div ref={workbenchRef} className={`story-stage story-stage--${project.slug}`}>
          <motion.div
            className="workbench-entrance"
            initial="hidden"
            animate={entranceStarted ? 'visible' : 'hidden'}
            variants={workbenchVariants}
          >
            <div ref={sceneRef} className="workbench-scene" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
              <ProjectComposition project={project} stage={stage} onOpen={openVisual} staticStory={staticStory} />
            </div>
          </motion.div>
          <div className="workbench-controls">
            <div className="workbench-nav" aria-label="PROJECT / LYNK / BLUNT">
              <span>PROJECT /</span>
              <span className="workbench-project workbench-project--lynk">
                {activeProject === 0
                  ? <strong aria-current="true">LYNK</strong>
                  : <button type="button" onClick={() => showProject(0)} disabled={switchPhase !== 'idle'}>LYNK</button>}
              </span>
              <span>/</span>
              <span className="workbench-project workbench-project--blunt">
                {activeProject === 1
                  ? <strong aria-current="true">BLUNT</strong>
                  : <button type="button" onClick={() => showProject(1)} disabled={switchPhase !== 'idle'}>BLUNT</button>}
              </span>
            </div>
            <Link className="workbench-case-link" to={`/projects/${project.slug === 'fashion' ? 'blunt' : project.slug}`}><span>{copy.work.viewCase}</span> <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="story-steps" aria-hidden="true">
          {[0, 1, 2].map((step) => <div key={step} data-stage={step} ref={(element) => { stepsRef.current[step] = element }} />)}
        </div>
      </div>

      <div className="selected-project__meta">
        <p>{project.description}</p>
        <p>{project.tags.join(' · ')}</p>
      </div>
      {selectedAsset && <VisualLightbox asset={selectedAsset} onClose={closeVisual} returnFocusRef={lightboxOrigin} />}
      {showEntranceBadge && <div className="workbench-entrance-badge" role="status">WORKBENCH ENTRANCE STARTED</div>}
    </article>
  )
}

export default SelectedProjects
