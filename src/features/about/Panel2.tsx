import type { BubbleSpec } from '@/components/comic';
import { ComicFrame, ComicPanel } from '@/components/comic';
import { createImageSources, getDefaultImageSrc } from '@/utils/images';

export function Panel2({ id }: { id?: string }) {
  const bubble1: BubbleSpec[] = [
    {
      id: 'p2-b1',
      text: 'Oh darn, this code is really messed up!',
      x: 50,
      y: 20,
      anchor: 'bottom-left',
      role: 'speech',
      maxWidthPx: 250,
      minWidthPx: 200,
      tailPointsPx: {
        baseLeft: [0, 0],
        baseRight: [30, 0],
        tip: [15, 60],
      },
      tailOffsetPx: 15,
      baseOverlapPx: 1,
      decorativeText: [
        {
          type: 'search-replace',
          searchText: 'darn',
          className: 'bubble-expletive',
        },
      ],
    },
  ];

  const bubble2: BubbleSpec[] = [
    {
      id: 'p2-b2',
      text: 'This damn bug is driving me crazy! What the hell?',
      x: 50,
      y: 100,
      anchor: 'top-right',
      role: 'thought',
      maxWidthPx: 250,
      minWidthPx: 200,
      tailPointsPx: {
        baseLeft: [0, 0],
        baseRight: [35, 0],
        tip: [17, 50],
      },
      tailOffsetPx: 20,
      baseOverlapPx: 1,
      decorativeText: [
        {
          type: 'symbol-replace',
          searchText: 'damn',
          className: 'bubble-symbols',
        },
        {
          type: 'symbol-replace',
          searchText: 'hell',
          className: 'bubble-symbols',
          symbolText: '☠️💀🔥', // Custom symbols
        },
      ],
    },
  ];

  return (
    <ComicPanel id={id}>
      <ComicFrame
        alt="About panel 1 - Justin Wright"
        src={getDefaultImageSrc('20250901-image-about-01-4x5')}
        sources={createImageSources('20250901-image-about-01-4x5')}
        height="400px"
        bubbles={bubble1}
        defaultScaleByBreakpoint={{ xl: 100, lg: 100, md: 90, sm: 70, xs: 60 }}
      />
      <ComicFrame
        alt="About panel 2 - Justin Wright"
        src={getDefaultImageSrc('20250901-image-about-02-4x5')}
        sources={createImageSources('20250901-image-about-02-4x5')}
        height="400px"
        bubbles={bubble2}
        defaultScaleByBreakpoint={{ xl: 100, lg: 100, md: 90, sm: 70, xs: 60 }}
      />
    </ComicPanel>
  );
}