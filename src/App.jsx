import './projectTypography.css'
import { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import ProjectCard from './components/ProjectCard.jsx'
import SelectedProjects from './components/SelectedProjects.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import ExamCasePage from './pages/ExamCasePage.jsx'
import ExamProjects from './components/ExamProjects.jsx'
import { translations } from './translations.js'
import lynkMain from './assets/lynk-main.png'
import bluntMain from './assets/blunt-main.png'
import mikkelAbout from './assets/mikkel-about.png'

const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem('portfolio-language')
  return savedLanguage === 'en' ? 'en' : 'da'
}

function LanguageToggle({ language, setLanguage, label }) {
  return (
    <div className="language-toggle" role="group" aria-label={label}>
      {['da', 'en'].map((option) => (
        <button
          key={option}
          type="button"
          className={language === option ? 'is-active' : ''}
          aria-pressed={language === option}
          onClick={() => setLanguage(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

function Header({ copy, language, setLanguage }) {
  return (
    <header className="site-header">
      <Link className="logo" to="/" aria-label={copy.accessibility.home}>
        {copy.logo}<span>.</span>
      </Link>
      <div className="header-actions">
        <nav aria-label={copy.accessibility.navigation}>
          <Link to="/projects">{copy.navigation.work}</Link>
          <Link to="/about">{copy.navigation.about}</Link>
          <Link to="/contact">{copy.navigation.contact}</Link>
        </nav>
        <LanguageToggle language={language} setLanguage={setLanguage} label={copy.accessibility.language} />
      </div>
    </header>
  )
}

function Hero({ copy }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__eyebrow"><span className="status-dot" aria-hidden="true" />{copy.hero.location}</div>
      <h1 id="hero-title">{copy.nameLines.map((line) => <span key={line}>{line}</span>)}</h1>
      <p className="hero__disciplines">
        {copy.hero.disciplines.map((discipline, index) => (
          <span className="discipline" key={discipline}>{index > 0 && <i aria-hidden="true">·</i>}{discipline}</span>
        ))}
      </p>
      <p className="hero__intro">{copy.hero.intro}</p>
      <div className="button-row">
        <a className="button button--primary" href="#work">{copy.hero.workCta}<span aria-hidden="true">↘</span></a>
        <Link className="button button--secondary" to="/about">{copy.hero.aboutCta}</Link>
      </div>
      <a className="scroll-cue" href="#work">{copy.hero.scrollCue}</a>
    </section>
  )
}

function Work({ copy, title = copy.work.title, interactive = false }) {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="section-heading reveal"><p className="section-number">{copy.sectionNumbers[0]}</p><h2 id="work-title">{title}</h2></div>
      {interactive ? <><SelectedProjects copy={{ ...copy, work: { ...copy.work, projects: copy.work.projects.filter((project) => !project.cover) } }} /><ExamProjects copy={copy} /></> : <div className="projects">{copy.work.projects.map((project, index) => <ProjectCard key={project.name} project={project} labels={copy.work} accessibility={copy.accessibility} featured={index === 0} />)}</div>}
    </section>
  )
}

function AboutTeaser({ copy }) {
  return (
    <section className="section about-teaser" id="about-teaser" aria-labelledby="about-teaser-title">
      <div className="section-heading reveal"><p className="section-number">{copy.sectionNumbers[1]}</p><h2 id="about-teaser-title">{copy.about.title}</h2></div>
      <div className="about-teaser__content reveal">
        <p>{copy.about.teaser}</p>
        <Link className="project-link" to="/about">{copy.about.more} →</Link>
      </div>
    </section>
  )
}

function About({ copy }) {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="section-heading reveal"><p className="section-number">{copy.sectionNumbers[1]}</p><h2 id="about-title">{copy.about.title}</h2></div>
      <div className="about-grid reveal">
        <div className="about-copy">{copy.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <div className="traits">
          <h3>{copy.about.workingStyle}</h3>
          <dl>{copy.about.traits.map((trait, index) => <div key={trait.name}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><dt>{trait.name}</dt><dd>{trait.description}</dd></div></div>)}</dl>
        </div>
      </div>
    </section>
  )
}

function Skills({ copy }) {
  return (
    <section className="section" aria-labelledby="skills-title">
      <div className="section-heading reveal"><p className="section-number">{copy.sectionNumbers[2]}</p><h2 id="skills-title">{copy.skills.title}</h2></div>
      <div className="skill-grid reveal">
        {copy.skills.groups.map((group) => <div className="skill-group" key={group.title}><h3>{group.title}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>)}
      </div>
      <p className="ai-note reveal">{copy.skills.aiNote}</p>
    </section>
  )
}

function Experience({ copy }) {
  return (
    <section className="section" aria-labelledby="experience-title">
      <div className="section-heading reveal"><p className="section-number">{copy.sectionNumbers[3]}</p><h2 id="experience-title">{copy.experience.title}</h2></div>
      <div className="timeline reveal">
        {copy.experience.entries.map((entry) => (
          <article key={`${entry.place}-${entry.date}`}>
            <p className="timeline__date">{entry.date}</p>
            <div><h3>{entry.place}</h3><p className="timeline__role">{entry.role}</p>{entry.description && <p>{entry.description}</p>}</div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Personal({ copy }) {
  return (
    <aside className="personal reveal" aria-labelledby="personal-title">
      <figure className="personal__portrait"><img src={mikkelAbout} alt="Mikkel Damgaard Nielsen" /></figure>
      <div className="personal__content">
        <h2 id="personal-title">{copy.personal.title}</h2>
        <ol>
          {copy.personal.details.map((detail, index) => (
            <li key={detail.label}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{detail.label}</h3><p>{detail.text}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  )
}

function Contact({ copy }) {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <p className="section-number">{copy.sectionNumbers[4]}</p>
      <h2 id="contact-title">{copy.contact.title}</h2>
      <p className="contact__intro">{copy.contact.intro}</p>
      <address>
        <div><span>{copy.contact.email}</span><a href={`mailto:${copy.email}`}>{copy.email}</a></div>
        <div><span>{copy.contact.phone}</span><a href={`tel:+45${copy.phone}`}>{copy.phone}</a></div>
        <div><span>{copy.contact.github}</span><a href="https://github.com/MikkelDamgaard42">{copy.github} ↗</a></div>
      </address>
    </section>
  )
}

function HomePage({ copy }) {
  return <main><Hero copy={copy} /><Work copy={copy} interactive /><AboutTeaser copy={copy} /><Contact copy={copy} /></main>
}

function ProjectsPage({ copy }) {
  const projectAssets = { lynk: lynkMain, fashion: bluntMain }

  return (
    <main className="route-page projects-index-page">
      <section className="projects-index" aria-labelledby="projects-index-title">
        <header className="projects-index__header reveal">
          <p className="section-number">01</p>
          <div>
            <h1 id="projects-index-title">{copy.work.projectsTitle}</h1>
            <p>{copy.work.projectsIntro}</p>
          </div>
        </header>

        <div className="projects-index__list">
          {copy.work.projects.map((project) => {
            const path = `/projects/${project.slug === 'fashion' ? 'blunt' : project.slug}`
            const number = project.number

            return (
              <article className={`index-project index-project--${project.slug}${project.cover ? ` index-project--exam index-project--${project.indexLayout}` : ''}`} key={project.name}>
                <div className="index-project__layout">
                  <div className="index-project__info">
                    <p className="index-project__meta">{number} / {project.name}</p>
                    <p className="index-project__type">{project.indexType}</p>
                    <h2><Link className="index-project__title-link" to={path}>{project.indexTitle ?? project.name}</Link></h2>
                    {project.indexByline && <p className="index-project__byline">{project.indexByline}</p>}
                    <p className="index-project__description">{project.indexDescription}</p>
                    <Link className="index-project__cta" to={path}>{copy.work.viewCase} <i aria-hidden="true">→</i></Link>
                  </div>
                  <Link className="index-project__visual" to={path} aria-label={`${copy.work.viewCase}: ${project.name}`}>
                    <img src={project.cover ?? projectAssets[project.slug]} alt={project.coverAlt ?? `${project.name} interface`} loading="lazy" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        <Link className="projects-index__next" to="/about">{copy.about.title} →</Link>
      </section>
    </main>
  )
}

function AboutPage({ copy }) {
  return <main className="route-page"><About copy={copy} /><Skills copy={copy} /><Experience copy={copy} /><Personal copy={copy} /></main>
}

function ContactPage({ copy }) {
  const page = copy.contact.page
  const formattedPhone = `+45 ${copy.phone.match(/.{1,2}/g).join(' ')}`

  return (
    <main className="route-page contact-page">
      <section className="contact-page__content" aria-labelledby="contact-page-title">
        <header className="contact-page__header reveal">
          <p className="section-number">05</p>
          <div>
            <h1 id="contact-page-title">{page.heading.map((line) => <span key={line}>{line}</span>)}</h1>
            <div className="contact-page__intro">{page.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>
        </header>

        <address className="contact-index reveal">
          <div className="contact-index__row">
            <p>{page.labels.email}</p>
            <a href={`mailto:${copy.email}`}>{copy.email}<span aria-hidden="true">↗</span></a>
          </div>
          <div className="contact-index__row">
            <p>{page.labels.phone}</p>
            <a href={`tel:+45${copy.phone}`}>{formattedPhone}<span aria-hidden="true">↗</span></a>
          </div>
          <div className="contact-index__row">
            <p>{page.labels.github}</p>
            <a href="https://github.com/MikkelDamgaard42" target="_blank" rel="noreferrer">MikkelDamgaard42<span aria-hidden="true">↗</span></a>
          </div>
          <div className="contact-index__row">
            <p>{page.labels.location}</p>
            <strong>Aarhus</strong>
          </div>
        </address>

        <p className="contact-page__closing reveal">{page.closing.map((line) => <span key={line}>{line}</span>)}</p>
      </section>
    </main>
  )
}

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView())
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

function App() {
  const [language, setLanguage] = useState(getInitialLanguage)
  const copy = translations[language]

  useEffect(() => {
    localStorage.setItem('portfolio-language', language)
    document.documentElement.lang = language
  }, [language])

  return (
    <>
      <Header copy={copy} language={language} setLanguage={setLanguage} />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage copy={copy} />} />
        <Route path="/projects" element={<ProjectsPage copy={copy} />} />
        {['mellemrum', 'vuuh', 'larchive'].map((slug) => <Route key={slug} path={`/projects/${slug}`} element={<ExamCasePage key={slug} slug={slug} language={language} copy={copy} />} />)}
        <Route path="/projects/:slug" element={<ProjectPage copy={copy} />} />
        <Route path="/about" element={<AboutPage copy={copy} />} />
        <Route path="/contact" element={<ContactPage copy={copy} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer>{copy.footer}</footer>
    </>
  )
}

export default App
