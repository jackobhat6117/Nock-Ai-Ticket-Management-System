"use client"

import { Moon, Sun, Bell } from 'lucide-react'
import { useTheme } from "next-themes"
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react"
import { getSession, signOut, useSession } from 'next-auth/react'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export function Header() {
  const { setTheme } = useTheme()
  const loading = useRef(false)
  const router = useRouter()
  const  handleSignout = async() => {
    await signOut()
  }
  const{data: session} =  useSession()
  useEffect(() => {
    if (!session){
      router.push('/auth/login')
    }
    loading.current = true
  },[session])

  return (
    <header className="sticky top-0 border-b bg-white ">
      <div className="flex h-16 items-center justify-end space-x-4 px-4">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="light">
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Theme selection">
            <DropdownItem key="light" onClick={() => setTheme("light")}>Light</DropdownItem>
            <DropdownItem key="dark" onClick={() => setTheme("dark")}>Dark</DropdownItem>
            <DropdownItem key="system" onClick={() => setTheme("system")}>System</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button isIconOnly variant="light">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <Button variant="solid" onClick = {handleSignout} color='success' className='text-white'>
         {loading ? 'Signout..': 'Signout'}
        </Button>

      </div>
    </header>
  )
}

