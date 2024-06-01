import { expect, it } from 'vitest'
import { findPlants } from '@/actions/findPlants'
import { prisma } from '@/lib/__mocks__/prisma'

it('should return database results', async () => {
  prisma.bucket.findMany.mockResolvedValue([])

  const rs = await findPlants()

  expect(rs).toBeUndefined()
})
