/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  useReactTable,
  ColumnDef,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Button } from "@/lib/utils/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/lib/utils/ui/dropdown-menu";
import { Input } from "@/lib/utils/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/utils/ui/table";
import { PiSliders } from "react-icons/pi";
import { Checkbox } from "@/lib/utils/ui/checkbox";
import { MoreHorizontal, Trash } from "lucide-react";

type Action = {
  label: string;
  handler: (item: any) => void;
};

type Props = {
  data: object[];
  columns: ColumnDef<object>[];
  searchBy: string;
  isBulk: boolean;
  actions: Action[];
};

const DynamicDataTable: React.FC<Props> = ({
  data,
  columns,
  searchBy,
  isBulk,
  actions,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  const handleDelete = () => {
    console.log("Selected Items:", selectedItems);
    // Perform delete action here
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const handleCheckboxChange = (item: any) => {
    const selectedIndex = selectedItems.findIndex((i) => i.id === item.id);
    if (selectedIndex === -1) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems([
        ...selectedItems.slice(0, selectedIndex),
        ...selectedItems.slice(selectedIndex + 1),
      ]);
    }
  };

  const handleGlobalCheckboxChange = () => {
    setIsAllChecked(!isAllChecked);
    setSelectedItems(isAllChecked ? [] : data);
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter title..."
          value={(table.getColumn(searchBy)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchBy)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              View <PiSliders className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        {isBulk && (
          <Button
            variant="outline"
            className="ml-2 px-3 border-rose-500 text-rose-500 hover:text-rose-700 hover:bg-rose-100"
            onClick={handleDelete}
            disabled={selectedItems.length === 0}
          >
            <Trash size={17} />
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {isBulk && (
                  <TableHead className="font-normal bg-gray-100">
                    <Checkbox
                      checked={
                        isAllChecked || selectedItems.length === data.length
                      }
                      onCheckedChange={handleGlobalCheckboxChange}
                    />
                  </TableHead>
                )}
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="font-normal bg-gray-100 capitalize"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
                <TableHead className="bg-gray-100"></TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.map((row: any) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {isBulk && (
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.some(
                        (item) => item.id === row.original.id
                      )}
                      onCheckedChange={() => handleCheckboxChange(row.original)}
                    />
                  </TableCell>
                )}
                {row.getVisibleCells().map((cell: any) => (
                  <TableCell key={cell.id} className="capitalize font-regular">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      {actions.map((action, index) => (
                        <DropdownMenuItem
                          key={index}
                          onClick={() => action.handler(row.original)}
                        >
                          {action.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {selectedItems.length} of {table.getFilteredRowModel().rows.length}{" "}
          row(s) selected.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DynamicDataTable;
