import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { 
  Settings, 
  Users, 
  Database, 
  Workflow, 
  Shield, 
  Plus, 
  Edit, 
  Trash2,
  Globe,
  Activity,
  AlertTriangle
} from 'lucide-react'

function AdminPanel() {
  const [showCreateZone, setShowCreateZone] = useState(false)
  const [newZone, setNewZone] = useState({
    name: '',
    region: '',
    country: '',
    description: '',
    severity: 'medium',
    status: 'monitoring'
  })

  const mockCrisisZones = [
    { id: '1', name: 'Eastern Ukraine', region: 'Eastern Europe', country: 'Ukraine', status: 'active', severity: 'critical' },
    { id: '2', name: 'Gaza Strip', region: 'Middle East', country: 'Palestine', status: 'active', severity: 'high' },
    { id: '3', name: 'Sudan', region: 'Africa', country: 'Sudan', status: 'monitoring', severity: 'medium' }
  ]

  const mockDataSources = [
    { id: '1', name: 'Reuters RSS', type: 'rss', status: 'active', lastSync: '2 min ago' },
    { id: '2', name: 'BBC News API', type: 'api', status: 'active', lastSync: '5 min ago' },
    { id: '3', name: 'Twitter OSINT', type: 'social', status: 'inactive', lastSync: '1 hour ago' }
  ]

  const handleCreateZone = () => {
    // In a real app, this would make an API call
    console.log('Creating zone:', newZone)
    setShowCreateZone(false)
    setNewZone({
      name: '',
      region: '',
      country: '',
      description: '',
      severity: 'medium',
      status: 'monitoring'
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-muted-foreground mt-1">
          Manage crisis zones, users, and system configuration
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="zones">Crisis Zones</TabsTrigger>
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Crisis Zones</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 active, 1 monitoring</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Sources</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">11 active, 1 inactive</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
                <Workflow className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Running smoothly</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Status</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Online</div>
                <p className="text-xs text-muted-foreground">All systems operational</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Crisis Zone Management</span>
            </CardTitle>
            <CardDescription>
              Create and configure crisis zones, set monitoring parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Manage Zones</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>User Access Control</span>
            </CardTitle>
            <CardDescription>
              Manage user permissions and access levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Manage Users</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Data Sources</span>
            </CardTitle>
            <CardDescription>
              Configure RSS feeds, APIs, and OSINT tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Configure Sources</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Workflow className="h-5 w-5" />
              <span>n8n Workflows</span>
            </CardTitle>
            <CardDescription>
              Manage automation workflows and triggers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Manage Workflows</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security Settings</span>
            </CardTitle>
            <CardDescription>
              Configure authentication and security policies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Security Config</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminPanel