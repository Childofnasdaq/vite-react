import { Link, useLocation } from "react-router-dom"
import { LayoutGrid, ShoppingCart, Key, Bot, BarChart2, HelpCircle, LogOut, User, Users } from 'lucide-react'
import { Button } from "../ui/button"
import { Logo } from "../ui/logo"
import { theme } from "../../styles/theme"

const menuItems = [
  {
    title: "HOME",
    items: [{ icon: LayoutGrid, label: "Dashboard", href: "/dashboard" }],
  },
  {
    title: "UTILITIES",
    items: [
      { icon: ShoppingCart, label: "Purchase keys", href: "/dashboard/purchase" },
      { icon: Key, label: "Manage keys", href: "/dashboard/keys" },
      { icon: Bot, label: "Manage EAs", href: "/dashboard/eas" },
      { icon: BarChart2, label: "Stats", href: "/dashboard/stats" },
      { icon: HelpCircle, label: "Help", href: "/dashboard/help" },
    ],
  },
  {
    title: "ACCOUNT",
    items: [{ icon: User, label: "Profile", href: "/dashboard/profile" }],
  },
  {
    title: "REFERRALS",
    items: [{ icon: Users, label: "Referrals", href: "/dashboard/referrals" }],
  },
]

export function Sidebar({ onLogout }) {
  const location = useLocation()

  return (
    <div className="w-64 h-full bg-white flex flex-col" style={{ borderRight: `1px solid ${theme.colors.border}` }}>
      <div className="p-4 border-b flex items-center gap-2">
        <Logo size={32} />
        <h1 className="text-xl font-bold" style={{ color: theme.colors.text }}>
          QUICK PRO
        </h1>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        {menuItems.map((section) => (
          <div key={section.title} className="mb-6">
            <h2 className="text-xs font-semibold mb-2 uppercase" style={{ color: theme.colors.text }}>
              {section.title}
            </h2>
            {section.items.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center py-2 px-4 rounded-md transition-colors ${
                    isActive ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button onClick={onLogout} className="w-full flex items-center justify-center" variant="outline">
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}
