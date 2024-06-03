import { expect, it } from 'vitest'
import { render } from '@testing-library/react'
import ReadingCard from '../ReadingCard'

// A typical reading.
const data = {
  id: 1,
  bucket: {
    id: 1,
    name: 'Test Bucket',
    plant: {
      id: 1,
      name: 'Test Plant',
      minPH: 6,
      maxPH: 7,
    },
    plantId: 1,
  },
  bucketId: 1,
  createdAt: new Date(Date.UTC(2024, 5, 13, 6, 12, 34, 45)),
  ec: 1234,
  ph: 6.5,
  tds: 805,
}

it('should display the supplied reading', () => {
  const { container } = render(<ReadingCard {...data} />)

  expect(container).toMatchSnapshot()
})
