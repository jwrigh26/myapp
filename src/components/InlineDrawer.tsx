import Icon from '@/components/Icon';
import { mdiChevronDown, mdiChevronRight, mdiClose, mdiMenu } from '@mdi/js';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useCallback, useEffect, useMemo, useState } from 'react';

// ################################################
// ### Types
// ################################################

export interface InlineDrawerItem {
  id: string;
  title: string;
  anchor?: string;
  level: 1 | 2 | 3;
  children?: InlineDrawerItem[];
}

export interface InlineDrawerProps {
  items: InlineDrawerItem[];
  title?: string;
  open?: boolean;
  onToggle?: () => void;
}

// ################################################
// ### Styled Components
// ################################################

const DesktopContainer = styled(Paper)(({ theme }) => ({
  position: 'sticky',
  top: theme.spacing(2),
  alignSelf: 'flex-start',
  width: 280,
  maxHeight: 'calc(100vh - 32px)',
  overflow: 'auto',
  padding: theme.spacing(2),
  flexShrink: 0,
  [theme.breakpoints.down('lg')]: {
    display: 'none', // Hide on smaller screens, use mobile version
  },
}));

const MobileToggleButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: theme.zIndex.speedDial,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'itemLevel' && prop !== 'active',
})<{ itemLevel: 1 | 2 | 3; active?: boolean }>(({ theme, itemLevel, active }) => ({
  paddingLeft: theme.spacing(itemLevel === 1 ? 2 : itemLevel === 2 ? 4 : 6),
  paddingRight: theme.spacing(1),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0.25, 1),
  backgroundColor: active ? theme.palette.action.selected : 'transparent',
  fontSize: itemLevel === 1 ? '0.95rem' : itemLevel === 2 ? '0.875rem' : '0.8rem',
  '&:hover': {
    backgroundColor: active
      ? theme.palette.action.selected
      : theme.palette.action.hover,
  },
  '& .MuiListItemText-primary': {
    fontSize: 'inherit',
    fontWeight: itemLevel === 1 ? 600 : itemLevel === 2 ? 500 : 400,
    color: itemLevel === 1 ? theme.palette.text.primary : 
           itemLevel === 2 ? theme.palette.text.secondary : 
           theme.palette.text.disabled,
  },
}));

// ################################################
// ### Main Component
// ################################################

export function InlineDrawer({ items, title = 'Contents', open: controlledOpen, onToggle }: InlineDrawerProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [internalOpen, setInternalOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activeAnchor, setActiveAnchor] = useState<string>('');

  // Use controlled open state if provided, otherwise use internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const handleToggle = onToggle || (() => setInternalOpen(!internalOpen));

  // Flatten items for easier anchor tracking
  const flatItems = useMemo(() => {
    const flatten = (items: InlineDrawerItem[]): InlineDrawerItem[] => {
      return items.reduce((acc, item) => {
        acc.push(item);
        if (item.children) {
          acc.push(...flatten(item.children));
        }
        return acc;
      }, [] as InlineDrawerItem[]);
    };
    return flatten(items);
  }, [items]);

  // Smooth scroll to anchor
  const scrollToAnchor = useCallback((anchor: string) => {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setActiveAnchor(anchor);
      // Close mobile drawer after navigation
      if (isMobile) {
        handleToggle();
      }
    }
  }, [isMobile, handleToggle]);

  // Track scroll position to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const anchorsWithElements = flatItems
        .filter(item => item.anchor)
        .map(item => ({
          id: item.anchor!,
          element: document.getElementById(item.anchor!),
        }))
        .filter(({ element }) => element !== null);

      // Find the currently visible section
      let currentAnchor = '';
      const scrollTop = window.scrollY;
      const offset = 100; // Offset for header

      for (const { id, element } of anchorsWithElements) {
        if (element && element.offsetTop - offset <= scrollTop + 50) {
          currentAnchor = id;
        }
      }

      setActiveAnchor(currentAnchor);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [flatItems]);

  // Toggle expanded state for items with children
  const toggleExpanded = useCallback((itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }, []);

  // Render navigation items recursively
  const renderItems = useCallback((items: InlineDrawerItem[]) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedItems.has(item.id);
      const isActive = item.anchor === activeAnchor;

      return (
        <Box key={item.id}>
          <ListItem disablePadding>
            <StyledListItemButton
              itemLevel={item.level}
              active={isActive}
              onClick={() => {
                if (hasChildren) {
                  toggleExpanded(item.id);
                }
                if (item.anchor) {
                  scrollToAnchor(item.anchor);
                }
              }}
            >
              <ListItemText primary={item.title} />
              {hasChildren && (
                <Icon
                  path={isExpanded ? mdiChevronDown : mdiChevronRight}
                  fontSize="small"
                />
              )}
            </StyledListItemButton>
          </ListItem>
          {hasChildren && (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <List disablePadding>
                {renderItems(item.children!)}
              </List>
            </Collapse>
          )}
        </Box>
      );
    });
  }, [expandedItems, activeAnchor, toggleExpanded, scrollToAnchor]);

  // Desktop version - inline sticky drawer
  if (!isMobile) {
    return (
      <DesktopContainer elevation={2}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
        <List disablePadding>
          {renderItems(items)}
        </List>
      </DesktopContainer>
    );
  }

  // Mobile version - overlay drawer
  return (
    <>
      <MobileToggleButton onClick={handleToggle} size="medium">
        <Icon path={isOpen ? mdiClose : mdiMenu} />
      </MobileToggleButton>
      
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={handleToggle}
        PaperProps={{
          sx: { width: 320 }
        }}
      >
        <DrawerHeader>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <IconButton onClick={handleToggle} size="small" sx={{ color: 'inherit' }}>
            <Icon path={mdiClose} />
          </IconButton>
        </DrawerHeader>
        
        <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
          <List disablePadding>
            {renderItems(items)}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

// ################################################
// ### Utility Functions
// ################################################

/**
 * Helper function to generate navigation items from page sections
 * This can be used to automatically generate drawer items from your content
 */
export function createNavigationItems(sections: Array<{
  id: string;
  title: string;
  level: 1 | 2 | 3;
  subsections?: Array<{ id: string; title: string; level: 2 | 3 }>;
}>): InlineDrawerItem[] {
  return sections.map(section => ({
    id: section.id,
    title: section.title,
    anchor: section.id,
    level: section.level,
    children: section.subsections?.map(sub => ({
      id: sub.id,
      title: sub.title,
      anchor: sub.id,
      level: sub.level,
    })),
  }));
}
