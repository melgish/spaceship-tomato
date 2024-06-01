type Props = Readonly<{
  plant?: { name: string } | null
}>

export default function PlantName({ plant }: Props) {
  return plant?.name ?? '[none]'
}
