import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Database, Rss, Globe, Twitter } from 'lucide-react'

function DataSources() {
  const mockSources = [
    {
      id: '1',
      name: 'Reuters Crisis Feed',
      type: 'rss',
      status: 'active',
      lastSync: '2 minutes ago'
    },
    {
      id: '2',
      name: 'UN OCHA API',
      type: 'api',
      status: 'active',
      lastSync: '5 minutes ago'
    },
    {
      id: '3',
      name: 'OSINT Twitter Monitor',
      type: 'social',
      status: 'inactive',
      lastSync: '1 hour ago'
    }
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case 'rss': return <Rss className="h-5 w-5" />
      case 'api': return <Database className="h-5 w-5" />
      case 'social': return <Twitter className="h-5 w-5" />
      default: return <Globe className="h-5 w-5" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Sources</h1>
          <p className="text-muted-foreground mt-1">
            Manage external data feeds and integrations
          </p>
        </div>
        <Button>Add Data Source</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSources.map((source) => (
          <Card key={source.id}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getIcon(source.type)}
                <span>{source.name}</span>
              </CardTitle>
              <CardDescription>
                Type: {source.type} • Last sync: {source.lastSync}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant={source.status === 'active' ? 'default' : 'secondary'}>
                  {source.status}
                </Badge>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DataSources