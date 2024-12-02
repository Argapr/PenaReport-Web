import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/sidebar/Sidebar";

interface Student {
    id: string;
    nama: string;
}

const DataSiswa = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleCalendarOpen = () => setIsOpen(true);
    const handleCalendarClose = () => setIsOpen(false);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("/api/students");
                if (!response.ok) {
                    throw new Error("Failed to fetch students");
                }
                const data = await response.json();
                const sortedStudents = data.students.sort(
                    (a: Student, b: Student) => a.nama.localeCompare(b.nama)
                );
                setStudents(data.students);
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const filteredStudents = students.filter((student) =>
        student.nama.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex h-[calc(100vh-32px)] m-4 bg-transparent rounded-lg">
            <Sidebar />
            <div className="w-3/4 ms-10 p-3 overflow-auto">
                <h1 className="text-3xl font-bold text-[#5D1A77]">
                    Daftar Murid
                </h1>
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
                            placeholder="cari nama siswa"
                            className="bg-transparent ms-3 outline-none text-[#5D1A77] w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="h-[50px] ms-2 w-[60px] bg-[#D8C8DE] rounded-lg flex items-center justify-center">
                        <Image
                            src="/laba-icon.png"
                            alt="logo"
                            width={25}
                            height={40}
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
                <div className="mt-8 flex items-center justify-between">
                    <div className="ms-6">
                        <p className="text-[#5D1A77] text-xl font-semibold">
                            Data Siswa
                        </p>
                    </div>
                    <div className="flex items-center">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => {
                                setSelectedDate(date);
                                handleCalendarClose();
                            }}
                            open={isOpen}
                            onClickOutside={handleCalendarClose}
                            dateFormat="dd/MM/yyyy"
                            className="bg-transparent outline-none text-[#5D1A77] mr-2 w-24"
                        />
                        <div
                            onClick={handleCalendarOpen}
                            className="flex items-center justify-center h-[30px] w-[30px] rounded-lg bg-[#D8C8DE] cursor-pointer"
                        >
                            <Image
                                src="/calendar.png"
                                alt="calendar icon"
                                width={20}
                                height={40}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-2 rounded-lg w-full h-[calc(100vh-245px)] bg-[#D8C8DE] overflow-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[#5D1A77]">
                                <th className="px-4 py-3 w-16">No</th>
                                <th className="px-4 py-3 text-center">
                                    Nama Siswa
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student, index) => (
                                <tr key={student.id}>
                                    <td className="px-4 py-3 text-[#5D1A77]">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Link
                                            href={`/daftar-murid/SiswaPage?nama=${encodeURIComponent(
                                                student.nama
                                            )}`}
                                            className="block w-full"
                                        >
                                            <div className="w-full h-auto bg-[#A066B6] px-2 py-1 rounded-lg hover:bg-[#8A559B] transition-colors">
                                                {student.nama}
                                            </div>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DataSiswa;
