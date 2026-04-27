"use client"
import Corsorfy from "../compenents/Corsorfy";
import HomeBtn from "/src/app/compenents/HomeBtn";
export default function SubPagesLayout({ children }) {
    return (
    <main className="flex min-h-screen flex-col items-center justify-center py-20">
    
    {children}<HomeBtn></HomeBtn>
    <Corsorfy></Corsorfy>
    </main>
    )
}