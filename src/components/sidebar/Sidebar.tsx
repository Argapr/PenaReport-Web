import React from "react";
import Image from "next/image";

const Sidebar = () => {
    return (
        <div className="bg-[#5D1A77] text-white h-full w-[20%] rounded-xl py-8 px-6 flex flex-col justify-between">
            <div>
                <div className="flex justify-center items-center mb-8">
                    <Image
                        src="/logo-pena.png"
                        alt="logo"
                        width={120}
                        height={40}
                    />
                </div>
                <div className="space-y-4 mx-4">
                    <a
                        href="/Dashboard"
                        className="flex justify-center py-2 items-center space-x-4 bg-[#D8C8DE] rounded-lg"
                    >
                        <Image
                            src="/dashboard.png"
                            alt="logo"
                            width={23}
                            height={40}
                        />
                        <span className="text-[#5D1A77] font-semibold">
                            Dashboard
                        </span>
                    </a>
                    <a
                        href="/daftar-murid/DataSiswa"
                        className="flex justify-center py-2 items-center space-x-4 bg-[#D8C8DE] rounded-lg"
                    >
                        <Image
                            src="/group.png"
                            alt="logo"
                            width={23}
                            height={40}
                        />
                        <span className="text-[#5D1A77] font-semibold">
                            Daftar Murid
                        </span>
                    </a>
                </div>
            </div>
            <div className="flex items-center justify-evenly space-x-4 bg-[#D8C8DE] rounded-lg py-2">
                <div className="flex items-center ms-2">
                    <div className="flex-shrink-0">
                        <Image
                            src="/profile-user.png"
                            alt="logo"
                            width={30}
                            height={40}
                        />
                    </div>
                    <div className="ms-2">
                        <h3 className="text-base font-medium text-[#5D1A77]">
                            Asep Ridwan
                        </h3>
                        <p className="text-xs text-[#A066B6]">
                            Guru
                        </p>
                    </div>
                </div>
                <Image src="/dots.png" alt="logo" width={15} height={40} />
            </div>
        </div>
    );
};

export default Sidebar;
