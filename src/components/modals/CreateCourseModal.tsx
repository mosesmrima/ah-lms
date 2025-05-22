'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCourseModal: React.FC<CreateCourseModalProps> = ({ isOpen, onClose }) => {
  const [courseTitle, setCourseTitle] = useState('');
  const [description, setDescription] = useState('');
  const [numModules, setNumModules] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setThumbnailFile(event.dataTransfer.files[0]);
      // Add further file processing logic here if needed
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setThumbnailFile(event.target.files[0]);
      // Add further file processing logic here if needed
    }
  };

  const handleSubmit = () => {
    // Handle form submission logic
    console.log({ courseTitle, description, numModules, thumbnailFile });
    onClose(); // Close modal after submission for now
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-[#1a1a1a] border border-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold leading-6 text-white flex justify-between items-center"
                >
                  Create New Course
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-200"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </Dialog.Title>
                <div className="mt-6 space-y-6">
                  <div>
                    <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-300 mb-1">
                      Course Title / Name
                    </label>
                    <input
                      type="text"
                      name="courseTitle"
                      id="courseTitle"
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                      placeholder="Course Title"
                      className="block w-full rounded-md border border-gray-700 bg-[#1a1a1a] text-white shadow-sm focus:border-[#E7343A] focus:ring-1 focus:ring-[#E7343A] sm:text-sm p-3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Upload Videos
                    </label>
                    <div
                      className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md h-48 bg-black/30 text-center hover:border-[#E7343A]/50 transition-colors duration-200"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleFileDrop}
                    >
                      <div className="space-y-1 text-center">
                        <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-500" />
                        <div className="flex text-sm text-gray-400 justify-center">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-medium text-[#E7343A] hover:text-[#ff5a5f] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#E7343A] focus-within:ring-offset-2 focus-within:ring-offset-[#1a1a1a]"
                          >
                            <span className='font-bold'>Drag & Drop your thumbnail Here!</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileSelect} accept="image/*" />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">Or browse files on your computer</p>
                        {thumbnailFile && <p className="text-xs text-green-400 mt-2">Selected: {thumbnailFile.name}</p>}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description"
                      className="block w-full rounded-md border border-gray-700 bg-[#1a1a1a] text-white shadow-sm focus:border-[#E7343A] focus:ring-1 focus:ring-[#E7343A] sm:text-sm p-3"
                    />
                  </div>

                  <div>
                    <label htmlFor="numModules" className="block text-sm font-medium text-gray-300 mb-1">
                      Number of Videos/Modules/Episodes
                    </label>
                    <input
                      type="number"
                      name="numModules"
                      id="numModules"
                      value={numModules}
                      onChange={(e) => setNumModules(e.target.value)}
                      placeholder="23"
                      className="block w-full rounded-md border border-gray-700 bg-[#1a1a1a] text-white shadow-sm focus:border-[#E7343A] focus:ring-1 focus:ring-[#E7343A] sm:text-sm p-3"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-lg border border-transparent bg-[#E7343A] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#d62e33] focus:outline-none focus:ring-2 focus:ring-[#E7343A] focus:ring-offset-2 focus:ring-offset-[#1a1a1a] transition-colors duration-200"
                    onClick={handleSubmit}
                  >
                    Add Modules
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateCourseModal;
