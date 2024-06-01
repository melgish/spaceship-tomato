import { expect, it } from 'vitest'
import { findReadings } from '@/actions/findReadings'
import { prisma } from '@/lib/__mocks__/prisma'

it('should return database results', async () => {
  prisma.bucket.findMany.mockResolvedValue([])

  const rs = await findReadings()

  expect(rs).toBeUndefined()
})
