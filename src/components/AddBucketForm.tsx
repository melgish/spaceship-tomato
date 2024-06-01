'use client'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import ErrorMessage from '@/components/ErrorMessage'
import ResetButton from '@/components/ResetButton'
import SubmitButton from '@/components/SubmitButton'
import { addBucket } from '@/actions/addBucket'
import { type AddBucket, addBucketSchema } from '@/schemas/addBucket.schema'
import type { IdAndName } from '@/lib/idAndName'
import { notify } from '@/lib/notify'

const defaultValues: AddBucket = { name: '', plantId: 0 }
const resolver = zodResolver(addBucketSchema)

type Props = Readonly<{ plants: IdAndName[] }>

export default function AddBucketForm({ plants }: Props) {
  const id = useId()

  const clear = () => {
    reset(defaultValues)
  }

  const save = async (data: AddBucket) => {
    if (notify(await addBucket(data))) {
      clear()
    }
  }

  const { handleSubmit, formState, register, reset } = useForm<AddBucket>({
    defaultValues,
    resolver,
    shouldFocusError: true,
  })

  return (
    <form className="flex gap-x-3" noValidate onSubmit={handleSubmit(save)}>
      <div className="required field">
        <label htmlFor={`${id}-name`}>Name</label>
        <input
          {...register('name')}
          autoComplete="off"
          id={`${id}-name`}
          maxLength={24}
          placeholder="Ex. #1"
          required
          size={24}
          type="text"
        />
        <ErrorMessage error={formState.errors?.name} />
      </div>
      <div className="field">
        <label htmlFor={`${id}-plantId`}>Plant</label>
        <select
          {...register('plantId')}
          className="py-1.5"
          style={{ width: '32ch' }}
          id={`${id}-plantId`}
        >
          <option value={0}>None</option>
          {plants.map((p: IdAndName) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <ErrorMessage error={formState.errors.plantId} />
      </div>
      <div className="flex items-center gap-x-2">
        <SubmitButton disabled={formState.isSubmitting} />
        <ResetButton disabled={formState.isSubmitting} onClick={clear} />
      </div>
    </form>
  )
}
