export interface User {
  id: string
  email: string
  displayName?: string
  role: 'admin' | 'analyst' | 'journalist' | 'ngo'
  permissions: string[]
  createdAt: string
}

export interface CrisisZone {
  id: string
  name: string
  region: string
  country: string
  coordinates?: {
    lat: number
    lng: number
  }
  status: 'active' | 'monitoring' | 'resolved'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  createdAt: string
  updatedAt: string
  adminId: string
}

export interface DataSource {
  id: string
  name: string
  type: 'rss' | 'api' | 'osint' | 'social' | 'news'
  url: string
  apiKey?: string
  isActive: boolean
  crisisZoneId: string
  lastSync?: string
  createdAt: string
}

export interface Report {
  id: string
  title: string
  content: string
  source: string
  sourceType: 'verified' | 'unverified' | 'rumor'
  credibilityScore: number
  crisisZoneId: string
  tags: string[]
  timestamp: string
  isBreaking: boolean
  relatedReports?: string[]
}

export interface Workflow {
  id: string
  name: string
  description: string
  n8nWorkflowId: string
  triggerType: 'manual' | 'scheduled' | 'event'
  crisisZoneId: string
  isActive: boolean
  lastRun?: string
  createdAt: string
}

export interface Alert {
  id: string
  title: string
  message: string
  severity: 'info' | 'warning' | 'critical'
  crisisZoneId: string
  userId?: string
  isRead: boolean
  createdAt: string
}