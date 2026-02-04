import { PropsWithChildren, ReactNode, useRef } from 'react';
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
const PanelLayoutRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'panelWidth',
})<{ panelWidth?: number }>(({ theme, panelWidth = 0 }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 0px',
  alignItems: 'stretch',
  position: 'relative',
  minHeight: '100%',
  zIndex: theme.zIndex.drawer + 1,
  transition: 'grid-template-columns 250ms ease-in-out',

  '&[data-panel-open="true"]': {
    gridTemplateColumns: `1fr ${panelWidth}px`,
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
});

const SidePanel = styled(Box)(({ theme }) => {
  const toolbarMixins =
    theme.mixins.toolbar as Record<string, { minHeight?: number }> & {
      minHeight?: number;
    };
  const toolbarMinHeight = toolbarMixins.minHeight ?? 0;
  const toolbarMinHeightUpSm =
    toolbarMixins[theme.breakpoints.up('sm')]?.minHeight ??
    toolbarMinHeight;

  return {
  borderLeft: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  overflowY: 'auto',
  overflowX: 'hidden',
  minWidth: 0,
  position: 'sticky',
  top: toolbarMinHeight,
  alignSelf: 'start',
  maxHeight: `calc(100svh - ${toolbarMinHeight}px)`,

  [theme.breakpoints.up('sm')]: {
    top: toolbarMinHeightUpSm,
    maxHeight: `calc(100svh - ${toolbarMinHeightUpSm}px)`,
  },

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
};
});

export const PageWithSidePanel = ({
  className,
  children,
  id,
  sidePanelOpen,
  sidePanelContent,
}: PageWithSidePanelProps) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const offsetWidth = mainRef.current?.offsetWidth || 0;
  const sidePanelWidth = sidePanelOpen
    ? Math.min(Math.max(offsetWidth * 0.5, 300), 750)
    : 0;

  return (
    <PanelLayoutRoot
      id="panel-layout-root"
      data-panel-open={sidePanelOpen}
      panelWidth={sidePanelWidth}
    >
      <MainContent ref={mainRef}>
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
