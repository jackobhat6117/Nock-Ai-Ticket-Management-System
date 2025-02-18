export interface SiteOutage {
    name: string
    total: number
    active: number
  }
  
  export interface ClusterCell {
    name: string
    g2: number
    g3: number
    g4: number
    total: number
    siteTotal: number
  }
  
  export interface MapMarker {
    id: string
    siteid: string
    lat: number
    lng: number
    status: "active" | "inactive" | any
    type: "cell" | "site"
    name: string
  }
  
  