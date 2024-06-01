import type { Metadata } from 'next'
import { findBuckets } from '@/actions/findBuckets'
import { findPlants } from '@/actions/findPlants'

import BucketsDeck from '@/components/BucketsDeck'
import AddBucketForm from '@/components/AddBucketForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Buckets',
}

export default async function BucketsPage() {
  const plants = await findPlants()
  const buckets = await findBuckets()

  return (
    <section>
      <header>
        <div>Buckets</div>
      </header>
      <AddBucketForm plants={plants} />
      <BucketsDeck rows={buckets} className="mt-2" />
    </section>
  )
}
