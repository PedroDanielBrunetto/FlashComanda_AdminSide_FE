import { useEffect, useState } from "react";
import CardToList from "../../../../components/Pages/Cardapios/CardToList";
import SideBar from "../../../../components/SideBar";
import mockCardapios from "../../../../utils/mocks/mockCardapios.js";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Cardapios() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleSidebarToggle = (isOpen) => {
    setSidebarOpen(isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex bg-slate-50">
      <SideBar onToggle={handleSidebarToggle} />
      <div className={`h-screen flex-1 p-7 duration-200 ${sidebarOpen ? 'ml-72' : 'ml-20'}`}>
        <h1 className="text-2xl font-semibold">Cardápios</h1>
        <section className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pt-6 auto-rows-fr ${!sidebarOpen ? "justify-items-center" : ""} pb-6`}>
          {mockCardapios.map((idx) => (
            <div key={idx.idCardapio}>
              <CardToList
                itsMobile={isMobile}
                Title={idx.title}
                IdCardapio={idx.idCardapio}
                FlashCards={idx.flashCards}
                Status={idx.Status}
                TitleSections={idx.titleSections}
              />
            </div>
          ))}
        </section>
      </div>
      <div className={`fixed ${isMobile ? "bottom-5 right-5" : "bottom-10 right-10"} z-50`}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="bg-[#12101D] p-4 text-white rounded-full shadow-lg hover:bg-[#0e0c18] transition duration-200"><Plus /></TooltipTrigger>
            <TooltipContent>
              <p>Criar cardápio</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
