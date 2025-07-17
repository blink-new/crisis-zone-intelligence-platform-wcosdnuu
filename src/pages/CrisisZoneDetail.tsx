import { useParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { MapPin, Clock, TrendingUp } from 'lucide-react'

function CrisisZoneDetail() {
  const { id } = useParams()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Crisis Zone Details</h1>
        <p className="text-muted-foreground mt-1">
          Detailed view for crisis zone {id}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Eastern Ukraine</span>
            <Badge variant="destructive">Critical</Badge>
          </CardTitle>
          <CardDescription className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>Eastern Europe, Ukraine</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This feature will show detailed information about the selected crisis zone,
            including real-time reports, data sources, and analytics.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default CrisisZoneDetail