import type { Metadata } from 'next'
import { findPlants } from '@/actions/findPlants'

import PlantsDeck from '@/components/PlantsDeck'
import AddPlantForm from '@/components/AddPlantForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Plants',
}

export default async function PlantsPage() {
  const plants = await findPlants()
  return (
    <section>
      <header>
        <div>Plants</div>
      </header>
      <AddPlantForm />
      <PlantsDeck rows={plants} />
    </section>
  )
}
