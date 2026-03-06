import { type Component, For } from 'solid-js';
import { SiteLayout } from '~/components/layout';
import NavCardSection from '~/components/homepage/NavCardSection';
import { PROJECTS } from '~/data/projects';
import { projectToNavCardProps } from '~/utils/projectToNavCard';
import { getPageStyles, PageName } from '~/styles/engine';

export default function ProjectsPage() {
  const styles = getPageStyles(PageName.PROJECTS);
  const navCardStylesSet = styles.sections.content.navCardSection!.navCardStylesSet;
  const navCardPropsSet = PROJECTS.map((p, i) =>
    projectToNavCardProps(p, i, navCardStylesSet, { showBadge: true })
  );

  return (
    <SiteLayout title="Projects">
      <section class="projects-hero">
        <h1>Projects</h1>
        <p>Tools and programs I've built. Each project has its own pages exploring the application and demoing the project.</p>
      </section>

      <section classList={styles.sections.content.container}>
        <NavCardSection
          navAreaStyles={styles.sections.content.navCardSection!.navAreaStyles}
          navCardPropsSet={navCardPropsSet}
        />
      </section>
    </SiteLayout>
  );
}
