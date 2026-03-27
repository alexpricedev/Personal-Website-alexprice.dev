import { Layout } from "@server/components/layouts";
import type { Project } from "@server/services/projects";

type ProjectsProps = {
  projects: Project[];
};

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8M12 3a14.25 14.25 0 0 1 4 9 14.25 14.25 0 0 1-4 9 14.25 14.25 0 0 1-4-9 14.25 14.25 0 0 1 4-9Z"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
  </svg>
);

export const Projects = ({ projects }: ProjectsProps) => (
  <Layout
    title="Projects"
    description="Things I've built recently."
    name="projects"
    path="/projects"
  >
    <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-28 pb-20">
      <header className="mb-14 max-w-[700px]">
        <h1 className="font-display text-[40px] leading-[1.15] tracking-[-0.02em] mb-4">
          Projects
        </h1>
        <p className="text-text-secondary leading-[1.7]">
          Things I've built recently.
        </p>
      </header>

      {projects.length === 0 ? (
        <div className="text-center py-16 text-text-muted">
          <p>Projects coming soon.</p>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          data-animate="stagger"
        >
          {projects.map((project) => (
            <div
              key={project.slug}
              className="bg-surface-1 border border-border rounded-xl overflow-hidden hover:border-border-hover transition-colors duration-200"
            >
              {project.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-7">
                <h2 className="font-display text-[22px] leading-[1.2] mb-2">
                  {project.title}
                </h2>
                <p className="text-text-secondary text-sm leading-[1.65] mb-4">
                  {project.description}
                </p>

                {project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-text-secondary hover:text-accent text-sm transition-colors duration-200"
                    >
                      <GlobeIcon />
                      <span>Live</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-text-secondary hover:text-accent text-sm transition-colors duration-200"
                    >
                      <GitHubIcon />
                      <span>Source</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </Layout>
);
