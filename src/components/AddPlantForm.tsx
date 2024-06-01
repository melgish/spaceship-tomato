'use client'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorMessage from '@/components/ErrorMessage'
import ResetButton from '@/components/ResetButton'
import SubmitButton from '@/components/SubmitButton'

import { addPlant } from '@/actions/addPlant'
import { type AddPlant, addPlantSchema } from '@/schemas/addPlant.schema'
import { notify } from '@/lib/notify'

const defaultValues: AddPlant = { name: '', minPH: 6.0, maxPH: 7.0 }
const resolver = zodResolver(addPlantSchema)

export default function AddPlantForm() {
  const id = useId()

  const clear = () => {
    reset(defaultValues)
  }

  const save = async (data: AddPlant) => {
    if (notify(await addPlant(data))) {
      clear()
    }
  }

  const { handleSubmit, formState, register, reset } = useForm({
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
          id={`${id}-name`}
          maxLength={48}
          placeholder="Ex. Tomato"
          required
          size={32}
          type="text"
        />
        <ErrorMessage error={formState.errors?.name} />
      </div>
      <div className="required field">
        <label htmlFor={`${id}-minPH`}>Minimum PH</label>
        <input
          {...register('minPH')}
          id={`${id}-minPH`}
          max={14}
          min={0}
          placeholder="Ex. 7.0"
          required
          size={10}
          step=".1"
          type="number"
        />
        <ErrorMessage error={formState.errors?.minPH} />
      </div>
      <div className="required field">
        <label htmlFor={`${id}-maxPH`}>Maximum PH</label>
        <input
          {...register('maxPH')}
          id={`${id}-maxPH`}
          max={14}
          min={0}
          placeholder="Ex. 7.0"
          required
          size={10}
          step=".1"
          type="number"
        />
        <ErrorMessage error={formState.errors?.maxPH} />
      </div>
      <div className="flex items-center gap-x-2">
        <SubmitButton />
        <ResetButton onClick={clear} />
      </div>
    </form>
  )
}
