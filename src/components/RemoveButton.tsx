import type { ButtonHTMLAttributes } from 'react'

type Props = Readonly<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className'>>

export default function RemoveButton({ children = 'Remove', ...props }: Props) {
  return (
    <button
      {...props}
      className="px-1 py-0 text-red-800 font-bold border-red-800 text-sm"
      type="button"
    >
      {children}
    </button>
  )
}
