import { describe, expect, it, vi } from 'vitest'
import { addBucket } from '@/actions/addBucket'
import { prisma } from '@/lib/__mocks__/prisma'

// A typical bucket
const data = { id: 1, name: 'Empty Bucket', plantId: 0 }

// Mock db-based validation to succeed.
vi.mock('@/actions/bucketNameIsUnique', () => ({
  bucketNameIsUnique: async () => true,
}))
vi.mock('@/actions/plantExists', () => ({
  plantExists: async () => true,
}))

describe('when input is not valid', () => {
  it('should resolve to a failure', async () => {
    const rs = await addBucket({ ...data, name: '' })

    expect(prisma.bucket.create).not.toBeCalled()
    expect(rs).toMatchSnapshot()
  })
})

describe('when input is valid', () => {
  it('should resolve with success', async () => {
    prisma.bucket.create.mockResolvedValue(data)

    const rs = await addBucket({ ...data })

    expect(prisma.bucket.create).toBeCalled()
    expect(rs).toMatchSnapshot()
  })
})
