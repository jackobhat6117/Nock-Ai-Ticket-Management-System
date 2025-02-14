"use client";

import { Bell, UserCircle } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Button, 
  Avatar,
  Tabs,
  Tab
} from "@nextui-org/react";

export function Header() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const sessionData = session as any
  console.log('sessionheader', session)
  const firstName = sessionData?.user?.firstName  || "Unknown User";
  const lastName = sessionData?.user?.lastName

  const userName = firstName + " " + lastName

  
  const currentDashboard = pathname.includes("noc-it") ? "noc-it" : "noc-site";
  const [selectedDashboard, setSelectedDashboard] = useState(currentDashboard);

  
  useEffect(() => {
    setSelectedDashboard(currentDashboard);
  }, [pathname]);


  const isDashboardPath = useMemo(() => 
    pathname === "/dashboard/noc-site" || pathname === "/dashboard/noc-it", 
    [pathname]
  );

  const handleSignout = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  const handleDashboardChange = (key: string) => {
    setSelectedDashboard(key);
    router.push(`/dashboard/${key}`);
  };

  return (
    <header className="sticky top-0 border-b bg-white shadow-md z-20">
      <div className="flex h-16 items-center px-6 justify-between">
      
        {isDashboardPath && (
          <div className="ml-60 mt-5">
            <Tabs 
              aria-label="Dashboard Options"
              selectedKey={selectedDashboard}
              onSelectionChange={(key) => handleDashboardChange(key as string)}
              color="primary"
              variant="underlined"
              classNames={{
                cursor: "h-1 w-full bg-primary",
                tab: "max-w-fit px-6 h-12 text-gray-600 hover:text-primary transition-all",
                tabContent: "group-data-[selected=true]:text-primary font-semibold"
              }}
            >
              <Tab key="noc-it" title="NOC IT" />
              <Tab key="noc-site" title="NOC Site" />
            </Tabs>
          </div>
        )}

        {/* Right side controls */}
        <div className="flex items-center space-x-6 ml-auto">
          {/* Notifications Button */}
          <Button isIconOnly variant="light">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Profile Dropdown */}
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                as="button"
                size="md"
                src={session?.user?.image || ""}
                icon={<UserCircle className="h-6 w-6 text-gray-500" />}
              />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="profile" className="font-medium">
                {userName}
              </DropdownItem>
              <DropdownItem key="signout" onClick={handleSignout} color="danger">
                {loading ? "Signing out..." : "Sign Out"}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
