import Box from "@mui/material/Box";
import { RefObject, createRef, useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SortableWidget from "./SortableWidget";
import { WidgetProps } from "src/types";
import { useWidgets } from "../hooks/useDashboard";
import "./widgetlist.css";

export default function WidgetList() {
  const { widgets } = useWidgets();
  const [localWidgets, setLocalWidgets] = useState<WidgetProps[]>(Object.values(widgets));

  const moveWidget = (dragIndex: number, hoverIndex: number) => {
    setLocalWidgets((prevWidgets) => {
      const updatedWidgets = [...prevWidgets];
      const [movedItem] = updatedWidgets.splice(dragIndex, 1); // Remove item
      updatedWidgets.splice(hoverIndex, 0, movedItem); // Insert at new position
      return updatedWidgets;
    });
  };

  // const removeWidget = useCallback((id: string) => {
  //   setWidgets((prevWidgets) =>
  //     prevWidgets.filter((widget) => widget.id !== id)
  //   );
  // }, []);

  // const addWidget = useCallback(() => {
  //   setWidgets((prevWidgets) => [
  //     ...prevWidgets,
  //     {
  //       id: `w${prevWidgets.length + 1}`,
  //       text: `Widget ${prevWidgets.length + 1}`,
  //       nodeRef: createRef<HTMLDivElement>(),
  //     },
  //   ]);
  // }, []);

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
          {localWidgets?.map((widget: WidgetProps, index: number) => (
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
                    card={widget.card}
                    disabled={widget.disabled}
                    nodeRef={widget.nodeRef as RefObject<HTMLDivElement>}
                    moveWidget={moveWidget}
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
