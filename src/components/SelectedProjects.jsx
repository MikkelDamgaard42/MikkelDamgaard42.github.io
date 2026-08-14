import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
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

function VisualFrame({ asset, className = '', onOpen, visible = true }) {
  return (
    <button className={`story-frame ${className}`} data-asset={asset.id} data-annotation={asset.annotationIndex ?? undefined} type="button" tabIndex={visible ? 0 : -1} aria-hidden={!visible} aria-label={asset.alt} onClick={(event) => onOpen(asset, event.currentTarget)}>
      {asset.type === 'image' && asset.src && <img src={asset.src} alt="" />}
      {asset.type === 'image-pair' && asset.src && <img src={asset.src} alt="" />}
      {asset.type === 'video' && asset.src && <ProjectVideo src={asset.src} shouldPlay={false} />}
      {asset.type === 'data' && <pre className="story-data"><code>{JSON.stringify(asset.data, null, 2)}</code></pre>}
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
        {project.story.annotations.map((annotation, index) => <span key={annotation}>{String(index + 1).padStart(2, '0')} / {annotation}</span>)}
      </div>
      <div className="story-technical" aria-hidden="true">
        {project.story.technical.map((item) => {
          const [label, value = ''] = item.split(' / ')
          return <p key={item}><span>{label}{label.endsWith('/') ? '' : ' /'}</span>{value}</p>
        })}
      </div>
    </div>
  )
}

function SelectedProjects({ copy }) {
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [staticStory] = useState(() => reducedMotion || window.matchMedia('(max-width: 850px)').matches)
  const [activeProject, setActiveProject] = useState(0)
  const [stage, setStage] = useState(staticStory ? 2 : 0)
  const [transitionPhase, setTransitionPhase] = useState('idle')
  const [selectedAsset, setSelectedAsset] = useState(null)
  const stepsRef = useRef([])
  const transitionTimers = useRef([])
  const lightboxOrigin = useRef(null)
  const project = copy.work.projects[activeProject]
  const nextIndex = (activeProject + 1) % copy.work.projects.length

  useEffect(() => {
    if (staticStory) return undefined
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setStage(Number(entry.target.dataset.stage))),
      { rootMargin: '-30% 0px -55% 0px' },
    )
    stepsRef.current.forEach((step) => step && observer.observe(step))
    return () => observer.disconnect()
  }, [activeProject, staticStory])

  useEffect(() => () => transitionTimers.current.forEach((timer) => clearTimeout(timer)), [])

  const showNextProject = () => {
    if (transitionPhase !== 'idle') return
    if (staticStory) {
      setActiveProject(nextIndex)
      setStage(2)
      return
    }

    setTransitionPhase('leaving')
    const swapTimer = setTimeout(() => {
      setActiveProject(nextIndex)
      setStage(0)
      setTransitionPhase('entering')
      const settleTimer = setTimeout(() => setTransitionPhase('idle'), 30)
      transitionTimers.current.push(settleTimer)
    }, 140)
    transitionTimers.current.push(swapTimer)
  }

  const openVisual = (asset, origin) => {
    lightboxOrigin.current = origin
    setSelectedAsset(asset)
  }

  const closeVisual = useCallback(() => setSelectedAsset(null), [])

  return (
    <article className={`selected-project transition-${transitionPhase}`}>
      <header className="selected-project__header">
        <h3>{project.name}</h3>
        <p className="selected-project__discipline">{project.catalogueType}</p>
      </header>

      <div className="story-layout">
        <div className={`story-stage story-stage--${project.slug}`}>
          <ProjectComposition project={project} stage={stage} onOpen={openVisual} staticStory={staticStory} />
          <div className="workbench-controls">
            <div className="workbench-nav" aria-label="PROJECT / LYNK / BLUNT">
              <span>PROJECT /</span>
              <span className="workbench-project workbench-project--lynk">
                {activeProject === 0
                  ? <strong aria-current="true">LYNK</strong>
                  : <button type="button" onClick={showNextProject} disabled={transitionPhase !== 'idle'}>LYNK</button>}
              </span>
              <span>/</span>
              <span className="workbench-project workbench-project--blunt">
                {activeProject === 1
                  ? <strong aria-current="true">BLUNT</strong>
                  : <button type="button" onClick={showNextProject} disabled={transitionPhase !== 'idle'}>BLUNT</button>}
              </span>
            </div>
            <Link className="workbench-case-link" to={`/projects/${project.slug === 'fashion' ? 'blunt' : project.slug}`}>{copy.work.viewCase} →</Link>
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
    </article>
  )
}

export default SelectedProjects
