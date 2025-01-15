export interface OrderStats {
    todayOrders: number
    ordersPending: number
    ordersProcessing: number
    ordersDelivered: number
  }
  
  export interface SalesStats {
    amount: number
    cash: number
    card: number
    credit: number
  }
  
  export interface WeeklySales {
    date: string
    sales: number
    orders: number
  }
  
  export interface ProductSale {
    name: string
    value: number
    color: string
  }
  
  