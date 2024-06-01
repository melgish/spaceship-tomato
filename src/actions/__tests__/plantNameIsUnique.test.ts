import { describe, expect, it, vi } from 'vitest'
import { plantNameIsUnique } from '@/actions/plantNameIsUnique'
import { prisma } from '@/lib/__mocks__/prisma'

describe('when plant name is not unique', () => {
  it('should return falsy', async () => {
    prisma.plant.count.mockResolvedValue(1)

    const rs = await plantNameIsUnique('fred')

    expect(rs).toBeFalsy()
    expect(prisma.plant.count).toBeCalledWith({
      where: expect.objectContaining({ name: 'fred', id: undefined }),
    })
  })
})

describe('when plant name is unique', () => {
  it('should return falsy', async () => {
    prisma.plant.count.mockResolvedValue(0)

    const rs = await plantNameIsUnique('fred', 3)

    expect(rs).toBeTruthy()
    expect(prisma.plant.count).toBeCalledWith({
      where: expect.objectContaining({ name: 'fred', id: { not: 3 } }),
    })
  })
})
