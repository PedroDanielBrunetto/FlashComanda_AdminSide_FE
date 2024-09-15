import { Eye, PenIcon, Zap } from "lucide-react";

export default function CardToList({
  itsMobile,
  Status,
  IdCardapio,
  Title,
  FlashCards,
  TitleSections
}) {
  return (
    <div
      className={`card w-80 h-[26rem] bg-[#07182E] rounded-2xl overflow-hidden relative transition-all duration-300 
      hover:shadow-[0_0_30px_rgba(0,183,255,0.5)] ${itsMobile ? 'w-56' : 'w-80'}`}
    >
      <div className="card-content p-4 relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-4">
            <div>
              <div>
                <h2 title="CardapioName" className="text-lg font-bold text-white/90 truncate">
                  {Title}
                </h2>
              </div>
              {Status ? (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block bg-green-500/20 text-green-300/90">
                  Ativo #{IdCardapio}
                </span>
              ) : (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block bg-red-500/20 text-red-300/90">
                  Inativo #{IdCardapio}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="flex gap-1 items-center text-xs font-semibold text-white/80 mb-2">
              Anotações Flash <Zap className="w-4 h-4" />
            </h3>
            <div className="flex flex-wrap -mx-1">
              {FlashCards.map((flashCard, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1 m-0.5 bg-white/10 rounded-full text-xs font-medium text-white/70 shadow-sm border border-white/20 transition-all duration-300 hover:bg-white/20"
                >
                  {flashCard}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-xs font-semibold text-white/80 mb-2">Seções</h3>
            <ul className="text-xs text-white/60 grid grid-cols-1 gap-1">
              {TitleSections.slice(0, 5).map((section, idx) => (
                <li className="flex items-center" key={idx}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    className="w-3 h-3 mr-1 text-white/70"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                  <span title={section} className="truncate">{section}</span>
                </li>
              ))}
              {TitleSections.length > 5 && (
                <li className="text-md text-white/60">...</li>
              )}
            </ul>
          </div>
        </div>

        <div className="flex justify-between items-center space-x-2">
          <button
            className="flex-1 gap-2 bg-white/10 text-white/90 rounded-lg px-3 py-2 text-xs font-medium transition duration-300 ease-in-out hover:bg-white/20 flex items-center justify-center border border-white/20"
          >
            <Eye className="w-5 h-5" />
            Visualizar
          </button>
          <button
            className="flex-1 gap-2 bg-white/20 text-white rounded-lg px-3 py-2 text-xs font-medium transition duration-300 ease-in-out hover:bg-white/30 flex items-center justify-center"
          >
            <PenIcon className="w-5 h-5" />
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}