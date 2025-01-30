import React, { useState } from "react";
import { Send } from "lucide-react";
import UP_logo from "../assets/Home/up_logo.png";

export default function Home() {
    return(
        <div>
            <div className="flex w-full h-30 mx-auto bg-gray-100">
                <div>
                    <img src={UP_logo}alt="UP Logo" className="max-w-30 max-h-30 m-auto mx-3"/>
                </div>
            </div>

            <div className="grid grid-cols-2 h-screen">
                {/* Stats Section */}
                <div className="bg-gray-150 text-white flex items-center justify-center">Column 1</div>
                {/* Chatbot Section */}
                <div className="bg-green-500 text-black flex items-end justify-center">
                    <div className=" bg-gray-50 w-full px-3 m-4 h-10 justify-center items-center">
                        <input placeholder="Enter your grievance" className="w-full"></input>
                    </div>
                </div>
            </div>
        </div>
  
    );
}
