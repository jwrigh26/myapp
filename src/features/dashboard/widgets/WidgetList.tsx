import Box from "@mui/material/Box";
import React, { RefObject, useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { WidgetProps } from "src/types";
import { useWidgets } from "../hooks/useDashboard";
import SortableWidget from "./SortableWidget";
import "./widgetlist.css";

const WidgetList = () => {
  const { widgets, saveWidgets, saveCardsFromWidgets } = useWidgets();
  const [localWidgets, setLocalWidgets] = useState<WidgetProps[]>(widgets);

  // We have things locally, now we need to upate state widgets and state cards

  const moveWidget = useCallback((dragIndex: number, hoverIndex: number) => {
    setLocalWidgets((prevWidgets) => {
      const updatedWidgets = [...prevWidgets];

      // Bounds checking first
      if (
        hoverIndex < 0 ||
        hoverIndex >= updatedWidgets.length ||
        dragIndex < 0 ||
        dragIndex >= updatedWidgets.length
      ) {
        return prevWidgets;
      }

      // Get the orders before moving items
      const draggedItem = updatedWidgets[dragIndex];
      const targetItem = updatedWidgets[hoverIndex];
      const draggedOrder = draggedItem.order ?? dragIndex;
      const targetOrder = targetItem.order ?? hoverIndex;

      // Swap the orders
      draggedItem.order = targetOrder;
      targetItem.order = draggedOrder;

      // Now perform the actual move
      const [movedItem] = updatedWidgets.splice(dragIndex, 1);
      updatedWidgets.splice(hoverIndex, 0, movedItem);

      // Update the state
      saveWidgets(updatedWidgets);
      saveCardsFromWidgets(updatedWidgets);
      return updatedWidgets;
    });
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
};

export default React.memo(WidgetList);
