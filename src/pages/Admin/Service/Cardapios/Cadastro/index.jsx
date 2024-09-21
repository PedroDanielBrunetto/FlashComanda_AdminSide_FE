import { useEffect, useState } from "react";
import { ArrowLeft, FacebookIcon, Instagram, X } from "lucide-react";
import ImageBanner from "../../../../../components/Pages/Cardapios/ImageBanner";
import ProfilePicture from "../../../../../components/Pages/Cardapios/ProfilePicture";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Section from "../../../../../components/Pages/CadastroCardapio/Section";

const CadastroCardapio = () => {
  const navigate = useNavigate();

  const [sections, setSections] = useState([]);
  const [cardapio, setCardapio] = useState({
    tituloCardapio: "",
    CapaCardapio: "",
    Secoes: [
      {
        TituloSecao: "Titulo",
        Itens: [
          {
            ImagemItem: "",
            TituloItem: "Titulo",
            Descricao: "",
            TempoEspera: 0,
            Valor: 0.00,
            Componentes: [""]
          }
        ]
      }
    ]
  });

  useEffect(() => {
    console.log(sections)
  })

  const handleNewSection = () => {
    setSections((prevState) => [
      ...prevState,
      {
        id: Math.random(),
        title: "",
        items: [],
      },
    ]);
  };

  const handleSectionChange = (id, title) => {
    setSections((prevState) =>
      prevState.map((section) =>
        section.id === id ? { ...section, title } : section
      )
    );
  };

  const handleDeleteSection = (sectionId) => {
    setSections((prevState) => prevState.filter((section) => section.id !== sectionId));
  };

  const handleNewItem = (sectionId) => {
    setSections((prevState) =>
      prevState.map((section) =>
        section.id === sectionId
          ? {
            ...section,
            items: [
              ...section.items,
              {
                id: Math.random(),
                title: "",
                description: "",
                waitTime: "",
                value: "",
                components: [],
                image: "",
                isConfirmed: false,
              },
            ],
          }
          : section
      )
    );
  };

  const handleItemChange = (sectionId, itemId, key, value) => {
    setSections((prevState) =>
      prevState.map((section) =>
        section.id === sectionId
          ? {
            ...section,
            items: section.items.map((item) =>
              item.id === itemId ? { ...item, [key]: value } : item
            ),
          }
          : section
      )
    );
  };

  const handleConfirmItem = (sectionId, itemId) => {
    setSections((prevState) =>
      prevState.map((section) =>
        section.id === sectionId
          ? {
            ...section,
            items: section.items.map((item) =>
              item.id === itemId ? { ...item, isConfirmed: true } : item
            ),
          }
          : section
      )
    );
  };

  const handleEditItem = (sectionId, itemId) => {
    setSections((prevState) =>
      prevState.map((section) =>
        section.id === sectionId
          ? {
            ...section,
            items: section.items.map((item) =>
              item.id === itemId ? { ...item, isConfirmed: false } : item
            ),
          }
          : section
      )
    );
  };

  const handleDeleteItem = (sectionId, itemId) => {
    setSections((prevState) =>
      prevState.map((section) =>
        section.id === sectionId
          ? {
            ...section,
            items: section.items.filter((item) => item.id !== itemId),
          }
          : section
      )
    );
  };

  const handleImageChange = (image) => {
    setCardapio((prev) => ({ ...prev, CapaCardapio: image }));
  };

  return (
    <>
      <div className="p-4">
        <button
          className="flex gap-1 text-lg font-semibold items-center"
          onClick={() => navigate('/cardapios')}
        >
          <ArrowLeft /> Voltar
        </button>
      </div>
      <main className="w-full flex justify-center">
        <div className="w-full max-w-4xl flex flex-col justify-center">
          <ImageBanner inputId="capa-input" onImageChange={handleImageChange} />
          <div className="flex gap-3 pt-2 pl-2 md:pl-0">
            <button className="cursor-pointer">
              <a>
                <Instagram />
              </a>
            </button>
            <button className="cursor-pointer">
              <a>
                <FacebookIcon />
              </a>
            </button>
          </div>
          <div className="-mt-24">
            <ProfilePicture />
          </div>

          {/* Formulário */}
          <section className="w-full flex flex-col gap-8 p-4">
            <div className="w-full items-center gap-1.5">
              <Label htmlFor="titleCardapio">Título do cardápio</Label>
              <Input
                type="text"
                id="titleCardapio"
                placeholder="Ex. Cardápio de verão"
              />
            </div>
            <div>
              <Button
                variant="secondary"
                className="bg-[#12101D] hover:bg-[#1b1a22] text-white"
                onClick={handleNewSection}
              >
                Adicionar seção
              </Button>
            </div>

            {/* Renderizando as seções */}
            {sections.map((section) => (
              <Section
                key={section.id}
                section={section}
                onSectionChange={handleSectionChange}
                onAddItem={handleNewItem}
                onItemChange={handleItemChange}
                onDeleteSection={handleDeleteSection}
                onConfirmItem={handleConfirmItem}
                onEditItem={handleEditItem}
                onDeleteItem={handleDeleteItem}
              />
            ))}

            <div className="w-full">
              <Button
                variant="primary"
                className="bg-[#12101D] hover:bg-[#1b1a22] text-white w-full"

              >
                Criar Cardápio
              </Button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default CadastroCardapio;