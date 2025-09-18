import {
  FeatureDrawer,
  type FeatureCategory,
} from '@/components/FeatureDrawer';
import { mdiAccountGroup, mdiReact, mdiPencilRuler } from '@mdi/js';

const blogCategories: FeatureCategory[] = [
  {
    id: 'frontend-design',
    title: 'Frontend Design',
    icon: mdiPencilRuler,
    path: '/blog/posts/frontend-design',
  },
  {
    id: 'react',
    title: 'React',
    icon: mdiReact,
    path: '/blog/posts/react',
  },
  {
    id: 'soft-skills',
    title: 'Soft Skills',
    icon: mdiAccountGroup,
    path: '/blog/posts/soft-skills',
  },
];

export function BlogDrawer() {
  return (
    <FeatureDrawer
      categories={blogCategories}
      drawerKey="blog-drawer"
      featureName="blog"
    />
  );
}
