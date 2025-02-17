import Box from "@mui/material/Box";
import { RefObject, createRef, useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SortableWidget from "./SortableWidget";
import "./widgetlist.css";

interface WidgetItem {
  id: string;
  text: string;
  nodeRef: RefObject<HTMLDivElement>; // ✅ Explicitly type as HTMLDivElement
  disabled?: boolean;
}

export default function WidgetList() {
  const [widgets, setWidgets] = useState<WidgetItem[]>([
    {
      id: "w1",
      text: "Widget 1",
      nodeRef: createRef<HTMLDivElement>(),
      disabled: true,
    },
    { id: "w2", text: "Widget 2", nodeRef: createRef<HTMLDivElement>() },
    { id: "w3", text: "Widget 3", nodeRef: createRef<HTMLDivElement>() },
    { id: "w4", text: "Widget 4", nodeRef: createRef<HTMLDivElement>() },
    { id: "w5", text: "Widget 5", nodeRef: createRef<HTMLDivElement>() },
  ]);

  const moveWidget = (dragIndex: number, hoverIndex: number) => {
    setWidgets((prevWidgets) => {
      const updatedWidgets = [...prevWidgets];
      const [movedItem] = updatedWidgets.splice(dragIndex, 1); // Remove item
      updatedWidgets.splice(hoverIndex, 0, movedItem); // Insert at new position
      return updatedWidgets;
    });
  };

  const removeWidget = useCallback((id: string) => {
    setWidgets((prevWidgets) =>
      prevWidgets.filter((widget) => widget.id !== id)
    );
  }, []);

  const addWidget = useCallback(() => {
    setWidgets((prevWidgets) => [
      ...prevWidgets,
      {
        id: `w${prevWidgets.length + 1}`,
        text: `Widget ${prevWidgets.length + 1}`,
        nodeRef: createRef<HTMLDivElement>(),
      },
    ]);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Box
        sx={{
          overflowY: "auto",
          border: "1px solid gray",
          padding: 1,
          marginTop: 2,
        }}
      >
        <TransitionGroup className="widget-list">
          {widgets.map((widget, index) => (
            <CSSTransition
              key={widget.id}
              timeout={300}
              classNames="widget"
              nodeRef={widget.nodeRef}
              onEnter={() => console.log(`Entering: ${widget.id}`)}
            >
              <div className="widget" ref={widget.nodeRef}>
                <SortableWidget
                  key={widget.id}
                  id={widget.id}
                  index={index}
                  text={widget.text}
                  moveWidget={moveWidget}
                  removeWidget={removeWidget}
                  isDraggable={!widget.disabled}
                />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Box>
      {/* <Button onClick={addWidget} sx={{ mt: 2 }} variant="contained">
        Add Widget
      </Button> */}
    </DndProvider>
  );
}
