import { expect, it } from 'vitest'
import { render } from '@testing-library/react'
import SubmitButton from '@/components/SubmitButton'

it('should render', () => {
  const { container } = render(<SubmitButton />)

  expect(container).toMatchSnapshot()
})
