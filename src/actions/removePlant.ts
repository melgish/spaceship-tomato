'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

/**
 * A server action to remove a single plant from the system.
 * If the plant is associated with a bucket, that plantId value of that bucket
 * will be set to NULL.
 * @param id Id of the plant to remove.
 * @returns an Ok result if the identified plant was removed, otherwise an
 *  Err result.
 */
export async function removePlant(id: number) {
  try {
    await prisma.plant.delete({ where: { id }, select: { id: true } })
    revalidatePath('/plants')
    return { ok: true, message: 'Plant deleted', data: id } as const
  } catch (error: any) {
    return { ok: false, message: 'Failed to remove plant' } as const
  }
}
