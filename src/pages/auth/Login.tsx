import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { db } from '@/lib/firebase'; // Pastikan jalur impor benar
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext'; // Import useAuth

const LoginPage = () => {
  const [nis, setNis] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { setLoggedIn } = useAuth(); // Ambil fungsi untuk set status login

  const handleLogin = async () => {
    try {
      console.log('Memulai proses login...');
      const usersRef = collection(db, 'user');
      const q = query(usersRef, where('nis', '==', nis));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        console.log('Data Pengguna:', userData);

        if (userData.password === password && userData.role === 'guru') {
          console.log('Login berhasil, mengarahkan ke Dashboard...');
          setLoggedIn(true); // Set login status
          router.push('/Dashboard'); // Cek rute di sini
          console.log('Router push dipanggil.');
        } else {
          alert('NIS, password, atau role tidak sesuai.');
        }
      } else {
        alert('Pengguna dengan NIS tersebut tidak ditemukan.');
      }
    } catch (error) {
      console.error('Error saat login:', error);
      alert('Terjadi kesalahan saat mencoba login.');
    }
  };

  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-no-repeat bg-blend-color-burn"
      style={{
        backgroundImage:
          'url("/background-login.png"), linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
      }}
    >
      {/* Logo di atas kiri */}
      <div className="absolute top-8 left-8">
        <Image src="/logo-pena-ungu.png" alt="Pena Logo" width={80} height={80} />
      </div>

      {/* Form Login */}
      <div className="bg-transparent rounded-lg p-8 w-full max-w-md">
        <h2 className="text-5xl font-bold text-center mb-2 text-[#5D1A77]">
          Masuk
        </h2>

        <p className="text-center text-[#5D1A77] mb-6">
          Masuk untuk mengelola laporan
        </p>

        <div className="mb-4">
          <label
            htmlFor="nis"
            className="block mb-2 text-base font-medium text-[#5D1A77]"
          >
            NIP
          </label>
          <input
            type="text"
            id="nis"
            className="bg-[#D8C8DE] text-[#5D1A77] text-lg text-opacity-70 rounded-[15px] focus:ring-purple-500 focus:border-purple-500 block w-[406px] h-[63px] p-2.5"
            placeholder="00290109"
            value={nis}
            onChange={(e) => setNis(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-base font-medium text-[#5D1A77]"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-[#D8C8DE] text-[#5D1A77] text-lg text-opacity-70 rounded-[15px] focus:ring-purple-500 focus:border-purple-500 block w-[406px] h-[63px] p-2.5"
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Jarak antara password dan tombol */}
        <div className="flex justify-center mb-6">
          <button
            className="bg-[#5D1A77] hover:bg-[#4A135F] text-white font-medium rounded-full w-[268px] h-[63px] text-2xl"
            onClick={handleLogin}
          >
            Masuk →
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
