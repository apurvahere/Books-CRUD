import { useParams } from "react-router-dom";
import { useProps } from "../../context/PropsContext";

const Book = () => {
  const { id } = useParams();
  const { booksData } = useProps();
  const bookDetails = booksData.find((d) => d.id === id);

  return (
    <div className="p-20">
      {/* <h1>{JSON.stringify(bookDetails, null)}</h1> */}
      <h1>Book id: {bookDetails?.id}</h1>
      <h1>Book title: {bookDetails?.title}</h1>
      <h1>Book author: {bookDetails?.author}</h1>
      <h1>Book year: {bookDetails?.year}</h1>
      <div className="flex gap-1.5">
        Book generes:
        {bookDetails?.genres.map((d) => (
          <div className="">{d}</div>
        ))}
      </div>
    </div>
  );
};

export default Book;
