import Icon from '@/components/Icon';
import { mdiClose } from '@mdi/js';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { PermanentDrawer, Sheet, MobileDrawer } from './Drawer';
import { useDrawer } from '@/hooks/useContext';

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
  desktop?: boolean;
  header?: React.ComponentType | null;
  footer?: React.ComponentType | null;
}

// ################################################
// ### Main Component
// ################################################

export function SecondaryDrawer({
  items,
  title,
  desktop = true,
  header: Header,
  footer: Footer,
}: InlineDrawerProps) {
  const { isOpen: drawerIsOpen, closeDrawer } = useDrawer('secondary-drawer');
  const [activeAnchor, setActiveAnchor] = useState<string>('');
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
  const scrollToAnchor = useCallback(
    (anchor: string) => {
      const element = document.getElementById(anchor);
      if (element) {
        // Clear any existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Immediately set the target as active
        setActiveAnchor(anchor);

        // Disable observer updates during scroll
        isScrollingRef.current = true;

        element.style.scrollMarginTop = '80px'; // Offset for fixed header

        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // Re-enable observer updates after scroll completes
        // Smooth scroll typically takes 500-1000ms, we'll wait 1000ms to be safe
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 1000);

        // Close mobile drawer after navigation
        if (!desktop) {
          closeDrawer();
        }
      }
    },
    [desktop, closeDrawer]
  );

  // Cleanup scroll timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Track scroll position to highlight active section using Intersection Observer
  useEffect(() => {
    // Get all anchor elements
    const anchorElements = flatItems
      .filter((item) => item.anchor)
      .map((item) => ({
        id: item.anchor!,
        element: document.getElementById(item.anchor!),
      }))
      .filter(({ element }) => element !== null) as Array<{
      id: string;
      element: HTMLElement;
    }>;

    if (anchorElements.length === 0) return;

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Skip updates if user is manually scrolling via click
        if (isScrollingRef.current) {
          return;
        }

        // Find the first intersecting entry (topmost visible section)
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            // Sort by position in viewport (top to bottom)
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });

        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries[0];
          const anchorId = topEntry.target.id;
          setActiveAnchor(anchorId);
        }
      },
      {
        // Trigger when section enters top 20% of viewport
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    );

    // Observe all anchor elements
    anchorElements.forEach(({ element }) => {
      observer.observe(element);
    });

    // Cleanup
    return () => {
      anchorElements.forEach(({ element }) => {
        observer.unobserve(element);
      });
      observer.disconnect();
    };
  }, []);

  // Render navigation items recursively (all expanded)
  const renderItems = useCallback(
    (items: InlineDrawerItem[]) => {
      return items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isActive = item.anchor === activeAnchor;

        return (
          <Box key={item.id}>
            <ListItem disablePadding>
              <StyledListItemButton
                itemLevel={item.level}
                active={isActive}
                onClick={() => {
                  if (item.anchor) {
                    scrollToAnchor(item.anchor);
                  }
                }}
              >
                <Typography className="list-item-text">{item.title}</Typography>
              </StyledListItemButton>
            </ListItem>
            {hasChildren && (
              <List disablePadding>{renderItems(item.children!)}</List>
            )}
          </Box>
        );
      });
    },
    [activeAnchor, scrollToAnchor]
  );

  // Render navigation content
  const navigationContent = (
    <>
      {/* Only show title if no custom header is provided */}
      {title && !Header && (
        <>
          <Typography variant="subtitle2" sx={{ pt: 2, pb: 1, pl: 1 }}>
            {title}
          </Typography>
          <Divider />
        </>
      )}
      <List disablePadding sx={{ mt: 1 }}>
        {renderItems(items)}
      </List>
    </>
  );

  // Desktop version - permanent drawer
  if (desktop) {
    return (
      <PermanentDrawer width={228} key="inline-drawer" anchor="right" secondary>
        {Header && <Header />}
        {navigationContent}
        {Footer && <Footer />}
      </PermanentDrawer>
    );
  }

  // Mobile/Tablet version - temporary drawer
  return (
    <MobileDrawer anchor="right" open={drawerIsOpen} onClose={closeDrawer}>
      <SecondaryDrawerHeader
        title={title || 'Contents'}
        onClose={closeDrawer}
      />
      <Divider />
      <Sheet sx={{ flexGrow: 1, overflow: 'auto' }}>
        <List disablePadding sx={{ mt: 1 }}>
          {renderItems(items)}
        </List>
      </Sheet>
    </MobileDrawer>
  );
}

// ################################################
// ### Utility Functions
// ################################################

/**
 * Helper function to generate navigation items from page sections
 * This can be used to automatically generate drawer items from your content
 */
export function createNavigationItems(
  sections: Array<{
    id: string;
    title: string;
    level: 1 | 2 | 3;
    subsections?: Array<{ id: string; title: string; level: 2 | 3 }>;
  }>
): InlineDrawerItem[] {
  return sections.map((section) => ({
    id: section.id,
    title: section.title,
    anchor: section.id,
    level: section.level,
    children: section.subsections?.map((sub) => ({
      id: sub.id,
      title: sub.title,
      anchor: sub.id,
      level: sub.level,
    })),
  }));
}

// ################################################
// ### Supporting Components
// ################################################

interface SecondaryDrawerHeaderProps {
  title: string;
  onClose: () => void;
}

function SecondaryDrawerHeader({ title, onClose }: SecondaryDrawerHeaderProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '& *': {
          userSelect: 'none',
        },
      }}
    >
      <Typography variant="h6" color="common.white" sx={{ flex: 1 }}>
        {title}
      </Typography>
      <IconButton
        onClick={onClose}
        size="small"
        sx={{
          color: theme.palette.primary.contrastText,
          '&:hover': { opacity: 0.8 },
        }}
      >
        <Icon path={mdiClose} />
      </IconButton>
    </Box>
  );
}

// ################################################
// ### Styled Components
// ################################################

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'itemLevel' && prop !== 'active',
})<{ itemLevel: 1 | 2 | 3; active?: boolean }>(
  ({ theme, itemLevel, active }) => ({
    paddingLeft: theme.spacing(itemLevel === 1 ? 1 : itemLevel === 2 ? 2 : 4),
    paddingRight: theme.spacing(0),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(0.25, 1),
    backgroundColor: active ? theme.palette.action.selected : 'transparent',
    fontSize:
      itemLevel === 1 ? '0.90rem' : itemLevel === 2 ? '0.875rem' : '0.8rem',
    '&:hover': {
      backgroundColor: active
        ? theme.palette.action.selected
        : theme.palette.action.hover,
    },
    '& .list-item-text': {
      fontSize: 'inherit',
      fontWeight: 300,
      color:
        itemLevel === 1
          ? theme.palette.text.primary
          : itemLevel === 2
            ? theme.palette.text.secondary
            : theme.palette.text.disabled,
    },
  })
);
