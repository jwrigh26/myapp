import { createRef, useCallback, useEffect } from "react";
import { useTemp } from "src/hooks/useContext";
import { CardData, WidgetProps } from "src/types";

// CardData is given

// export interface BaseCardData {
//   cardId: string;
//   color?: string;
//   height?: number;
// }

// export interface CardData extends BaseCardData {
//   componentName: string;
// }

export function useWidgets() {
  const { temp: widgets, setTemp: setWidgets } = useTemp("dashboard-widgets");
  const { setTemp: setCards } = useTemp("dashboard-cards");

  const saveWidgets = useCallback((newWidgets: WidgetProps[]) => {
    setWidgets({ widgets: newWidgets });
  }, []);

  const saveCardsFromWidgets = useCallback((widgets: WidgetProps[]) => {
    const newCards = widgets
      .map((widget) => {
        return {
          ...widget.card,
          order: widget.order,
        };
      })
      .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));


    setCards({
      cards: newCards,
    });
  }, []);

  return {
    widgets: widgets?.widgets,
    saveWidgets,
    saveCardsFromWidgets,
  };
}

export function useDashboard(data: CardData[]) {
  const { temp: cards, setTemp: setCards } = useTemp("dashboard-cards");
  const { temp: widgets, setTemp: setWidgets } = useTemp("dashboard-widgets");
  const { setTemp: setStatus } = useTemp("dashboard-status");

  useEffect(() => {
    if (!cards.length) {
      // Store pre-sorted array directly
      setCards({
        cards: data.sort(
          (a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)
        ),
      });

      // Initialize widgets as array
      setWidgets({
        widgets: data
          .map((card, index) => makeWidget(card, index))
          .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)),
      });
    }

    setStatus({ editing: false, filter: "Active" });
  }, []);

  return {
    cards: cards?.cards,
  };
}

export function useDashboardStatus() {
  const {
    temp: status,
    setTemp: setStatus,
    addToTemp: updateStatus,
  } = useTemp("dashboard-status");

  const setEditing = (editing: boolean) => {
    console.log("setEditing", editing);
    updateStatus({ editing });
  };

  const setFilter = (filter: "All" | "Active" | "Inactive") => {
    updateStatus({ filter });
  };

  return {
    editing: status.editing,
    filter: status.filter,
    setEditing,
    setFilter,
  };
}

// #################################################
// ### Widget Helpers
// #################################################

const makeWidget = (card: CardData, index: number): WidgetProps => {
  return {
    id: `${card.cardId}-w${index}`,
    card,
    index,
    disabled: false,
    nodeRef: createRef<HTMLDivElement>(),
    order: card.order ?? index,
  };
};

// const moveWidget = (dragIndex: number, hoverIndex: number) => {
//   setWidgets((prevWidgets) => reorderWidgets(prevWidgets, dragIndex, hoverIndex));
// };

// const moveWidget = useCallback((dragId: string, hoverId: string) => {
//     setWidgets((prevWidgets: Record<string, WidgetProps>) =>
//       reorderWidgets(prevWidgets, dragId, hoverId)
//     );
//   }, []);

const reorderWidgets = (
  widgets: Record<string, WidgetProps>,
  dragId: string,
  hoverId: string
) => {
  const dragWidget = widgets[dragId];
  const hoverWidget = widgets[hoverId];

  if (!dragWidget || !hoverWidget) return widgets;

  const dragOrder = dragWidget.order ?? dragWidget.index;
  const hoverOrder = hoverWidget.order ?? hoverWidget.index;

  // Create new object with updated orders
  return Object.fromEntries(
    Object.entries(widgets).map(([id, widget]) => {
      if (id === dragId) {
        return [id, { ...widget, order: hoverOrder }];
      }
      if (id === hoverId) {
        return [id, { ...widget, order: dragOrder }];
      }
      return [id, widget];
    })
  );
};

// const removeWidget = (widgets: WidgetProps[], id: string) => {
//   return widgets.filter((widget) => widget.id !== id);
// }

// const addWidget = (widgets: WidgetProps[]) => {
//   return [
//     ...widgets,
//     {
//       id: `w${widgets.length + 1}`,
//       card: { cardId: `c${widgets.length + 1}`, componentName: "Widget" },
//     },
//   ];
// }
