import { describe, expect, it, vi } from 'vitest'
import { addReading } from '@/actions/addReading'
import { prisma } from '@/lib/__mocks__/prisma'

// A typical reading.
const data = {
  id: 1,
  bucketId: 1,
  createdAt: new Date(Date.UTC(2024, 5, 13, 6, 12, 34, 45)),
  ec: 1234,
  ph: 6.5,
  tds: 805,
}
// Mock db-based validation to succeed.
vi.mock('@/actions/bucketExists', () => ({
  bucketExists: async () => true,
}))

describe('when input is not valid', () => {
  it('should resolve to a failure', async () => {
    const rs = await addReading({ ...data, ph: 16.0 })

    expect(prisma.reading.create).not.toBeCalled()
    expect(rs).toMatchSnapshot()
  })
})

describe('when input is valid', () => {
  it('should resolve with success', async () => {
    prisma.reading.create.mockResolvedValue(data)

    const rs = await addReading({ ...data })

    expect(prisma.reading.create).toBeCalled()
    expect(rs).toMatchSnapshot()
  })
})
