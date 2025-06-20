import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";

export function ShadPagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onChange(page - 1)}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {[...Array(pageCount)].map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              isActive={page === i + 1}
              onClick={() => onChange(i + 1)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => onChange(page + 1)}
            className={
              page === pageCount ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
