import { describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import RemovePlantButton from '@/components/RemovePlantButton'
import { removePlant } from '@/actions/removePlant'

const data = { id: 1 }

vi.mock('@/actions/removePlant', () => ({
  removePlant: vi.fn().mockResolvedValue({
    ok: true,
    message: 'Bucket deleted',
    data: 1,
  }),
}))
vi.mock('@/lib/notify', () => ({ notify: vi.fn() }))

describe('when row is not supplied', () => {
  it('should not render', () => {
    const { container } = render(<RemovePlantButton />)

    expect(container).toMatchSnapshot()
  })
})

describe('when row is supplied', () => {
  it('should render', () => {
    const { container } = render(<RemovePlantButton row={data} />)

    expect(container).toMatchSnapshot()
  })
})

describe('when button is clicked', () => {
  it('should invoke removePlant', async () => {
    render(<RemovePlantButton row={data} />)

    await act(() => fireEvent.click(screen.getByRole('button')))

    expect(removePlant).toBeCalled()
  })
})
