import { describe, expect, it, vi } from 'vitest'
import { bucketNameIsUnique } from '@/actions/bucketNameIsUnique'
import { prisma } from '@/lib/__mocks__/prisma'

describe('when bucket name is not unique', () => {
  it('should return falsy', async () => {
    prisma.bucket.count.mockResolvedValue(1)

    const rs = await bucketNameIsUnique('fred')

    expect(rs).toBeFalsy()
    expect(prisma.bucket.count).toBeCalledWith({
      where: expect.objectContaining({ name: 'fred', id: undefined }),
    })
  })
})

describe('when bucket name is unique', () => {
  it('should return falsy', async () => {
    prisma.bucket.count.mockResolvedValue(0)

    const rs = await bucketNameIsUnique('fred', 3)

    expect(rs).toBeTruthy()
    expect(prisma.bucket.count).toBeCalledWith({
      where: expect.objectContaining({ name: 'fred', id: { not: 3 } }),
    })
  })
})
