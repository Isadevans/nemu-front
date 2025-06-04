export interface JourneyResponse {
    data: Journey[]
    meta: Meta
}

export interface Journey {
    sessionId: string
    touchpoints: Touchpoint[]
}

export interface Touchpoint {
    id: number
    channel: string
    campaign: string
    content: string
    timestamp: string
}

export interface Meta {
    currentPage: number
    pageSize: number
    totalItems: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
}
