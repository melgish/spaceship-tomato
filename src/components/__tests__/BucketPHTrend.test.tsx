import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import BucketPHTrend from '../BucketPHTrend'

const bucket = {
  id: 1,
  name: 'Test Bucket',
  plant: { id: 1, name: 'Test Plant', minPH: 6.1, maxPH: 7.0 },
  plantId: 1,
  readings: [],
}

const readings = [
  {
    id: 1,
    bucketId: 1,
    createdAt: new Date(2024, 5, 2, 9, 48, 25),
    ph: 6.3,
    ec: 1500,
    tds: 811,
  },
]

describe('When bucket has no readings', () => {
  it('should render', () => {
    const { container } = render(<BucketPHTrend bucket={bucket} />)

    expect(container).toMatchSnapshot()
  })
})

describe('When bucket has readings', () => {
  it('should render', () => {
    const { container } = render(<BucketPHTrend bucket={{ ...bucket, readings }} />)

    expect(container).toMatchSnapshot()
  })
})
