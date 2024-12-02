import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-[calc(100vh-32px)] m-4 bg-transparent rounded-lg">
        <Sidebar />

      <div className="w-3/4 bg-[#dedede] ms-10 p-3 overflow-auto">
        <h1 className="text-xl font-bold text-gray-800">Content</h1>
      </div>
    </div>
  );
};

export default Dashboard;
