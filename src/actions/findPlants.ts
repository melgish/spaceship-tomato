'use server'
import { prisma } from '@/lib/prisma'

/**
 * A server action to fetch all of plants from the database.
 * @returns An array of plants.
 */
export async function findPlants() {
  return await prisma.plant.findMany({
    orderBy: [{ name: 'asc' }],
  })
}

export type Plants = Awaited<ReturnType<typeof findPlants>>
export type Plant = Plants[number]
