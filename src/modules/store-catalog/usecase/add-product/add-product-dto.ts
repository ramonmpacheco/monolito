export interface AddProductInputDto {
    id?: string
    name: string
    description: string
    salesPrice: number
  }
  
  export interface AddProductOutputDto {
    id: string
    name: string
    description: string
    salesPrice: number
  }