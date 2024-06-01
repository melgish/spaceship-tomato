'use server'
import { prisma } from '@/lib/prisma'

/**
 * A server action to validate that the name of a plant is unique.
 * @param name Name of the plant to test.
 * @param id Optional id of plant to exclude when editing an existing plant.
 * @returns true if the name exists on another plant, otherwise false.
 */
export async function plantNameIsUnique(name: string, id: number = 0) {
  const where = { name, id: (id > 0 && { not: id }) || undefined }
  return (await prisma.plant.count({ where })) === 0
}
