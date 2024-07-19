import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import { useState, useMemo, useEffect, SetStateAction } from "react";
import { CgSmileNone } from "react-icons/cg";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { ClipLoader } from "react-spinners";

interface DataItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

type TableRProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T>[];
  handleSelectedRows: (val: { id: string; data: T }[]) => void;
  loading: boolean;
  resetSelection?: boolean;
  dataPerPage?: number;
  handleRowClick?: (rowData: T) => void;
};

const Table = <T extends object>({
  data,
  columns,
  handleSelectedRows,
  loading,
  resetSelection = false,
  dataPerPage = 10,
  handleRowClick,
}: TableRProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<
    { id: string; data: Record<string, object> }[]
  >([]);
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(dataPerPage ?? 10);

  const handleRowSelection = (rowId: string, rowData: T) => {
    const isSelected = selectedRows.some((row) => row.id === rowId);

    if (isSelected) {
      const newSelectedRows = selectedRows.filter((row) => row.id !== rowId);
      setSelectedRows(newSelectedRows);
      handleSelectedRows(newSelectedRows as { id: string; data: T }[]);
    } else {
      const newSelectedRows = [...selectedRows, { id: rowId, data: rowData }];
      setSelectedRows(
        newSelectedRows as SetStateAction<
          { id: string; data: Record<string, object> }[]
        >
      );
      handleSelectedRows(newSelectedRows as { id: string; data: T }[]);
    }
  };
  const handleRowClicks = (rowData: T) => {
    handleRowClick && handleRowClick(rowData);
  };

  const handleSelectAll = () => {
    if (selectAllChecked) {
      setSelectedRows([]);
      handleSelectedRows([]);
    } else {
      const allRowData = table.getRowModel().rows.map((row) => ({
        id: row.id,
        data: row.original,
      }));
      setSelectedRows(
        allRowData as SetStateAction<
          { id: string; data: Record<string, object> }[]
        >
      );
      handleSelectedRows(allRowData);
    }
    setSelectAllChecked(!selectAllChecked);
  };

  const memoizedColumns = useMemo(() => columns, [columns]);

  const sortedData = useMemo(() => {
    if (sorting.length === 0) return data;
    const sortedColumn = sorting[0].id;
    const sortedOrder = sorting[0].desc ? -1 : 1;

    return [...data].sort((a: DataItem, b: DataItem) => {
      if (a[sortedColumn] > b[sortedColumn]) return 1 * sortedOrder;
      if (a[sortedColumn] < b[sortedColumn]) return -1 * sortedOrder;
      return 0;
    });
  }, [data, sorting]);

  const paginatedData = useMemo(() => {
    const startIndex = (pageNo - 1) * perPage;
    const endIndex = startIndex + perPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, pageNo, perPage]);

  const table = useReactTable({
    data: paginatedData,
    columns: memoizedColumns,
    state: {
      sorting,
    },
    manualSorting: true,
    enableSorting: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const totalPages = Math.ceil(data.length / perPage);

  useEffect(() => {
    if (pageNo > totalPages && totalPages > 0) {
      setPageNo(totalPages);
    }
  }, [totalPages, pageNo]);

  useEffect(() => {
    setSelectedRows([]);
    handleSelectedRows([]);
    setSelectAllChecked(false);
  }, [resetSelection, handleSelectedRows]);

  return (
    <>
      <div className="scrollbar w-full overflow-auto bg-white shadow-sm">
        {paginatedData.length > 0 ? (
          <table className="w-full">
            {loading ? (
              <div className="flex min-h-[70vh] items-center justify-center">
                <ClipLoader color="blue" />
              </div>
            ) : (
              <>
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      className="bg-neutrals-20 text-neutrals-60 border border-gray-300 bg-slate-200"
                    >
                      <th className="w-2.5 whitespace-nowrap px-4 py-3 text-12 font-medium">
                        <input
                          checked={selectAllChecked}
                          className="mx-6 h-18 w-18 cursor-pointer rounded-md border-gray-300 bg-gray-100 accent-green-600"
                          id="selectAll"
                          type="checkbox"
                          onChange={() => handleSelectAll()}
                        />
                      </th>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className={`whitespace-nowrap px-4 py-3 text-12 font-medium ${
                            header.id === " " ? "w-2.5" : "w-auto"
                          }`}
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? "select-none cursor-pointer flex items-center gap-1"
                                  : "",
                                onClick: header.column.columnDef.enableSorting
                                  ? header.column.getToggleSortingHandler()
                                  : undefined,
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {header.column.columnDef.enableSorting &&
                              !header.column.getIsSorted() ? (
                                <span className="pl-2">↑↓</span>
                              ) : null}
                              {{
                                asc: <span className="pl-2">↑</span>,
                                desc: <span className="pl-2">↓</span>,
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="h-14 cursor-pointer border hover:bg-neutral-100"
                      onClick={() => handleRowClicks(row.original)}
                    >
                      <td className="whitespace-nowrap px-2.5 py-3 text-center text-sm text-neutrals-80">
                        <input
                          checked={selectedRows.some(
                            (selectedRow) => selectedRow.id === row.id
                          )}
                          className="mx-6 h-3.5 w-3.5 cursor-pointer rounded-md border-gray-300 bg-gray-100 accent-green-600"
                          type="checkbox"
                          onChange={() =>
                            handleRowSelection(row.id, row.original)
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className={`whitespace-nowrap px-5 py-3 text-start text-sm text-neutrals-80 ${
                            cell.column.id === " "
                              ? "sticky right-0 z-[1] bg-neutrals-20 !px-2.5"
                              : "overflow-auto"
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        ) : (
          <div className="flex gap-1.5 flex-col min-h-[70vh] items-center justify-center">
            <span className="text-xl text-slate-500 font-semibold">
              No data found try changing filters
            </span>
            <CgSmileNone size={40} />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 bg-white p-15 mt-3.5">
        <div className="flex items-center justify-center gap-2.5 space-x-10">
          <button
            className={`group flex h-10 w-10 items-center justify-center rounded-lg border bg-white disabled:cursor-not-allowed disabled:bg-slate-200 ${
              pageNo <= 1 ? "border-black" : "border-black hover:text-gray-900"
            }`}
            disabled={pageNo <= 1}
            onClick={() => pageNo > 1 && setPageNo(pageNo - 1)}
          >
            <MdKeyboardArrowLeft
              className={`text-xl ${
                pageNo <= 1
                  ? "text-black"
                  : "text-black group-hover:text-gray-900"
              }`}
            />
          </button>
          <div className="text-sm font-semibold text-black">
            Page: {pageNo} of {totalPages}
          </div>
        </div>
        <div className="flex">
          <span className="flex items-center gap-1 text-neutral-700">
            <div>Page</div>
            <strong>
              {pageNo} of {totalPages}
            </strong>
            |
          </span>
          <select
            className={`text-neutral-700 ${
              pageNo < 1 ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={pageNo < 1}
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              table.setPageSize(Number(e.target.value));
              setPageNo(1); // Reset to first page when perPage changes
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option
                key={pageSize}
                className="text-neutral-700"
                value={pageSize}
              >
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-center gap-2.5 space-x-10">
          <div className="text-sm font-semibold text-black">
            Results: {Math.min((pageNo - 1) * perPage + 1, data.length)} -{" "}
            {Math.min(pageNo * perPage, data.length)} of {data.length}
          </div>
          <button
            className={`group flex h-10 w-10 items-center justify-center rounded-lg border bg-white disabled:cursor-not-allowed disabled:bg-slate-200 ${
              pageNo >= totalPages
                ? "border-black"
                : "border-black hover:text-gray-900"
            }`}
            disabled={pageNo >= totalPages}
            onClick={() => pageNo < totalPages && setPageNo(pageNo + 1)}
          >
            <MdKeyboardArrowRight
              className={`text-xl ${
                pageNo >= totalPages
                  ? "text-black"
                  : "text-black group-hover:text-gray-900"
              }`}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
