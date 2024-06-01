import PHRange from '@/components/PHRange'
import PlantName from '@/components/PlantName'
import type { Bucket } from '@/actions/findBuckets'
import RemoveBucketButton from './RemoveBucketButton'

export default function BucketCard(row: Readonly<Bucket>) {
  return (
    <div className="kv-card">
      <div>Name</div>
      <div>
        {row.name} <RemoveBucketButton row={row} />
      </div>
      <div>Plant</div>
      <div>
        <PlantName plant={row.plant} />
      </div>
      {row.plant && <div>PH</div>}
      {row.plant && (
        <div>
          <PHRange range={row.plant} />
        </div>
      )}
    </div>
  )
}
