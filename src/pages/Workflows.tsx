import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Workflow, Play, Pause, Settings } from 'lucide-react'

function Workflows() {
  const mockWorkflows = [
    {
      id: '1',
      name: 'Ukraine Data Ingestion',
      description: 'Automated collection from multiple sources',
      status: 'active',
      lastRun: '5 minutes ago',
      triggerType: 'scheduled'
    },
    {
      id: '2',
      name: 'Fact-checking Pipeline',
      description: 'Cross-reference reports for verification',
      status: 'active',
      lastRun: '10 minutes ago',
      triggerType: 'event'
    },
    {
      id: '3',
      name: 'Alert Generation',
      description: 'Generate alerts for critical updates',
      status: 'paused',
      lastRun: '2 hours ago',
      triggerType: 'manual'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">n8n Workflows</h1>
          <p className="text-muted-foreground mt-1">
            Manage automation workflows and triggers
          </p>
        </div>
        <Button>Create Workflow</Button>
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
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Trigger: {workflow.triggerType}</span>
                <span>Last run: {workflow.lastRun}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Workflows