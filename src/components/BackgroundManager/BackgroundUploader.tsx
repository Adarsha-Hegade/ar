import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface BackgroundUploaderProps {
  onImageSelect: (imageUrl: string) => void;
}

export function BackgroundUploader({ onImageSelect }: BackgroundUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      className={`flex h-[80vh] w-full items-center justify-center rounded-lg border-2 border-dashed ${
        isDragging ? 'border-blue-500 bg-blue-50/10' : 'border-gray-600'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-4 text-lg text-gray-300">Drag and drop an image here, or</p>
        <label className="mt-4 inline-block cursor-pointer rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
          Choose File
          <input type="file" accept="image/*" className="hidden" onChange={handleChange} />
        </label>
      </div>
    </div>
  );
}