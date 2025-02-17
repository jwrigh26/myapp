import { RefObject } from "react";

// Base interface for common widget properties
export interface BaseWidget {
    id: string;
    text: string;
}

// Widget item used in lists
export interface WidgetItem extends BaseWidget {
    nodeRef: RefObject<HTMLDivElement>;
    disabled?: boolean;
}

// Props for the SortableWidget component
export interface WidgetProps extends BaseWidget {
    index: number;
    moveWidget: (dragIndex: number, hoverIndex: number) => void;
    removeWidget: (id: string) => void;
    isDraggable?: boolean;
}

// Props for visual representation
export interface WidgetCardProps {
    title: string;
    color?: string;
    isDraggable?: boolean;
}

// Props for widget filtering
export interface WidgetFiltersProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    selectedIndex: number;
    options: string[];
    onClose: () => void;
    onSelect: (index: number) => void;
}