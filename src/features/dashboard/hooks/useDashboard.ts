import { useTemp } from "src/hooks/useContext";
import { createRef, useCallback } from "react";
import { useState, useEffect } from "react";
import { CardData, WidgetProps } from "src/types";
import { W } from "vitest/dist/chunks/reporters.D7Jzd9GS.js";

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

  const moveWidget = useCallback((dragId: string, hoverId: string) => {
    setWidgets((prevWidgets: Record<string, WidgetProps>) =>
      reorderWidgets(prevWidgets, dragId, hoverId)
    );
  }, []);

  return {
    widgets,
    moveWidget,
  };
}

export function useDashboard(data: CardData[]) {
  const { temp: cards, setTemp: setCards } = useTemp("dashboard-cards");
  const { temp: widgets, setTemp: setWidgets } = useTemp("dashboard-widgets");
  const { setTemp: setStatus } = useTemp("dashboard-status");

  const [localCards, setLocalCards] = useState<CardData[]>(data);

  useEffect(() => {
    // Initialize Cards
    if (Object.keys(cards).length === 0) {
      setCards(
        data.reduce<Record<string, CardData>>((acc, card) => {
          acc[card.cardId] = card;
          return acc;
        }, {} as Record<string, CardData>)
      );

      // Initialize Widgets
      setWidgets(
        data.reduce<Record<string, WidgetProps>>((acc, card) => {
          const widget = makeWidget(card, data.indexOf(card));
          acc[widget.id] = widget;
          return acc;
        }, {} as Record<string, WidgetProps>)
      );
    }

    setStatus({ editing: false, filter: "Active" });
  }, []);


  const updateCard = (cardId: string, updates: Partial<CardData>) => {
    setCards((prev: Record<string, CardData>) => ({
      ...prev,
      [cardId]: { ...prev[cardId], ...updates },
    }));
    setLocalCards((current) =>
      current.map((card) =>
        card.cardId === cardId ? { ...card, ...updates } : card
      )
    );
  };

  const updateCards = (updates: Partial<CardData>[]) => {
    // Create updates map once
    const updatesMap = updates.reduce((acc, update) => {
      if (update.cardId) {
        acc[update.cardId] = update;
      }
      return acc;
    }, {} as Record<string, Partial<CardData>>);

    setCards((prev: Record<string, CardData>) => {
      const newTemp = { ...prev };
      Object.entries(updatesMap).forEach(([cardId, update]) => {
        newTemp[cardId] = { ...prev[cardId], ...update };
      });
      return newTemp;
    });

    setLocalCards((current) =>
      current.map((card) => {
        const update = updatesMap[card.cardId];
        return update ? { ...card, ...update } : card;
      })
    );
  };

  return {
    cards: localCards.sort(
      (a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)
    ),
    updateCard,
    updateCards,
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
