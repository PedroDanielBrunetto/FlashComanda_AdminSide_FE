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
      const reader = new FileReader();

      reader.onload = function (event) {
        const img = new Image();

        img.src = event.target.result;
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const maxSize = 1000; // Define o tamanho máximo (1MB)
          let width = img.width;
          let height = img.height;

          // Ajusta as dimensões mantendo a proporção
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const base64Image = canvas.toDataURL('image/jpeg', 0.8);

          setImage(base64Image);
          onImageChange(base64Image);
        };
      };

      reader.readAsDataURL(file);
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
