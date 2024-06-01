import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import ReadingsDeck from '@/components/ReadingsDeck'

const data = [
  { id: 1, bucketId: 1 },
  { id: 2, bucketId: 2 },
] as unknown as Parameters<typeof ReadingsDeck>[0]['rows']

vi.mock('@/components/ReadingCard', () => ({
  default: ({ id }: { id: number }) => <div>{id}</div>,
}))

describe('when there are no readings', () => {
  it('should render an empty div', () => {
    const { container } = render(<ReadingsDeck />)

    expect(container).toMatchSnapshot()
  })
})

describe('when there are readings', () => {
  it('should render a card for each reading', () => {
    const { container } = render(<ReadingsDeck className="test" rows={data} />)

    expect(container).toMatchSnapshot()
  })
})
