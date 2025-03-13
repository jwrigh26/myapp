import { ReactNode } from 'react';

export interface BlockItem {
  id: string;
  type: string;
  content: ReactNode | string;
}
