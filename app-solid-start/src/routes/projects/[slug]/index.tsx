import { useParams } from '@solidjs/router';
import { Show } from 'solid-js';
import ProjectDetailPage from '~/components/projects/ProjectDetailPage';
import JaysonApp from '~/components/apps/jayson/JaysonApp';
import { getProjectBySlug } from '~/data/projects';

export default function ProjectSlugRoute() {
  const params = useParams<{ slug: string }>();
  const project = () => getProjectBySlug(params.slug);

  return (
    <Show
      when={project()}
      fallback={
        <div class="p-8 text-center text-gray-600">
          <p>Project not found.</p>
        </div>
      }
    >
      {(proj) => (
        <ProjectDetailPage project={proj()}>
          {proj().slug === 'jayson' ? (
            <div class="p-4 md:p-6">
              <JaysonApp hideHero />
            </div>
          ) : (
            <div class="p-6 text-center text-gray-600">
              <p>This project is {proj().status.replace('-', ' ')}. Check back soon!</p>
            </div>
          )}
        </ProjectDetailPage>
      )}
    </Show>
  );
}
