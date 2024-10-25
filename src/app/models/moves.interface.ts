export interface MovesResponse {
    count: number
    next: string
    previous: any
    results: Moves[]
  }
  
  export interface Moves {
    name: string
    url: string
  }