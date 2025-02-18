

"use client";
import { useSiteMapService } from "@/app/services/outrage-mapServices";
import MainLayout from "@/components/common/main";
import { OutageMap } from "@/components/dashboard/outage-map";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function page() {
  const [session, setSession] = useState(null);
  const {data, loading, getSiteMapData} = useSiteMapService()

   useEffect(() => {
     getSiteMapData()

   },[])
   
   console.log('sitedataaa', data)

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData:any = await getSession();
      console.log("Session:", sessionData);
      setSession(sessionData);
    };

    fetchSession();
  }, []);
  return (
    <MainLayout pageTitle="Dashboard">
      <div className="flex min-h-screen">
        <main className="flex-1 pl-64">
          <div className="container mx-auto p-6 space-y-8">
            <OutageMap data = {data} loading = {loading}/>
          </div>
        </main>
      </div>
    </MainLayout>
  );
}
