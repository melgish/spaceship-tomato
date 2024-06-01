import { expect, it, vi } from 'vitest'

// Make sure mocked module does load.
it('should load', async () => {
  const mod = await vi.importActual('@/lib/prisma')
  expect(mod).toBeTruthy()
})
