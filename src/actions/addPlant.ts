'use server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { type AddPlant, addPlantSchema } from '@/schemas/addPlant.schema'

/**
 * Add server action to a new plant to the database.
 * @see ../schemas/addPlant.schema.ts for validation rules.
 * @param payload The request payload
 * @returns Ok result when successful, otherwise an Err result.
 */
export async function addPlant(payload: AddPlant) {
  try {
    const data = await addPlantSchema.parseAsync(payload)
    const created = await prisma.plant.create({ data })
    revalidatePath('/plants')
    return { ok: true, message: 'Plant created', data: created } as const
  } catch (error: any) {
    return { ok: false, message: 'Failed to create plant' } as const
  }
}
