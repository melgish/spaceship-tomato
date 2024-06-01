import { describe, expect, it } from 'vitest'
import { removeReading } from '@/actions/removeReading'
import { prisma } from '@/lib/__mocks__/prisma'

describe('when bucket is not in database', () => {
  it('should return a result', async () => {
    prisma.reading.delete.mockRejectedValue('boom')

    const rs = await removeReading(1)

    expect(rs).toMatchSnapshot()
  })
})

describe('when reading is in the database', () => {
  it('should return a result', async () => {
    prisma.reading.delete.mockResolvedValue({ id: 1 } as any)

    const rs = await removeReading(1)

    expect(rs).toMatchSnapshot()
  })
})
