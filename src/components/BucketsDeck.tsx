import type { HTMLAttributes } from 'react'
import type { Buckets, Bucket } from '@/actions/findBuckets'
import BucketCard from '@/components/BucketCard'

type ElementProps = Omit<HTMLAttributes<Element>, 'children'>
type Props = Readonly<ElementProps & { rows?: Buckets }>

export default function BucketsDeck({ rows = [], ...props }: Props) {
  return (
    <div {...props}>
      {rows.map((row: Bucket) => (
        <BucketCard key={row.id} {...row} />
      ))}
    </div>
  )
}
