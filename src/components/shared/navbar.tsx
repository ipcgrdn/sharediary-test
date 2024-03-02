import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Hamburger from "./hamburger";

const Navbar = () => {
    return(
        <nav className="flex items-center justify-between py-4 px-8 bg-slate-300">
            <div>
               <Hamburger />
               <Link href={'/'}> <span className="text-black ml-4 text-2xl font-bold"> Sharediary </span> </Link>
            </div>
            <div>
               <UserButton afterSignOutUrl="/sign-in"/>
            </div>
        </nav>
    )
}

export default Navbar
