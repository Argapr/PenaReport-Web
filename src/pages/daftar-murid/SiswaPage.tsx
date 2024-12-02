import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface StudentData {
    nis: string;
    nama: string;
    [key: string]: any; // Tambahan untuk menangani properti dinamis
}

interface ReportData {
    id: string;
    tanggalKWU: string;
    [key: string]: any; // Tambahan untuk menangani properti dinamis
}

interface GroupedReports {
    [monthYear: string]: ReportData[];
}

const Siswa: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const studentName = searchParams?.get("nama") || "nama siswa";
    const [studentData, setStudentData] = useState<StudentData | null>(null);
    const [groupedReports, setGroupedReports] = useState<GroupedReports>({});
    const [loading, setLoading] = useState<boolean>(true);

    const handleReportClick = () => {
        window.location.href = "/daftar-murid/LaporanSiswa";
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch student data
                const userCollection = collection(db, "user");
                const userQuery = query(userCollection, where("nama", "==", studentName));
                const userSnapshot = await getDocs(userQuery);
                const userData = userSnapshot.docs[0]?.data() as StudentData | undefined;

                setStudentData(userData || null);

                if (userData) {
                    // Fetch related reports using NIS as userId
                    const reportsCollection = collection(db, "reports");
                    const reportsQuery = query(reportsCollection, where("userId", "==", userData.nis));
                    const reportsSnapshot = await getDocs(reportsQuery);
                    const reportsData = reportsSnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    })) as ReportData[];

                    // Group reports by month
                    const grouped = reportsData.reduce<GroupedReports>((acc, report) => {
                        const date = new Date(report.tanggalKWU);
                        const monthYear = `${getMonthName(date.getMonth())} ${date.getFullYear()}`;

                        if (!acc[monthYear]) {
                            acc[monthYear] = [];
                        }
                        acc[monthYear].push(report);
                        return acc;
                    }, {});

                    setGroupedReports(grouped);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (studentName !== "nama siswa") {
            fetchData();
        }
    }, [studentName]);

    const getMonthName = (monthIndex: number): string => {
        const months = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];
        return months[monthIndex];
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div className="flex h-[calc(100vh-32px)] m-4 bg-transparent rounded-lg">
            <Sidebar />
            <div className="w-3/4 ms-10 p-3 overflow-auto">
                <h1 className="text-3xl font-bold text-[#5D1A77]">Daftar Murid</h1>
                <div className="flex ms-3 items-center">
                    <Link href="/daftar-murid/DataSiswa" className="text-[#5D1A77] text-base">
                        Daftar Murid
                    </Link>
                    <Image
                        src="/right-arrow.png"
                        alt="logo"
                        width={10}
                        height={5}
                        className="w-3 h-3 mx-2"
                    />
                    <p className="text-[#5D1A77]">Siswa</p>
                </div>
                <div className="mt-10">
                    <h1 className="text-3xl font-bold text-[#5D1A77]">{studentName}</h1>
                </div>
                <div className="mt-4 p-4 rounded-lg w-full h-[calc(100vh-245px)] bg-[#D8C8DE] overflow-auto">
                    {loading ? (
                        <p>Loading...</p>
                    ) : Object.keys(groupedReports).length > 0 ? (
                        <div className="space-y-6">
                            {Object.entries(groupedReports).map(([month, monthReports]) => (
                                <div key={month} className="space-y-2">
                                    <h2 className="flex items-center text-base font-semibold text-[#5D1A77] mb-2">
                                        <Image
                                            src="/warp.png"
                                            alt="Document"
                                            width={20}
                                            height={24}
                                            className="w-4 h-4 mr-2"
                                        />
                                        {month}
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        {monthReports.map((report) => (
                                            <div
                                                key={report.id}
                                                className="bg-white ms-4 p-4 rounded-lg shadow flex items-center space-x-4 cursor-pointer hover:bg-gray-50"
                                                onClick={handleReportClick}
                                            >
                                                <div className="bg-[#5D1A77] p-2 rounded-lg">
                                                    <Image
                                                        src="/report.png"
                                                        alt="Document"
                                                        width={24}
                                                        height={24}
                                                        className="w-6 h-6"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-[#5D1A77] font-semibold">
                                                        {formatDate(report.tanggalKWU)}
                                                    </h3>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">Belum ada laporan tersedia.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Siswa;
