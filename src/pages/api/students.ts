import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

interface Student {
    id: string;
    nama: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const studentsRef = collection(db, "user");
        const q = query(studentsRef, where("role", "==", "siswa"));
        const querySnapshot = await getDocs(q);

        const students: Student[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            nama: doc.data().nama,
        }));

        res.status(200).json({ students });
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
