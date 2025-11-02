import {
  FeatureDrawer,
  type FeatureCategory,
} from '@/components/FeatureDrawer';
import { mdiAccountGroup, mdiReact, mdiPencilRuler, mdiPost } from '@mdi/js';

const blogCategories: FeatureCategory[] = [
  {
    id: 'frontend-design',
    title: 'Frontend Design',
    icon: mdiPencilRuler,
    path: '/blog/frontend-design',
  },
  {
    id: 'react',
    title: 'React',
    icon: mdiReact,
    path: '/blog/react',
  },
  {
    id: 'soft-skills',
    title: 'Soft Skills',
    icon: mdiAccountGroup,
    path: '/blog/soft-skills',
  },
];

export function BlogDrawer() {
  return (
    <FeatureDrawer
      categories={blogCategories}
      drawerKey="blog-drawer"
      featureName="blog"
      headerIcon={mdiPost}
    />
  );
}
