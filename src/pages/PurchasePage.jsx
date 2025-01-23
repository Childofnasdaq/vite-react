import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { PaymentInfo } from "../components/payment/PaymentInfo"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { LicenseService } from "../lib/services/license-service"
import { theme } from "../styles/theme"

const licensePrices = {
  '1': { months: 1, price: 300, discount: 50 },
  '3': { months: 3, price: 500, discount: 50 },
  '6': { months: 6, price: 900, discount: 50 },
  '12': { months: 12, price: 1600, discount: 70 },
  'lifetime': { months: 'Lifetime', price: 2000, discount: 88 }
}

export default function PurchasePage() {
  const navigate = useNavigate()
  const [selectedDuration, setSelectedDuration] = useState('1')
  const [showPayment, setShowPayment] = useState(false)

  const handlePaymentComplete = () => {
    const newKey = LicenseService.createLicense(selectedDuration, localStorage.getItem('currentUser') || '')
    alert(`License key created successfully: ${newKey.key}`)
    navigate('/dashboard/keys')
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl" style={{ color: theme.colors.text }}>Purchase License Keys</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!showPayment ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: theme.colors.text }}>Select Duration</label>
                <Select
                  value={selectedDuration}
                  onValueChange={setSelectedDuration}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(licensePrices).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.months === 'Lifetime' ? 'Lifetime' : `${value.months} Month${value.months > 1 ? 's' : ''}`} - R{value.price} ({value.discount}% off)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg p-4" style={{ backgroundColor: theme.colors.background }}>
                <h3 className="font-medium mb-2 text-sm md:text-base" style={{ color: theme.colors.text }}>Selected Plan</h3>
                <p className="text-xs md:text-sm mb-4" style={{ color: theme.colors.text }}>
                  {licensePrices[selectedDuration].months === 'Lifetime' 
                    ? 'Lifetime Access'
                    : `${licensePrices[selectedDuration].months} Month${Number(licensePrices[selectedDuration].months) > 1 ? 's' : ''}`}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium" style={{ color: theme.colors.text }}>Total Price:</span>
                  <span className="text-xl md:text-2xl font-bold" style={{ color: theme.colors.primary }}>
                    R{licensePrices[selectedDuration].price}
                  </span>
                </div>
              </div>

              <Button 
                className="w-full" 
                onClick={() => setShowPayment(true)}
                style={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}
              >
                Proceed to Payment
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <PaymentInfo onComplete={handlePaymentComplete} />
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setShowPayment(false)}
                style={{ borderColor: theme.colors.primary, color: theme.colors.primary }}
              >
                Back to Duration Selection
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
