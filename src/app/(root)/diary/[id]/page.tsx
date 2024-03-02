'use client'

import { useEffect, useState } from "react";
import { supabase } from "../../../../../supabase.config";
import { useModalStore } from "@/lib/store";
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import DarkMode from "@/lib/darkmode";

const Page = () => {
    const [sharediary, setSharediary] = useState<any>('');
    const {modal} = useModalStore();
    const params = useParams() as { id: string };

    const copy = async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        alert('클립보드에 복사되었습니다.');
      } catch (error) {
        console.error(error);
      }
    };

    const handleCopy = () => {
      const text = `${process.env.NEXT_PUBLIC_BASE_URL}/diary/${params.id}`; 
      copy(text);
    };

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
    <div>
    {sharediary && sharediary.map((item: any) => (
    <div key={item.id}>{item.name}<br />{item.description}</div>))}
    <Button onClick={handleCopy}><Link /></Button>
    <DarkMode />
    </div>
  )
}

export default Page
