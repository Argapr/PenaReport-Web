import React from "react";
import Image from "next/image";
import Sidebar from "@/components/sidebar/Sidebar";
import Link from "next/link";

const LaporanSiswa = () => {
    return (
        <div className="flex h-[calc(100vh-32px)] m-4 bg-transparent rounded-lg">
            <Sidebar />
            <div className="w-3/4 ms-10 p-3 overflow-auto">
                <h1 className="text-3xl font-bold text-[#5D1A77]">
                    Daftar Murid
                </h1>
                <div className="flex ms-3 items-center">
                    <Link
                        href="/daftar-murid/DataSiswa"
                        className="text-[#5D1A77] text-base"
                    >
                        Daftar Murid
                    </Link>
                    <Image
                        src="/right-arrow.png"
                        alt="logo"
                        width={10}
                        height={5}
                        className="w-3 h-3 mx-2"
                    />
                    <Link
                        href="/daftar-murid/SiswaPage"
                        className="text-[#5D1A77] text-base"
                    >
                        Siswa
                    </Link>
                    <Image
                        src="/right-arrow.png"
                        alt="logo"
                        width={10}
                        height={5}
                        className="w-3 h-3 mx-2"
                    />
                    <p className="text-[#5D1A77]">Laporan Siswa</p>
                </div>
                <div className="flex mt-8">
                    <div className="h-[50px] w-full bg-[#D8C8DE] rounded-lg flex items-center">
                        <Image
                            src="/search.png"
                            alt="logo"
                            width={25}
                            height={40}
                            className="ms-5"
                        />
                        <input
                            type="text"
                            placeholder="cari nama produk"
                            className="bg-transparent ms-3 outline-none text-[#5D1A77] w-full"
                            
                        />
                    </div>
                    <div className="h-[50px] ms-2 w-[60px] bg-[#D8C8DE] rounded-lg flex items-center justify-center">
                        <Image
                            src="/pdf-icon.png"
                            alt="logo"
                            width={25}
                            height={40}
                        />
                    </div>
                </div>
                <div>produk laporan</div>
            </div>
        </div>
    );
};

export default LaporanSiswa;
