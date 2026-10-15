import { Link } from 'react-router-dom'
import datamodelEvidence from '../assets/case1/datamodel-foer-efter.svg'
import deploymentEvidence from '../assets/case1/deployment-test-offentlig.png'
import './MellemrumCasePage.css'

function MellemrumSection({ id, number, title, caption, children }) {
  return (
    <section className="mellemrum-case__section" aria-labelledby={id}>
      <header className="mellemrum-case__heading">
        <p>{number}</p>
        <h2 id={id}>{title}</h2>
      </header>
      <div className="mellemrum-case__content">
        {children}
        <p className="mellemrum-case__caption">{caption}</p>
      </div>
    </section>
  )
}

function MellemrumCasePage({ copy, project }) {
  const study = project.caseStudy

  return (
    <main className="case-page mellemrum-case">
      <section className="case-hero" aria-labelledby="mellemrum-case-title">
        <Link className="back-link" to="/projects">← {copy.work.backToProjects}</Link>
        <div className="case-hero__heading">
          <div><p>{study.projectLabel}</p><p>MELLEMRUM</p></div>
          <h1 id="mellemrum-case-title">Mellemrum</h1>
          <p className="case-hero__intro">{study.intro}</p>
        </div>
        <dl className="case-meta">
          {study.metadata.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
        </dl>
        <p className="mellemrum-case__links">
          <a href="https://mikkeldamgaard42.github.io/case1/">Løsning ↗</a>
          <a href="https://github.com/MikkelDamgaard42/case1">Repository ↗</a>
        </p>
      </section>

      <MellemrumSection id="mellemrum-challenge" number="01" title={study.challenge.title} caption={study.challenge.caption}>
        <p className="mellemrum-case__working-title">Prioritering af en eksisterende React-prototype</p>
      </MellemrumSection>

      <MellemrumSection id="mellemrum-data-model" number="02" title={study.dataModel.title} caption={study.dataModel.caption}>
        <figure className="mellemrum-case__figure">
          <img src={datamodelEvidence} alt="Dansk diagram over datamodellen før og efter normalisering af venues, events og registrations" />
        </figure>
      </MellemrumSection>

      <MellemrumSection id="mellemrum-registration" number="03" title={study.registration.title} caption={study.registration.caption}>
        <figure className="mellemrum-case__figure mellemrum-case__figure--screenshot">
          <img src={deploymentEvidence} alt="Screenshot fra en offentlig deployment-test af Mellemrum" />
        </figure>
      </MellemrumSection>

      <MellemrumSection id="mellemrum-robustness" number="04" title={study.robustness.title} caption={study.robustness.caption}>
        <p className="mellemrum-case__working-title">Loading / error / empty / not-found</p>
      </MellemrumSection>

      <MellemrumSection id="mellemrum-reflection" number="05" title={study.reflection.title} caption={study.reflection.caption}>
        <p className="mellemrum-case__working-title">Valg, fravalg og næste verifikation</p>
      </MellemrumSection>

      <Link className="next-project next-project--previous" to="/projects">
        <span>{copy.work.backToProjects}</span>
        <strong>{copy.work.projectsTitle} ←</strong>
      </Link>
    </main>
  )
}

export default MellemrumCasePage
