'use server'
import { prisma } from '@/lib/prisma'

/**
 * A server action to fetch all of buckets from the database.
 * @returns An array of buckets. The returned data will include plant info if
 * the bucket contains a plant.
 */
export async function findBuckets() {
  return await prisma.bucket.findMany({
    include: { plant: true },
    orderBy: [{ name: 'asc' }],
  })
}

export type Buckets = Awaited<ReturnType<typeof findBuckets>>
export type Bucket = Buckets[number]
