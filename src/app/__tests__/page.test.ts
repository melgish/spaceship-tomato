import { type Mock, beforeEach, expect, it, vi, describe } from 'vitest'
import { render } from '@testing-library/react'
import { findBuckets } from '@/actions/findBuckets'
import HomePage from '@/app/page'

vi.mock('@/actions/findBuckets')

beforeEach(() => {
  ;(findBuckets as Mock).mockResolvedValue([])
})

describe('when there is no data', () => {
  it('should render', async () => {
    const { container } = render(await HomePage())
    expect(container).toMatchSnapshot()
  })
})

