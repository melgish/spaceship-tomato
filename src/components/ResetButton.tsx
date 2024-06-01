import { ButtonHTMLAttributes } from 'react'

type Props = Readonly<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className'>>

export default function ResetButton({ children = 'Clear', ...props }: Props) {
  return (
    <button {...props} className="slate" type="button">
      {children}
    </button>
  )
}
