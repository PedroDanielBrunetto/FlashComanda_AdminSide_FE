import { useEffect, useState } from "react";
import { ArrowLeft, FacebookIcon, Instagram, X } from "lucide-react";
import ImageBanner from "../../../../../components/Pages/Cardapios/ImageBanner";
import ProfilePicture from "../../../../../components/Pages/Cardapios/ProfilePicture";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AlertDialogDynamic from "../../../../../components/utils/AlertDialog";
import { useNavigate } from "react-router-dom";

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
    console.log(cardapio)
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
          </section>
        </div>
      </main>
    </>
  );
};

const Section = ({
  section,
  onSectionChange,
  onAddItem,
  onItemChange,
  onDeleteSection,
  onConfirmItem,
  onEditItem,
  onDeleteItem,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="border p-4 rounded-lg mb-4">
      <div className="flex items-end justify-between gap-2">
        <div className="w-full">
          <Label htmlFor={`section-title-${section.id}`}>Título da Seção</Label>
          <Input
            type="text"
            id={`section-title-${section.id}`}
            value={section.title}
            onChange={(e) => onSectionChange(section.id, e.target.value)}
            placeholder="Ex. Entradas"
          />
        </div>
        <div>
          <Button
            variant="destructive"
            onClick={() => setOpenDialog(true)}
          >
            Excluir Seção
          </Button>

          <AlertDialogDynamic
            title="Deseja excluir a Seção?"
            question="Se confirmar, perderá todas suas alterações."
            yesAction={() => {
              onDeleteSection(section.id);
              setOpenDialog(false);
            }}
            noAction={() => setOpenDialog(false)}
            open={openDialog}
            onClose={() => setOpenDialog(false)}
          />
        </div>
      </div>
      <div className="pt-2">
        {/* Renderizando os itens da seção */}
        {section.items.map((item) => (
          <Item
            key={item.id}
            item={item}
            sectionId={section.id}
            onItemChange={onItemChange}
            onConfirmItem={onConfirmItem}
            onEditItem={onEditItem}
            onDeleteItem={onDeleteItem}
            inputId={`image-input-${item.id}-${item}`}
          />
        ))}
      </div>
      <Button
        variant="secondary"
        className="mt-2 bg-[#12101D] hover:bg-[#1b1a22] text-white"
        onClick={() => onAddItem(section.id)}
      >
        Adicionar item
      </Button>
    </div>
  );
};

const Item = ({
  item,
  sectionId,
  onItemChange,
  onConfirmItem,
  onEditItem,
  onDeleteItem,
  inputId
}) => {
  return (
    <div className="border p-4 rounded-lg mb-4">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <section className="h-full flex flex-col justify-center items-center p-6">
          <ImageBanner inputId={inputId} />
        </section>
        <section>
          <Label>Título do Item</Label>
          <Input
            type="text"
            value={item.title}
            onChange={(e) =>
              onItemChange(sectionId, item.id, "title", e.target.value)
            }
            disabled={item.isConfirmed}
            placeholder="Ex. Pizza"
          />
          <Label>Descrição</Label>
          <Input
            type="text"
            value={item.description}
            onChange={(e) =>
              onItemChange(sectionId, item.id, "description", e.target.value)
            }
            disabled={item.isConfirmed}
            placeholder="Ex. Deliciosa pizza de mussarela"
          />
          <Label>Tempo de Espera</Label>
          <Input
            type="text"
            value={item.waitTime}
            onChange={(e) =>
              onItemChange(sectionId, item.id, "waitTime", e.target.value)
            }
            disabled={item.isConfirmed}
            placeholder="Ex. 40 minutos"
          />
          <Label>Valor</Label>
          <Input
            type="text"
            value={item.value}
            onChange={(e) =>
              onItemChange(sectionId, item.id, "value", e.target.value)
            }
            disabled={item.isConfirmed}
            placeholder="Ex. R$ 36,99"
          />
          <Label>Componentes</Label>
          <Input
            type="text"
            value={item.components.join(", ")}
            onChange={(e) =>
              onItemChange(
                sectionId,
                item.id,
                "components",
                e.target.value.split(",")
              )
            }
            disabled={item.isConfirmed}
            placeholder="Ex. mussarela, tomate"
          />
        </section>
      </div>

      <div className="flex gap-2 mt-2">
        {item.isConfirmed ? (
          <Button
            variant="primary"
            className="bg-blue-600"
            onClick={() => onEditItem(sectionId, item.id)}
          >
            Editar
          </Button>
        ) : (
          <Button
            variant="primary"
            className="bg-green-600"
            onClick={() => onConfirmItem(sectionId, item.id)}
          >
            Confirmar
          </Button>
        )}
        <Button
          variant="destructive"
          onClick={() => onDeleteItem(sectionId, item.id)}
        >
          Excluir
        </Button>
      </div>
    </div>
  );
};

export default CadastroCardapio;