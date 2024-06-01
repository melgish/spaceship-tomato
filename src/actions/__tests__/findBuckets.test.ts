import { expect, it } from 'vitest'
import { findBuckets } from '@/actions/findBuckets'
import { prisma } from '@/lib/__mocks__/prisma'

it('should return database results', async () => {
  prisma.bucket.findMany.mockResolvedValue([])

  const rs = await findBuckets()

  expect(rs).toEqual([])
})
