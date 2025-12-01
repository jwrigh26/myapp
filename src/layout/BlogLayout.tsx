import { PropsWithChildren } from 'react';
import ColumnLayout from './ColumnLayout';

interface BlogLayoutProps extends PropsWithChildren<{}> {
  id?: string;
  className?: string;
}

const BlogLayout = ({ children, id, className }: BlogLayoutProps) => {
  return (
    <ColumnLayout id={id} className={className}>
      {children}
    </ColumnLayout>
  );
};

export default BlogLayout;
