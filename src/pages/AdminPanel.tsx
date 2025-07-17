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
  AlertTriangle,
  Play,
  Pause
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

  const mockWorkflows = [
    { id: '1', name: 'Ukraine Data Ingestion', description: 'Automated collection from multiple sources', status: 'active', lastRun: '2 min ago', trigger: 'scheduled' },
    { id: '2', name: 'Fact-checking Pipeline', description: 'Cross-reference reports for verification', status: 'active', lastRun: '10 min ago', trigger: 'event' },
    { id: '3', name: 'Alert Generation', description: 'Generate alerts for critical updates', status: 'paused', lastRun: '2 hours ago', trigger: 'manual' }
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
        </TabsContent>

        <TabsContent value="zones" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Manage crisis zones and monitoring parameters
            </p>
            <Dialog open={showCreateZone} onOpenChange={setShowCreateZone}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Crisis Zone
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Crisis Zone</DialogTitle>
                  <DialogDescription>
                    Add a new crisis zone to monitor. This will enable data collection and analysis for the specified region.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newZone.name}
                      onChange={(e) => setNewZone({...newZone, name: e.target.value})}
                      className="col-span-3"
                      placeholder="e.g., Eastern Ukraine"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="region" className="text-right">
                      Region
                    </Label>
                    <Input
                      id="region"
                      value={newZone.region}
                      onChange={(e) => setNewZone({...newZone, region: e.target.value})}
                      className="col-span-3"
                      placeholder="e.g., Eastern Europe"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="country" className="text-right">
                      Country
                    </Label>
                    <Input
                      id="country"
                      value={newZone.country}
                      onChange={(e) => setNewZone({...newZone, country: e.target.value})}
                      className="col-span-3"
                      placeholder="e.g., Ukraine"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="severity" className="text-right">
                      Severity
                    </Label>
                    <Select value={newZone.severity} onValueChange={(value) => setNewZone({...newZone, severity: value})}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select value={newZone.status} onValueChange={(value) => setNewZone({...newZone, status: value})}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monitoring">Monitoring</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newZone.description}
                      onChange={(e) => setNewZone({...newZone, description: e.target.value})}
                      className="col-span-3"
                      placeholder="Brief description of the crisis situation..."
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateZone(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateZone}>
                    Create Zone
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockCrisisZones.map((zone) => (
              <Card key={zone.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{zone.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        zone.status === 'active' ? 'bg-red-500' :
                        zone.status === 'monitoring' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <Badge variant={zone.severity === 'critical' ? 'destructive' : 'secondary'}>
                        {zone.severity}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="flex items-center space-x-1">
                    <Globe className="h-4 w-4" />
                    <span>{zone.region}, {zone.country}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs text-muted-foreground">
                      Status: <span className="capitalize font-medium">{zone.status}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Configure external data sources and integrations
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Data Source
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDataSources.map((source) => (
              <Card key={source.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{source.name}</CardTitle>
                    <Badge variant={source.status === 'active' ? 'default' : 'secondary'}>
                      {source.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    Type: {source.type} • Last sync: {source.lastSync}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      {source.status === 'active' ? 'Syncing regularly' : 'Connection issues'}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Manage n8n automation workflows and triggers
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </div>
          
          <div className="space-y-4">
            {mockWorkflows.map((workflow) => (
              <Card key={workflow.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Workflow className="h-5 w-5" />
                        <span>{workflow.name}</span>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {workflow.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                        {workflow.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {workflow.status === 'active' ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Trigger: {workflow.trigger}</span>
                    <span>Last run: {workflow.lastRun}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Manage user access and permissions
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Invite User
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>User Management</span>
              </CardTitle>
              <CardDescription>
                Control access levels and permissions for different user roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Admin Users</p>
                    <p className="text-sm text-muted-foreground">Full system access</p>
                  </div>
                  <Badge>2 users</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Analysts</p>
                    <p className="text-sm text-muted-foreground">Data analysis and reporting</p>
                  </div>
                  <Badge variant="secondary">5 users</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Journalists</p>
                    <p className="text-sm text-muted-foreground">Read-only access to reports</p>
                  </div>
                  <Badge variant="secondary">12 users</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">NGO Personnel</p>
                    <p className="text-sm text-muted-foreground">Regional access only</p>
                  </div>
                  <Badge variant="secondary">8 users</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminPanel