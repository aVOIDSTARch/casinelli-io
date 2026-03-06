import { type Component } from 'solid-js';
import { A } from '@solidjs/router';

export interface HomeTitleProps {
  title: string;
  tagline?: string;
  stylesKV?: { [k: string]: boolean };
}

const HomeTitle: Component<HomeTitleProps> = (props) => {
  return (
    <div class="flex flex-col">
      <h1 classList={props.stylesKV}>{props.title}</h1>
      {props.tagline && (
        <p class="home-tagline mt-2 text-lg text-gray-600 font-light">
          {props.tagline}
        </p>
      )}
      <div class="home-ctas mt-4 flex flex-wrap gap-3">
        <A
          href="/projects"
          class="px-4 py-2 text-sm font-medium rounded border border-gray-400 hover:bg-gray-100 transition-colors"
        >
          View Projects
        </A>
        <A
          href="/blog"
          class="px-4 py-2 text-sm font-medium rounded border border-gray-400 hover:bg-gray-100 transition-colors"
        >
          Read Blog
        </A>
      </div>
    </div>
  );
};

export default HomeTitle;
