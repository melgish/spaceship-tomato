import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import BucketTrend from '../BucketTrend'

const bucket = {
  id: 1,
  name: 'Test Bucket',
  plant: null,
  plantId: 0,
  readings: [],
}

const readings = [
  {
    id: 1,
    bucketId: 1,
    createdAt: new Date(Date.UTC(2024, 5, 2, 9, 48, 25)),
    ph: 6.3,
    ec: 1500,
    tds: 811,
  },
]

describe('When bucket has no readings', () => {
  it('should render', () => {
    const { container } = render(
      <BucketTrend bucket={bucket} xKey="ec" yMin={750} yMax={2000} />,
    )

    expect(container).toMatchSnapshot()
  })
})

describe('When bucket has readings', () => {
  it('should render', () => {
    const { container } = render(
      <BucketTrend bucket={{ ...bucket, readings }} xKey="ec" yMin={750} yMax={2000} />,
    )

    expect(container).toMatchSnapshot()
  })
})
