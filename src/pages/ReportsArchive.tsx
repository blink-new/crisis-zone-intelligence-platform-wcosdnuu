import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Archive, Search, Filter, Shield, Clock } from 'lucide-react'

function ReportsArchive() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports Archive</h1>
        <p className="text-muted-foreground mt-1">
          Search and browse historical crisis reports
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search reports..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Archive className="h-5 w-5" />
            <span>Archive Search</span>
          </CardTitle>
          <CardDescription>
            This feature will provide advanced search and filtering capabilities
            for the historical reports database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>Verified sources only</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Last 30 days</span>
              </div>
            </div>
            <p className="text-muted-foreground">
              Advanced search functionality with filters by date range, source credibility,
              crisis zone, and content analysis will be implemented here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ReportsArchive