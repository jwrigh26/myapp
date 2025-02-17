import { useTemp } from "src/hooks/useContext";
import { useState, useEffect } from "react";
import { CardData } from "src/types";


// CardData is given

// export interface BaseCardData {
//   cardId: string;
//   color?: string;
//   height?: number;
// }

// export interface CardData extends BaseCardData {
//   componentName: string;
// }


export function useDashboard(cards: CardData[]) {
  const { temp, setTemp } = useTemp("dashboard-cards");
  const [localCards, setLocalCards] = useState<CardData[]>(cards);

  // Initialize temp with cards if empty
  useEffect(() => {
    if (Object.keys(temp).length === 0) {
      setTemp(cards.reduce((acc, card) => {
        acc[card.cardId] = card;
        return acc;
      }, {} as Record<string, CardData>));
    }
  }, []);

  const updateCard = (cardId: string, updates: Partial<CardData>) => {
    setTemp((prev: Record<string, CardData>) => ({
      ...prev,
      [cardId]: { ...prev[cardId], ...updates }
    }));
    setLocalCards(current => 
      current.map(card => 
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
  
      setTemp((prev: Record<string, CardData>) => {
          const newTemp = { ...prev };
          Object.entries(updatesMap).forEach(([cardId, update]) => {
              newTemp[cardId] = { ...prev[cardId], ...update };
          });
          return newTemp;
      });
  
      setLocalCards(current => 
          current.map(card => {
              const update = updatesMap[card.cardId];
              return update ? { ...card, ...update } : card;
          })
      );
  };

  return {
    cards: localCards.sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)),
    updateCard,
    updateCards,
  };
}