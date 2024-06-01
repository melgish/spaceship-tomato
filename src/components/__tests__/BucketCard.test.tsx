import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import BucketCard from '../BucketCard'

// A typical Plant.
const data = {
  id: 1,
  name: 'Test Bucket',
  plantId: 1,
  plant: {
    id: 1,
    name: 'Test Plant',
    maxPH: 7.2,
    minPH: 6.1,
  },
}

describe('when bucket holds a plant', () => {
  it('should render with plant info', () => {
    const { container } = render(<BucketCard {...data} />)

    expect(container).toMatchSnapshot()
  })
})

describe('when bucket does not hold a plant', () => {
  it('should render without plant info', () => {
    const props = { ...data, plantId: 0, plant: null }
    const { container } = render(<BucketCard {...props} />)

    expect(container).toMatchSnapshot()
  })
})
