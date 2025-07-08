export type Guitar = {
    id: number 
    name: string
    image: string
    description: string
    price: number
}

export type cartItem = Pick<Guitar, 'id' | 'name' | 'image' | 'price'> &{
    quantity: number
}
export type guitarID = Guitar['id']