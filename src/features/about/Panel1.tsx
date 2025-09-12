import type { BubbleSpec } from '@/components/comic';
import { ComicFrame, ComicBreakoutPanel } from '@/components/comic';
import { createImageSources, getDefaultImageSrc } from '@/utils/images';

export function Panel1() {
  const comicAspectRatio = 16 / 9; // Wide format

  const sampleBubbles: BubbleSpec[] = [
    {
      id: 'b1',
      text: "Hi! I'm Justin.",
      x: 32,
      y: 5,
      anchor: 'bottom-left',
      role: 'speech',
      // Long skinny downward tail
      tailPointsPx: {
        baseLeft: [0, 0],
        baseRight: [30, 0],
        tip: [8, 80],
      },
      tailOffsetPx: 28, // slide along bubble edge
      baseOverlapPx: 1, // tuck under bubble edge
    },
    {
      id: 'b2',
      text: 'Building apps with React is awesome!',
      x: 72,
      y: -8,
      anchor: 'bottom-right',
      role: 'thought',
      maxWidthPx: 320, // Consistent pixel-based sizing with minWidthPx
      minWidthPx: 280, // Ensures bubble stays readable even when text is short
      // Wider, shorter tail
      tailPointsPx: {
        baseLeft: [0, 0],
        baseRight: [40, 0],
        tip: [80, 100],
      },
      tailOffsetPx: 10,
      baseOverlapPx: 1,
      positionByBreakpoint: {
        lg: { x: 70, y: -10 },
        md: { x: 68, y: -12 },
        sm: { x: 64, y: -15 },
        xs: { x: 64, y: -30 },
      },
      nudgePx: { x: -5 },
    },
    {
      id: 'b3',
      text: 'BOOM! TypeScript rocks!',
      x: 15,
      y: 85,
      anchor: 'top-left',
      role: 'shout',
      maxWidthPx: 200,
      minWidthPx: 150,
      // Sharp, aggressive tail for shouting
      tailPointsPx: {
        baseLeft: [0, 0],
        baseRight: [25, 0],
        tip: [12, 60],
      },
      tailOffsetPx: 15,
      baseOverlapPx: 2,
      positionByBreakpoint: {
        lg: { x: 18, y: 82 },
        md: { x: 20, y: 80 },
        sm: { x: 15, y: 75 },
        xs: { x: 10, y: 70 },
      },
    },
  ];

  return (
    <ComicBreakoutPanel>
      <ComicFrame
        alt="Justin Wright introduction comic frame"
        src={getDefaultImageSrc('20250901-image-about-00-16x9')}
        sources={createImageSources('20250901-image-about-00-16x9')}
        height="560px"
        objectPosition={"50% 100%"}
        bubbles={sampleBubbles}
        defaultScaleByBreakpoint={{ xl: 100, lg: 100, md: 90, sm: 70, xs: 50 }}
      />
    </ComicBreakoutPanel>
  );
}
