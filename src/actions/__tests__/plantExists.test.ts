import { describe, expect, it, vi } from 'vitest'
import { plantExists } from '@/actions/plantExists'
import { prisma } from '@/lib/__mocks__/prisma'

describe('when id is negative', () => {
  it('should not query database', async () => {
    const rs = await plantExists(-1)

    expect(prisma.plant.count).not.toHaveBeenCalled()
    expect(rs).toBeFalsy()
  })
})

describe('when plant does not exist', () => {
  it('should return falsy', async () => {
    prisma.plant.count.mockResolvedValue(0)

    const rs = await plantExists(1)

    expect(prisma.plant.count).toHaveBeenCalled()
    expect(rs).toBeFalsy()
  })
})

describe('when plant exists', () => {
  it('should return falsy', async () => {
    prisma.plant.count.mockResolvedValue(1)

    const rs = await plantExists(1)

    expect(prisma.plant.count).toHaveBeenCalled()
    expect(rs).toBeTruthy()
  })
})
