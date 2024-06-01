import { z } from 'zod'
import { plantNameIsUnique } from '@/actions/plantNameIsUnique'

const range = 'PH Range [0, 14]'

/**
 * Schema to validate the payload for addPlant.
 * A plant must have a unique name.
 * A plant must include a PH range
 *   PH range values must be between 0 and 14, inclusively
 *   The minPH value must be less than or equal to maxPH.
 * @see ../actions/addPlant.ts
 */
export const addPlantSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required'),
    minPH: z.coerce.number().min(0, range).max(14, range),
    maxPH: z.coerce.number().min(0, range).max(14, range),
  })
  .strip()
  .refine((d) => d.minPH <= d.maxPH, {
    message: 'Min PH must be less than or equal to Max PH',
    path: ['minPH'],
  })
  .refine((d) => d.name && plantNameIsUnique(d.name), {
    message: 'A plant with this name already exists',
    path: ['name'],
  })

export type AddPlant = z.infer<typeof addPlantSchema>
