import type { Reading } from '@/actions/findReadings'
import RemoveReadingButton from './RemoveReadingButton'

type Props = Readonly<Reading>

export default function ReadingCard(row: Props) {
  const plant = row.bucket.plant
  return (
    <div className="kv-card">
      <div>Created</div>
      <div>
        {row.createdAt.toLocaleString()} <RemoveReadingButton row={row} />
      </div>
      <div>Bucket</div>
      <div>{row.bucket.name}</div>
      <div>Plant</div>
      <div>{plant?.name}</div>
      <div>PH</div>
      <div>{row.ph.toFixed(1)}</div>
      <div>TDS</div>
      <div>{row.tds.toFixed(0)}</div>
      <div>EC</div>
      <div>{row.ec.toFixed(0)}</div>
      <div />
    </div>
  )
}
