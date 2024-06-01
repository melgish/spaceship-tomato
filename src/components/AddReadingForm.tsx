'use client'
import type { Buckets } from '@/actions/findBuckets'

import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorMessage from '@/components/ErrorMessage'
import ResetButton from '@/components/ResetButton'
import SubmitButton from '@/components/SubmitButton'

import { addReading } from '@/actions/addReading'
import { type AddReading, addReadingSchema } from '@/schemas/addReading.schema'
import type { IdAndName } from '@/lib/idAndName'
import { notify } from '@/lib/notify'

const defaultValues: AddReading = { bucketId: -1, ec: 0, ph: 0, tds: 0 }
const resolver = zodResolver(addReadingSchema)

type Props = Readonly<{
  buckets: Buckets
  bucketId?: number
}>

export default function AddReadingForm({ buckets, bucketId = 0 }: Props) {
  const id = useId()

  const clear = () => {
    reset({ ...defaultValues, bucketId })
  }

  const save = async (data: AddReading) => {
    if (notify(await addReading(data))) {
      clear()
    }
  }

  const { handleSubmit, formState, register, reset } = useForm<AddReading>({
    defaultValues: { ...defaultValues, bucketId },
    resolver,
    shouldFocusError: true,
  })

  return (
    <form className="flex gap-x-3" noValidate onSubmit={handleSubmit(save)}>
      <div className="required field">
        <label htmlFor={`${id}-bucketId`}>Bucket</label>
        <select
          {...register('bucketId')}
          className="py-1.5"
          style={{ width: '20ch' }}
          id={`${id}-bucketId`}
          disabled={bucketId > 0}
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
        <ResetButton onClick={clear} />
      </div>
    </form>
  )
}
