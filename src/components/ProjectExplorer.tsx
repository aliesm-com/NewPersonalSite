import { useState } from 'react';
type Project = {
  id: string;
  title: string;
  summary: string;
  category: string;
  image: string;
  tags: string[];
};
export default function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState('All work');
  const categories = ['All work', ...new Set(projects.map((p) => p.category))];
  const filtered = projects.filter((p) => category === 'All work' || p.category === category);
  return (
    <div className="project-explorer">
      <div className="filters" role="group" aria-label="Filter projects">
        {categories.map((item) => (
          <button
            type="button"
            key={item}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {filtered.length} projects shown
      </p>
      <div className="project-grid">
        {filtered.map((project) => (
          <a className="project-card" href={`/projects/${project.id}/`} key={project.id}>
            <div className="image-frame">
              <picture>
                <source
                  type="image/avif"
                  srcSet={`/images/${project.image}-640.avif 640w, /images/${project.image}-1024.avif 1024w`}
                  sizes="(max-width: 700px) 92vw, 32vw"
                />
                <img
                  src={`/images/${project.image}-640.webp`}
                  width="1024"
                  height="576"
                  alt="Cinematic engineering workspace"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <span className="image-category">{project.category}</span>
            </div>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
            <div className="tags">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <span className="text-link">View project</span>
          </a>
        ))}
      </div>
    </div>
  );
}
