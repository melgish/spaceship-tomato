import type { FieldError, Merge } from 'react-hook-form'

type Props = Readonly<{
  error?: FieldError | Merge<FieldError, (FieldError | undefined)[]>
}>

export default function ErrorMessage({ error }: Props) {
  if (Array.isArray(error)) {
    error = error.flat()[0]
  }

  if (!error) {
    return null
  }

  return <div className="error text-rose-800">{error?.message ?? 'Unexpected'}</div>
}
