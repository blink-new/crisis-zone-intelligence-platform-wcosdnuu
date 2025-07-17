import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  Database, 
  Rss, 
  Globe, 
  Twitter, 
  Plus, 
  Edit, 
  Trash2, 
  Activity, 
  AlertCircle,
  CheckCircle,
  Clock,
  Settings,
  Zap
} from 'lucide-react'

function DataSources() {
  const [showCreateSource, setShowCreateSource] = useState(false)
  const [newSource, setNewSource] = useState({
    name: '',
    type: 'rss',
    url: '',
    apiKey: '',
    crisisZone: '',
    refreshInterval: '5'
  })

  const mockSources = [
    {
      id: '1',
      name: 'Reuters Crisis Feed',
      type: 'rss',
      url: 'https://feeds.reuters.com/reuters/worldNews',
      status: 'active',
      lastSync: '2 minutes ago',
      crisisZone: 'Eastern Ukraine',
      itemsCollected: 1247,
      errorCount: 0
    },
    {
      id: '2',
      name: 'UN OCHA API',
      type: 'api',
      url: 'https://api.reliefweb.int/v1/reports',
      status: 'active',
      lastSync: '5 minutes ago',
      crisisZone: 'Gaza Strip',
      itemsCollected: 892,
      errorCount: 2
    },
    {
      id: '3',
      name: 'OSINT Twitter Monitor',
      type: 'social',
      url: 'https://api.twitter.com/2/tweets/search',
      status: 'inactive',
      lastSync: '1 hour ago',
      crisisZone: 'Sudan',
      itemsCollected: 456,
      errorCount: 15
    },
    {
      id: '4',
      name: 'BBC News API',
      type: 'news',
      url: 'https://newsapi.org/v2/everything',
      status: 'active',
      lastSync: '3 minutes ago',
      crisisZone: 'Eastern Ukraine',
      itemsCollected: 2103,
      errorCount: 1
    },
    {
      id: '5',
      name: 'Telegram OSINT Channel',
      type: 'social',
      url: 'https://api.telegram.org/bot',
      status: 'warning',
      lastSync: '30 minutes ago',
      crisisZone: 'Gaza Strip',
      itemsCollected: 678,
      errorCount: 8
    }
  ]

  const handleCreateSource = () => {
    console.log('Creating source:', newSource)
    setShowCreateSource(false)
    setNewSource({
      name: '',
      type: 'rss',
      url: '',
      apiKey: '',
      crisisZone: '',
      refreshInterval: '5'
    })
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'rss': return <Rss className="h-5 w-5" />
      case 'api': return <Database className="h-5 w-5" />
      case 'social': return <Twitter className="h-5 w-5" />
      case 'news': return <Globe className="h-5 w-5" />
      default: return <Globe className="h-5 w-5" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'inactive': return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'inactive': return 'destructive'
      case 'warning': return 'secondary'
      default: return 'outline'
    }
  }

  const activeSources = mockSources.filter(s => s.status === 'active')
  const inactiveSources = mockSources.filter(s => s.status === 'inactive')
  const warningSources = mockSources.filter(s => s.status === 'warning')

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Sources</h1>
          <p className="text-muted-foreground mt-1">
            Manage external data feeds and integrations for crisis monitoring
          </p>
        </div>
        <Dialog open={showCreateSource} onOpenChange={setShowCreateSource}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Data Source
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Data Source</DialogTitle>
              <DialogDescription>
                Configure a new external data source for crisis zone monitoring.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newSource.name}
                  onChange={(e) => setNewSource({...newSource, name: e.target.value})}
                  className="col-span-3"
                  placeholder="e.g., Reuters Crisis Feed"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select value={newSource.type} onValueChange={(value) => setNewSource({...newSource, type: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rss">RSS Feed</SelectItem>
                    <SelectItem value="api">REST API</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="news">News API</SelectItem>
                    <SelectItem value="osint">OSINT Tool</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right">
                  URL
                </Label>
                <Input
                  id="url"
                  value={newSource.url}
                  onChange={(e) => setNewSource({...newSource, url: e.target.value})}
                  className="col-span-3"
                  placeholder="https://example.com/feed"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="apiKey" className="text-right">
                  API Key
                </Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={newSource.apiKey}
                  onChange={(e) => setNewSource({...newSource, apiKey: e.target.value})}
                  className="col-span-3"
                  placeholder="Optional API key"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="crisisZone" className="text-right">
                  Crisis Zone
                </Label>
                <Select value={newSource.crisisZone} onValueChange={(value) => setNewSource({...newSource, crisisZone: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select crisis zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ukraine">Eastern Ukraine</SelectItem>
                    <SelectItem value="gaza">Gaza Strip</SelectItem>
                    <SelectItem value="sudan">Sudan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="interval" className="text-right">
                  Refresh (min)
                </Label>
                <Input
                  id="interval"
                  type="number"
                  value={newSource.refreshInterval}
                  onChange={(e) => setNewSource({...newSource, refreshInterval: e.target.value})}
                  className="col-span-3"
                  placeholder="5"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateSource(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateSource}>
                Add Source
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sources</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSources.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeSources.length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Collected</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockSources.reduce((sum, s) => sum + s.itemsCollected, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((mockSources.reduce((sum, s) => sum + s.errorCount, 0) / mockSources.reduce((sum, s) => sum + s.itemsCollected, 0)) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {mockSources.reduce((sum, s) => sum + s.errorCount, 0)} total errors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sync Status</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Online</div>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Sources ({mockSources.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeSources.length})</TabsTrigger>
          <TabsTrigger value="inactive">Issues ({inactiveSources.length + warningSources.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSources.map((source) => (
              <Card key={source.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      {getIcon(source.type)}
                      <span>{source.name}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(source.status)}
                      <Badge variant={getStatusColor(source.status) as any}>
                        {source.status}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>
                    {source.crisisZone} • {source.type} • Last sync: {source.lastSync}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Items collected:</span>
                      <span className="font-medium">{source.itemsCollected.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Error count:</span>
                      <span className={`font-medium ${source.errorCount > 10 ? 'text-red-500' : source.errorCount > 0 ? 'text-yellow-500' : 'text-green-500'}`}>
                        {source.errorCount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-muted-foreground">
                        URL: {source.url.substring(0, 30)}...
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="outline" size="sm">
                          <Settings className="h-3 w-3 mr-1" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeSources.map((source) => (
              <Card key={source.id} className="hover:shadow-md transition-shadow border-green-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      {getIcon(source.type)}
                      <span>{source.name}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Badge variant="default">Active</Badge>
                    </div>
                  </div>
                  <CardDescription>
                    {source.crisisZone} • {source.type} • Last sync: {source.lastSync}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Items collected:</span>
                      <span className="font-medium">{source.itemsCollected.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Error count:</span>
                      <span className="font-medium text-green-500">{source.errorCount}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-muted-foreground">
                        Syncing every 5 minutes
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...inactiveSources, ...warningSources].map((source) => (
              <Card key={source.id} className="hover:shadow-md transition-shadow border-red-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      {getIcon(source.type)}
                      <span>{source.name}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className={`h-4 w-4 ${source.status === 'inactive' ? 'text-red-500' : 'text-yellow-500'}`} />
                      <Badge variant={source.status === 'inactive' ? 'destructive' : 'secondary'}>
                        {source.status}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>
                    {source.crisisZone} • {source.type} • Last sync: {source.lastSync}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Items collected:</span>
                      <span className="font-medium">{source.itemsCollected.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Error count:</span>
                      <span className="font-medium text-red-500">{source.errorCount}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-red-500">
                        {source.status === 'inactive' ? 'Connection failed' : 'High error rate'}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="outline" size="sm">
                          <Activity className="h-3 w-3 mr-1" />
                          Retry
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-3 w-3 mr-1" />
                          Fix
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DataSources