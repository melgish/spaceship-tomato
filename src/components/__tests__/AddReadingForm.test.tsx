import { Mock, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import AddReadingForm from '../AddReadingForm'
import { addReading } from '@/actions/addReading'
import { bucketExists } from '@/actions/bucketExists'

const buckets = [
  { id: 1, name: 'Bucket 1', plantId: 1, plant: { name: 'Plant 1' } },
  { id: 2, name: 'Bucket 2', plantId: 0, plant: null },
] as any

vi.mock('@/actions/bucketExists')
vi.mock('@/actions/addReading')
vi.mock('react-hot-toast')

beforeEach(() => {
  // Mock deep validation
  ;(bucketExists as Mock).mockResolvedValue(true)
  ;(addReading as Mock).mockResolvedValue({ ok: true, message: 'Good' })
})

it('should render', () => {
  const { container } = render(<AddReadingForm buckets={buckets} />)

  expect(container).toMatchSnapshot()
})

describe('when invalid and submit is clicked', () => {
  it('should report validation errors', async () => {
    const { container } = render(<AddReadingForm buckets={buckets} />)

    const submit = screen.getByRole('button', { name: /submit/i })
    await act(() => fireEvent.click(submit))

    expect(container).toMatchSnapshot()
    expect(addReading).not.toBeCalled()
  })
})

describe('when valid and submit is clicked', () => {
  it('should submit data', async () => {
    const { container } = render(<AddReadingForm buckets={buckets} />)

    const bucket = screen.getByLabelText(/bucket/i)
    const setBucket = { target: { value: 1 } }
    await act(() => fireEvent.change(bucket, setBucket))

    const ph = screen.getByLabelText(/ph/i)
    const setPH = { target: { value: '6.2', valueAsNumber: 6.2 } }
    await act(() => fireEvent.change(ph, setPH))

    const ec = screen.getByLabelText(/ec/i)
    const setEC = { target: { value: '1234', valueAsNumber: 1234 } }
    await act(() => fireEvent.change(ec, setEC))

    const tds = screen.getByLabelText(/tds/i)
    const setTDS = { target: { value: '875', valueAsNumber: 875 } }
    await act(() => fireEvent.change(tds, setTDS))

    const submit = screen.getByRole('button', { name: /submit/i })
    await act(() => fireEvent.click(submit))

    expect(container).toMatchSnapshot()
    expect(addReading).toBeCalledWith({
      bucketId: 1,
      ph: 6.2,
      tds: 875,
      ec: 1234,
    })
  })
})
