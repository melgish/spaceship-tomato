import { expect, it } from 'vitest'
import { render } from '@testing-library/react'
import PlantCard from '../PlantCard'

// A typical Plant.
const data = {
  id: 1,
  name: 'Test Plant',
  minPH: 6,
  maxPH: 7,
}

it('should display the supplied plant', () => {
  const { container } = render(<PlantCard {...data} />)

  expect(container).toMatchSnapshot()
})
