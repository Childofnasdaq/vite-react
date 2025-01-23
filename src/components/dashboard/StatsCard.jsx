export function StatsCard({ title, value, description, className }) {
  return (
    <div className={`rounded-lg p-4 md:p-6 text-white ${className}`}>
      <h3 className="font-medium text-sm md:text-base">{title}</h3>
      <p className="text-2xl md:text-4xl font-bold mt-2">{value}</p>
      <p className="mt-2 opacity-90 text-xs md:text-sm">{description}</p>
    </div>
  )
}
