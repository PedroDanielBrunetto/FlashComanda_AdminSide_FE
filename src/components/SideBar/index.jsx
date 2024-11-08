import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SideBar({ onToggle }) {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill", endpoint: "/dashboard" },
    { title: "Funcionários", src: "User", endpoint: "/funcionarios" },
    { title: "Cardápios ", src: "Calendar", endpoint: "/cardapios" },
    { title: "Análises", src: "Chart", endpoint: "/analises" },
    { title: "Eventos/ Restaurante ", src: "Folder", endpoint: "/eventos" },
    { title: "Configurações", src: "Setting", endpoint: "/configurações" },
  ];

  useEffect(() => {
    if (onToggle) {
      onToggle(open);
    }
  }, [open, onToggle]);

  return (
    <div
      className={`${open ? "w-72" : "w-20"
        } bg-gray-950 h-screen p-5 pt-8 fixed duration-300 rounded-r-lg `}
    >
      <img
        src="./src/assets/SideBar/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
         border-2 rounded-full ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src="./src/assets/SideBar/logo.png"
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
            }`}
        />
        <h1
          className={`text-white origin-left font-medium text-lg duration-200 ${!open && "scale-0"
            }`}
        >
          Restaurante Viver Mais com Amor
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <a href={Menu.endpoint}>
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${index === 0 && "bg-light-white"}`}
            >
              <img src={`./src/assets/SideBar/${Menu.src}.png`} />
              <span className={`${!open && "hidden"} origin-left duration-200 font-semibold`}>
                {Menu.title}
              </span>
            </li>
          </a>
        ))}
      </ul>
      <div className="absolute bottom-6 flex origin-left p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="text-white flex font-bold gap-2">{open && "SAIR"} <LogOut /></TooltipTrigger>
            <TooltipContent>
              <p>Desconectar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
