'use server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { type AddReading, addReadingSchema } from '@/schemas/addReading.schema'

/**
 * Add server action to a new plant to the database.
 * @see ../schemas/addReading.schema.ts for validation rules.
 * @param payload The request payload
 * @returns Ok result when successful, otherwise an Err result.
 */
export async function addReading(payload: AddReading) {
  try {
    const data = await addReadingSchema.parseAsync(payload)
    const created = await prisma.reading.create({ data })
    revalidatePath('/readings')
    return { ok: true, message: 'Reading created', data: created } as const
  } catch (error: any) {
    return { ok: false, message: 'Failed to create reading' } as const
  }
}
