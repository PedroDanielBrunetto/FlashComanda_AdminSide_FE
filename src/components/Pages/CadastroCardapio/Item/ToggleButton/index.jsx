import React, { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Pen } from 'lucide-react';

const ItemSwitch = ({ item, sectionId, onConfirmItem, onEditItem }) => {
  const [isConfirmed, setIsConfirmed] = useState(item.isConfirmed);

  const handleToggle = () => {
    if (isConfirmed) {
      onEditItem(sectionId, item.id);
    } else {
      onConfirmItem(sectionId, item.id);
    }
    setIsConfirmed((prev) => !prev);
  };

  return (
    <div className="flex items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={handleToggle}
              className={`cursor-pointer flex items-center ${isConfirmed ? 'bg-green-500' : 'bg-gray-300'} rounded-full p-2 transition-colors duration-300`}
            >
              <div
                className={`w-8 h-8 bg-white rounded-full shadow-md transform transition-transform duration-300 flex justify-center items-center `}
              >
                {
                  isConfirmed ?
                    (
                      <Check className="w-4 h-4" />
                    )
                    :
                    (
                      <Pen className="w-4 h-4" />
                    )
                }
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Confirmar/ Editar</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>

  );
};

export default ItemSwitch;
