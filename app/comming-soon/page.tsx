import { ComingSoon } from "@/components/common/comming-soon";
import MainLayout from "@/components/common/main";


export default function ComingSoonPage() {
    return (

  <MainLayout pageTitle="Dashboard">
       <div className="flex min-h-screen">
         <main className="flex-1 pl-64">
           <div className="container mx-auto p-6 space-y-8">
             {/* <h1 className="text-2xl font-bold mb-4">NOC Site Dashboard</h1> */}
              <ComingSoon />
           </div>
         </main>
       </div>
     </MainLayout>
    )
}

