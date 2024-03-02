'use client'

import Link from "next/link";
import { GrHome } from "react-icons/gr";
import { SlNotebook } from "react-icons/sl";
import Plusdiary from "./plusdiary";
import { useEffect, useState } from "react";
import { useModalStore } from "@/lib/store";
import { supabase } from "../../../supabase.config";

const Sidebar = () => {
  const [sharediary, setSharediary] = useState<any>('');
  const {modal} = useModalStore();

  useEffect(() => {
    async function fetchDiary () {
        let { data, error } = await supabase
            .from('sharediary')
            .select('*');
        setSharediary(data);
        if (error) throw error;
        return sharediary;
        }
        fetchDiary();
    }, [modal])

  return (
    <aside className="hidden w-full h-screen p-4 lg:flex bg-slate-300">
        <div className="flex size-full flex-col gap-4">
             <Link href={'/'} className="flex px-2 items-center align-middle hover:bg-slate-200"> 
                <GrHome className="mr-2"/> 
                <p> Home </p>
              </Link>
              <Link href={'/profile'} className="flex px-2 items-center align-middle hover:bg-slate-200"> 
                <SlNotebook className="mr-2"/>
                <p> Profile </p>
              </Link>
              {sharediary && sharediary.map((item: any) => (
                <Link href={`/diary/${item.id}`} key={item.id}
                className="flex px-2 items-center align-middle hover:bg-slate-200"> 
                <SlNotebook className="mr-2"/>
                <p> {item.name} </p>
                </Link>
              ))}
              <Plusdiary />
        </div>
    </aside>
  )
}

export default Sidebar