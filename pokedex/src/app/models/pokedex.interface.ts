export interface PokedexResponse {
    count: number
    next: string
    previous: any
    results: Pokedex[]
  }
  
  export interface Pokedex {
    name: string
    url: string
  }