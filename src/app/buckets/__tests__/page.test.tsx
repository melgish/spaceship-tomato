import { type Mock, beforeEach, expect, it, vi, describe } from 'vitest'
import { render } from '@testing-library/react'
import { findPlants } from '@/actions/findPlants'
import PlantsPage from '@/app/plants/page'

vi.mock('@/actions/findPlants')

beforeEach(() => {
  ;(findPlants as Mock).mockResolvedValue([])
})

describe('when there is no data', () => {
  it('should render', async () => {
    const { container } = render(await PlantsPage())
    expect(container).toMatchSnapshot()
  })
})
