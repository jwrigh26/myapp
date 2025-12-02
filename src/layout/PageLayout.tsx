import { PropsWithChildren, ReactNode } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ColumnLayout from './ColumnLayout';

interface PageLayoutProps extends PropsWithChildren<{}> {
  id?: string;
  className?: string;
}

interface PageWithSidePanelProps extends PageLayoutProps {
  sidePanelOpen: boolean;
  sidePanelContent?: ReactNode;
}

const PageLayout = ({ children, id, className }: PageLayoutProps) => {
  return (
    <ColumnLayout id={id} className={className}>
      {children}
    </ColumnLayout>
  );
};

export default PageLayout;

// ### Styled Components
const PanelLayoutRoot = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 0px',
  alignItems: 'stretch',
  position: 'relative',
  overflow: 'hidden',
  minHeight: '100%',
  zIndex: theme.zIndex.drawer + 1,
  transition: 'grid-template-columns 250ms ease-in-out',

  '&[data-panel-open="true"]': {
    gridTemplateColumns: '1fr min(40vw, 750px)',
  },
  [theme.breakpoints.down('md')]: {
    '&[data-panel-open="true"]': {
      gridTemplateColumns: '1fr min(25vw, 456px)',
    },
  },

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',

    '&[data-panel-open="true"]': {
      gridTemplateColumns: '1fr',
    },
  },
}));

const MainContent = styled(Box)({
  minWidth: 0,
  overflow: 'auto',
});

const SidePanel = styled(Box)(({ theme }) => ({
  borderLeft: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  overflowY: 'auto',
  overflowX: 'hidden',
  minWidth: 0,

  // Mobile: full width overlay (fixed)
  [theme.breakpoints.down('md')]: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '100vw',
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: theme.shadows[16],
    transform: 'translateX(100%)',
    transition: 'transform 250ms ease-in-out',

    '&[data-panel-open="true"]': {
      transform: 'translateX(0)',
    },
  },
}));

export const PageWithSidePanel = ({
  className,
  children,
  id,
  sidePanelOpen,
  sidePanelContent,
}: PageWithSidePanelProps) => {
  return (
    <PanelLayoutRoot id="panel-layout-root" data-panel-open={sidePanelOpen}>
      <MainContent>
        <ColumnLayout id={id} className={className}>
          {children}
        </ColumnLayout>
      </MainContent>

      <SidePanel id="side-panel" data-panel-open={sidePanelOpen}>
        {sidePanelContent}
      </SidePanel>
    </PanelLayoutRoot>
  );
};
