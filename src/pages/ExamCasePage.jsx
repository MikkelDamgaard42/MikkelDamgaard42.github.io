import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { cases, examImage } from '../examProjects.js'
import './ExamCasePage.css'

function InlineCopy({ text }) {
  return text.split(/(`[^`]+`)/g).map((part, index) => (
    part.startsWith('`') ? <code key={index}>{part.slice(1, -1)}</code> : part
  ))
}

function ExamCasePage({ slug, language, copy }) {
  const study = cases[slug][language]
  const heading = useRef(null)
  const caseNumber = Object.keys(cases).indexOf(slug) + 3

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${study.title} — Mikkel Damgaard Nielsen`
    heading.current?.focus({ preventScroll: true })
    return () => { document.title = previousTitle }
  }, [slug, study.title])

  return (
    <main className={`case-page exam-case exam-case--${slug}`}>
      <header className="exam-case__hero">
        <Link className="back-link" to="/projects">← {copy.work.backToProjects}</Link>
        <p className="exam-case__eyebrow">Case / {String(caseNumber).padStart(2, '0')}</p>
        <h1 ref={heading} tabIndex={-1} aria-label={slug === 'larchive' ? study.title : undefined}>
          {slug === 'larchive' ? <><span className="exam-case__brand-name">L’ARCHIVE</span><span className="exam-case__brand-byline">BY LA ROUGE</span></> : study.title}
        </h1>
        <p className="exam-case__intro">{study.subtitle}</p>
        <p className="exam-case__tags">{study.tags}</p>
        <nav className="exam-case__links" aria-label={language === 'da' ? 'Projektlinks' : 'Project links'}>
          {study.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}
        </nav>
      </header>
      {study.sections.map((section, index) => (
        <section className="exam-case__section" key={section.title} aria-labelledby={`case-section-${index}`}>
          <header><p className="exam-case__eyebrow">{String(index + 1).padStart(2, '0')}</p><h2 id={`case-section-${index}`}>{section.title}</h2></header>
          <div className="exam-case__body">
            {section.blocks.map((block, blockIndex) => {
              if (block.type === 'images') return (
                <div className={`exam-case__images exam-case__images--${block.images.length}`} key={blockIndex}>
                  {block.images.map((image) => (
                    <figure key={image.file}>
                      <a className={slug === 'mellemrum' && image.file === 'mellemrum/tilmelding-lokal-succes.png' ? 'exam-case__registration-preview' : undefined} href={examImage(image.file)} target="_blank" rel="noreferrer" aria-label={`${language === 'da' ? 'Åbn større billede' : 'Open larger image'}: ${image.alt}`}>
                        <img src={examImage(image.file)} alt={image.alt} loading="lazy" decoding="async" />
                      </a>
                    </figure>
                  ))}
                </div>
              )
              if (block.type === 'caption') return <p className="exam-case__caption" key={blockIndex}>{block.text}</p>
              return <p key={blockIndex}><InlineCopy text={block.text} /></p>
            })}
          </div>
        </section>
      ))}
      <Link className="exam-case__back" to="/projects">← {copy.work.backToProjects}</Link>
    </main>
  )
}

export default ExamCasePage
