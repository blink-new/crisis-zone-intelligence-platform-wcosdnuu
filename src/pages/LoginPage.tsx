import { useState } from 'react'
import { Shield, AlertTriangle, Globe } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { blink } from '../blink/client'

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      blink.auth.login()
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="p-3 bg-accent/10 rounded-full">
              <Shield className="h-8 w-8 text-accent" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Crisis Intelligence</h1>
            <p className="text-muted-foreground mt-2">Secure monitoring platform for crisis zones</p>
          </div>
        </div>

        {/* Security Notice */}
        <Card className="border-accent/20">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-accent mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-accent">Authorized Personnel Only</p>
                <p className="text-muted-foreground mt-1">
                  This platform is restricted to verified journalists, analysts, and NGO professionals.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Login Card */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Secure Access</CardTitle>
            <CardDescription>
              Sign in to access real-time crisis zone intelligence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              size="lg"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent-foreground"></div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Sign In Securely</span>
                </div>
              )}
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              <div className="flex items-center justify-center space-x-1">
                <Globe className="h-4 w-4" />
                <span>Protected by enterprise-grade security</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>For authorized use only. All activities are monitored and logged.</p>
          <p className="mt-1">© 2024 Crisis Intelligence Platform</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage