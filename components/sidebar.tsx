import { Link } from "@nextui-org/react"
import { LayoutDashboard, Package, Users, ShoppingCart, UserCircle, Settings, Globe, Store, FileText } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-64 flex-col border-r bg-background ">
      <div className="p-6 text-xl font-bold">Nock-Ai Admin</div>
      <nav className="flex-1 space-y-1 p-4">
        <Link
          href="/dashboard"
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-default-500 hover:bg-default-100"
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/catalog"
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-default-500 hover:bg-default-100"
        >
          <Package className="h-5 w-5" />
          <span>Alarm</span>
        </Link>
        <Link
          href="/customers"
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-default-500 hover:bg-default-100"
        >
          <Users className="h-5 w-5" />
          <span>Incident Ticket</span>
        </Link>
        <Link
          href="/orders"
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-default-500 hover:bg-default-100"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Work Order</span>
        </Link>
        <Link
          href="/staff"
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-default-500 hover:bg-default-100"
        >
          <UserCircle className="h-5 w-5" />
          <span>Problem Ticket</span>
        </Link>
        <Link
          href="/settings"
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-default-500 hover:bg-default-100"
        >
          <FileText className="h-5 w-5" />
          <span>Change Request</span>
        </Link>
        <Link
          href="/international"
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-default-500 hover:bg-default-100"
        >
          <Settings className="h-5 w-5" />
          <span>Planned Maintenance</span>
        </Link>
        {/* <Link
          href="/store"
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-default-500 hover:bg-default-100"
        >
          <Store className="h-5 w-5" />
          <span>Online Store</span>
        </Link>
        <Link
          href="/pages"
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-default-500 hover:bg-default-100"
        >
          <FileText className="h-5 w-5" />
          <span>Pages</span>
        </Link> */}
      </nav>
    </aside>
  )
}

