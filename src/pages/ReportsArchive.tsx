import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  Archive, 
  Search, 
  Filter, 
  Shield, 
  Clock, 
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Download,
  Eye,
  Star,
  Tag
} from 'lucide-react'

function ReportsArchive() {
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFilter, setDateFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [credibilityFilter, setCredibilityFilter] = useState('all')
  const [crisisZoneFilter, setCrisisZoneFilter] = useState('all')

  const mockReports = [
    {
      id: '1',
      title: 'Civilian evacuation reported in eastern districts of Kharkiv',
      content: 'Local sources report organized evacuation of civilians from contested areas in eastern Kharkiv region. Ukrainian officials confirm safe passage corridors have been established...',
      source: 'Reuters',
      sourceType: 'verified',
      credibilityScore: 0.95,
      crisisZone: 'Eastern Ukraine',
      tags: ['evacuation', 'civilians', 'kharkiv', 'safe-passage'],
      timestamp: '2024-01-15T14:30:00Z',
      isBreaking: true,
      views: 2847,
      bookmarked: true,
      category: 'humanitarian'
    },
    {
      id: '2',
      title: 'International aid convoy reaches Gaza border checkpoint',
      content: 'UN humanitarian convoy successfully crossed Rafah border checkpoint carrying medical supplies and food aid. Egyptian authorities facilitated the crossing...',
      source: 'UN OCHA',
      sourceType: 'verified',
      credibilityScore: 0.98,
      crisisZone: 'Gaza Strip',
      tags: ['humanitarian', 'aid', 'medical-supplies', 'rafah'],
      timestamp: '2024-01-15T12:15:00Z',
      isBreaking: false,
      views: 1923,
      bookmarked: false,
      category: 'humanitarian'
    },
    {
      id: '3',
      title: 'Unconfirmed reports of ceasefire negotiations in Khartoum',
      content: 'Social media sources suggest ongoing diplomatic efforts to establish temporary ceasefire in Sudan capital. No official confirmation from government sources...',
      source: 'Social Media Monitor',
      sourceType: 'unverified',
      credibilityScore: 0.45,
      crisisZone: 'Sudan',
      tags: ['ceasefire', 'negotiations', 'khartoum', 'diplomacy'],
      timestamp: '2024-01-15T10:45:00Z',
      isBreaking: false,
      views: 756,
      bookmarked: false,
      category: 'political'
    },
    {
      id: '4',
      title: 'Hospital infrastructure damage assessment completed in northern Gaza',
      content: 'WHO assessment team reports significant damage to medical facilities in northern Gaza Strip. 12 hospitals currently non-operational, 8 partially functional...',
      source: 'World Health Organization',
      sourceType: 'verified',
      credibilityScore: 0.97,
      crisisZone: 'Gaza Strip',
      tags: ['healthcare', 'infrastructure', 'assessment', 'WHO'],
      timestamp: '2024-01-15T09:20:00Z',
      isBreaking: false,
      views: 3421,
      bookmarked: true,
      category: 'humanitarian'
    },
    {
      id: '5',
      title: 'Alleged military equipment movement near Donetsk region',
      content: 'OSINT analysts report satellite imagery showing potential military equipment repositioning. Analysis ongoing, verification pending from multiple sources...',
      source: 'OSINT Collective',
      sourceType: 'unverified',
      credibilityScore: 0.67,
      crisisZone: 'Eastern Ukraine',
      tags: ['military', 'osint', 'satellite', 'donetsk'],
      timestamp: '2024-01-15T08:10:00Z',
      isBreaking: false,
      views: 1245,
      bookmarked: false,
      category: 'military'
    },
    {
      id: '6',
      title: 'Refugee camp capacity exceeded in Chad border region',
      content: 'UNHCR reports overcrowding in refugee camps along Chad-Sudan border. Current capacity at 150% with new arrivals continuing daily...',
      source: 'UNHCR',
      sourceType: 'verified',
      credibilityScore: 0.96,
      crisisZone: 'Sudan',
      tags: ['refugees', 'overcrowding', 'chad', 'border'],
      timestamp: '2024-01-15T07:30:00Z',
      isBreaking: false,
      views: 892,
      bookmarked: true,
      category: 'humanitarian'
    }
  ]

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesSource = sourceFilter === 'all' || report.sourceType === sourceFilter
    const matchesCredibility = credibilityFilter === 'all' || 
                              (credibilityFilter === 'high' && report.credibilityScore >= 0.8) ||
                              (credibilityFilter === 'medium' && report.credibilityScore >= 0.5 && report.credibilityScore < 0.8) ||
                              (credibilityFilter === 'low' && report.credibilityScore < 0.5)
    
    const matchesCrisisZone = crisisZoneFilter === 'all' || report.crisisZone === crisisZoneFilter
    
    const matchesDate = dateFilter === 'all' || 
                       (dateFilter === 'today' && new Date(report.timestamp).toDateString() === new Date().toDateString()) ||
                       (dateFilter === 'week' && new Date(report.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
                       (dateFilter === 'month' && new Date(report.timestamp) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    
    return matchesSearch && matchesSource && matchesCredibility && matchesCrisisZone && matchesDate
  })

  const getCredibilityColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600'
    if (score >= 0.5) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getCredibilityBadge = (score: number) => {
    if (score >= 0.8) return 'default'
    if (score >= 0.5) return 'secondary'
    return 'destructive'
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'humanitarian': return 'bg-blue-100 text-blue-800'
      case 'military': return 'bg-red-100 text-red-800'
      case 'political': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const verifiedReports = mockReports.filter(r => r.sourceType === 'verified')
  const unverifiedReports = mockReports.filter(r => r.sourceType === 'unverified')
  const bookmarkedReports = mockReports.filter(r => r.bookmarked)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports Archive</h1>
        <p className="text-muted-foreground mt-1">
          Search and browse historical crisis reports with advanced filtering
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search reports, sources, or tags..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Last week</SelectItem>
              <SelectItem value="month">Last month</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Source type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sources</SelectItem>
              <SelectItem value="verified">Verified only</SelectItem>
              <SelectItem value="unverified">Unverified</SelectItem>
            </SelectContent>
          </Select>

          <Select value={credibilityFilter} onValueChange={setCredibilityFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Credibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              <SelectItem value="high">High (80%+)</SelectItem>
              <SelectItem value="medium">Medium (50-80%)</SelectItem>
              <SelectItem value="low">Low (&lt;50%)</SelectItem>
            </SelectContent>
          </Select>

          <Select value={crisisZoneFilter} onValueChange={setCrisisZoneFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Crisis zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All zones</SelectItem>
              <SelectItem value="Eastern Ukraine">Eastern Ukraine</SelectItem>
              <SelectItem value="Gaza Strip">Gaza Strip</SelectItem>
              <SelectItem value="Sudan">Sudan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReports.length}</div>
            <p className="text-xs text-muted-foreground">
              {filteredReports.length} matching filters
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Sources</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verifiedReports.length}</div>
            <p className="text-xs text-muted-foreground">
              {((verifiedReports.length / mockReports.length) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Credibility</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((mockReports.reduce((sum, r) => sum + r.credibilityScore, 0) / mockReports.length) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Across all reports
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockReports.reduce((sum, r) => sum + r.views, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              All time views
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Reports ({filteredReports.length})</TabsTrigger>
          <TabsTrigger value="verified">Verified ({verifiedReports.filter(r => filteredReports.includes(r)).length})</TabsTrigger>
          <TabsTrigger value="bookmarked">Bookmarked ({bookmarkedReports.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        {report.isBreaking && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            BREAKING
                          </Badge>
                        )}
                        {report.bookmarked && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <CardDescription className="flex items-center space-x-4 mb-3">
                        <span className="flex items-center space-x-1">
                          <Shield className="h-3 w-3" />
                          <span>{report.source}</span>
                        </span>
                        <Badge variant={report.sourceType === 'verified' ? 'default' : 'secondary'}>
                          {report.sourceType}
                        </Badge>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(report.timestamp).toLocaleString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{report.views.toLocaleString()} views</span>
                        </span>
                      </CardDescription>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {report.content}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <div className={`text-lg font-bold ${getCredibilityColor(report.credibilityScore)}`}>
                        {Math.round(report.credibilityScore * 100)}%
                      </div>
                      <div className="text-xs text-muted-foreground">credibility</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={getCategoryColor(report.category)}>
                        {report.category}
                      </Badge>
                      <Badge variant="outline">
                        {report.crisisZone}
                      </Badge>
                      <div className="flex flex-wrap gap-1">
                        {report.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="h-2 w-2 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                        {report.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{report.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Source
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="verified" className="space-y-4">
          <div className="space-y-4">
            {verifiedReports.filter(r => filteredReports.includes(r)).map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow border-green-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <Badge variant="default">Verified</Badge>
                        {report.isBreaking && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            BREAKING
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="flex items-center space-x-4 mb-3">
                        <span className="flex items-center space-x-1">
                          <Shield className="h-3 w-3" />
                          <span>{report.source}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(report.timestamp).toLocaleString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{report.views.toLocaleString()} views</span>
                        </span>
                      </CardDescription>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {report.content}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-lg font-bold text-green-600">
                        {Math.round(report.credibilityScore * 100)}%
                      </div>
                      <div className="text-xs text-muted-foreground">credibility</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={getCategoryColor(report.category)}>
                        {report.category}
                      </Badge>
                      <Badge variant="outline">
                        {report.crisisZone}
                      </Badge>
                      <div className="flex flex-wrap gap-1">
                        {report.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="h-2 w-2 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Source
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookmarked" className="space-y-4">
          <div className="space-y-4">
            {bookmarkedReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow border-yellow-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <Badge variant={report.sourceType === 'verified' ? 'default' : 'secondary'}>
                          {report.sourceType}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center space-x-4 mb-3">
                        <span className="flex items-center space-x-1">
                          <Shield className="h-3 w-3" />
                          <span>{report.source}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(report.timestamp).toLocaleString()}</span>
                        </span>
                      </CardDescription>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {report.content}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <div className={`text-lg font-bold ${getCredibilityColor(report.credibilityScore)}`}>
                        {Math.round(report.credibilityScore * 100)}%
                      </div>
                      <div className="text-xs text-muted-foreground">credibility</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={getCategoryColor(report.category)}>
                        {report.category}
                      </Badge>
                      <Badge variant="outline">
                        {report.crisisZone}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Star className="h-3 w-3 mr-1" />
                        Remove
                      </Button>
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

export default ReportsArchive