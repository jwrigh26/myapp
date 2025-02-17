export interface BaseCardData {
  cardId: string;
  color?: string;
  height?: number;
  order?: number;
}

export interface CardData extends BaseCardData {
  componentName: string;
}