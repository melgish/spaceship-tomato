import { describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import RemoveReadingButton from '@/components/RemoveReadingButton'
import { removeReading } from '@/actions/removeReading'

const data = { id: 1 }

vi.mock('@/actions/removeReading', () => ({
  removeReading: vi.fn().mockResolvedValue({
    ok: true,
    message: 'Bucket deleted',
    data: 1,
  }),
}))
vi.mock('@/lib/notify', () => ({ notify: vi.fn() }))

describe('when row is not supplied', () => {
  it('should not render', () => {
    const { container } = render(<RemoveReadingButton />)

    expect(container).toMatchSnapshot()
  })
})

describe('when row is supplied', () => {
  it('should render', () => {
    const { container } = render(<RemoveReadingButton row={data} />)

    expect(container).toMatchSnapshot()
  })
})

describe('when button is clicked', () => {
  it('should invoke removeReading', async () => {
    render(<RemoveReadingButton row={data} />)

    await act(() => fireEvent.click(screen.getByRole('button')))

    expect(removeReading).toBeCalled()
  })
})
