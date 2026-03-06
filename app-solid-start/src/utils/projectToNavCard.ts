/**
 * Converts ProjectMeta to NavCardProps
 * Reduces duplication between homepage, projects page, and test data
 */

import type { NavCardProps, NavCardStylesSet, ButtonHoverStyles } from '~/components/homepage/NavCard';
import type { ProjectMeta } from '~/data/projects';
import { getProjectPath } from '~/data/projects';

const STATUS_LABELS: Record<ProjectMeta['status'], string> = {
  live: 'Live',
  'in-development': 'In development',
  'coming-soon': 'Coming soon',
};

export function projectToNavCardProps(
  project: ProjectMeta,
  index: number,
  navCardStylesSet: NavCardStylesSet,
  options?: { showBadge?: boolean; badgeOnlyLive?: boolean }
): NavCardProps {
  const buttonHoverStyles: ButtonHoverStyles = {
    cardHoverBg: project.cardHoverBg,
    cardHoverBorder: project.cardHoverBorder,
    hoverBg: project.hoverBg,
    hoverColor: project.hoverColor,
    hoverBorder: project.hoverBorder,
  };

  return {
    key: index,
    buttonText: project.name,
    paraText: project.description,
    url: getProjectPath(project.slug),
    navCardStylesSet,
    imageUrl: project.imageUrl,
    imageAlt: project.imageAlt,
    accentColor: project.accentColor,
    cardHoverColor: project.accentColor,
    buttonHoverStyles,
    ...((options?.showBadge === true || (options?.badgeOnlyLive && project.status === 'live')) && {
      badge: STATUS_LABELS[project.status],
      badgeVariant: project.status,
    }),
  };
}
