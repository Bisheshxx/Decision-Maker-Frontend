import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Meta } from "../types/global.types";
import { twMerge } from "tailwind-merge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface IProps {
  meta: Meta;
  handlePageChange: (page: number) => void;
}

export default function PaginationComponent({
  meta,
  handlePageChange,
}: IProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { page, totalPages } = meta;
  const pages =
    totalPages <= 3
      ? Array.from({ length: totalPages }, (_, i) => i + 1)
      : Array.from({ length: 3 }, (_, i) => Math.min(page, totalPages - 2) + i);

  if (meta?.totalPages === 1) return;
  return (
    <Pagination className="justify-end">
      <PaginationContent className="max-w-3xl">
        <PaginationItem className={twMerge(`${page === 1 && "invisible"}`)}>
          <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
        </PaginationItem>
        {pages.map((_page, i) => (
          <PaginationItem key={`pagination-item-${i}`}>
            <PaginationLink
              className={twMerge(
                _page === page && "pointer-events-none opacity-50",
              )}
              isActive={_page === page}
              onClick={() => handlePageChange(_page)}
            >
              {_page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <PaginationEllipsis />
            </PopoverTrigger>
            <PopoverContent className="w-40 p-0">
              <div className="flex flex-col max-h-60 overflow-y-auto">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (_page) => (
                    <div
                      key={_page}
                      onClick={() => {
                        handlePageChange(_page);
                        setPopoverOpen(false);
                      }}
                      className={`text-left px-2 py-1 rounded ${
                        _page === page
                          ? "bg-muted font-medium"
                          : "hover:bg-muted"
                      }`}
                    >
                      Page {_page}
                    </div>
                  ),
                )}
              </div>
            </PopoverContent>
          </Popover>
        </PaginationItem>

        <PaginationItem
          className={twMerge(`${totalPages === page && "invisible"}`)}
        >
          <PaginationNext onClick={() => handlePageChange(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
