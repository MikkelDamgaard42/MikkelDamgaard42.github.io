import { Link, Navigate, useParams } from 'react-router-dom'
import ProjectVideo from '../components/ProjectVideo.jsx'
import lynkMain from '../assets/lynk-main.png'
import lynkEventDetails from '../assets/lynk-event-details.png'
import lynkOnboardingFlow from '../assets/lynk-onboarding-flow.png'
import lynkCreateEventFlow from '../assets/lynk-create-event-flow.png'
import lynkMotion from '../assets/lynk-motion.mp4'
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

const projectPath = (project) => `/projects/${project.slug === 'fashion' ? 'blunt' : project.slug}`

function CaseHeading({ id, number, title, stacked = false }) {
  return (
    <header className="case-section__heading">
      {number && <p>{number}</p>}
      <h2 id={id}>{stacked ? title.split(' ').map((word) => <span key={word}>{word}</span>) : title}</h2>
    </header>
  )
}

function CaseCopy({ paragraphs }) {
  return <div className="case-section__copy">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
}

function LynkCaseStudy({ copy, project, nextProject }) {
  const study = project.caseStudy

  return (
    <main className="case-page">
      <section className="case-hero" aria-labelledby="case-title">
        <Link className="back-link" to="/projects">← {copy.work.backToProjects}</Link>
        <div className="case-hero__heading">
          <div><p>{study.projectLabel}</p><p>LYNK</p></div>
          <h1 id="case-title">LYNK</h1>
          <p className="case-hero__intro">{study.intro}</p>
        </div>
        <dl className="case-meta">
          {study.metadata.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
        </dl>
        <figure className="case-hero__visual"><img src={lynkMain} alt="LYNK main interface" /></figure>
      </section>

      <section className="case-section case-layout--wide-flow" aria-labelledby="onboarding-title">
        <CaseHeading id="onboarding-title" number="01" title={study.onboarding.title} stacked />
        <CaseCopy paragraphs={study.onboarding.paragraphs} />
        <figure className="case-media case-media--flow"><img src={lynkOnboardingFlow} alt="LYNK onboarding flow" /></figure>
      </section>

      <section className="case-section case-layout--visual-pair case-layout--lynk-discovery" aria-labelledby="discovery-title">
        <div className="case-editorial-intro">
          <CaseHeading id="discovery-title" number="02" title={study.discovery.title} stacked />
          <CaseCopy paragraphs={study.discovery.paragraphs} />
        </div>
        <div className="case-media-pair">
          <figure><img src={lynkMain} alt="LYNK discovery interface" /></figure>
          <figure><img src={lynkEventDetails} alt="LYNK event details interface" /></figure>
        </div>
      </section>

      <section className="case-section case-layout--wide-flow" aria-labelledby="create-event-title">
        <CaseHeading id="create-event-title" number="03" title={study.createEvent.title} stacked />
        <CaseCopy paragraphs={study.createEvent.paragraphs} />
        <figure className="case-media case-media--flow"><img src={lynkCreateEventFlow} alt="LYNK create event flow" /></figure>
      </section>

      <section className="case-section case-layout--media-split" aria-labelledby="motion-title">
        <div className="case-editorial-intro">
          <CaseHeading id="motion-title" number="04" title={study.motion.title} stacked />
          <CaseCopy paragraphs={study.motion.paragraphs} />
        </div>
        <figure className="case-motion"><ProjectVideo src={lynkMotion} ariaLabel="LYNK motion feedback" shouldPlay loop /></figure>
      </section>

      <section className="case-section case-layout--technical" aria-labelledby="data-title">
        <CaseHeading id="data-title" number="05" title={study.data.title} stacked />
        <div className="case-feature-content">
          <CaseCopy paragraphs={study.data.paragraphs} />
          <div className="case-tech-meta" aria-label="Supabase, state, event data">
            <span>SUPABASE /</span><span>STATE /</span><span>EVENT DATA /</span>
          </div>
        </div>
      </section>

      <section className="case-section case-layout--text-led" aria-labelledby="challenge-title">
        <CaseHeading id="challenge-title" number="06" title={study.challenge.title} stacked />
        <div className="case-section__copy">
          {study.challenge.paragraphs.slice(0, -1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p className="case-pull-statement">{study.challenge.paragraphs.at(-1)}</p>
        </div>
      </section>

      <section className="case-section case-reflection case-reflection--lynk" aria-labelledby="reflection-title">
        <CaseHeading id="reflection-title" title={study.reflection.title} />
        <CaseCopy paragraphs={study.reflection.paragraphs} />
      </section>

      <Link className="next-project" to={projectPath(nextProject)}>
        <span>{copy.work.nextProject}</span>
        <strong>02 / {nextProject.name} →</strong>
      </Link>
    </main>
  )
}

function BluntCaseStudy({ copy, project }) {
  const study = project.caseStudy

  return (
    <main className="case-page case-page--blunt">
      <section className="case-hero" aria-labelledby="case-title">
        <Link className="back-link" to="/projects">← {copy.work.backToProjects}</Link>
        <div className="case-hero__heading">
          <div><p>{study.projectLabel}</p><p>BLUNT</p></div>
          <h1 id="case-title">BLUNT</h1>
          <p className="case-hero__intro">{study.intro}</p>
        </div>
        <dl className="case-meta">
          {study.metadata.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
        </dl>
        <figure className="case-hero__visual"><img src={bluntMain} alt="BLUNT shop interface" /></figure>
      </section>

      <section className="case-section case-layout--media-split case-layout--blunt-concept" aria-labelledby="blunt-concept-title">
        <div className="case-editorial-intro">
          <CaseHeading id="blunt-concept-title" number="01" title={study.concept.title} />
          <CaseCopy paragraphs={study.concept.paragraphs} />
        </div>
        <figure className="case-media case-media--blunt-main"><img src={bluntMain} alt="BLUNT shop interface" /></figure>
      </section>

      <section className="case-section blunt-data-study" aria-labelledby="blunt-data-title">
        <div className="blunt-data-study__intro">
          <CaseHeading id="blunt-data-title" number="02" title={study.productData.title} />
          <CaseCopy paragraphs={study.productData.paragraphs} />
        </div>
        <div className="blunt-data-study__visual">
          <p>PRODUCT DATA / JSON</p>
          <pre className="case-data-example"><code>{JSON.stringify(bluntProductData, null, 2)}</code></pre>
        </div>
      </section>

      <section className="case-section blunt-state-study" aria-labelledby="blunt-product-title">
        <div className="blunt-state-study__intro">
          <header className="case-section__heading">
            <p>03</p>
            <h2 id="blunt-product-title">{study.productInteraction.headingLines.map((line) => <span key={line}>{line}</span>)}</h2>
          </header>
          <CaseCopy paragraphs={study.productInteraction.paragraphs} />
        </div>
        <div className="case-product-states">
          <figure className="case-product-state case-product-state--default"><img src={bluntCard} alt="BLUNT product card default state" /><figcaption>DEFAULT</figcaption></figure>
          <figure className="case-product-state case-product-state--hover"><img src={bluntCardHover} alt="BLUNT product card hover state" /><figcaption>HOVER</figcaption></figure>
        </div>
      </section>

      <section className="case-section blunt-footer-study" aria-labelledby="blunt-footer-title">
        <div className="blunt-footer-study__intro">
          <CaseHeading id="blunt-footer-title" number="04" title={study.footerSection.title} />
          <CaseCopy paragraphs={study.footerSection.paragraphs} />
        </div>
        <figure className="case-media case-media--blunt-footer"><img src={bluntFooter} alt="BLUNT footer interface" /></figure>
      </section>

      <section className="case-section case-reflection case-reflection--blunt" aria-labelledby="blunt-reflection-title">
        <p className="case-closing-label">{study.reflection.label}</p>
        <CaseHeading id="blunt-reflection-title" title={study.reflection.title} />
        <div className="case-section__copy">
          <p className="case-pull-statement">{study.reflection.paragraphs[0]}</p>
          <div className="case-reflection__columns">
            {study.reflection.paragraphs.slice(1, 3).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <p className="case-reflection__final">{study.reflection.paragraphs[3]}</p>
        </div>
      </section>

      <Link className="next-project next-project--previous" to="/projects/lynk">
        <span>{study.previousProject}</span>
        <strong>01 / LYNK ←</strong>
      </Link>
    </main>
  )
}

function GenericProjectPage({ copy, project, nextProject }) {
  return (
    <main className="project-page">
      <div className="project-gallery">
        {project.visuals.map((visual, index) => (
          <figure className="detail-visual" key={visual}>
            <div aria-label={`${copy.accessibility.projectImage} ${index + 1}: ${visual}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{project.name}</strong>
            </div>
            <figcaption>{String(index + 1).padStart(2, '0')} / {visual}</figcaption>
          </figure>
        ))}
      </div>

      <aside className="project-info">
        <Link className="back-link" to="/projects">← {copy.work.backToProjects}</Link>
        <p className="detail-number">{project.number}</p>
        <h1>{project.name}</h1>
        <p className="detail-type">{project.type}</p>
        <p className="detail-intro">{project.description}</p>
        <dl className="detail-meta">
          <div><dt>{copy.work.role}</dt><dd>{project.role}</dd></div>
          <div><dt>{copy.work.myWork}</dt><dd><ul>{project.work.map((item) => <li key={item}>{item}</li>)}</ul></dd></div>
          <div><dt>{copy.work.tools}</dt><dd><ul>{project.detailTools.map((tool) => <li key={tool}>{tool}</li>)}</ul></dd></div>
          {project.year && <div><dt>{copy.work.year}</dt><dd>{project.year}</dd></div>}
        </dl>
      </aside>

      <Link className="next-project" to={projectPath(nextProject)}>
        <span>{copy.work.nextProject} →</span>
        <strong>{nextProject.number} {nextProject.name}</strong>
      </Link>
    </main>
  )
}

function ProjectPage({ copy }) {
  const { slug } = useParams()
  const project = copy.work.projects.find((item) => item.slug === slug || (slug === 'blunt' && item.slug === 'fashion'))

  if (!project) return <Navigate to="/" replace />

  const projectIndex = copy.work.projects.findIndex((item) => item.slug === slug)
  const nextProject = copy.work.projects[(projectIndex + 1) % copy.work.projects.length]

  if (project.slug === 'lynk') return <LynkCaseStudy copy={copy} project={project} nextProject={nextProject} />
  if (project.slug === 'fashion') return <BluntCaseStudy copy={copy} project={project} />
  return <GenericProjectPage copy={copy} project={project} nextProject={nextProject} />
}

export default ProjectPage
