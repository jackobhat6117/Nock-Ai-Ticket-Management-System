"use client"
import MainLayout from '@/components/common/main'
import { ProductsChart } from '@/components/dashboard/products'
import { SalesCard } from '@/components/dashboard/sales-card'
import { StatsCard } from '@/components/dashboard/stats-card'
import { WeeklyChart } from '@/components/dashboard/weekly-chart'
import { ShoppingCart, Clock, Package, Check } from 'lucide-react'
import { getSession, useSession } from 'next-auth/react'


const orderStats = {
  todayOrders: 4,
  ordersPending: 0,
  ordersProcessing: 0,
  ordersDelivered: 4,
}

const salesStats = {
  today: {
    amount: 1459.55,
    cash: 1459.55,
    card: 0,
    credit: 0,
  },
  yesterday: {
    amount: 0,
    cash: 0,
    card: 0,
    credit: 0,
  },
  month: {
    amount: 1459.55,
    cash: 1459.55,
    card: 0,
    credit: 0,
  },
  allTime: {
    amount: 3936.75,
    cash: 3936.75,
    card: 0,
    credit: 0,
  },
}

const weeklySalesData = [
  { date: "Mon", sales: 1459.5, orders: 4 },
  { date: "Tue", sales: 1459.6, orders: 3 },
  { date: "Wed", sales: 1460.0, orders: 5 },
  { date: "Thu", sales: 1460.2, orders: 4 },
  { date: "Fri", sales: 1460.5, orders: 6 },
]

const productSalesData = [
  { name: "Green Leaf Lettuce", value: 45, color: "#10b981" },
  { name: "Huggies Diaper-Reg.Small", value: 25, color: "#3b82f6" },
  { name: "Clementine", value: 20, color: "#f97316" },
  { name: "Blueberry", value: 10, color: "#6366f1" },
]

export default function page() {
  const {data: session} = useSession()
  console.log('session', session)
  return (
    <MainLayout pageTitle='Dashboard' >

    <div className="flex min-h-screen">
      <main className="flex-1 pl-64">
        <div className="container mx-auto p-6 space-y-8">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              icon={<ShoppingCart className="h-5 w-5" />}
              label="Today Orders"
              value={orderStats.todayOrders}
            />
            <StatsCard
              icon={<Clock className="h-5 w-5" />}
              label="Orders Pending"
              value={orderStats.ordersPending}
            />
            <StatsCard
              icon={<Package className="h-5 w-5" />}
              label="Orders Processing"
              value={orderStats.ordersProcessing}
            />
            <StatsCard
              icon={<Check className="h-5 w-5" />}
              label="Orders Delivered"
              value={orderStats.ordersDelivered}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <SalesCard title="Today Orders" stats={salesStats.today} />
            <SalesCard title="Yesterday Orders" stats={salesStats.yesterday} />
            <SalesCard title="This Month" stats={salesStats.month} />
            <SalesCard title="All-Time Sales" stats={salesStats.allTime} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <WeeklyChart data={weeklySalesData} />
            <ProductsChart data={productSalesData} />
          </div>
        </div>
      </main>
    </div>
    </MainLayout>
  )
}

