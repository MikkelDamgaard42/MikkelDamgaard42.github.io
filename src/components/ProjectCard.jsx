import { Link } from 'react-router-dom'

function ProjectCard({ project, labels, accessibility, featured }) {
  const projectPath = `/projects/${project.slug === 'fashion' ? 'blunt' : project.slug}`
  const movePointer = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
  }

  return (
    <article className={`project-card reveal${featured ? ' project-card--featured' : ''}`}>
      {/* Replace this placeholder with a project cover image when the asset is ready. */}
      <Link
        className="project-visual"
        to={projectPath}
        aria-label={`${accessibility.inspectProject}: ${project.name}. ${accessibility.projectVisual} ${project.name}`}
        onPointerMove={movePointer}
      >
        <span className="project-visual__name">{project.name}</span>
        <p className="project-visual__placeholder">{labels.screenshotPlaceholder}</p>
        <span className="project-pointer" aria-hidden="true">{labels.viewProject}</span>
      </Link>

      <div className="project-catalogue">
        <p className="project-index">{project.number}</p>
        <div className="project-title">
          <h3><Link to={projectPath}>{project.name}</Link></h3>
          <p>{project.type}</p>
        </div>
        <p className="project-description">{project.description}</p>
        <p className="project-tools">{project.tags.join(' · ')}</p>
        <Link className="project-link" to={projectPath}>{labels.viewProject} →</Link>
      </div>
    </article>
  )
}

export default ProjectCard
