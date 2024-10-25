// components/FileUploadSection.jsx

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { truncateWithEllipsis } from "@/lib/form";

function FileUploadSection({
  label,
  fileType,
  accept,
  fileUploadLabel,
  fileUploadButtonText,
  uploadedLinks,
  selectedFiles,
  handleFileChange,
  removeUploadedFile,
  removeSelectedFile,
}) {
  return (
    <div className="w-full lg:w-1/2 px-3">
      <div className="py-2 flex gap-1 flex-col items-start">
        <div className="w-full">
          <div className="py-2">
            <label htmlFor={`${fileType}-upload`} className="mb-2 block text-white">
              {label}
            </label>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-md px-4 py-6">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-300 text-center mb-3">
                  {fileUploadLabel}
                </p>
                <label
                  className="inline-flex px-2 py-1 rounded text-sm font-medium cursor-pointer bg-blue-600 text-white flex-row gap-2 items-center"
                  htmlFor={`${fileType}-upload`}
                >
                  <input
                    type="file"
                    accept={accept}
                    id={`${fileType}-upload`}
                    multiple
                    hidden
                    onChange={handleFileChange}
                  />
                  {fileUploadButtonText}
                  <FontAwesomeIcon icon={faFolderOpen} />
                </label>
              </div>
            </div>

            {/* Display Uploaded Files */}
            {uploadedLinks.map((link, index) => (
              <div
                key={index}
                className="shadow-md p-3 flex justify-between items-center dark:bg-slate-950 dark:text-white rounded-md mt-2"
              >
                <p className="truncate">{truncateWithEllipsis(link.split("/").pop(), 45)}</p>
                <div
                  className="cursor-pointer bg-red-100 hover:bg-red-200 duration-150 transform px-3 py-1 rounded-md"
                  onClick={() => removeUploadedFile(link)}
                >
                  <FontAwesomeIcon icon={faTrash} color="red" />
                </div>
              </div>
            ))}

            {/* Display Selected Files (Before Upload) */}
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="shadow-md p-3 flex justify-between items-center dark:bg-slate-950 dark:text-white rounded-md mt-2"
              >
                <p className="truncate">{truncateWithEllipsis(file.name, 45)}</p>
                <div
                  className="cursor-pointer bg-red-100 hover:bg-red-200 duration-150 transform px-3 py-1 rounded-md"
                  onClick={() => removeSelectedFile(file)}
                >
                  <FontAwesomeIcon icon={faTrash} color="red" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUploadSection;
