'use client'
import type { Buckets } from '@/actions/findBuckets'

import { useId, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorMessage from '@/components/ErrorMessage'
import ResetButton from '@/components/ResetButton'
import SubmitButton from '@/components/SubmitButton'

import { addReading } from '@/actions/addReading'
import { type AddReading, addReadingSchema } from '@/schemas/addReading.schema'
import type { IdAndName } from '@/lib/idAndName'
import { notify } from '@/lib/notify'

const defaultValues: AddReading = { bucketId: 0, ec: 0, ph: 0, tds: 0 }
const resolver = zodResolver(addReadingSchema)

type Props = Readonly<{
  buckets: Buckets
}>

function findNextBucketId(buckets: Buckets, bucketId: number) {
  if (bucketId > 0) {
    const index = buckets.findIndex((b) => b.id === bucketId)
    return buckets[index + 1]?.id ?? 0
  }
  return 0
}

export default function AddReadingForm({ buckets }: Props) {
  const refSelectDiv = useRef<HTMLDivElement>(null)
  const id = useId()

  const clear = (moveNext: boolean) => {
    let bucketId = 0
    if (moveNext) {
      // Attempt to advance to next bucket in the list.
      bucketId = findNextBucketId(buckets, Number(getValues().bucketId))
    }
    reset({ ...defaultValues, bucketId })

    // Set focus back to the select element.
    // react-hook-form doesn't forward focusVisible option when calling it's
    // setFocus. It's easier here to start 1 level up and dig down.
    const el = refSelectDiv.current?.querySelector('select')
    el?.focus({ focusVisible: true } as FocusOptions)
  }

  const save = async (data: AddReading) => {
    if (notify(await addReading(data))) {
      clear(true)
    }
  }

  const { getValues, handleSubmit, formState, register, reset } = useForm<AddReading>({
    defaultValues: { ...defaultValues },
    resolver,
    shouldFocusError: true,
  })

  return (
    <form className="flex gap-x-3" noValidate onSubmit={handleSubmit(save)}>
      <div className="required field" ref={refSelectDiv}>
        <label htmlFor={`${id}-bucketId`}>Bucket</label>
        <select
          {...register('bucketId')}
          autoFocus
          className="py-1.5"
          style={{ width: '20ch' }}
          id={`${id}-bucketId`}
        >
          <option value={0}>None</option>
          {buckets.map((p: IdAndName) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <ErrorMessage error={formState.errors?.bucketId} />
      </div>

      <div className="required field">
        <label htmlFor={`${id}-ph`}>PH</label>
        <input
          {...register('ph')}
          id={`${id}-ph`}
          max={14}
          min={0}
          placeholder="Ex. 7.0"
          required
          size={10}
          step=".1"
          type="number"
        />
        <ErrorMessage error={formState.errors?.ph} />
      </div>

      <div className="required field">
        <label htmlFor={`${id}-ec`}>EC (&micro;S/cm)</label>
        <input
          {...register('ec')}
          id={`${id}-ec`}
          max={14}
          min={0}
          placeholder="Ex. 7.0"
          required
          size={10}
          step=".1"
          type="number"
        />
        <ErrorMessage error={formState.errors?.ec} />
      </div>

      <div className="required field">
        <label htmlFor={`${id}-tds`}>TDS (ppm)</label>
        <input
          {...register('tds')}
          id={`${id}-tds`}
          max={14}
          min={0}
          placeholder="Ex. 7.0"
          required
          size={10}
          step=".1"
          type="number"
        />
        <ErrorMessage error={formState.errors?.tds} />
      </div>

      <div className="flex items-center gap-x-2">
        <SubmitButton />
        <ResetButton onClick={() => clear(false)} />
      </div>
    </form>
  )
}
