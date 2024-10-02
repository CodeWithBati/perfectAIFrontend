'use client'
import Header from "../../layout/Header/HeaderNew"
import { useState } from "react";
import Footer from "../../layout/FooterNew";

function CreateDirectory() {

  const [icon, setIcon] = useState(null);

  const handleIconUpload = (e) => {
    setIcon(URL.createObjectURL(e.target.files[0]));
  };

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
    <>
      <div className='bg-slate-800' >
        <Header />
        <section className="relative flex flex-col items-center justify-center min-w-screen min-h-screen pt-32 pb-16 text-white bg-no-repeat bg-cover" style={{
          backgroundImage: `url('/images/all_bg.jpeg')`
        }}>


          <div className="w-[770px]">
            <h1 className="text-5xl font-bold text-white mb-4 text-center">
              Create New Directory Listing
            </h1>
            <p className="text-lg font-bold text-center">We recommend uploading as much specific, detailed information as possible about your AI tool. This will increase the quality of your leads, as the chatbot will recommend AI tools more precisely and accurately to users.</p>
          </div>
          <div className=" max-w-[570px] flex flex-col items-center justify-center px-4 py-8">
            {/* Upload Icon */}
            <div className="relative w-40 h-40 rounded-full bg-[#1e1e1e] border border-[rgba(255,255,255,0.2)] mb-8 flex items-center justify-center">
              {icon ? (
                <img
                  src={icon}
                  alt="Uploaded Icon"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="text-center text-white">
                  <label htmlFor="upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 0.5L17.4844 3.5H21.75H24V5.75V19.25V21.5H21.75H2.25H0V19.25V5.75V3.5H2.25H6.46875L7.5 0.5H16.5ZM17.4844 5.75H15.8438L15.3281 4.25L14.8594 2.75H9.09375L8.625 4.25L8.10938 5.75H6.46875H2.25V19.25H21.75V5.75H17.4844ZM12 7.25C13.875 7.25 15.5625 8.28125 16.5 9.875C17.4844 11.5156 17.4844 13.5312 16.5 15.125C15.5625 16.7656 13.875 17.75 12 17.75C10.0781 17.75 8.39062 16.7656 7.45312 15.125C6.46875 13.5312 6.46875 11.5156 7.45312 9.875C8.39062 8.28125 10.0781 7.25 12 7.25ZM15 12.5C15 11.4688 14.3906 10.4844 13.5 9.92188C12.5625 9.40625 11.3906 9.40625 10.5 9.92188C9.5625 10.4844 9 11.4688 9 12.5C9 13.5781 9.5625 14.5625 10.5 15.125C11.3906 15.6406 12.5625 15.6406 13.5 15.125C14.3906 14.5625 15 13.5781 15 12.5Z" fill="white" />
                      </svg>
                      <span>Upload Icon</span>
                    </div>
                    <input
                      id="upload"
                      type="file"
                      className="hidden"
                      onChange={handleIconUpload}
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Form */}
            <form className="w-[570px] space-y-4 flex justify-center items-center flex-col rounded-lg">
              <div className="flex space-x-[20px]">
                {/* First Name */}
                <div className="relative w-[275px]">
                  <input
                    type="text"
                    id="name"
                    placeholder=" "
                    className="block px-[15px] pt-[20px] pb-[8px] w-full h-[56px] text-sm text-white bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-[5px] appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
                  />
                  <label
                    htmlFor="name"
                    className="absolute text-sm text-[rgba(255,255,255,0.5)] duration-300 transform -translate-y-4 scale-100 top-[18px] left-[15px] origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-[18px] peer-placeholder-shown:scale-100 peer-focus:top-[8px] peer-focus:text-xs peer-focus:text-[rgba(255,255,255,0.5)] peer-focus:scale-90"
                  >
                    NAME
                  </label>
                </div>

                <div className="relative w-[275px]">
                  <input
                    type="text"
                    id="pricing"
                    placeholder=" "
                    className="block px-[15px] pt-[20px] pb-[8px] w-full h-[56px] text-sm text-white bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-[5px] appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
                  />
                  <label
                    htmlFor="pricing"
                    className="absolute text-sm text-[rgba(255,255,255,0.5)] duration-300 transform -translate-y-4 scale-100 top-[18px] left-[15px] origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-[18px] peer-placeholder-shown:scale-100 peer-focus:top-[8px] peer-focus:text-xs peer-focus:text-[rgba(255,255,255,0.5)] peer-focus:scale-90"
                  >
                    PRICING
                  </label>
                </div>
              </div>

              <div className="flex space-x-[20px]">
                {/* First Name */}
                <div className="relative w-[275px]">
                  <input
                    type="text"
                    id="usecase"
                    placeholder=" "
                    className="block px-[15px] pt-[20px] pb-[8px] w-full h-[56px] text-sm text-white bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-[5px] appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
                  />
                  <label
                    htmlFor="usecase"
                    className="absolute text-sm text-[rgba(255,255,255,0.5)] duration-300 transform -translate-y-4 scale-100 top-[18px] left-[15px] origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-[18px] peer-placeholder-shown:scale-100 peer-focus:top-[8px] peer-focus:text-xs peer-focus:text-[rgba(255,255,255,0.5)] peer-focus:scale-90"
                  >
                    PRIMARY USE CASE
                  </label>
                </div>

                <div className="relative w-[275px]">
                  <input
                    type="text"
                    id="website"
                    placeholder=" "
                    className="block px-[15px] pt-[20px] pb-[8px] w-full h-[56px] text-sm text-white bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-[5px] appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
                  />
                  <label
                    htmlFor="website"
                    className="absolute text-sm text-[rgba(255,255,255,0.5)] duration-300 transform -translate-y-4 scale-100 top-[18px] left-[15px] origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-[18px] peer-placeholder-shown:scale-100 peer-focus:top-[8px] peer-focus:text-xs peer-focus:text-[rgba(255,255,255,0.5)] peer-focus:scale-90"
                  >
                    WEBSITE
                  </label>
                </div>
              </div>

              <div className="relative w-full">
                <textarea
                  id="description"
                  placeholder=" "
                  className="block px-[15px] resize-none pt-[20px] pb-[8px] w-full h-[183px] text-sm text-white bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-[5px] appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
                />
                <label
                  htmlFor="description"
                  className="absolute text-sm text-[rgba(255,255,255,0.5)] duration-300 transform -translate-y-4 scale-100 top-[18px] left-[15px] origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-[18px] peer-placeholder-shown:scale-100 peer-focus:top-[8px] peer-focus:text-xs peer-focus:text-[rgba(255,255,255,0.5)] peer-focus:scale-90"
                >
                  DESCRIPTION
                </label>
              </div>

              <div className="flex space-x-[20px]">
                {/* First Name */}
                <div className="relative w-[275px]">
                  <textarea
                    id="summary_desc"
                    placeholder=" "
                    className="block px-[15px] resize-none pt-[20px] pb-[8px] w-full h-[183px] text-sm text-white bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-[5px] appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
                  />
                  <label
                    htmlFor="summary_desc"
                    className="absolute text-sm text-[rgba(255,255,255,0.5)] duration-300 transform -translate-y-4 scale-100 top-[18px] left-[15px] origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-[18px] peer-placeholder-shown:scale-100 peer-focus:top-[8px] peer-focus:text-xs peer-focus:text-[rgba(255,255,255,0.5)] peer-focus:scale-90"
                  >
                    SUMMARY DESCRIPTION
                  </label>
                </div>

                <div className="relative w-[275px]">
                  <textarea
                    id="extra_info"
                    placeholder=" "
                    className="block px-[15px] resize-none pt-[20px] pb-[8px] w-full h-[183px] text-sm text-white bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-[5px] appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
                  />
                  <label
                    htmlFor="extra_info"
                    className="absolute text-sm text-[rgba(255,255,255,0.5)] duration-300 transform -translate-y-4 scale-100 top-[18px] left-[15px] origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-[18px] peer-placeholder-shown:scale-100 peer-focus:top-[8px] peer-focus:text-xs peer-focus:text-[rgba(255,255,255,0.5)] peer-focus:scale-90"
                  >
                    EXTRA INFORMATION
                  </label>
                </div>
              </div>

              <div className="relative w-full">
                <h3 className="text-lg font-bold mb-4">Images</h3>
                {
                  images.length === 0 ?
                    <div onClick={() => document.getElementById('image-upload').click()} className="flex justify-center items-center mx-auto max-w-auto max-h-[150px] w-full border-[1px] border-[rgba(255,255,255,0.5)] bg-[#323639] rounded-[10px] p-6 text-center cursor-pointer ">
                      <label lassName="cursor-pointer flex justify-center">
                        <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.5 0.5L17.4844 3.5H21.75H24V5.75V19.25V21.5H21.75H2.25H0V19.25V5.75V3.5H2.25H6.46875L7.5 0.5H16.5ZM17.4844 5.75H15.8438L15.3281 4.25L14.8594 2.75H9.09375L8.625 4.25L8.10938 5.75H6.46875H2.25V19.25H21.75V5.75H17.4844ZM12 7.25C13.875 7.25 15.5625 8.28125 16.5 9.875C17.4844 11.5156 17.4844 13.5312 16.5 15.125C15.5625 16.7656 13.875 17.75 12 17.75C10.0781 17.75 8.39062 16.7656 7.45312 15.125C6.46875 13.5312 6.46875 11.5156 7.45312 9.875C8.39062 8.28125 10.0781 7.25 12 7.25ZM15 12.5C15 11.4688 14.3906 10.4844 13.5 9.92188C12.5625 9.40625 11.3906 9.40625 10.5 9.92188C9.5625 10.4844 9 11.4688 9 12.5C9 13.5781 9.5625 14.5625 10.5 15.125C11.3906 15.6406 12.5625 15.6406 13.5 15.125C14.3906 14.5625 15 13.5781 15 12.5Z" fill="white" />
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
                    :
                    <div className="flex flex-row mt-4 gap-8">
                      <div onClick={() => document.getElementById('image-upload').click()} className="flex justify-center items-center max-h-[150px] w-[90px] border-[1px] border-[rgba(255,255,255,0.5)] bg-[#323639] rounded-[10px] p-6 text-center cursor-pointer ">
                        <label className="cursor-pointer flex justify-center">
                          <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5 0.5L17.4844 3.5H21.75H24V5.75V19.25V21.5H21.75H2.25H0V19.25V5.75V3.5H2.25H6.46875L7.5 0.5H16.5ZM17.4844 5.75H15.8438L15.3281 4.25L14.8594 2.75H9.09375L8.625 4.25L8.10938 5.75H6.46875H2.25V19.25H21.75V5.75H17.4844ZM12 7.25C13.875 7.25 15.5625 8.28125 16.5 9.875C17.4844 11.5156 17.4844 13.5312 16.5 15.125C15.5625 16.7656 13.875 17.75 12 17.75C10.0781 17.75 8.39062 16.7656 7.45312 15.125C6.46875 13.5312 6.46875 11.5156 7.45312 9.875C8.39062 8.28125 10.0781 7.25 12 7.25ZM15 12.5C15 11.4688 14.3906 10.4844 13.5 9.92188C12.5625 9.40625 11.3906 9.40625 10.5 9.92188C9.5625 10.4844 9 11.4688 9 12.5C9 13.5781 9.5625 14.5625 10.5 15.125C11.3906 15.6406 12.5625 15.6406 13.5 15.125C14.3906 14.5625 15 13.5781 15 12.5Z" fill="white" />
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
                      {images.map((img, index) => (
                        <div key={index} className="relative">
                          <img src={img} alt={`Uploaded ${index}`} className="h-[90px] w-[140px] rounded-[5px] object-cover" />
                          <button
                            onClick={() => deleteImage(index)}
                            className="absolute top-2 right-2 bg-black text-white rounded-[5px] p-1"
                          >
                            <svg width="10" height="11" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.79622 0.666687H2.99935H4.99935H5.18685L5.31185 0.838562L6.0306 1.91669H6.23372H6.99935H7.49935V2.66669H6.93685L6.49935 8.66669H1.49935L1.04622 2.66669H0.49935V1.91669H0.99935H1.74935H1.95247L2.68685 0.838562L2.79622 0.666687ZM2.85872 1.91669H5.12435L4.79622 1.41669H3.18685L2.85872 1.91669ZM1.79622 2.66669L2.18685 7.91669H5.79622L6.18685 2.66669H1.79622Z" fill="white" />
                            </svg>

                          </button>
                        </div>
                      ))}
                    </div>
                }
              </div>

              <div className="relative w-full">
                <h3 className="text-lg font-bold mb-4">Videos</h3>
                {
                  videos.length === 0 ?
                    <div onClick={() => document.getElementById('video-upload').click()} className="flex justify-center items-center max-h-[150px] w-full border-[1px] border-[rgba(255,255,255,0.5)] bg-[#323639] rounded-[10px] p-6 text-center cursor-pointer ">
                      <label className="cursor-pointer flex justify-center">
                        <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.75 2.25V15.75H16.25V2.25H2.75ZM0.5 0H2.75H16.25H18.5V2.25V4.5V13.5V15.75V18H16.25H2.75H0.5V15.75V2.25V0ZM20 11.7656L25.25 14.3906V3.65625L20 6.28125V3.75L25.25 1.125L27.5 0V2.53125V15.5156V18L25.25 16.875L20 14.25V11.7656Z" fill="white" />
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
                    :
                    <div className="flex flex-row mt-4 gap-8">
                      <div onClick={() => document.getElementById('video-upload').click()}  className="flex justify-center items-center max-h-[150px] w-[90px] border-[1px] border-[rgba(255,255,255,0.5)] bg-[#323639] rounded-[10px] p-6 text-center cursor-pointer ">
                        <label className="cursor-pointer flex justify-center">
                          <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.75 2.25V15.75H16.25V2.25H2.75ZM0.5 0H2.75H16.25H18.5V2.25V4.5V13.5V15.75V18H16.25H2.75H0.5V15.75V2.25V0ZM20 11.7656L25.25 14.3906V3.65625L20 6.28125V3.75L25.25 1.125L27.5 0V2.53125V15.5156V18L25.25 16.875L20 14.25V11.7656Z" fill="white" />
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
                      {videos.map((vid, index) => (
                        <div key={index} className="relative">
                          <video className="h-[90px] w-[140px] rounded-[5px] object-cover" controls src={vid}></video>
                          <button
                            onClick={() => deleteVideo(index)}
                            className="absolute top-2 right-2 bg-black text-white rounded-[5px] p-1"
                          >
                            <svg width="10" height="11" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.79622 0.666687H2.99935H4.99935H5.18685L5.31185 0.838562L6.0306 1.91669H6.23372H6.99935H7.49935V2.66669H6.93685L6.49935 8.66669H1.49935L1.04622 2.66669H0.49935V1.91669H0.99935H1.74935H1.95247L2.68685 0.838562L2.79622 0.666687ZM2.85872 1.91669H5.12435L4.79622 1.41669H3.18685L2.85872 1.91669ZM1.79622 2.66669L2.18685 7.91669H5.79622L6.18685 2.66669H1.79622Z" fill="white" />
                            </svg>

                          </button>
                        </div>
                      ))}
                    </div>
                }
              </div>

              <div className="relative w-full mb-8">
                <h3 className="text-lg font-bold mb-4">Documents</h3>
                <p className="text-white text-xs mb-4">This document will be used to inform the chatbot to make more accurate AI tool recommendations. It will not be published. </p>
                {
                  documents.length === 0 ?
                    <div onClick={() => document.getElementById('document-upload').click()} className="flex justify-center items-center max-h-[150px] w-full border-[1px] border-[rgba(255,255,255,0.5)] bg-[#323639] rounded-[10px] p-6 text-center cursor-pointer ">
                      <label className="cursor-pointer flex justify-center">
                        <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.0781 4.42188C16.8594 3.20312 14.8438 3.20312 13.625 4.42188L4.67188 13.4219C2.60938 15.4844 2.60938 18.8125 4.67188 20.8281C6.6875 22.8906 10.0156 22.8906 12.0781 20.8281L19.2031 13.7031L20 12.9062L21.5469 14.5L20.75 15.2969L13.6719 22.4219C10.7188 25.375 5.98438 25.375 3.07812 22.4219C0.125 19.5156 0.125 14.7812 3.07812 11.8281L12.0781 2.82812C14.1406 0.765625 17.5625 0.765625 19.6719 2.82812C21.7344 4.9375 21.7344 8.35938 19.6719 10.4219L11.0469 19.0469C9.54688 20.5469 7.10938 20.4062 5.79688 18.7656C4.67188 17.3594 4.8125 15.3438 6.07812 14.0781L13.2031 6.95312L14 6.15625L15.5469 7.75L14.75 8.54688L7.67188 15.6719C7.20312 16.1406 7.15625 16.8438 7.57812 17.3594C8.04688 17.9219 8.89062 18.0156 9.45312 17.4531L18.0781 8.82812C19.2969 7.60938 19.2969 5.64062 18.0781 4.42188Z" fill="white" />
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
                    :
                    <div className="flex flex-row mt-4 gap-8">
                      <div onClick={() => document.getElementById('document-upload').click()} className="flex justify-center items-center max-h-[150px] w-[90px] border-[1px] border-[rgba(255,255,255,0.5)] bg-[#323639] rounded-[10px] p-4 text-center cursor-pointer ">
                        <label className="cursor-pointer flex justify-center">
                          <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.0781 4.42188C16.8594 3.20312 14.8438 3.20312 13.625 4.42188L4.67188 13.4219C2.60938 15.4844 2.60938 18.8125 4.67188 20.8281C6.6875 22.8906 10.0156 22.8906 12.0781 20.8281L19.2031 13.7031L20 12.9062L21.5469 14.5L20.75 15.2969L13.6719 22.4219C10.7188 25.375 5.98438 25.375 3.07812 22.4219C0.125 19.5156 0.125 14.7812 3.07812 11.8281L12.0781 2.82812C14.1406 0.765625 17.5625 0.765625 19.6719 2.82812C21.7344 4.9375 21.7344 8.35938 19.6719 10.4219L11.0469 19.0469C9.54688 20.5469 7.10938 20.4062 5.79688 18.7656C4.67188 17.3594 4.8125 15.3438 6.07812 14.0781L13.2031 6.95312L14 6.15625L15.5469 7.75L14.75 8.54688L7.67188 15.6719C7.20312 16.1406 7.15625 16.8438 7.57812 17.3594C8.04688 17.9219 8.89062 18.0156 9.45312 17.4531L18.0781 8.82812C19.2969 7.60938 19.2969 5.64062 18.0781 4.42188Z" fill="white" />
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
                      {documents.map((doc, index) => (
                        <div key={index} className="bg-[#323639] rounded-[10px] p-4 flex justify-center items-center">
                          <a href={doc} className="text-center cursor-pointer" target="_blank" rel="noopener noreferrer">
                            <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4">
                              <path d="M10.5 14.5V5H7V1.5H1.5V14.5H10.5ZM1.5 0H8L12 4V14.5V16H10.5H1.5H0V14.5V1.5V0H1.5Z" fill="white" />
                            </svg>
                          </a>
                            Document {index + 1}
                            <button
                              onClick={() => deleteDocument(index)}
                              className="bg-black text-white rounded-[5px] p-1 ml-4"
                            >
                              <svg width="14" height="14" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.79622 0.666687H2.99935H4.99935H5.18685L5.31185 0.838562L6.0306 1.91669H6.23372H6.99935H7.49935V2.66669H6.93685L6.49935 8.66669H1.49935L1.04622 2.66669H0.49935V1.91669H0.99935H1.74935H1.95247L2.68685 0.838562L2.79622 0.666687ZM2.85872 1.91669H5.12435L4.79622 1.41669H3.18685L2.85872 1.91669ZM1.79622 2.66669L2.18685 7.91669H5.79622L6.18685 2.66669H1.79622Z" fill="white" />
                              </svg>

                            </button>
                        </div>
                      ))}
                    </div>
                }
              </div>

              <button className="bg-[#8B60B2] text-sm font-semibold text-white mt-8 rounded-[5px] px-[20px] py-[10px] hover:bg-[#763b9a] focus:outline-none focus:ring-2 focus:ring-[#8B60B2]">
                Create directory
              </button>
            </form>
          </div>
        </section>
        <Footer />
      </div>

    </>
  )
}

export default CreateDirectory