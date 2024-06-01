import { describe, expect, it, vi } from 'vitest'
import { addPlant } from '@/actions/addPlant'
import { prisma } from '@/lib/__mocks__/prisma'

// A typical plant
const data = {
  id: 1,
  minPH: 5,
  maxPH: 8,
  name: 'Fred the Tomato',
}

// Mock db-based validation to succeed.
vi.mock('@/actions/plantNameIsUnique', () => ({
  plantNameIsUnique: async () => true,
}))

describe('when input is not valid', () => {
  it('should resolve to a failure', async () => {
    const rs = await addPlant({ ...data, name: '' })

    expect(prisma.plant.create).not.toBeCalled()
    expect(rs).toMatchSnapshot()
  })
})

describe('when input is valid', () => {
  it('should resolve with success', async () => {
    prisma.plant.create.mockResolvedValue(data)

    const rs = await addPlant({ ...data })

    expect(prisma.plant.create).toBeCalled()
    expect(rs).toMatchSnapshot()
  })
})
