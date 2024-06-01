import { Mock, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import AddBucketForm from '../AddBucketForm'
import { addBucket } from '@/actions/addBucket'
import { bucketNameIsUnique } from '@/actions/bucketNameIsUnique'

const plants = [
  { id: 1, name: 'Test Plant 1', maxPh: 6.5, minPh: 7.1 },
  { id: 2, name: 'Test Plant 2', maxPh: 6.8, minPh: 7.2 },
]

vi.mock('@/actions/bucketNameIsUnique')
vi.mock('@/actions/addBucket')
vi.mock('react-hot-toast')

beforeEach(() => {
  // Mock deep validation
  ;(bucketNameIsUnique as Mock).mockResolvedValue(true)
  ;(addBucket as Mock).mockResolvedValue({ ok: true, message: 'Good' })
})

it('should render', () => {
  const { container } = render(<AddBucketForm plants={plants} />)

  expect(container).toMatchSnapshot()
})

describe('when invalid and submit is clicked', () => {
  it('should report validation errors', async () => {
    const { container } = render(<AddBucketForm plants={plants} />)

    await act(() => fireEvent.click(screen.getByRole('button', { name: 'Submit' })))

    expect(container).toMatchSnapshot()
    expect(addBucket).not.toBeCalled()
  })
})

describe('when valid and submit is clicked', () => {
  it('should submit data', async () => {
    const { container } = render(<AddBucketForm plants={plants} />)

    const name = screen.getByLabelText(/name/i)
    const change = { target: { value: 'My Test Bucket' } }
    await act(() => fireEvent.change(name, change))

    const plant = screen.getByLabelText(/plant/i)
    const select = { target: { value: 0 } }
    await act(() => fireEvent.change(plant, select))

    const submit = screen.getByRole('button', { name: /submit/i })
    await act(() => fireEvent.click(submit))

    expect(container).toMatchSnapshot()
    expect(addBucket).toBeCalledWith({ name: 'My Test Bucket', plantId: 0 })
  })
})
