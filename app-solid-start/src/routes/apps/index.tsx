import { redirect } from '@solidjs/router';

export const route = {
  load: () => {
    throw redirect('/projects');
  },
};

export default function AppsRedirect() {
  return null;
}
