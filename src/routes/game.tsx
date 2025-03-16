import {
  BottomCarousel,
  ItemTypes,
  useCarousel,
  useWorkspace,
  Workspace,
} from '@/features/game';
import { BlockItem } from '@/features/game/types';
import { PageLayout } from '@/layout';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { createFileRoute } from '@tanstack/react-router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import { MultiBackend, TouchTransition } from 'react-dnd-multi-backend';
// import { TouchBackend } from 'react-dnd-touch-backend';

// const HTML5toTouch = {
//   backends: [
//     {
//       id: 'html5',
//       backend: HTML5Backend,
//       transition: TouchTransition,
//     },
//     {
//       id: 'touch',
//       backend: TouchBackend,
//       options: { enableTouchEvents: true },
//       preview: true,
//     },
//   ],
// };

export const Route = createFileRoute('/game')({
  component: GameComponent,
});

function GameComponent() {
  const initialItems: BlockItem[] = [
    {
      id: '1',
      type: ItemTypes.CODE_BLOCK,
      code: 'var x = 5',
      order: 0,
    },
    {
      id: '2',
      type: ItemTypes.CODE_BLOCK,
      code: 'var y = 10',
      order: 1,
    },
  ];

  const solution = [...initialItems]; // For now assume the solution is the same as the initial items
  const dropZoneCount = initialItems.length;

  const carousel = useCarousel(initialItems);
  const workspace = useWorkspace(dropZoneCount);
  // const game = useGame(solution, carousel, workspace);

  // pass callbacks for removeCarouselBlock -> Workspace
  // pass callbacks for removeWorkspaceBlock -> Carousel

  return (
    // <DndProvider backend={MultiBackend} options={HTML5toTouch}>
    <DndProvider backend={HTML5Backend}>
      <PageLayout>
        <Workspace workspace={workspace} carousel={carousel} />
        <BottomCarousel carousel={carousel} workspace={workspace} />
      </PageLayout>
    </DndProvider>
  );
}

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
}));

const ColorBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: string }>(({ theme, color }) => ({
  backgroundColor: color || theme.palette.primary.main,
  color: theme.palette.primary.superLight,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  height: '100%',
  flex: 1,
}));

function Item({
  children,
  color = '#FFC107',
}: {
  children?: React.ReactNode | number | string;
  color?: string;
}) {
  return <ColorBox color={color}>{children}</ColorBox>;
}
