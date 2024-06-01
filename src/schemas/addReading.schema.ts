import { z } from 'zod'
import { bucketExists } from '@/actions/bucketExists'

const phRange = 'PH Range [0, 14]'

/**
 * Schema to validate the payload for addReading.
 * A reading must be associated with an existing bucket.
 *  The bucket is not required to contain a plant.
 * A reading must include a PH value in range [0, 14] inclusive.
 * A reading must include a TDS (ppm) value greater of 1 or more.
 * A reading must include an EC (uS/cm) value greater of 1 or more.
 * Readings are assigned createdAt by the database.
 * @see ../actions/addReading.ts
 */
export const addReadingSchema = z
  .object({
    ph: z.coerce.number().min(0, phRange).max(14, phRange),
    tds: z.coerce.number().min(1, 'TDS >= 1'),
    ec: z.coerce.number().min(1, 'EC >= 1'),
    bucketId: z.coerce.number().min(1, 'A bucket is required'),
  })
  .strip()
  .refine((d) => d.bucketId && bucketExists(d.bucketId), {
    message: 'The selected bucket does not exist',
    path: ['bucketId'],
  })

export type AddReading = z.infer<typeof addReadingSchema>
