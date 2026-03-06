import { redirect } from '@solidjs/router';

export const route = {
  load: ({ params }: { params: { slug: string } }) => {
    throw redirect(`/projects/${params.slug}`);
  },
};

export default function AppsSlugRedirect() {
  return null;
}
