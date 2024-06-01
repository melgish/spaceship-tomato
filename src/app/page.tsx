import { findBuckets, type Bucket } from '@/actions/findBuckets'
import AddReadingForm from '@/components/AddReadingForm'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const buckets = await findBuckets()
  return (
    <section>
      <header>
        <div>Home</div>
      </header>
      {buckets.map((b: Bucket) => (
        <AddReadingForm key={b.id} buckets={buckets} bucketId={b.id} />
      ))}
    </section>
  )
}
