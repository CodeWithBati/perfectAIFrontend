'use client'
import { useState } from 'react'

function ImgVid() {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [documents, setDocuments] = useState([]);

  const handleImageUpload = (e) => {
    const newImages = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleVideoUpload = (e) => {
    const newVideos = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setVideos((prevVideos) => [...prevVideos, ...newVideos]);
  };

  const handleDocumentUpload = (e) => {
    const newDocuments = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setDocuments((prevDocuments) => [...prevDocuments, ...newDocuments]);
  };

  const deleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const deleteVideo = (index) => {
    setVideos((prevVideos) => prevVideos.filter((_, i) => i !== index));
  };

  const deleteDocument = (index) => {
    setDocuments((prevDocuments) => prevDocuments.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Form */}
      <form className="rounded-lg space-y-6">
        {/* Images */}
        <div className="flex gap-5 relative">
          <label htmlFor="image-upload" className="block text-sm font-medium text-gray-300 mb-2 text-start">
            Images
          </label>
          <div className="flex mx-auto max-w-auto min-w-[250px] max-h-[150px] border-[1px] border-gray-100 bg-gray-600 rounded-md p-4 text-center cursor-pointer ">
            <label htmlFor="image-upload" className="cursor-pointer flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </label>
            <input
              id="image-upload"
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
          </div>
          <div className="flex flex-row flex-wrap mt-4 gap-2">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img src={img} alt={`Uploaded ${index}`} className="h-[150px] w-[250px] rounded-lg object-cover" />
                <button
                  onClick={() => deleteImage(index)}
                  className="absolute top-2 right-2 bg-black text-white rounded-full p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Videos */}
        <div className="flex gap-5">
          <label htmlFor="video-upload" className="block text-sm font-medium text-gray-300 mb-2">
            Videos
          </label>
          <div className="flex mx-auto max-w-full min-w-[250px] max-h-[150px] border-[1px] border-gray-100 bg-gray-600 rounded-md p-4 text-center cursor-pointer">
            <label htmlFor="video-upload" className="cursor-pointer flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553 2.276a1 1 0 010 1.448L15 16m-6-6v6m-6-6h6m0 6h6"
                />
              </svg>
            </label>
            <input
              id="video-upload"
              type="file"
              className="hidden"
              accept="video/*"
              multiple
              onChange={handleVideoUpload}
            />
          </div>
          <div className="flex flex-row flex-wrap mt-4 gap-2">
            {videos.map((vid, index) => (
              <div key={index} className="relative">
                <video className="h-[150px] w-[250px] rounded-lg object-cover" controls src={vid}></video>
                <button
                  onClick={() => deleteVideo(index)}
                  className="absolute top-2 right-2 bg-black text-white rounded-full p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <label htmlFor="document-upload" className="block text-sm font-medium text-gray-300 mb-2">
          Documents
        </label>
        <p className="text-sm my-2">
          This document will be used to inform the chatbot to make more accurate AI tool recommendations. It will not be published.
        </p>
        <div className="flex">
          <div className="flex mx-auto max-w-auto min-w-[100px] max-h-[100px] border-[1px] border-gray-100 bg-gray-600 rounded-md p-4 text-center cursor-pointer">
            <label htmlFor="document-upload" className="cursor-pointer flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 7H7v10h10V7h-3m-4 10H7V7h6m2 0v10h-2m6-5h2m-4 4h4m-4-8h4"
                />
              </svg>
            </label>
            <input
              id="document-upload"
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              multiple
              onChange={handleDocumentUpload}
            />
          </div>
          <div className="mt-4 relative flex gap-5">
            {documents.map((doc, index) => (
              <div key={index} className="">
                <a href={doc} className="bg-gray-600 rounded-md p-4 text-center cursor-pointer" target="_blank" rel="noopener noreferrer">
                  Document {index + 1}
                </a>
                <button
                  onClick={() => deleteDocument(index)}
                  className="absolute -top-5 right-0 bg-black text-white rounded-full p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-fit py-2 px-7 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700"
          >
            Update directory
          </button>
        </div>
      </form>
    </div>
  )
}

export default ImgVid;
