import { type Mock, beforeEach, expect, it, vi, describe } from 'vitest'
import { render } from '@testing-library/react'
import { findBuckets } from '@/actions/findBuckets'
import { findPlants } from '@/actions/findPlants'
import BucketsPage from '@/app/buckets/page'

vi.mock('@/actions/findBuckets')
vi.mock('@/actions/findPlants')

beforeEach(() => {
  ;(findBuckets as Mock).mockResolvedValue([])
  ;(findPlants as Mock).mockResolvedValue([])
})

describe('when there is no data', () => {
  it('should render', async () => {
    const { container } = render(await BucketsPage())
    expect(container).toMatchSnapshot()
  })
})
