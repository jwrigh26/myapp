import type { BubbleSpec } from '@/components/comic';
import { ComicFrame, ComicBreakoutPanel } from '@/components/comic';
import { createImageSources, getDefaultImageSrc } from '@/utils/images';

const defaultScaleByBreakpoint = { xl: 100, lg: 100, md: 90, sm: 70, xs: 50 };

export function Panel1({ id }: { id?: string }) {
  // const comicAspectRatio = 16 / 9; // Wide format

  const sampleBubbles: BubbleSpec[] = [
    {
      id: 'b1',
      text: 'Welcome to the About Me page.',
      x: 30,
      y: 78,
      anchor: 'top-left',
      role: 'speech',
      maxWidthPx: 256,
      minWidthPx: 200,
      // Sharp, aggressive tail for shouting
      tailPointsPx: {
        baseLeft: [0, 0],
        baseRight: [25, 0],
        tip: [12, 60],
      },
      tailOffsetPx: 15,
      baseOverlapPx: 2,
      positionByBreakpoint: {
        lg: { x: 30, y: 78 },
        md: { x: 30, y: 82 },
        sm: { x: 30, y: 100 },
        tablet: { x: 30, y: 100 },
        mobileLg: { x: 25, y: 110 },
        mobile: { x: 25, y: 120 },
        xs: { x: 20, y: 120 },
      },
      decorativeText: [
        {
          type: 'first-letter',
          className: 'bubble-drop-cap',
        },
      ],
    },
    {
      id: 'b2',
      text: 'My next guess is JustinWright, a developer from Salt Lake City.',
      x: 100,
      y: 0,
      role: 'speech',
      anchorEl: 'b1',
      maxWidthPx: 500, // Consistent pixel-based sizing with minWidthPx
      minWidthPx: 350, // Ensures bubble stays readable even when text is short
      connector: {
        width: 20,
        height: 80,
        x: -10,
        y: 20,
        zIndex: 2,
      },
      decorativeText: [
        {
          type: 'search-replace',
          searchText: 'JustinWright',
          className: 'bubble-emphasis',
        },
        {
          type: 'search-replace',
          searchText: 'Salt Lake City',
          className: 'bubble-highlight',
        },
      ],
    },
    // {
    //   id: 'b2',
    //   text: 'Building apps with React is awesome!',
    //   x: 72,
    //   y: -8,
    //   anchor: 'bottom-right',
    //   role: 'thought',
    //   maxWidthPx: 320, // Consistent pixel-based sizing with minWidthPx
    //   minWidthPx: 280, // Ensures bubble stays readable even when text is short
    //   // Wider, shorter tail
    //   tailPointsPx: {
    //     baseLeft: [0, 0],
    //     baseRight: [40, 0],
    //     tip: [80, 100],
    //   },
    //   tailOffsetPx: 10,
    //   baseOverlapPx: 1,
    //   positionByBreakpoint: {
    //     lg: { x: 70, y: -10 },
    //     md: { x: 68, y: -12 },
    //     sm: { x: 64, y: -15 },
    //     xs: { x: 64, y: -30 },
    //   },
    //   nudgePx: { x: -5 },
    // },
  ];

  return (
    <ComicBreakoutPanel id={id}>
      <ComicFrame
        alt="Justin Wright introduction comic frame"
        src={getDefaultImageSrc('20250901-image-about-00-16x9')}
        sources={createImageSources('20250901-image-about-00-16x9')}
        height="480px"
        objectPosition={'50% 70%'}
        bubbles={sampleBubbles}
        defaultScaleByBreakpoint={defaultScaleByBreakpoint}
      />
    </ComicBreakoutPanel>
  );
}
