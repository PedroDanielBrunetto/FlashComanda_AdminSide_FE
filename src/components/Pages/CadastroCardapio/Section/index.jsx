import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AlertDialogDynamic from "../../../utils/AlertDialog";
import Item from "../Item"

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

export default Section;