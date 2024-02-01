export default function Navbar() {
  return (
    <>
      <div className="flex bg-blue-900 p-5"></div>
      <div className="flex px-20 relative">
        <div className="px-10 rounded-b-lg bg-blue-900 mb-[-3.5rem] mt-[-2.5rem] flex flex-col justify-center items-center relative">
          <div className="z-10">A</div>
          <div className="absolute left-0 right-0 top-0 bottom-0 z-0">
            <div className="h-[41.5%] bg-blue-900 border-l-8 border-r-8 border-blue-900"></div>
            <div className="h-[65%] bg-yellow-300 rounded-b-lg border-l-8 border-r-8 border-yellow-300"></div>
          </div>
        </div>
      </div>
      <div className="flex bg-yellow-300 p-5"></div>
    </>
  );
}
