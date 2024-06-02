import { findBuckets } from '@/actions/findBuckets'
import BucketPHTrend from '@/components/BucketPHTrend'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const buckets = await findBuckets()

  return (
    <section>
      <header>
        <div>Home</div>
      </header>
      <div className="grid grid-cols-2">
        {buckets.map((b) => (
          <div key={b.id}>
            <div>
              Bucket: {b.name} {b.plant?.name}
            </div>
            <BucketPHTrend bucket={b} />
          </div>
        ))}
      </div>
    </section>
  )
}
