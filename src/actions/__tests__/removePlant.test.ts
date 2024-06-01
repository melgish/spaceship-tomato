import { describe, expect, it } from 'vitest'
import { removePlant } from '@/actions/removePlant'
import { prisma } from '@/lib/__mocks__/prisma'

describe('when bucket is not in database', () => {
  it('should return a result', async () => {
    prisma.plant.delete.mockRejectedValue('boom')

    const rs = await removePlant(1)

    expect(rs).toMatchSnapshot()
  })
})

describe('when plant is in the database', () => {
  it('should return a result', async () => {
    prisma.plant.delete.mockResolvedValue({ id: 1 } as any)

    const rs = await removePlant(1)

    expect(rs).toMatchSnapshot()
  })
})
