import { expect, it } from 'vitest'
import { render } from '@testing-library/react'
import ResetButton from '@/components/ResetButton'

it('should render', () => {
  const { container } = render(<ResetButton />)

  expect(container).toMatchSnapshot()
})
