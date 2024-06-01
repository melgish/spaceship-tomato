import { expect, it, vi } from 'vitest'
import { notify } from '@/lib/notify'
import toast from 'react-hot-toast'

vi.mock('react-hot-toast')

it('should notify a success', () => {
  notify({ ok: true, message: 'OK' })

  expect(toast.success).toBeCalledWith('OK')
})

it('should notify failure', () => {
  notify({ ok: false, message: 'BOOM' })

  expect(toast.error).toBeCalledWith('BOOM')
})
