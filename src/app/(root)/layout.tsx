'use client'

import Navbar from "@/components/shared/navbar"
import Sidebar from "@/components/shared/sidebar"
import { motion } from "framer-motion"
import {useOpenStore} from "../../lib/store";
import Modal from "@/components/shared/modal"
import Providers from "@/lib/providers";

const Layout = ({ children }: {children: React.ReactNode}) => {
  const {open} = useOpenStore();
    
  return (
      <Providers>
        <main className="root bg-white dark: bg-black">
           <div className="root-container">
                <Navbar />
              <div className="flex">
                {open && (<motion.div initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                    className="w-52"> 
                    <Sidebar /> 
                    <Modal />
                    </motion.div>)
                }
                <div className="wrapper w-full">
                    {children}
                </div>
              </div>
           </div> 
        </main>
      </Providers>
    )
}

export default Layout