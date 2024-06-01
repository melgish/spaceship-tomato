import type { Plant } from '@/actions/findPlants'
import PHRange from './PHRange'
import RemovePlantButton from './RemovePlantButton'

export default function PlantCard(row: Readonly<Plant>) {
  return (
    <div className="kv-card">
      <div>Name</div>
      <div>
        {row.name} <RemovePlantButton row={row} />
      </div>
      <div>PH</div>
      <div>
        <PHRange range={row} />
      </div>
    </div>
  )
}
