'use client'
import { removePlant } from '@/actions/removePlant'
import { notify } from '@/lib/notify'
import RemoveButton from './RemoveButton'

type Props = Readonly<{ row?: { id: number } }>

export default function RemovePlantButton({ row }: Props) {
  if (row?.id) {
    return (
      <RemoveButton
        onClick={() => {
          // Resolve was required to make test work even when mocked?
          Promise.resolve(removePlant(row.id)).then(notify)
        }}
      />
    )
  }
}
