import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  Workflow, 
  Play, 
  Pause, 
  Settings, 
  Plus, 
  Edit, 
  Trash2,
  Clock,
  Zap,
  CheckCircle,
  AlertCircle,
  Activity,
  BarChart3,
  Calendar,
  Timer
} from 'lucide-react'

function Workflows() {
  const [showCreateWorkflow, setShowCreateWorkflow] = useState(false)
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    crisisZone: '',
    triggerType: 'scheduled',
    schedule: '5',
    n8nWorkflowId: ''
  })

  const mockWorkflows = [
    {
      id: '1',
      name: 'Ukraine Data Ingestion',
      description: 'Automated collection from multiple RSS feeds, news APIs, and social media sources for Ukraine crisis zone',
      status: 'active',
      lastRun: '2 minutes ago',
      nextRun: '3 minutes',
      triggerType: 'scheduled',
      schedule: '5 minutes',
      crisisZone: 'Eastern Ukraine',
      successRate: 98.5,
      totalRuns: 2847,
      avgDuration: '45s',
      itemsProcessed: 15420
    },
    {
      id: '2',
      name: 'Fact-checking Pipeline',
      description: 'Cross-reference reports against multiple sources for verification and credibility scoring',
      status: 'active',
      lastRun: '8 minutes ago',
      nextRun: 'On new report',
      triggerType: 'event',
      schedule: 'Event-based',
      crisisZone: 'All zones',
      successRate: 94.2,
      totalRuns: 1256,
      avgDuration: '2m 15s',
      itemsProcessed: 8934
    },
    {
      id: '3',
      name: 'Alert Generation',
      description: 'Generate and distribute critical alerts based on severity thresholds and keywords',
      status: 'paused',
      lastRun: '2 hours ago',
      nextRun: 'Paused',
      triggerType: 'event',
      schedule: 'Critical events',
      crisisZone: 'Gaza Strip',
      successRate: 100,
      totalRuns: 89,
      avgDuration: '12s',
      itemsProcessed: 234
    },
    {
      id: '4',
      name: 'Social Media Monitor',
      description: 'Monitor Twitter, Telegram, and other social platforms for OSINT data collection',
      status: 'active',
      lastRun: '1 minute ago',
      nextRun: '2 minutes',
      triggerType: 'scheduled',
      schedule: '3 minutes',
      crisisZone: 'Sudan',
      successRate: 87.3,
      totalRuns: 4521,
      avgDuration: '1m 32s',
      itemsProcessed: 23567
    },
    {
      id: '5',
      name: 'Report Summarization',
      description: 'AI-powered summarization and clustering of related reports for better analysis',
      status: 'error',
      lastRun: '45 minutes ago',
      nextRun: 'Error - retry pending',
      triggerType: 'scheduled',
      schedule: '30 minutes',
      crisisZone: 'All zones',
      successRate: 76.8,
      totalRuns: 892,
      avgDuration: '3m 45s',
      itemsProcessed: 5678
    }
  ]

  const handleCreateWorkflow = () => {
    console.log('Creating workflow:', newWorkflow)
    setShowCreateWorkflow(false)
    setNewWorkflow({
      name: '',
      description: '',
      crisisZone: '',
      triggerType: 'scheduled',
      schedule: '5',
      n8nWorkflowId: ''
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'paused': return <Pause className="h-4 w-4 text-yellow-500" />
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'paused': return 'secondary'
      case 'error': return 'destructive'
      default: return 'outline'
    }
  }

  const getTriggerIcon = (triggerType: string) => {
    switch (triggerType) {
      case 'scheduled': return <Timer className="h-4 w-4" />
      case 'event': return <Zap className="h-4 w-4" />
      case 'manual': return <Play className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const activeWorkflows = mockWorkflows.filter(w => w.status === 'active')
  const pausedWorkflows = mockWorkflows.filter(w => w.status === 'paused')
  const errorWorkflows = mockWorkflows.filter(w => w.status === 'error')

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">n8n Workflows</h1>
          <p className="text-muted-foreground mt-1">
            Manage automation workflows and triggers for crisis data processing
          </p>
        </div>
        <Dialog open={showCreateWorkflow} onOpenChange={setShowCreateWorkflow}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Workflow</DialogTitle>
              <DialogDescription>
                Set up a new n8n automation workflow for crisis data processing.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newWorkflow.name}
                  onChange={(e) => setNewWorkflow({...newWorkflow, name: e.target.value})}
                  className="col-span-3"
                  placeholder="e.g., Syria Data Collection"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newWorkflow.description}
                  onChange={(e) => setNewWorkflow({...newWorkflow, description: e.target.value})}
                  className="col-span-3"
                  placeholder="Brief description of workflow purpose..."
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="crisisZone" className="text-right">
                  Crisis Zone
                </Label>
                <Select value={newWorkflow.crisisZone} onValueChange={(value) => setNewWorkflow({...newWorkflow, crisisZone: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select crisis zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ukraine">Eastern Ukraine</SelectItem>
                    <SelectItem value="gaza">Gaza Strip</SelectItem>
                    <SelectItem value="sudan">Sudan</SelectItem>
                    <SelectItem value="all">All Zones</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="triggerType" className="text-right">
                  Trigger Type
                </Label>
                <Select value={newWorkflow.triggerType} onValueChange={(value) => setNewWorkflow({...newWorkflow, triggerType: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="event">Event-based</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {newWorkflow.triggerType === 'scheduled' && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="schedule" className="text-right">
                    Interval (min)
                  </Label>
                  <Input
                    id="schedule"
                    type="number"
                    value={newWorkflow.schedule}
                    onChange={(e) => setNewWorkflow({...newWorkflow, schedule: e.target.value})}
                    className="col-span-3"
                    placeholder="5"
                  />
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="n8nId" className="text-right">
                  n8n Workflow ID
                </Label>
                <Input
                  id="n8nId"
                  value={newWorkflow.n8nWorkflowId}
                  onChange={(e) => setNewWorkflow({...newWorkflow, n8nWorkflowId: e.target.value})}
                  className="col-span-3"
                  placeholder="n8n workflow identifier"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateWorkflow(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateWorkflow}>
                Create Workflow
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
            <Workflow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockWorkflows.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeWorkflows.length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(mockWorkflows.reduce((sum, w) => sum + w.successRate, 0) / mockWorkflows.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Average across all workflows
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Runs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockWorkflows.reduce((sum, w) => sum + w.totalRuns, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              All time executions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Processed</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockWorkflows.reduce((sum, w) => sum + w.itemsProcessed, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Data points collected
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Workflows ({mockWorkflows.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeWorkflows.length})</TabsTrigger>
          <TabsTrigger value="issues">Issues ({pausedWorkflows.length + errorWorkflows.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {mockWorkflows.map((workflow) => (
            <Card key={workflow.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <Workflow className="h-5 w-5" />
                        <span>{workflow.name}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(workflow.status)}
                        <Badge variant={getStatusColor(workflow.status) as any}>
                          {workflow.status}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="mb-3">
                      {workflow.description}
                    </CardDescription>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        {getTriggerIcon(workflow.triggerType)}
                        <span>{workflow.schedule}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{workflow.crisisZone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      {workflow.status === 'active' ? (
                        <Pause className="h-4 w-4" />
                      ) : workflow.status === 'paused' ? (
                        <Play className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Success Rate</p>
                    <p className="font-medium text-lg">{workflow.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Runs</p>
                    <p className="font-medium text-lg">{workflow.totalRuns.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Avg Duration</p>
                    <p className="font-medium text-lg">{workflow.avgDuration}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Items Processed</p>
                    <p className="font-medium text-lg">{workflow.itemsProcessed.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t text-sm text-muted-foreground">
                  <span>Last run: {workflow.lastRun}</span>
                  <span>Next run: {workflow.nextRun}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {activeWorkflows.map((workflow) => (
            <Card key={workflow.id} className="hover:shadow-md transition-shadow border-green-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <Workflow className="h-5 w-5" />
                        <span>{workflow.name}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <Badge variant="default">Active</Badge>
                      </div>
                    </div>
                    <CardDescription className="mb-3">
                      {workflow.description}
                    </CardDescription>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        {getTriggerIcon(workflow.triggerType)}
                        <span>{workflow.schedule}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{workflow.crisisZone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Pause className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Success Rate</p>
                    <p className="font-medium text-lg text-green-600">{workflow.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Runs</p>
                    <p className="font-medium text-lg">{workflow.totalRuns.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Avg Duration</p>
                    <p className="font-medium text-lg">{workflow.avgDuration}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Items Processed</p>
                    <p className="font-medium text-lg">{workflow.itemsProcessed.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t text-sm text-muted-foreground">
                  <span>Last run: {workflow.lastRun}</span>
                  <span>Next run: {workflow.nextRun}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          {[...pausedWorkflows, ...errorWorkflows].map((workflow) => (
            <Card key={workflow.id} className="hover:shadow-md transition-shadow border-red-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <Workflow className="h-5 w-5" />
                        <span>{workflow.name}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(workflow.status)}
                        <Badge variant={getStatusColor(workflow.status) as any}>
                          {workflow.status}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="mb-3">
                      {workflow.description}
                    </CardDescription>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        {getTriggerIcon(workflow.triggerType)}
                        <span>{workflow.schedule}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{workflow.crisisZone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Success Rate</p>
                    <p className={`font-medium text-lg ${workflow.successRate < 80 ? 'text-red-500' : 'text-yellow-500'}`}>
                      {workflow.successRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Runs</p>
                    <p className="font-medium text-lg">{workflow.totalRuns.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Avg Duration</p>
                    <p className="font-medium text-lg">{workflow.avgDuration}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Items Processed</p>
                    <p className="font-medium text-lg">{workflow.itemsProcessed.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t text-sm">
                  <span className="text-muted-foreground">Last run: {workflow.lastRun}</span>
                  <span className={workflow.status === 'error' ? 'text-red-500' : 'text-yellow-500'}>
                    {workflow.nextRun}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Workflows