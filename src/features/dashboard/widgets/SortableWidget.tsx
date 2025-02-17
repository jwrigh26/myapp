import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import MUICard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";
import type { XYCoord } from "dnd-core";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import Checkbox from '@mui/material/Checkbox';

interface WidgetProps {
  id: string;
  index: number;
  text: string;
  moveWidget: (dragIndex: number, hoverIndex: number) => void;
  removeWidget: (id: string) => void;
  isDraggable?: boolean;
}

export default function SortableWidget({
  id,
  index,
  text,
  moveWidget,
  removeWidget,
  isDraggable = true,
}: WidgetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const [{ isOver, canDrop }, drop] = useDrop<
    { index: number },
    void,
    { isOver: boolean; canDrop: boolean }
  >({
    accept: ItemTypes.WIDGET,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveWidget(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.WIDGET,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isDraggable,
  });

  if (isDraggable) {
    drag(drop(ref));
  }
  drop(ref);

  if (isOver && canDrop) {
    console.log(index, "isOver", isOver, "canDrop", canDrop);
  }

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border:
          isDragging && isOver && canDrop
            ? `2px dashed ${theme.palette.primary.dark}`
            : "1px solid #ccc",
        cursor: isDraggable ? "grab" : "default",
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? "scale(1.02)" : "scale(1)",
        transition: "transform 200ms ease-out",
        mb: 1,
      }}
    >
      <WidgetCard title={text} isDraggable={isDraggable} />
    </Box>
  );
}

// #################################################
// ### Widget Subcomponents
// #################################################

interface WidgetCardProps {
  title: string;
  color?: string;
  isDraggable?: boolean;
}

function WidgetCard({ title, color, isDraggable }: WidgetCardProps) {
  const initial = title.charAt(0).toUpperCase();
  const label = { inputProps: { 'aria-label': 'Active Checkbox' } };
  return (
    <Card raised={false}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isDraggable ? color || "primary.main" : "grey.300",
            color: "primary.contrastText",
            opacity: isDraggable ? 1 : 0.5,
            height: 112,
            p: 2,
            position: "relative",
          }}
        >
          <ActiveCheckbox {...label} isDraggable={isDraggable} />
          <LetterAvatar>{initial}</LetterAvatar>
        </Box>
      </CardContent>
    </Card>
  );
}

function LetterAvatar({ children }: { children: string }) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: "background.paper", color: "text.primary" }}>
        {children}
      </Avatar>
    </Stack>
  );
}

// #################################################
// ### Styles
// #################################################

const Card = styled(MUICard)(({ theme }) => ({
  padding: 0,
  width: "100%",
  " & .MuiCardContent-root": {
    padding: 0,
    paddingBottom: 0,
  },
}));

const ActiveCheckbox = styled(Checkbox, {
  shouldForwardProp: (prop) => prop !== 'isDraggable',
})<{ isDraggable?: boolean }>(({ theme, isDraggable = true }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  color: isDraggable ? theme.palette.primary.contrastText : theme.palette.text.primary,
  '&.Mui-checked': {
    color: isDraggable ? theme.palette.primary.contrastText : theme.palette.text.primary,
  },
}));