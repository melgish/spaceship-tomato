import { describe, expect, it, vi } from 'vitest'
import { bucketExists } from '@/actions/bucketExists'
import { prisma } from '@/lib/__mocks__/prisma'

describe('when id is negative', () => {
  it('should not query database', async () => {
    const rs = await bucketExists(-1)

    expect(prisma.bucket.count).not.toHaveBeenCalled()
    expect(rs).toBeFalsy()
  })
})

describe('when bucket does not exist', () => {
  it('should return falsy', async () => {
    prisma.bucket.count.mockResolvedValue(0)

    const rs = await bucketExists(1)

    expect(prisma.bucket.count).toHaveBeenCalled()
    expect(rs).toBeFalsy()
  })
})

describe('when bucket exists', () => {
  it('should return falsy', async () => {
    prisma.bucket.count.mockResolvedValue(1)

    const rs = await bucketExists(1)

    expect(prisma.bucket.count).toHaveBeenCalled()
    expect(rs).toBeTruthy()
  })
})
