'use client'
import { removeBucket } from '@/actions/removeBucket'
import { notify } from '@/lib/notify'
import RemoveButton from '@/components/RemoveButton'

type Props = Readonly<{ row?: { id: number } }>

export default function RemoveBucketButton({ row }: Props) {
  if (row?.id) {
    return (
      <RemoveButton
        onClick={() => {
          // Resolve was required to make test work even when mocked?
          Promise.resolve(removeBucket(row.id)).then(notify)
        }}
      />
    )
  }
}
