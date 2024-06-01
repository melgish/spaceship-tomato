import type { HTMLAttributes } from 'react'
import type { Plants, Plant } from '@/actions/findPlants'
import PlantCard from '@/components/PlantCard'

type ElementProps = Omit<HTMLAttributes<Element>, 'children'>
type Props = Readonly<ElementProps & { rows?: Plants }>

export default function PlantsDeck({ rows = [], ...props }: Props) {
  return (
    <div {...props}>
      {rows.map((row: Plant) => (
        <PlantCard key={row.id} {...row} />
      ))}
    </div>
  )
}
