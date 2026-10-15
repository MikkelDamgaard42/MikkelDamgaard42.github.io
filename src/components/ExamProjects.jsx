import { Link } from 'react-router-dom'
import './ExamProjects.css'

export default function ExamProjects({ copy }) {
  return (
    <div className="exam-projects">
      {copy.work.projects.filter((project) => project.cover).map((project) => (
        <article key={project.slug}>
          <Link className="exam-projects__visual" to={`/projects/${project.slug}`} aria-label={`${copy.work.viewCase}: ${project.name}`}>
            <img src={project.cover} alt={project.coverAlt} loading="lazy" />
          </Link>
          <p className="exam-projects__meta">{project.indexType}</p>
          <h3><Link to={`/projects/${project.slug}`}>{project.name}</Link></h3>
          <p>{project.description}</p>
          <Link className="project-link" to={`/projects/${project.slug}`}>{copy.work.viewCase} →</Link>
        </article>
      ))}
    </div>
  )
}
