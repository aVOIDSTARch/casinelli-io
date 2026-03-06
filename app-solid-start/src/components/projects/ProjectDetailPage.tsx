import { type Component, type JSX, Show } from 'solid-js';
import { A } from '@solidjs/router';
import { SiteLayout } from '~/components/layout';
import type { ProjectMeta, ProjectStatus } from '~/data/projects';

const STATUS_LABELS: Record<ProjectStatus, string> = {
  live: 'Live',
  'in-development': 'In development',
  'coming-soon': 'Coming soon',
};

const STATUS_CLASS: Record<ProjectStatus, string> = {
  live: 'project-status-badge project-status-live',
  'in-development': 'project-status-badge project-status-in-development',
  'coming-soon': 'project-status-badge project-status-coming-soon',
};

export interface ProjectDetailPageProps {
  project: ProjectMeta;
  children?: JSX.Element;
}

const ProjectDetailPage: Component<ProjectDetailPageProps> = (props) => {
  return (
    <SiteLayout fullWidth>
      <div class="project-detail-hero">
        <h1>{props.project.name}</h1>
        <p>{props.project.description}</p>
        <span class={STATUS_CLASS[props.project.status]}>
          {STATUS_LABELS[props.project.status]}
        </span>
      </div>

      <div class="projects-content px-4 md:px-8 pb-12">
        {props.children}
      </div>

      <Show when={props.project.npmPackage || props.project.repoUrl || props.project.docsUrl}>
        <div class="px-4 md:px-8 pb-8 flex flex-wrap gap-4">
          <Show when={props.project.npmPackage}>
            <a
              href={`https://www.npmjs.com/package/${props.project.npmPackage}`}
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              npm: {props.project.npmPackage}
            </a>
          </Show>
          <Show when={props.project.repoUrl}>
            <a
              href={props.project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Repository
            </a>
          </Show>
          <Show when={props.project.docsUrl}>
            <a
              href={props.project.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Documentation
            </a>
          </Show>
        </div>
      </Show>
    </SiteLayout>
  );
};

export default ProjectDetailPage;
