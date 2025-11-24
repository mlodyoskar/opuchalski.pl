import React from 'react';

interface ProjectSectionProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  repo?: string;
  image?: string; // Placeholder for future image support
  align?: 'left' | 'right';
  index: number;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  title,
  description,
  tags,
  link,
  repo,
  align = 'left',
  index,
}) => {
  const isLeft = align === 'left';

  return (
    <section className="flex min-h-[80vh] items-center border-b border-gray-800 py-20 last:border-0">
      <div
        className={`container mx-auto flex flex-col items-center gap-12 px-4 lg:flex-row ${
          isLeft ? '' : 'lg:flex-row-reverse'
        }`}
      >
        {/* Text Content */}
        <div className="flex-1 space-y-8">
          <div className="flex items-center space-x-4">
            <span className="font-mono text-sm text-gray-500">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="h-px w-12 bg-gray-700"></div>
          </div>

          <h2 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
            {title}
          </h2>

          <p className="max-w-xl text-xl leading-relaxed text-gray-300">
            {description}
          </p>

          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-white hover:text-gray-900"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6 pt-4">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center text-lg font-semibold text-white transition-opacity hover:opacity-70"
                aria-label={`Live Demo for ${title} (opens in new tab)`}
              >
                Live Demo
                <svg
                  className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            )}
            {repo && (
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-gray-400 transition-colors hover:text-white"
                aria-label={`View Code for ${title} (opens in new tab)`}
              >
                View Code
              </a>
            )}
          </div>
        </div>

        {/* Visual Content (Placeholder for now, can be replaced with Image later) */}
        <div className="w-full flex-1">
          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-800">
            <div className="absolute inset-0 flex items-center justify-center text-gray-700">
              {/* Abstract geometric shape placeholder */}
              <svg
                className="h-32 w-32 opacity-20"
                viewBox="0 0 100 100"
                fill="currentColor"
              >
                <rect x="20" y="20" width="60" height="60" rx="8" />
                <circle cx="70" cy="30" r="10" className="text-gray-600" />
              </svg>
            </div>
            {/* Overlay for hover effect */}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-white/5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
