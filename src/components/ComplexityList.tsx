import ProseList from './ProseList';
import { MathInline } from './MathBlock';
import Arrow from './Arrow';
import { styled } from '@mui/material';

const ComplexityGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: '56px 72px 1fr',
  gap: '8px',
  alignItems: 'center',
});

interface ComplexityItem {
  label: 'Time' | 'Space';
  complexity: string;
  description: string;
}

interface ComplexityListProps {
  time?: string;
  timeDescription?: string;
  space?: string;
  spaceDescription?: string;
  items?: ComplexityItem[];
  subTitle?: string;
}

export default function ComplexityList({
  time,
  timeDescription,
  space,
  spaceDescription,
  items,
  subTitle = 'Complexity',
}: ComplexityListProps) {
  // If items are provided directly, use those
  // Otherwise, build from time/space props
  const complexityItems = items || [
    ...(time
      ? [
          {
            label: 'Time' as const,
            complexity: time,
            description: timeDescription || '',
          },
        ]
      : []),
    ...(space
      ? [
          {
            label: 'Space' as const,
            complexity: space,
            description: spaceDescription || '',
          },
        ]
      : []),
  ];

  const listItems = complexityItems.map((item) => (
    <ComplexityGrid key={item.label}>
      <strong>{item.label}:</strong>
      <MathInline math={item.complexity} padded />
      {item.description && (
        <span>
          <Arrow /> {item.description}
        </span>
      )}
    </ComplexityGrid>
  ));

  return <ProseList subTitle={subTitle} items={listItems} />;
}
