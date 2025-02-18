

"use client";
import { useSiteMapService } from "@/app/services/outrage-mapServices";
import MainLayout from "@/components/common/main";
import { OutageMap } from "@/components/dashboard/outage-map";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function NocSite() {
 
  const {data, loading, getSiteMapData} = useSiteMapService()

   useEffect(() => {
     getSiteMapData()

   },[])
   
  

 
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
