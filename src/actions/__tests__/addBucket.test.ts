import { type Mock, describe, expect, it, vi, beforeEach } from 'vitest'
import { addBucket } from '@/actions/addBucket'
import { prisma } from '@/lib/__mocks__/prisma'
import { plantExists } from '@/actions/plantExists'
import { bucketNameIsUnique } from '@/actions/bucketNameIsUnique'

// A typical bucket
const data = { id: 1, name: 'Empty Bucket', plantId: 0 }

// Mock db-based validation to succeed.
vi.mock('@/actions/bucketNameIsUnique')
vi.mock('@/actions/plantExists')

beforeEach(() => {
  ;(plantExists as Mock).mockResolvedValue(true)
  ;(bucketNameIsUnique as Mock).mockResolvedValue(true)
})

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

describe('when input includes plant', () => {
  it('should resolve with success', async () => {
    prisma.bucket.create.mockResolvedValue(data)

    const rs = await addBucket({ ...data, plantId: 1 })

    expect(prisma.bucket.create).toBeCalled()
    expect(rs).toMatchSnapshot()
  })
})

describe('when input name is duplicate', () => {
  it('should resolve to a failure', async () => {
    ;(bucketNameIsUnique as Mock).mockResolvedValue(false)
    const rs = await addBucket({ ...data, name: '' })

    expect(prisma.bucket.create).not.toBeCalled()
    expect(rs).toMatchSnapshot()
  })
})

describe('when plant does not exist', () => {
  it('should resolve to a failure', async () => {
    ;(plantExists as Mock).mockResolvedValue(false)
    const rs = await addBucket({ ...data, name: '' })

    expect(prisma.bucket.create).not.toBeCalled()
    expect(rs).toMatchSnapshot()
  })
})
