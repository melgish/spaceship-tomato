import { describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import RemoveBucketButton from '@/components/RemoveBucketButton'
import { removeBucket } from '@/actions/removeBucket'

const data = { id: 1 }

vi.mock('@/actions/removeBucket', () => ({
  removeBucket: vi.fn().mockResolvedValue({
    ok: true,
    message: 'Bucket deleted',
    data: 1,
  }),
}))
vi.mock('@/lib/notify', () => ({ notify: vi.fn() }))

describe('when row is not supplied', () => {
  it('should not render', () => {
    const { container } = render(<RemoveBucketButton />)

    expect(container).toMatchSnapshot()
  })
})

describe('when row is supplied', () => {
  it('should render', () => {
    const { container } = render(<RemoveBucketButton row={data} />)

    expect(container).toMatchSnapshot()
  })
})

describe('when button is clicked', () => {
  it('should invoke removeBucket', async () => {
    render(<RemoveBucketButton row={data} />)

    await act(() => fireEvent.click(screen.getByRole('button')))

    expect(removeBucket).toBeCalled()
  })
})
