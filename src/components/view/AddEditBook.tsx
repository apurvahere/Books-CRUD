import React, { MouseEventHandler } from "react";
import { Formik, Form, Field, FieldArray, FormikProps } from "formik";
import { BookInterface } from "../../libs/types/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddOrEditBookDetailsValidationSchema } from "../../utils/validations";
import { generateUniqueId } from "../../utils/functions";

interface BookFormProps {
  initialValues?: BookInterface;
  onSubmit: (values: BookInterface) => void;
  isEdit?: boolean;
  handleCancel: MouseEventHandler<HTMLButtonElement>;
}

const BookForm: React.FC<BookFormProps> = ({
  initialValues,
  onSubmit,
  isEdit = false,
  handleCancel,
}) => {
  return (
    <Formik
      initialValues={
        initialValues || {
          id: generateUniqueId(3),
          title: "",
          author: "",
          year: "",
          genres: [],
        }
      }
      validationSchema={AddOrEditBookDetailsValidationSchema}
      onSubmit={onSubmit}
    >
      {(formik: FormikProps<BookInterface>) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium">
              Title
            </label>
            <Field
              id="title"
              name="title"
              type="text"
              className={`border-2 px-2 py-1 rounded-md w-full ${
                formik.errors.title && formik.touched.title
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {formik.errors.title && formik.touched.title ? (
              <div className="text-red-500">{formik.errors.title}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="author" className="block font-medium">
              Author
            </label>
            <Field
              id="author"
              name="author"
              type="text"
              className={`border-2 px-2 py-1 rounded-md w-full ${
                formik.errors.author && formik.touched.author
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {formik.errors.author && formik.touched.author ? (
              <div className="text-red-500">{formik.errors.author}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="year" className="block font-medium">
              Year
            </label>
            <DatePicker
              id="year"
              name="year"
              selected={
                formik.values.year ? new Date(+formik.values.year, 0, 1) : null
              }
              onChange={(date) =>
                formik.setFieldValue("year", date ? date.getFullYear() : "")
              }
              showYearPicker
              dateFormat="yyyy"
              className={`border-2 px-2 py-1 rounded-md w-full ${
                formik.errors.year && formik.touched.year
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {formik.errors.year && formik.touched.year ? (
              <div className="text-red-500">{formik.errors.year}</div>
            ) : null}
          </div>
          <div>
            <label className="block font-medium">Genres</label>
            <FieldArray
              name="genres"
              render={(arrayHelpers) => (
                <div className="space-y-2">
                  {formik.values.genres.map((_, index) => (
                    <div key={index} className="flex items-center">
                      <Field
                        name={`genres.${index}`}
                        type="text"
                        className={`border-2 px-2 py-1 rounded-md flex-grow ${
                          formik.errors.genres?.[index] &&
                          (formik.touched.genres as unknown as string[])?.[
                            index
                          ]
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-blue-500"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                        className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md"
                      >
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => arrayHelpers.push("")}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                  >
                    Add Genre
                  </button>
                </div>
              )}
            />
            {formik.errors.genres && formik.touched.genres ? (
              <div className="text-red-500">{formik.errors.genres}</div>
            ) : null}
          </div>
          <div className="flex justify-end gap-2.5">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              {isEdit ? "Edit" : "Add"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BookForm;
