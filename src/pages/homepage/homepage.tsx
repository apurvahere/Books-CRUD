import { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { bookPageData } from "../../utils/constants";

const Homepage = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (e: { data: number }) => {
    setCurrentPage(e.data);
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-[90vh] overflow-hidden bg-gray-100">
      <HTMLFlipBook
        style={{
          margin: "0 auto",
          borderRadius: "10px",
          background: "url('./book-cover-page.jpg')  center center/25%",
        }}
        className="shadow-lg"
        width={300}
        height={500}
        size="fixed"
        minWidth={100}
        maxWidth={300}
        minHeight={500}
        maxHeight={500}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        startPage={0}
        drawShadow={true}
        flippingTime={100}
        usePortrait={true}
        startZIndex={0}
        autoSize={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={0}
        showPageCorners={true}
        disableFlipByClick={true}
        onFlip={handlePageChange}
      >
        {bookPageData.map((d) => (
          <div
            key={d.id}
            className="flex items-center rounded-lg bg-[#f4e8d8] border border-[#A52A2A]"
          >
            <div className="p-2.5">
              <img
                src={d.imageSrc}
                alt={d.author + d.id}
                className="w-72 h-72 rounded-lg mr-8"
              />
            </div>
            <div className="rounded-lg m-2.5 p-2 border-2 border-gray-300">
              <p className="italic">{d.quote}</p>
              <h1 className="text-lg font-medium"> - {d.author}</h1>
            </div>
          </div>
        ))}
      </HTMLFlipBook>
      <div className="mt-4 flex justify-between w-max px-4 gap-5 items-center">
        <div>
          Page {currentPage + 1} of {bookPageData.length}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
