import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Pagination({
  total,
  currentPage,
}: {
  total: number;
  currentPage: number;
}) {
  const visiblePages = 3;
  const showDots = total > visiblePages;

  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(total, startPage + visiblePages - 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="absolute bottom-8 left-1/2 py-2">
      <nav className="block">
        <ul className="flex pl-0 rounded list-none flex-wrap">
          <li>
            {currentPage === 1 ? (
              <div className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-lg items-center justify-center leading-tight relative border border-solid border-blueGray-500 bg-[#d9d9d9] text-blueGray-500 shadow-xl">
                <ChevronLeft size={20} color="#ffffff" />
              </div>
            ) : (
              <Link
                href={`?page=${currentPage - 1}`}
                className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-lg items-center justify-center leading-tight relative border border-solid border-blueGray-500 bg-[#d9d9d9] text-blueGray-500 active:bg-[#ffe98f] shadow-xl"
              >
                <ChevronLeft size={20} color="#0d1282" />
              </Link>
            )}
          </li>
          {showDots && startPage > 1 && (
            <li>
              <div className="mx-3">...</div>
            </li>
          )}
          {pages.map((page) => (
            <li key={page}>
              <Link
                href={`?page=${page}`}
                className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-lg items-center justify-center leading-tight relative border border-solid border-blueGray-500 bg-[#d9d9d9] text-[#cc3300] ${
                  currentPage === page ? "bg-[#ffe98f]" : "null"
                } shadow-xl`}
              >
                {page}
              </Link>
            </li>
          ))}
          {currentPage < total && showDots && (
            <li>
              <div className="mx-3">...</div>
            </li>
          )}
          <li>
            {currentPage === total ? (
              <div className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-lg items-center justify-center leading-tight relative border border-solid border-blueGray-500 bg-[#d9d9d9] text-blueGray-500 shadow-xl">
                <ChevronRight size={20} color="#ffffff" />
              </div>
            ) : (
              <Link
                href={`?page=${currentPage + 1}`}
                className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-lg items-center justify-center leading-tight relative border border-solid border-blueGray-500 bg-[#d9d9d9] text-[#cc3300] active:bg-[#ffe98f] shadow-xl"
              >
                <ChevronRight size={20} color="#0d1282" />
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
