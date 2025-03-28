export interface SiteMap {
        siteid: string
        region: string
        sitestage: string
        isvip: string
        sitecode: string
        ishub: string
        sitetype: string
        powerType: string
        locationLat: string
        locationLong: string
        siteEngineer: string
        createdAt: string
        updatedAt: string
}

export interface TotalSiteStatusMap {
        sitedownflag: string,
        siteid: string,
        region: string,
        locationLat: string,
        locationLong: string
        total_active_customers: string,
        total_revenue: string
}

export interface TotalStatusTable {
        region: string,
        site_up: string,
        site_down: string,
        total_sites: string
        total_active_subscribers: string,
        total_revenue: string
}