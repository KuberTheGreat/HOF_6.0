import React, { useState } from "react";
import { Send } from "lucide-react";
import UP_logo from "../assets/Home/up_logo.png";
import GrievanceForm from "./GrievanceForm";
import Sidebar from "../components/Sidebar";


export default function Home() {
    return(
        <div className="flex">
            <div className="min-h-screen bg-white flex">
                <Sidebar />
            </div>

            <div className="h-screen w-full">
                <GrievanceForm/>
            </div>
        </div>
    );
}
