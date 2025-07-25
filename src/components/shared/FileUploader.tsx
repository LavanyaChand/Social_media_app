import {useCallback, useState} from 'react'
import { type FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '../ui/button';
import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps ={
    fieldChange: (FILES: File[]) => void;
    mediaUrl: string;
}

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    // Do something with the files
    setFile(acceptedFiles);
    fieldChange(acceptedFiles);
    setFileUrl(convertFileToUrl(acceptedFiles[0]));
  }, [file]);

  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop,
    accept:{
        'image/*': ['.png', '.jpeg', '.jpg', '.svg']
    }
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl xursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} className="file_uploader-img" alt="image" />
          </div>
          <p className="file_uploader-label">Click or Drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file-upload"
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
          <Button className="shad-button_dark_4">Select from device</Button>
        </div>
      )}
    </div>
  );
}

export default FileUploader