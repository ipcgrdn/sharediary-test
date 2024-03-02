'use client'

import { FaPlus } from "react-icons/fa6";
import {useModalStore} from "../../lib/store";
import { useCallback } from "react";

const Plusdiary = () => {
  const {modal, setModal} = useModalStore();

  const openModal = useCallback(() => {
    setModal(true);
  }, [modal, setModal]);

  return (
    <button className="flex items-center align-middle hover:bg-slate-200"
    onClick={openModal}>
        <FaPlus className="mr-4"/>
        <p className=" underline underline-offset-4"> Add diary </p>
    </button>
  )
}

export default Plusdiary