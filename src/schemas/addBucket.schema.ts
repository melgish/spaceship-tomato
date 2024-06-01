import { z } from 'zod'
import { plantExists } from '@/actions/plantExists'
import { bucketNameIsUnique } from '@/actions/bucketNameIsUnique'

/**
 * Schema to validate the payload for addBucket.
 * A bucket must have a unique name.
 * A bucket may be assigned an existing plant, or no plant
 * @see ../actions/addBucket.ts
 */
export const addBucketSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required'),
    plantId: z.coerce.number().int().min(0),
  })
  .strip()
  .refine((d) => d.name && bucketNameIsUnique(d.name), {
    message: 'A bucket with this name already exists',
    path: ['name'],
  })
  .refine((d) => !d.plantId || plantExists(d.plantId), {
    message: 'The selected plant does not exist',
    path: ['plantId'],
  })

export type AddBucket = z.infer<typeof addBucketSchema>
