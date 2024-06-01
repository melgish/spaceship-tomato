'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

/**
 * A server action to remove a single reading from the system.
 * @param id Id of the reading to remove.
 * @returns an Ok result if the identified reading was removed, otherwise an
 *  Err result.
 */
export async function removeReading(id: number) {
  try {
    await prisma.reading.delete({ where: { id }, select: { id: true } })
    revalidatePath('/readings')
    return { ok: true, message: 'Reading deleted', data: id } as const
  } catch (error: any) {
    return { ok: false, message: 'Failed to remove reading' } as const
  }
}
