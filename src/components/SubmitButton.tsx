import { ButtonHTMLAttributes } from 'react'

type Props = Readonly<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className'>>

export default function SubmitButton({ children = 'Submit', ...props }: Props) {
  return (
    <button {...props} className="emerald" type="submit">
      {children}
    </button>
  )
}
