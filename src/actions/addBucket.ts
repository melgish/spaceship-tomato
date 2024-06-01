'use server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { type AddBucket, addBucketSchema } from '@/schemas/addBucket.schema'

/**
 * Add server action to a new bucket to the database.
 * @see ../schemas/addBucket.schema.ts for validation rules.
 * @param payload The request payload
 * @returns Ok result when successful, otherwise an Err result.
 */
export async function addBucket(payload: AddBucket) {
  try {
    const data = await addBucketSchema.parseAsync(payload)
    const created = await prisma.bucket.create({
      data: { ...data, plantId: data.plantId || null },
    })
    revalidatePath('/buckets')
    return { ok: true, message: 'Bucket created', data: created } as const
  } catch (error: any) {
    return { ok: false, message: 'Failed to create bucket' } as const
  }
}
