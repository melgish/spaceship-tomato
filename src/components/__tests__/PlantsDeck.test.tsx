import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import PlantsDeck from '@/components/PlantsDeck'

vi.mock('@/components/PlantCard', () => ({
  default: ({ id }: { id: number }) => <div>{id}</div>,
}))

const data = [
  { id: 1, name: 'Plant 1' },
  { id: 2, name: 'Plant 2' },
] as unknown as Parameters<typeof PlantsDeck>[0]['rows']

describe('when there are no readings', () => {
  it('should render an empty div', () => {
    const { container } = render(<PlantsDeck />)

    expect(container).toMatchSnapshot()
  })
})

describe('when there are readings', () => {
  it('should render a card for each reading', () => {
    const { container } = render(<PlantsDeck className="test" rows={data} />)

    expect(container).toMatchSnapshot()
  })
})
