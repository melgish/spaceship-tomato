type Props = Readonly<{
  range?: {
    maxPH: number
    minPH: number
  } | null
}>

export default function PHRange({ range }: Props) {
  if (range) {
    return (
      <>
        {range.minPH.toFixed(1)} &ndash; {range.maxPH.toFixed(1)}
      </>
    )
  }
}
