import { useState } from "react"
import { useNavigate, Link, useSearchParams } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Logo } from "../components/ui/logo"
import { theme } from "../styles/theme"
import { toast } from "../components/ui/use-toast"
import { register } from "../lib/auth"

export default function RegisterPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const referralCode = searchParams.get("ref")

  async function handleSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    const formData = new FormData(event.target)
    if (referralCode) {
      formData.append("referralCode", referralCode)
    }
    try {
      await register(formData)
      navigate("/dashboard")
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme.colors.background }}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo size={60} />
          </div>
          <CardTitle style={{ color: theme.colors.text }}>QUICK PRO</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium" style={{ color: theme.colors.text }}>
                Username
              </label>
              <Input id="username" name="username" type="text" required />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium" style={{ color: theme.colors.text }}>
                Password
              </label>
              <Input id="password" name="password" type="password" required />
            </div>
            {referralCode && (
              <div>
                <label className="block text-sm font-medium" style={{ color: theme.colors.text }}>
                  Referral Code
                </label>
                <Input value={referralCode} readOnly disabled />
              </div>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              style={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
          <p className="mt-4 text-center" style={{ color: theme.colors.text }}>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
