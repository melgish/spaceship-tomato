import { type Mock, beforeEach, expect, it, vi, describe } from 'vitest'
import { render } from '@testing-library/react'
import { findBuckets } from '@/actions/findBuckets'
import { findReadings } from '@/actions/findReadings'
import ReadingsPage from '@/app/readings/page'

vi.mock('@/actions/findReadings')
vi.mock('@/actions/findBuckets')

beforeEach(() => {
  ;(findBuckets as Mock).mockResolvedValue([])
  ;(findReadings as Mock).mockResolvedValue([])
})

describe('when there is no data', () => {
  it('should render', async () => {
    const { container } = render(await ReadingsPage())
    expect(container).toMatchSnapshot()
  })
})

describe('when there is bucket data', () => {
  it('should render data', async () => {
    ;(findBuckets as Mock).mockResolvedValue([
      { id: 1, name: 'Test Bucket', plantId: 0, plant: null },
    ])

    const { container } = render(await ReadingsPage())
    expect(container).toMatchSnapshot()
  })
})
