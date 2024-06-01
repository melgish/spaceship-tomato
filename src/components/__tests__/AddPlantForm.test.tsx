import { Mock, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import AddPlantForm from '../AddPlantForm'
import { addPlant } from '@/actions/addPlant'
import { plantNameIsUnique } from '@/actions/plantNameIsUnique'

vi.mock('@/actions/plantNameIsUnique')
vi.mock('@/actions/addPlant')
vi.mock('react-hot-toast')

beforeEach(() => {
  // Mock deep validation
  ;(plantNameIsUnique as Mock).mockResolvedValue(true)
  ;(addPlant as Mock).mockResolvedValue({ ok: true, message: 'Good' })
})

it('should render', () => {
  const { container } = render(<AddPlantForm />)

  expect(container).toMatchSnapshot()
})

describe('when invalid and submit is clicked', () => {
  it('should report validation errors', async () => {
    const { container } = render(<AddPlantForm />)

    await act(() => fireEvent.click(screen.getByRole('button', { name: 'Submit' })))

    expect(container).toMatchSnapshot()
    expect(addPlant).not.toBeCalled()
  })
})

describe('when valid and submit is clicked', () => {
  it('should submit data', async () => {
    const { container } = render(<AddPlantForm />)

    const name = screen.getByLabelText(/name/i)
    const setName = { target: { value: 'My Test Plant' } }
    await act(() => fireEvent.change(name, setName))

    const minPH = screen.getByLabelText(/Minimum PH/i)
    const setMin = { target: { value: '6.2', valueAsNumber: 6.2 } }
    await act(() => fireEvent.change(minPH, setMin))

    const maxPH = screen.getByLabelText(/Maximum PH/i)
    const setMax = { target: { value: '7.1', valueAsNumber: 7.1 } }
    await act(() => fireEvent.change(maxPH, setMax))

    const submit = screen.getByRole('button', { name: /submit/i })
    await act(() => fireEvent.click(submit))

    expect(container).toMatchSnapshot()
    expect(addPlant).toBeCalledWith({
      name: 'My Test Plant',
      minPH: 6.2,
      maxPH: 7.1,
    })
  })
})
