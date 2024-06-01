'use client'
import { removeReading } from '@/actions/removeReading'
import { notify } from '@/lib/notify'
import RemoveButton from './RemoveButton'

type Props = Readonly<{ row?: { id: number } }>

export default function RemoveReadingButton({ row }: Props) {
  if (row?.id) {
    return (
      <RemoveButton
        onClick={() => {
          // Resolve was required to make test work even when mocked?
          Promise.resolve(removeReading(row.id)).then(notify)
        }}
      />
    )
  }
}
