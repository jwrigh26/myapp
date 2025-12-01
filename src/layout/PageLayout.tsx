import { PropsWithChildren } from 'react';
import ColumnLayout from './ColumnLayout';

interface PageLayoutProps extends PropsWithChildren<{}> {
  id?: string;
  className?: string;
}

const PageLayout = ({ children, id, className }: PageLayoutProps) => {
  return (
    <ColumnLayout id={id} className={className}>
      {children}
    </ColumnLayout>
  );
};

export default PageLayout;
