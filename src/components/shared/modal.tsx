'use client'

import {useModalStore} from "../../lib/store";
import { useHotkeys } from 'react-hotkeys-hook'
import { useCallback, useState } from "react";
import { supabase } from "../../../supabase.config";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Modal = () => {
    const {modal, setModal} = useModalStore();
    const [diaryName, setDiaryName] = useState('');
    const [diaryDescription, setDiaryDescription] = useState('');
    const [diaryScope, setDiaryScope] = useState(false);
    
    const closeModal = useCallback(() => {
        setModal(false);
      }, [modal, setModal]);

    useHotkeys('esc', () => {setModal(false)}, [modal])
    useHotkeys('enter', () => {handleSubmit()}, [])
    useHotkeys('=', () => {setModal(true)}, [modal])


    const SelectDemo = () => {
        return (
          <Select onValueChange={(v : boolean)=>{setDiaryScope(v)}}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Scope" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={true}>Open</SelectItem>
                <SelectItem value={false}>Close</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )
      }

    const handleSubmit = async () => {
      try {
        await supabase
        .from('sharediary')
        .insert([{
          name: diaryName,
          description: diaryDescription,
          open: diaryScope,
        }])
        closeModal();
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <div className={modal ? "w-full h-screen fixed flex top-0 left-0 justify-center items-center bg-black/30" : "hidden"}>
      <div className="absolute bg-white w-2/5 h-2/3 p-5">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <div>
            <p className="text-3xl">New Diary</p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-8">
            <Label>Name</Label>
            <Input type="text" placeholder="Name" value={diaryName} onChange={(e)=>{setDiaryName(e.target.value)}}/>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-6 mb-8">
            <Label>Description</Label>
            <Input type="text" placeholder="Description" value={diaryDescription} onChange={(e)=>{setDiaryDescription(e.target.value)}}/>
          </div>
          <SelectDemo />
        </div>
        <div className="flex justify-center items-center mt-28 gap-1.5">
            <Button variant="secondary" onClick={handleSubmit}>Submit</Button>
            <Button variant="secondary" onClick={closeModal}> Exit </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal