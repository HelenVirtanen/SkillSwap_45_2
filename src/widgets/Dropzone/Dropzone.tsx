import React, { useRef } from 'react';
import { DropzoneUI } from '@shared/ui/DropzoneUI/DropzoneUI';

type DropzoneProps = {
  onFilesChange?: (files: File[]) => void;
};

const Dropzone: React.FC<DropzoneProps> = ({ onFilesChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    onFilesChange?.(fileArray);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = '';
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver}>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        hidden
        onChange={handleInputChange}
      />

      <DropzoneUI onClick={handleClick} />
    </div>
  );
};

export default Dropzone;
