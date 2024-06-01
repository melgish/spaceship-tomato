'use server'
import { prisma } from '@/lib/prisma'

/**
 * A server action to validate that a bucket exists in the database.
 * @param id Id of bucket to search for.
 * @returns true if bucket exists, otherwise false.
 */
export async function bucketExists(id: number = 0) {
  return id > 0 && (await prisma.bucket.count({ where: { id } })) > 0
}
