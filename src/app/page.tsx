import { findBuckets } from '@/actions/findBuckets'
import BucketTrend from '@/components/BucketTrend'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const buckets = await findBuckets()

  return (
    <section>
      <header>
        <div>Home</div>
      </header>
      <div className="flex flex-wrap justify-around gap-y-2">
        {buckets.map((b) => (
          <div key={b.id}>
            <div>
              Bucket: {b.name} {b.plant?.name}
            </div>
            <div>PH</div>
            <BucketTrend xKey="ph" bucket={b} yMin={5} yMax={8} />
            <div>EC</div>
            <BucketTrend xKey="ec" bucket={b} yMin={750} yMax={2000} />
            <div>TDS</div>
            <BucketTrend xKey="tds" bucket={b} yMin={500} yMax={1000} />
          </div>
        ))}
      </div>
    </section>
  )
}
