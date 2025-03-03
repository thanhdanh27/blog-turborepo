import { calculatePageNumber } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

type Props = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageNext?: number;
  className?: string;
};
export default function CommentPagination({
  pageNext = 2,
  currentPage,
  totalPages,
  setCurrentPage,
  className,
}: Props) {
  const pageNumbers = calculatePageNumber({
    pageNext,
    currentPage,
    totalPages,
  });

  const handleClick = (page: number | string) => {
    if (typeof page === "number" && page > 0 && page <= totalPages)
      setCurrentPage(page);
  };
  return (
    <div className={cn(className, "flex items-center justify-center gap-2")}>
      {currentPage !== 1 && (
        <button
          onClick={() => {
            handleClick(currentPage - 1);
          }}
          className={cn("rounded-md bg-slate-200 py-3 px-3 block")}
        >
          <ChevronLeftIcon className="w-4" />
        </button>
      )}
      {pageNumbers.map((page, index) => (
        <button
          onClick={() => {
            handleClick(page);
          }}
          disabled={page === "..."}
          key={index}
          className={cn(
            " py-2 px-4 block rounded-md transition hover:text-sky-600",
            {
              "bg-slate-200": currentPage !== page && page !== "...",
              "bg-blue-500 text-white": currentPage === page,
              "pointer-events-none": page === "...",
              "cursor-not-allowed": page === "...",
            }
          )}
        >
          {page}
        </button>
      ))}
      {currentPage !== totalPages && (
        <button
          onClick={() => {
            handleClick(currentPage + 1);
          }}
          className="rounded-md bg-slate-200 py-3 px-3 block"
        >
          <ChevronRightIcon className="w-4" />
        </button>
      )}
    </div>
  );
}
