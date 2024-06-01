import type { HTMLAttributes } from 'react'
import type { Reading, Readings } from '@/actions/findReadings'
import ReadingCard from '@/components/ReadingCard'

type ElementProps = Omit<HTMLAttributes<Element>, 'children'>
type Props = Readonly<ElementProps & { rows?: Readings }>

export default function ReadingsDeck({ rows = [], ...props }: Props) {
  return (
    <div {...props}>
      {rows.map((row: Reading) => (
        <ReadingCard key={row.id} {...row} />
      ))}
    </div>
  )
}
