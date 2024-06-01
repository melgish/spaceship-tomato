import { expect, it } from 'vitest'
import { render } from '@testing-library/react'
import RootLayout from "@/app/layout"

it("should render", () => {
  const { container } = render(<RootLayout>{null}</RootLayout>)

  expect(container).toMatchSnapshot()
})
