'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

/**
 * A server action to remove a single bucket from the system.
 * If a bucket is deleted, any readings for that bucket will also be removed.
 * @param id Id of the bucket to remove.
 * @returns an Ok result if the identified bucket was removed, otherwise an
 *  Err result.
 */
export async function removeBucket(id: number) {
  try {
    await prisma.bucket.delete({ where: { id }, select: { id: true } })
    revalidatePath('/buckets')
    return { ok: true, message: 'Bucket deleted', data: id } as const
  } catch (error: any) {
    return { ok: false, message: 'Failed to remove bucket' } as const
  }
}
