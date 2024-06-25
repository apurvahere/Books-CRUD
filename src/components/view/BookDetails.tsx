import { useProps } from "../../context/PropsContext";

const BookDetails = ({ bookId }: { bookId: string }) => {
  const { booksData } = useProps();

  const book = booksData.find((book) => book.id === bookId)!;

  return (
    <div className="mx-auto overflow-hidden my-1.5">
      <div className="p-px">
        <p className="text-gray-700 mb-1">
          <strong>Book name:</strong>{" "}
          <span className="capitalize">{book.title}</span>
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Author:</strong>{" "}
          <span className="capitalize">{book.author}</span>
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Year:</strong> {book.year}
        </p>
        <div className="text-gray-700 mt-2 flex">
          <strong>Genres:</strong>
          <div className="flex flex-wrap gap-2 mx-2">
            {book.genres.map((genre, index) => (
              <span
                key={index}
                className="bg-green-200 text-green-800 rounded-full px-2.5 py-1 text-sm font-semibold capitalize"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
