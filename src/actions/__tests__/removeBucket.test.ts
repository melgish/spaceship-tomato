import { describe, expect, it } from 'vitest'
import { removeBucket } from '@/actions/removeBucket'
import { prisma } from '@/lib/__mocks__/prisma'

describe('when bucket is not in database', () => {
  it('should return a result', async () => {
    prisma.bucket.delete.mockRejectedValue('boom')

    const rs = await removeBucket(1)

    expect(rs.ok).toBeFalsy()
    expect(rs).toMatchSnapshot()
  })
})

describe('when bucket is in the database', () => {
  it('should return a result', async () => {
    prisma.bucket.delete.mockResolvedValue({ id: 1 } as any)

    const rs = await removeBucket(1)

    expect(rs).toMatchSnapshot()
  })
})
