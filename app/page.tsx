import Image from "next/image";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function Home() {
  return (
    <div className="h-screen">
      <Navbar />
      <Sidebar />
    </div>
  );
}
