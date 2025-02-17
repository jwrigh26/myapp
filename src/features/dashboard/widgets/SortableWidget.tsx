import { mdiDelete } from "@mdi/js";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Icon from "components/Icon";
import type { XYCoord } from "dnd-core";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

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

  const [, drop] = useDrop({
    accept: ItemTypes.WIDGET,
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

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        marginBottom: 1,
        backgroundColor: "secondary.light",
        border: "1px solid #ccc",
        cursor: "grab",
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? "scale(1.05)" : "scale(1)", // Slight scale effect
        transition: "transform 200ms ease-out", // 👈 Smooth movement transition
      }}
    >
      {text}
      <IconButton onClick={() => removeWidget(id)}>
        <Icon path={mdiDelete} />
      </IconButton>
    </Box>
  );
}
