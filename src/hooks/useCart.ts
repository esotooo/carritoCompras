import { useEffect, useState } from "react"
import { useMemo } from "react"
import { db } from "../data/db"
import type { cartItem, Guitar, guitarID } from "../types/types"

export function useCart(){

    const storagedCart = () : cartItem[] => {
        const savedCart = localStorage.getItem('cart')
        if (!savedCart) return []
      
        try {
          const parsed = JSON.parse(savedCart)
          return Array.isArray(parsed) ? parsed.filter(Boolean) : []
        } catch (e) {
          console.error("Error al parsear el carrito:", e)
          return []
        }
      }
      
      //State
      const [data, setData] = useState(db)
      const [cart, setCart] = useState(storagedCart)
    
      //Variables
      const MAX_ITEMS = 5
      const MIN_ITEMS = 1
     
      useEffect(() => {
        setData(db)
      }, [])
    
      useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart])
    
    
      function addToCart(item: Guitar){
          const itemExists = cart.findIndex((guitar) => guitar.id === item.id)
          if(itemExists >= 0){//Existe en el carrito
            if(cart[itemExists].quantity >= MAX_ITEMS) return
            const updatedCart =  [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
          }else{
            const newItem : cartItem = {...item, quantity : 1 }
            setCart([...cart, newItem]) 
          }
    
      }
    
      function removeFromCart(id : guitarID){
        setCart(prevCart => prevCart.filter(guitar => guitar.id != id))
      }
    
      function increaseQuantity(id : guitarID){
        const updatedCart = cart.map( item => {
          if(item.id === id && item.quantity < MAX_ITEMS){
            return{
              ...item, 
              quantity: item.quantity + 1
            }
          }
          return item
        })
        setCart(updatedCart)
      }
    
      function decreaseQuantity(id : guitarID){
        const updatedCart = cart.map( item => {
          if(item.id === id && item.quantity >= MIN_ITEMS ){
            return{
              ...item,
              quantity: item.quantity - 1
            }
          }
          return item
        })
        setCart(updatedCart)
      }
    
      function clearCart(){
        setCart([])
      }

    //State derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const total = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])
      
    return{
        data,
        cart, 
        addToCart,
        clearCart,
        decreaseQuantity,
        increaseQuantity,
        removeFromCart,
        isEmpty,
        total
    }   
}