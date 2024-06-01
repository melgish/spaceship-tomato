import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import ErrorMessage from '@/components/ErrorMessage'

const data = { message: 'Error' }

describe('when there is no error', () => {
  it('should not render content', () => {
    const { container } = render(<ErrorMessage />)

    expect(container).toMatchSnapshot()
  })
})

describe('when there is an array of errors', () => {
  it('should not render the first item', () => {
    const { container } = render(<ErrorMessage error={[data] as any} />)

    expect(container).toMatchSnapshot()
  })
})

describe('when error has no message', () => {
  it('should not render unexpected', () => {
    const { container } = render(<ErrorMessage error={{} as any} />)

    expect(container).toMatchSnapshot()
  })
})
