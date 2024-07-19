import { useState } from "react";

const Pinterest = () => {
  const [images, setImages] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setImages([...images, ...Array.from(e.dataTransfer.files)]);
    }
  };

  return (
    <div className="p-10 flex flex-col">
      <div
        className="border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label
          htmlFor="grid-files"
          className="text-gray-500 cursor-pointer w-full p-4 text-center"
        >
          Upload or drag image here
        </label>
        <input
          id="grid-files"
          type="file"
          name="grid-files"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="hidden"
        />
      </div>
      <div className="columns-3  mt-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="image-wrapper mb-4"
            style={{ breakInside: "avoid" }}
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Image ${index}`}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pinterest;
