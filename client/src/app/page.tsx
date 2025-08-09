import Image from "next/image";

export default function Home() {
  return (

    <div className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center px-6">
      {/* Animated Blobs - grayscale only */}
      <div className="absolute top-[-10rem] left-[-10rem] w-[30rem] h-[30rem] bg-white opacity-10 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-[-10rem] right-[-10rem] w-[30rem] h-[30rem] bg-white opacity-10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-[20%] right-[20%] w-[25rem] h-[25rem] bg-white opacity-5 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Pure Black & White
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Minimalistic. Monochrome. Modern.
        </p>
        <button className="bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition">
          Get Started
        </button>
      </div>
    </div>


  );
}
