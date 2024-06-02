import type { Bucket } from '@/actions/findBuckets'
import * as d3 from 'd3'

type Reading = Required<Bucket['readings'][number]>
type Props = Readonly<{
  bucket: Bucket
}>

export default function BucketPHTrend({ bucket }: Props) {
  const data = bucket.readings

  const width = 300
  const height = 120
  const margin = { top: 24, right: 12, bottom: 12, left: 36 }

  // Y scale based on fixed PH range
  // Generate y axis ticks. [label, value]
  const yDomain = [5, 8]
  const yScale = d3.scaleLinear().domain(yDomain).range([height, 0])
  const yScale1 = (d: number) => +yScale(d).toFixed(1)
  const yTicks = yScale.ticks(9).map((d) => [d.toFixed(1), yScale1(d)])

  // X scale changes based on measurement dates.
  // Generate x axis ticks. [label, value]
  const xDomain = d3.extent(data, (d) => d.createdAt!) as [Date, Date]
  const xScale = d3.scaleTime().domain(xDomain).range([0, width])
  const xScale1 = (d: Date) => +xScale(d).toFixed(1)
  const timeFormat = xScale.tickFormat(8, '%b %d')
  const xTicks = xScale.ticks(8).map((d) => [timeFormat(d), xScale1(d)])

  const line = d3
    .line<Reading>()
    .x((d) => xScale1(d.createdAt))
    .y((d) => yScale1(d.ph))

  let r = null
  if (bucket.plant) {
    // Calculate range bands based on plant min/max PH
    r = {
      max0: yScale1(bucket.plant.maxPH + 0.5),
      max1: yScale1(bucket.plant.maxPH),
      min1: yScale1(bucket.plant.minPH),
      min0: yScale1(bucket.plant.minPH - 0.5),
    }
  }

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
      fontFamily="sans-serif"
      fontSize={10}
      stroke="currentColor"
      textAnchor="middle"
    >
      <g transform={`translate(${margin.left},${margin.bottom})`}>
        <g
          className="x axis"
          transform={`translate(0, ${height})`}
        >
          <path d={`M0,6V0H${width}V6`} fill="none" />
          {xTicks.map(([label, x]) => (
            <g key={x} className="tick" transform={`translate(${x}, 0)`}>
              <line y2={6} />
              <text y={9} dy="0.7em" stroke="none">
                {label}
              </text>
            </g>
          ))}
        </g>
        <g
          className="y axis"
          textAnchor="end">
          <path d={`M-6,${height}H0V0H-6`} fill="none" />
          {yTicks.map(([label, y]) => (
            <g key={y} className="tick" transform={`translate(0, ${y})`}>
              <line x2={-6} />
              <text dy="0.32em" stroke="none" x={-9} >
                {label}
              </text>
            </g>
          ))}
        </g>
        {r && (
          <g className="bands" opacity={0.3} stroke="none">
            <path d={`M0 ${r.min0}V${r.min1}H${width}V${r.min0}Z`} fill="#EE0" />
            <path d={`M0 ${r.max0}V${r.max1}H${width}V${r.max0}Z`} fill="#EE0" />
            <path d={`M0 ${r.min1}V${r.max1}H${width}V${r.min1}Z`} fill="#0E0" />
          </g>
        )}
        <g className="data" stroke="forestgreen" fill="forestgreen">
          <path d={line(data)!} fill="none" strokeWidth={2} />
          {data.map((d) => (
            <circle cx={xScale1(d.createdAt)} cy={yScale1(d.ph)} key={d.id} r={4} />
          ))}
        </g>
        {data.length === 0 && (
          <g className="no-data">
            <text y={height / 2} x={width / 2} stroke="none">
              No Data To Display
            </text>
          </g>
        )}
      </g>
    </svg>
  )
}
