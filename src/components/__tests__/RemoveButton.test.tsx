import { expect, it } from 'vitest'
import { render } from '@testing-library/react'
import RemoveButton from '@/components/RemoveButton'

it('should render', () => {
  const { container } = render(<RemoveButton />)

  expect(container).toMatchSnapshot()
})
