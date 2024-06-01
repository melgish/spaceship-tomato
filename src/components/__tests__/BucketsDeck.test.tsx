import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import BucketsDeck from '@/components/BucketsDeck'

vi.mock('@/components/BucketCard', () => ({
  default: ({ id }: { id: number }) => <div>{id}</div>,
}))

const data = [
  { id: 1, name: 'Bucket 1' },
  { id: 2, name: 'Bucket 2' },
] as unknown as Parameters<typeof BucketsDeck>[0]['rows']

describe('when there are no readings', () => {
  it('should render an empty div', () => {
    const { container } = render(<BucketsDeck />)

    expect(container).toMatchSnapshot()
  })
})

describe('when there are readings', () => {
  it('should render a card for each reading', () => {
    const { container } = render(<BucketsDeck className="test" rows={data} />)

    expect(container).toMatchSnapshot()
  })
})
