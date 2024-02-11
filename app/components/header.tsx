import Image from "next/image";

export default function Header() {
  const logo = require("../../public/psychopharm.png").default;
  return (
    <>
      <div className="flex bg-[#0d1282] p-5"></div>
      <div className="flex px-20 relative">
        <div className="px-10 rounded-b-lg bg-[#0d1282] mb-[-3.5rem] mt-[-2.5rem] flex flex-col justify-center items-center relative px-2">
          <div className="flex flex-1 z-10 bg-[#0d1282] px-5 pb-5 pt-2 rounded-b-lg justify-center items-center">
            <Image src={logo} alt="Psychopharm" width={55} height={55} />
          </div>
          <div className="absolute left-0 right-0 top-0 bottom-0 z-0">
            <div className="h-[41.5%]  bg-[#0d1282] border-l-8 border-r-8 border-[#0d1282]"></div>
            <div className="h-[65%] bg-[#f0de36] rounded-b-lg border-l-8 border-r-8 border-[#f0de36]"></div>
          </div>
        </div>
      </div>
      <div className="flex bg-[#f0de36] p-5"></div>
    </>
  );
}
