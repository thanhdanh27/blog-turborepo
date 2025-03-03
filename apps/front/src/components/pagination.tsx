import { calculatePageNumber } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

import Link from "next/link";

type Props = {
  totalPages: number;
  currentPage: number;
  pageNext?: number;
  className?: string;
};

const Pagination = ({
  totalPages,
  currentPage,
  pageNext = 2,
  className,
}: Props) => {
  const pageNumbers = calculatePageNumber({
    pageNext,
    currentPage,
    totalPages,
  });
  return (
    <div
      className={cn("flex justify-center items-center mt-5 gap-2", className)}
    >
      {currentPage !== 1 && (
        <button className={cn("rounded-md bg-slate-200 ")}>
          <Link
            className="py-3 px-4 block w-full"
            href={`?page=${currentPage - 1}`}
          >
            <ChevronLeftIcon className="w-4" />
          </Link>
        </button>
      )}
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          className={cn(" rounded-md transition hover:text-sky-600", {
            "bg-slate-200": currentPage !== page && page !== "...",
            "bg-blue-500 text-white": currentPage === page,
            "pointer-events-none": page === "...",
            "cursor-not-allowed": page === "...",
          })}
        >
          <Link className="py-2 px-4 block w-full" href={`?page=${page}`}>
            {page}
          </Link>
        </button>
      ))}
      {currentPage !== totalPages && (
        <button className="rounded-md bg-slate-200">
          <Link
            className="py-3 px-4 block w-full"
            href={`?page=${currentPage + 1}`}
          >
            <ChevronRightIcon className="w-4" />
          </Link>
        </button>
      )}
    </div>
  );
};

export default Pagination;
