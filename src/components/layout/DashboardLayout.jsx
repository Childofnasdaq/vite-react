import { useState, useEffect } from "react"
import { useNavigate, Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Menu } from 'lucide-react'
import { theme } from "../../styles/theme"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"

export default function DashboardLayout() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [mentorId, setMentorId] = useState("")
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      navigate("/login")
    } else {
      setUsername(currentUser)
    }

    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile)
      setProfile(profileData)
      setMentorId(profileData.mentorId)
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    navigate("/login")
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: theme.colors.background }}>
      <div className="hidden md:flex">
        <Sidebar onLogout={handleLogout} />
      </div>
      <div className="flex-1">
        <div
          className="h-16 border-b px-4 md:px-6 flex items-center justify-between"
          style={{ backgroundColor: theme.colors.white }}
        >
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <Sidebar onLogout={handleLogout} />
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-semibold" style={{ color: theme.colors.text }}>
              Welcome to QUICK PRO, {username}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <Avatar>
                <AvatarImage src={profile?.icon} alt={username} />
                <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-xs mt-1" style={{ color: theme.colors.text }}>
                {mentorId}
              </span>
            </div>
          </div>
        </div>
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
