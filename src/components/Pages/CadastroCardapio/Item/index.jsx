import ImageBanner from "../../Cardapios/ImageBanner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DrawerDemo } from "../Drawer";
import { moedaUtils } from "../../../../utils/functions/moeda";
import { ComponentManager } from "../AddComponente/Dialog";
import ItemSwitch from "./ToggleButton";
import AlertDialogDynamic from "../../../utils/AlertDialog";

const Item = ({
  item,
  sectionId,
  onItemChange,
  onConfirmItem,
  onEditItem,
  onDeleteItem,
  inputId,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [waitTime, setWaitTime] = useState(item.waitTime || "");

  const handleDrawerSubmit = (selectedValue) => {
    setWaitTime(`${selectedValue} minutos`);
    onItemChange(sectionId, item.id, "waitTime", `${selectedValue} minutos`);
    setShowDrawer(false);
  };

  const handleImageChange = (image) => {
    onItemChange(sectionId, item.id, "image", image);
  };

  const handleMoedaChange = (e) => {
    const rawValue = e.target.value;
    const parsedValue = moedaUtils.parseCurrency(rawValue);
    onItemChange(sectionId, item.id, "value", parsedValue);

    e.target.value = moedaUtils.formatCurrency(parsedValue);
  };

  return (
    <div className="border p-4 rounded-lg mb-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <section className="h-full flex flex-col justify-center items-center p-6">
          <ImageBanner inputId={inputId} onImageChange={handleImageChange} />
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
          <div className="flex justify-between gap-2">
            <div>
              <Label>Tempo de Espera</Label>
              <Input
                type="text"
                value={waitTime}
                onClick={() => setShowDrawer(true)}
                disabled={item.isConfirmed}
                placeholder="Ex. 40 minutos"
              />
              {showDrawer && (
                <DrawerDemo
                  initialValue={waitTime}
                  onSubmit={handleDrawerSubmit}
                  onClose={() => setShowDrawer(false)}
                />
              )}
            </div>
            <div>
              <Label>Valor</Label>
              <Input
                type="text"
                value={moedaUtils.formatCurrency(item.value)}
                onChange={handleMoedaChange}
                disabled={item.isConfirmed}
                placeholder="Ex. R$ 36,99"
              />
            </div>
          </div>

          <ComponentManager
            sectionId={sectionId}
            item={item}
            onItemChange={onItemChange}
          />
        </section>
      </div>

      <div className="flex w-full justify-start items-center md:pl-4 gap-2 mt-2">
        <ItemSwitch
          item={item}
          sectionId={sectionId}
          onConfirmItem={onConfirmItem}
          onEditItem={onEditItem}
        />
        <Button
          variant="destructive"
          onClick={() => setOpenDialog(true)}
        >
          Excluir Item
        </Button>

        <AlertDialogDynamic
          title="Deseja excluir o Item?"
          question="Se confirmar, perderá todas suas alterações."
          yesAction={() => {
            onDeleteItem(sectionId, item.id);
            setOpenDialog(false);
          }}
          noAction={() => setOpenDialog(false)}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        />
      </div>
    </div>
  );
};

export default Item;
