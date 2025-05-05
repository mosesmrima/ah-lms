import React from 'react';
import { PaperClipIcon } from '@heroicons/react/24/outline';

interface FileItem {
  id: string;
  name: string;
  size: string;
  type: string;
}

interface AttachedFilesProps {
  files: FileItem[];
}

const AttachedFiles: React.FC<AttachedFilesProps> = ({ files }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-white">Attached Files</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {files.map((file) => (
          <div key={file.id} className="bg-[#1A1A1A] rounded-lg p-4 flex items-center hover:bg-[#222] transition duration-300 cursor-pointer">
            <div className={`${getFileIconColor(file.type)} p-2 rounded mr-3`}>
              <PaperClipIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{file.name}</p>
              <p className="text-xs text-gray-400">{file.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to determine icon color based on file type
const getFileIconColor = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'pdf':
      return 'bg-red-600';
    case 'doc':
    case 'docx':
      return 'bg-blue-600';
    case 'xls':
    case 'xlsx':
      return 'bg-green-600';
    case 'ppt':
    case 'pptx':
      return 'bg-orange-600';
    case 'psd':
      return 'bg-purple-600';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return 'bg-pink-600';
    default:
      return 'bg-gray-600';
  }
};

export default AttachedFiles;
