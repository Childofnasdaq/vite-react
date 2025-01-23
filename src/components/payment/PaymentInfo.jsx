import { useState } from 'react'
import { Copy, Upload } from 'lucide-react'
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { toast } from "../ui/use-toast"
import { Input } from "../ui/input"
import { theme } from "../../styles/theme"

const bankDetails = {
  bankName: 'Bank Zero Mutual Bank',
  accountHolder: 'C.O.N-IBOT',
  accountType: 'Individual Check Account',
  accountName: 'CHILD OF NASDAQ',
  accountNumber: '80204760785',
  branchCode: '888000',
}

const cryptoAddresses = {
  btc: '346Y9MZUENNtxadFubcw39ur5XXPUC7raB',
  usdt: '0xD6B33D957B1AD3E172441bd896BD2F8D0063B139',
}

export function PaymentInfo({ onComplete }) {
  const [file, setFile] = useState(null)

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
    toast({
      title: 'Copied!',
      description: `${label} has been copied to clipboard.`,
    })
  }

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleProofUpload = () => {
    if (file) {
      toast({
        title: 'Proof of payment uploaded',
        description: 'Your proof of payment has been received. We will process it shortly.',
      })
      
      window.location.href = 'https://wa.me/27845566847'
      
      setTimeout(() => {
        onComplete()
      }, 2000)
    } else {
      toast({
        title: 'No file selected',
        description: 'Please select a file to upload as proof of payment.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="w-full">
      <Tabs defaultValue="bank" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
          <TabsTrigger value="crypto">Crypto Payment</TabsTrigger>
        </TabsList>
        <TabsContent value="bank">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl" style={{ color: theme.colors.text }}>Bank Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(bankDetails).map(([key, value]) => (
                <div key={key} className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <span className="font-medium capitalize text-sm md:text-base" style={{ color: theme.colors.text }}>{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                  <div className="flex items-center gap-2 mt-1 md:mt-0">
                    <span className="font-mono text-sm md:text-base">{value}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(value, key)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="crypto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl" style={{ color: theme.colors.text }}>Crypto Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2 text-sm md:text-base" style={{ color: theme.colors.text }}>BTC Address:</h3>
                  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <code className="flex-1 break-all text-xs md:text-sm">{cryptoAddresses.btc}</code>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(cryptoAddresses.btc, 'BTC Address')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2 text-sm md:text-base" style={{ color: theme.colors.text }}>USDT (ERC20) Address:</h3>
                  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <code className="flex-1 break-all text-xs md:text-sm">{cryptoAddresses.usdt}</code>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(cryptoAddresses.usdt, 'USDT Address')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 space-y-4">
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
          <Input type="file" onChange={handleFileChange} className="flex-grow" />
          <Button onClick={handleProofUpload} disabled={!file} className="w-full md:w-auto">
            <Upload className="mr-2 h-4 w-4" />
            Upload Proof
          </Button>
        </div>
        <p className="text-xs md:text-sm" style={{ color: theme.colors.text }}>
          After uploading proof of payment, you will be redirected to WhatsApp to send the proof. You will then receive your license key to activate the portal.
        </p>
      </div>
    </div>
  )
}
