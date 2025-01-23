import { useEffect, useState } from "react"
import { StatsCard } from "../components/dashboard/StatsCard"
import { Logo } from "../components/ui/logo"
import { LicenseService } from "../lib/services/license-service"
import { theme } from "../styles/theme"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalLicenses: 0,
    activeLicenses: 0,
    totalEAs: 0,
    maxLicenses: 100,
  })

  useEffect(() => {
    const keys = LicenseService.getAllLicenses()
    const activeKeys = keys.filter((key) => key.status === "active")
    const metaApis = JSON.parse(localStorage.getItem("metaApis") || "[]")

    setStats({
      totalLicenses: keys.length,
      activeLicenses: activeKeys.length,
      totalEAs: metaApis.length,
      maxLicenses: 100,
    })
  }, [])

  const statsData = [
    {
      title: "Total Licenses",
      value: stats.totalLicenses.toString(),
      description: "All time EA users.",
      className: `bg-[${theme.colors.primary}]`,
    },
    {
      title: "Active Licenses",
      value: stats.activeLicenses.toString(),
      description: "Current EA users.",
      className: `bg-[${theme.colors.secondary}]`,
    },
    {
      title: "Total EAs",
      value: stats.totalEAs.toString(),
      description: "All EAs you are Licensing",
      className: `bg-[${theme.colors.accent}]`,
    },
    {
      title: "Maximum Licenses",
      value: stats.maxLicenses.toString(),
      description: "Total licenses You can generate",
      className: "bg-red-400",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-8">
        <Logo size={120} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            className={stat.className}
          />
        ))}
      </div>
    </div>
  )
}
