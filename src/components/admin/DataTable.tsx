"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export interface Column<T> {
  header: string | ReactNode;
  accessorKey?: keyof T | string;
  cell?: (item: T) => ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  totalCount: number;
  pageSize?: number;
  emptyState?: ReactNode;
  showPagination?: boolean;
  scrollable?: boolean;
  maxHeight?: string;
  itemLabel?: string;
}

export function DataTable<T>({
  data,
  columns,
  totalCount,
  pageSize = 10,
  emptyState = "No records found.",
  showPagination = true,
  scrollable = false,
  maxHeight,
  itemLabel,
}: DataTableProps<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSort = searchParams.get("sort");
  const currentOrder = searchParams.get("order") || "asc";

  const totalPages = Math.ceil(totalCount / pageSize);

  // If pagination is disabled for this table, clean up any lingering ?page= in the URL
  useEffect(() => {
    if (!showPagination && searchParams.has("page")) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    }
  }, [showPagination, searchParams, pathname, router]);

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const handleSort = (key: string) => {
    const isCurrent = currentSort === key;
    const newOrder = isCurrent && currentOrder === "asc" ? "desc" : "asc";
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", key);
    params.set("order", newOrder);
    if (showPagination) {
      params.set("page", "1"); // Reset to page 1 on sort when pagination is enabled
    } else {
      params.delete("page");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm overflow-hidden flex flex-col">
        <div
          className={scrollable ? "overflow-y-auto overflow-x-auto relative" : "overflow-x-auto"}
          style={scrollable ? { maxHeight: maxHeight || "calc(100vh - 280px)" } : undefined}
        >
          <Table>
            <TableHeader className={`bg-slate-50/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 ${scrollable ? "sticky top-0 z-10 backdrop-blur-sm" : ""}`}>
              <TableRow className="border-b border-slate-200 dark:border-slate-800 hover:bg-transparent">
                {columns.map((col, i) => (
                  <TableHead key={i} className="whitespace-nowrap px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                    {col.sortable && col.accessorKey ? (
                      <button
                        onClick={() => handleSort(col.accessorKey as string)}
                        className="flex items-center space-x-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                      >
                        <span>{col.header}</span>
                        {currentSort === col.accessorKey ? (
                          currentOrder === "asc" ? (
                            <ArrowUp className="ml-1 h-3.5 w-3.5 text-primary" />
                          ) : (
                            <ArrowDown className="ml-1 h-3.5 w-3.5 text-primary" />
                          )
                        ) : (
                          <ArrowUpDown className="ml-1 h-3.5 w-3.5 text-slate-400 opacity-50" />
                        )}
                      </button>
                    ) : (
                      col.header
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-32 text-center text-slate-500 dark:text-slate-400"
                  >
                    {emptyState}
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item, i) => (
                  <TableRow
                    key={(item as any)?.id || i}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-900/60 transition-colors border-b border-slate-100 dark:border-slate-800/60 last:border-0"
                  >
                    {columns.map((col, j) => (
                      <TableCell key={col.accessorKey ? String(col.accessorKey) : j} className="px-4 py-3 text-slate-800 dark:text-slate-200">
                        {col.cell
                          ? col.cell(item)
                          : col.accessorKey
                            ? (item as any)[col.accessorKey]
                            : null}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {showPagination ? (
        totalCount > pageSize && (
          <div className="flex items-center justify-between px-2">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing <span className="font-medium text-slate-700 dark:text-slate-200">{(currentPage - 1) * pageSize + 1}</span> to{" "}
              <span className="font-medium text-slate-700 dark:text-slate-200">{Math.min(currentPage * pageSize, totalCount)}</span> of{" "}
              <span className="font-medium text-slate-700 dark:text-slate-200">{totalCount}</span> {itemLabel || "results"}
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`${pathname}?${createQueryString("page", String(currentPage - 1))}`)}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`${pathname}?${createQueryString("page", String(currentPage + 1))}`)}
                disabled={currentPage >= totalPages}
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      ) : (
        <div className="flex items-center justify-between px-2">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {totalCount === data.length ? (
              <>
                Showing all <span className="font-semibold text-slate-900 dark:text-slate-100">{data.length}</span> {itemLabel || (data.length === 1 ? "result" : "results")}
              </>
            ) : (
              <>
                Showing <span className="font-semibold text-slate-900 dark:text-slate-100">{data.length}</span> of{" "}
                <span className="font-semibold text-slate-900 dark:text-slate-100">{totalCount}</span> {itemLabel || "results"}
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
