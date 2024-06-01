'use server'
import { prisma } from '@/lib/prisma'

/**
 * A server action to fetch all readings from the database.
 * @returns An array of readings.  Readings will include bucket and plant info.
 */
export async function findReadings() {
  return await prisma.reading.findMany({
    orderBy: [{ createdAt: 'desc' }],
    include: {
      bucket: {
        include: {
          plant: true,
        },
      },
    },
  })
}

export type Readings = Awaited<ReturnType<typeof findReadings>>
export type Reading = Readings[number]
