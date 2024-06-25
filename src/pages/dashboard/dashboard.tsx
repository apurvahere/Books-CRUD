import { useEffect, useState } from "react";
import useTimeout from "../../utils/hooks/useTimeout";
import { Modal, Table } from "../../components";
import { useProps } from "../../context/PropsContext";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDeleteForever, MdOutlinePreview } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import useDebounce from "../../utils/hooks/useDebounce";
import { BookInterface } from "../../libs/types/types";
import BookForm from "../../components/view/AddEditBook";
import BookDetails from "../../components/view/BookDetails";
import useAuthentication from "../../utils/hooks/useAuthentication";
import { Navigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";

const Dashboard = () => {
  const columns: ColumnDef<BookInterface>[] = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Title",
      accessorKey: "title",
      enableSorting: true,
    },
    {
      header: "Author Name",
      accessorKey: "author",
      enableSorting: true,
    },
    {
      header: "Year",
      accessorKey: "year",
      enableSorting: true,
    },
    {
      header: "Genres",
      accessorKey: "genres",
      cell: (value: { getValue: () => unknown }) => {
        return (
          <span className="flex flex-wrap gap-2.5">
            {Array.isArray(value.getValue()) &&
              (value?.getValue() as string[])?.map(
                (genre: string, i: number) => (
                  <span
                    key={i + genre}
                    className="capitalize px-3 py-1 rounded-md shadow-md bg-green-200"
                  >
                    {genre}{" "}
                  </span>
                )
              )}
          </span>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "",
      cell: ({ row }: { row: { original: { id: string } } }) => {
        return (
          <div className="flex flex-wrap justify-between gap-2">
            <span className="cursor-pointer hover:scale-110 hover:text-orange-500 transition-colors ease-in-out duration-200">
              <MdOutlinePreview
                onClick={() =>
                  setViewBookDetail({
                    id: row.original.id,
                    show: true,
                  })
                }
                size={20}
                title="Preview"
              />
            </span>
            <span className="cursor-pointer hover:scale-110 hover:text-blue-500 transition-colors ease-in-out duration-200">
              <FaEdit
                size={20}
                title="Edit"
                onClick={() =>
                  setAddEditBookForm({
                    id: row.original.id,
                    show: true,
                  })
                }
              />
            </span>
            <span className="cursor-pointer hover:scale-110 hover:text-red-500 transition-colors ease-in-out duration-200">
              <AiFillDelete
                size={20}
                title="Remove"
                onClick={() => handleRemove(row.original.id)}
              />
            </span>
          </div>
        );
      },
    },
  ];

  const { isAuthenticated, booksData, setBooksData } = useProps();
  useAuthentication(isAuthenticated);
  const isTimeoutElapsed = useTimeout(3000);
  const [books, setBooks] = useState<BookInterface[]>([]);
  const [selectedRows, setSelectedRows] = useState<
    {
      id: string;
      data: BookInterface;
    }[]
  >([{ id: "", data: {} as BookInterface }]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [resetSelectedRows, setResetSelectedRows] = useState(false);
  const [addEditBookForm, setAddEditBookForm] = useState<{
    show: boolean;
    id: string;
  }>({ show: false, id: "" });
  const [viewBookDetail, setViewBookDetail] = useState<{
    show: boolean;
    id: string;
  }>({ show: false, id: "" });
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 1000);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      const searchTermLower = debouncedSearchTerm.toLowerCase();
      const filteredData = booksData.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTermLower) ||
          book.author.toLowerCase().includes(searchTermLower)
      );
      setBooks(filteredData);
    } else {
      setBooks(booksData);
    }
  }, [debouncedSearchTerm, booksData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRemove = (id: string) => {
    setBooksData(booksData.filter((data) => data.id !== id));
  };
  const handleAddForm = (val: BookInterface) => {
    const existingBook = booksData.find((book) => book.id === val.id);
    if (existingBook) {
      setBooksData(
        booksData.map((book) =>
          book.id === val.id ? { ...book, ...val } : book
        )
      );
    } else {
      setBooksData([...booksData, val]);
    }
    setAddEditBookForm({
      id: "",
      show: false,
    });
  };

  const handleRemoveSelected = () => {
    const selectedBooksData = selectedRows.map(
      (d: { data: BookInterface }) => d.data
    );
    const updatedBooksData = booksData.filter(
      (book) =>
        !selectedBooksData.some((selectedBook) => selectedBook.id === book.id)
    );
    setBooksData(updatedBooksData);
    setSelectedRows([]);
    setResetSelectedRows(!resetSelectedRows);
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <>
      <div className="border border-slate-300 rounded-md m-10 p-2.5 flex flex-col gap-2.5">
        <div className="flex justify-between">
          <input
            type="text"
            className="border border-slate-300 rounded-md px-2.5 py-1.5 w-full max-w-80"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search by title or author..."
          />
          <div className="flex gap-1.5">
            <button
              className="flex justify-between items-center gap-1.5 border border-slate-300 rounded-md px-2.5 py-1.5 w-max bg-blue-500
          text-white"
              onClick={() => setAddEditBookForm({ id: "", show: true })}
            >
              <FaPlus size={20} title="delete" />
              Add Book
            </button>
            {selectedRows.length > 0 && (
              <button
                className="flex justify-between items-center gap-1.5 border border-slate-300 rounded-md px-2.5 py-1.5 w-max bg-red-500
          text-white"
                onClick={() => handleRemoveSelected()}
              >
                <MdDeleteForever size={20} title="delete" />
                Delete Selected
              </button>
            )}
          </div>
        </div>
        <Table
          columns={columns}
          data={debouncedSearchTerm.trim() !== "" ? books : booksData}
          handleSelectedRows={setSelectedRows}
          loading={isTimeoutElapsed}
          resetSelection={resetSelectedRows}
        />
      </div>
      <Modal
        open={addEditBookForm.show}
        handler={() => setAddEditBookForm({ id: "", show: false })}
        title={addEditBookForm.id ? "Edit Book Details" : "Add Book Details"}
      >
        <BookForm
          onSubmit={(val) => handleAddForm(val)}
          initialValues={booksData.find(
            (book) => book.id === addEditBookForm.id
          )}
          isEdit={!!addEditBookForm.id}
          handleCancel={() => setAddEditBookForm({ id: "", show: false })}
        />
      </Modal>
      <Modal
        open={viewBookDetail.show}
        handler={() => setViewBookDetail({ ...viewBookDetail, show: false })}
        title="Book Details"
      >
        <BookDetails bookId={viewBookDetail.id} />
      </Modal>
    </>
  );
};

export default Dashboard;
