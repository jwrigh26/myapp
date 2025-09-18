export { default as ComicFrame } from './ComicFrame';
export type { BubbleAnchor, BubbleRole, BubbleSpec, ComicFrameWithBubblesProps } from './types';
export { ComicWrapper, ComicPanel, ComicBreakoutPanel } from './ComicPanel';

// New modular components
export { Bubble } from './Bubble';
export { BubbleTail } from './BubbleTail';
export * from './types';
export * from './constants';
export * from './utils';

// Legacy
export { default as LegacyComicStrip } from './LegacyComicStrip';
export type { LegacyComicStripProps, LegacyComicFrame } from './LegacyComicStrip';
