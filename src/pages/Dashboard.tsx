import { useState, useEffect } from 'react'
import { 
  Globe, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  MapPin, 
  Activity,
  Shield,
  Database,
  Zap,
  Plus,
  Filter,
  Search,
  RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { blink } from '../blink/client'
import { CrisisZone, Report, Alert } from '../types'

function Dashboard() {
  const [crisisZones, setCrisisZones] = useState<CrisisZone[]>([])
  const [recentReports, setRecentReports] = useState<Report[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [severityFilter, setSeverityFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadDashboardData()
    setRefreshing(false)
  }

  const loadDashboardData = async () => {
    try {
      // Mock data for now - will be replaced with real API calls
      setCrisisZones([
        {
          id: '1',
          name: 'Eastern Ukraine',
          region: 'Eastern Europe',
          country: 'Ukraine',
          status: 'active',
          severity: 'critical',
          description: 'Ongoing conflict in eastern regions',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          adminId: 'admin1'
        },
        {
          id: '2',
          name: 'Gaza Strip',
          region: 'Middle East',
          country: 'Palestine',
          status: 'active',
          severity: 'high',
          description: 'Humanitarian crisis and conflict',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          adminId: 'admin1'
        },
        {
          id: '3',
          name: 'Sudan',
          region: 'Africa',
          country: 'Sudan',
          status: 'monitoring',
          severity: 'medium',
          description: 'Political instability and humanitarian concerns',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          adminId: 'admin1'
        }
      ])

      setRecentReports([
        {
          id: '1',
          title: 'Civilian evacuation reported in eastern districts',
          content: 'Local sources report organized evacuation of civilians from contested areas...',
          source: 'Reuters',
          sourceType: 'verified',
          credibilityScore: 0.9,
          crisisZoneId: '1',
          tags: ['evacuation', 'civilians'],
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          isBreaking: true
        },
        {
          id: '2',
          title: 'Humanitarian aid convoy reaches border',
          content: 'International aid convoy successfully crossed border checkpoint...',
          source: 'UN OCHA',
          sourceType: 'verified',
          credibilityScore: 0.95,
          crisisZoneId: '2',
          tags: ['humanitarian', 'aid'],
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          isBreaking: false
        }
      ])

      setAlerts([
        {
          id: '1',
          title: 'Critical Update',
          message: 'New reports of escalation in monitored zone',
          severity: 'critical',
          crisisZoneId: '1',
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString()
        },
        {
          id: '2',
          title: 'Data Source Alert',
          message: 'RSS feed connection restored',
          severity: 'info',
          crisisZoneId: '2',
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
        }
      ])
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-500'
      case 'monitoring': return 'bg-yellow-500'
      case 'resolved': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const filteredCrisisZones = crisisZones.filter(zone => {
    const matchesSearch = zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         zone.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         zone.country.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSeverity = severityFilter === 'all' || zone.severity === severityFilter
    const matchesStatus = statusFilter === 'all' || zone.status === statusFilter
    return matchesSearch && matchesSeverity && matchesStatus
  })

  const filteredReports = recentReports.filter(report => 
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.source.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Crisis Intelligence Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Real-time monitoring of global crisis zones
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Activity className="h-4 w-4 text-green-500" />
              <span>System Online</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search crisis zones, reports, or sources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="monitoring">Monitoring</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Crisis Zones</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{crisisZones.filter(z => z.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">
              {crisisZones.filter(z => z.severity === 'critical').length} critical
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.filter(a => !a.isRead).length}</div>
            <p className="text-xs text-muted-foreground">
              {alerts.filter(a => a.severity === 'critical' && !a.isRead).length} critical
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports Today</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentReports.length}</div>
            <p className="text-xs text-muted-foreground">
              {recentReports.filter(r => r.isBreaking).length} breaking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Sources</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              11 active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="zones" className="space-y-6">
        <TabsList>
          <TabsTrigger value="zones">Crisis Zones</TabsTrigger>
          <TabsTrigger value="reports">Recent Reports</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="zones" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredCrisisZones.length} of {crisisZones.length} crisis zones
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCrisisZones.map((zone) => (
              <Card key={zone.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{zone.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(zone.status)}`}></div>
                      <Badge variant={zone.severity === 'critical' ? 'destructive' : 'secondary'}>
                        {zone.severity}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{zone.region}, {zone.country}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{zone.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Status: <span className="capitalize">{zone.status}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredReports.length} of {recentReports.length} reports
            </p>
          </div>
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        {report.isBreaking && (
                          <Badge variant="destructive" className="text-xs">
                            <Zap className="h-3 w-3 mr-1" />
                            BREAKING
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="flex items-center space-x-4">
                        <span>{report.source}</span>
                        <Badge variant={report.sourceType === 'verified' ? 'default' : 'secondary'}>
                          <Shield className="h-3 w-3 mr-1" />
                          {report.sourceType}
                        </Badge>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(report.timestamp).toLocaleTimeString()}</span>
                        </span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {Math.round(report.credibilityScore * 100)}%
                      </div>
                      <div className="text-xs text-muted-foreground">credibility</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{report.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {report.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Card key={alert.id} className={`${!alert.isRead ? 'border-accent' : ''}`}>
                <CardContent className="pt-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-1 rounded-full ${
                      alert.severity === 'critical' ? 'bg-red-100 text-red-600' :
                      alert.severity === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{alert.title}</h4>
                        <div className="flex items-center space-x-2">
                          {!alert.isRead && (
                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {new Date(alert.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
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

export default Dashboard