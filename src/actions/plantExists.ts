'use server'
import { prisma } from '@/lib/prisma'

/**
 * A server action to validate that a plant exists in the database.
 * @param id Id of plant to search for.
 * @returns true if plant exists, otherwise false.
 */
export async function plantExists(id: number) {
  return id > 0 && (await prisma.plant.count({ where: { id } })) > 0
}
