import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import PHRange from '@/components/PHRange'

const data = { maxPH: 8.22, minPH: 6.41 }

describe('when range is not supplied', () => {
  it('should return falsy value', () => {
    const { container } = render(<PHRange />)

    expect(container).toMatchSnapshot()
  })
})

describe('when range is valid', () => {
  it('should render range', () => {
    const { container } = render(<PHRange range={data} />)

    expect(container).toMatchSnapshot()
  })
})
