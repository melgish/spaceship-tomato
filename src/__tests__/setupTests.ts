import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
;(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true

vi.mock('@/lib/prisma')
vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }))
vi.mock('react', async () => ({
  ...(await vi.importActual('react')),
  cache: <T>(fn: T) => fn,
}))

afterEach(() => {
  cleanup()
  vi.resetAllMocks()
})
