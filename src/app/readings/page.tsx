import type { Metadata } from 'next'
import { findBuckets } from '@/actions/findBuckets'
import { findReadings } from '@/actions/findReadings'
import AddReadingForm from '@/components/AddReadingForm'
import ReadingsDeck from '@/components/ReadingsDeck'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Readings',
}

export default async function ReadingsPage() {
  const buckets = await findBuckets()
  const readings = await findReadings()
  return (
    <section>
      <header>
        <div>Readings</div>
      </header>
      <AddReadingForm buckets={buckets} />
      <ReadingsDeck rows={readings} />
    </section>
  )
}
