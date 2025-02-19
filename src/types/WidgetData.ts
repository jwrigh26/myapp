import { RefObject } from "react";
import { CardData } from "./CardData";

// export interface BaseCardData {
//     cardId: string;
//     color?: string;
//     height?: number;
//     order?: number;
//   }

// Base interface for common widget properties
export interface BaseWidget {
  id: string;
  card: CardData;
  order?: number;
}

// Props for the SortableWidget component
export interface WidgetProps extends BaseWidget {
  index: number;
  nodeRef: RefObject<HTMLDivElement>;
  disabled?: boolean;
  moveWidget?: (dragIndex: number, hoverIndex: number) => void;
}

// Props for visual representation
export interface WidgetCardProps extends BaseWidget {
  isDraggable?: boolean;
  disabled?: boolean;
}

// Props for widget filtering
export interface WidgetFiltersProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  selectedIndex: number;
  options: ("All" | "Active" | "Inactive")[];
  onClose: () => void;
  onSelect: (index: number) => void;
}
