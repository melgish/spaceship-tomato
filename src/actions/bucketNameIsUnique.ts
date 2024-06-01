'use server'
import { prisma } from '@/lib/prisma'

/**
 * A server action to validate that the name of a bucket is unique.
 * @param name Name of the bucket to test.
 * @param id Optional id of bucket to exclude when editing an existing bucket.
 * @returns true if the name exists on another bucket, otherwise false.
 */
export async function bucketNameIsUnique(name: string, id: number = 0) {
  const where = { name, id: (id > 0 && { not: id }) || undefined }
  return (await prisma.bucket.count({ where })) === 0
}
