import React, { useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, X } from 'lucide-react';

const ImageBanner = ({ inputId, onImageChange }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onImageChange(imageUrl);
    }
  };

  const triggerFileInput = () => {
    document.getElementById(inputId).click();
  };

  const removeImage = () => {
    setImage(null);
    document.getElementById(inputId).value = '';
    onImageChange(null);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div
        className="relative w-full h-64 bg-gray-200 flex justify-center items-center rounded-lg overflow-hidden cursor-pointer"
        onClick={triggerFileInput}
      >
        {image ? (
          <>
            <AspectRatio ratio={16 / 12}>
              <img
                src={image}
                alt="Selected"
                className="w-full h-full object-cover"
              />
            </AspectRatio>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none"
                >
                  <X />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remover imagem</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <button
              className="bg-[#12101D] text-white p-3 rounded-full hover:bg-[#0e0c18] focus:outline-none"
            >
              <Plus />
            </button>
            <p className="text-gray-600 mt-2">Selecione uma imagem</p>
          </div>
        )}
      </div>

      <input
        type="file"
        id={inputId}
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageBanner;