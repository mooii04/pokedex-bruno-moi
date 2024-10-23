export interface ItemsResponse {
    count: number
    next: string
    previous: any
    results: Items[]
  }
  
  export interface Items {
    name: string
    url: string
  }