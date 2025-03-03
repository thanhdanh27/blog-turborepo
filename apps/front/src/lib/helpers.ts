import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

export function transformTakeSkip({page,pageSize}:{page?:number; pageSize?:number})
{
    return{
        skip: ((page?? 1) - 1) * (pageSize ?? DEFAULT_PAGE_SIZE),
        take: pageSize?? DEFAULT_PAGE_SIZE,
    }
}

export function calculatePageNumber({pageNext, totalPages, currentPage}:{pageNext:number,totalPages:number,currentPage:number})
{
    const totalNumbers = pageNext * 2 + 3;
    const totalBlocks = totalNumbers + 2;
    if(totalPages > totalBlocks)
    {
        const startPage = Math.max(2,currentPage - pageNext)
        const endPage = Math.min(totalPages - 1, currentPage + pageNext)
        let pages : (number | string)[] = Array.from({
            length:endPage -startPage +1,
        },
        (_,i) => startPage + i
    )
    if(startPage > 2) pages = ["...", ...pages]
    if(endPage < totalPages - 1) pages = [...pages, "..."]
    return [1, ...pages, totalPages]
    }
    return Array.from({
        length: totalPages
    }, (_,i) => i+1)
}