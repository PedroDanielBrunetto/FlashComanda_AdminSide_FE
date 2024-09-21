import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { moedaUtils } from "../../../../../utils/functions/moeda.js";
import { Plus } from "lucide-react";

export function ComponentManager({ sectionId, item, onItemChange }) {
  const [components, setComponents] = useState(item.components || []);
  const [open, setOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(null);

  const handleSaveComponent = () => {
    if (currentComponent) {
      let updatedComponents;

      if (currentComponent.id) {
        // Atualizar componente existente
        updatedComponents = components.map((comp) =>
          comp.id === currentComponent.id ? currentComponent : comp
        );
      } else {
        // Adicionar novo componente
        const newComponent = { ...currentComponent, id: Date.now() };
        updatedComponents = [...components, newComponent];
      }

      // Atualizar estado local com a lista de componentes atualizada
      setComponents(updatedComponents);

      // Atualizar item depois de modificar o estado
      onItemChange(sectionId, item.id, "components", updatedComponents);
    }

    setOpen(false);
    setCurrentComponent(null); // Resetar currentComponent
  };

  const handleDeleteComponent = (id) => {
    const updatedComponents = components.filter((comp) => comp.id !== id);
    setComponents(updatedComponents);
    onItemChange(sectionId, item.id, "components", updatedComponents); // Atualizar a lista ao excluir
  };

  const handleEditComponent = (component) => {
    setCurrentComponent(component);
    setOpen(true);
  };

  const handleMoedaChange = (e) => {
    const rawValue = e.target.value;
    const parsedValue = moedaUtils.parseCurrency(rawValue);
    if (currentComponent) {
      setCurrentComponent({
        ...currentComponent,
        valorAdicional: parsedValue,
      });
      e.target.value = moedaUtils.formatCurrency(parsedValue);
    }
  };

  return (
    <div>
      <div className="flex items-center pt-2 gap-2">
        <div className="flex items-center space-x-2">
          <Button onClick={() => { setOpen(true); setCurrentComponent({ nomeComponente: "", valorAdicional: "" }); }}>
            <Plus />
          </Button>
        </div>
        <Label>Adicionar componentes opcionais</Label>
      </div>

      <div className="mt-4">
        {components.map((comp) => (
          <div key={comp.id} className={`flex items-center justify-between py-1`}>
            <div className="flex-grow mr-4">
              <span className="block overflow-hidden whitespace-nowrap text-ellipsis max-md:max-w-[100px] max-w-[200px]">
                {comp.nomeComponente} | {moedaUtils.formatCurrency(comp.valorAdicional) || "R$ 0,00"}
              </span>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleEditComponent(comp)}>Editar</Button>
              <Button variant="outline" onClick={() => handleDeleteComponent(comp.id)}>Excluir</Button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentComponent?.id ? "Editar Componente" : "Adicionar Componente"}</DialogTitle>
              <DialogDescription>
                {currentComponent?.id ? "Edite os detalhes do componente." : "Adicione aqui os componentes adicionais."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Nome</Label>
                <Input
                  id="name"
                  value={currentComponent ? currentComponent.nomeComponente : ""}
                  onChange={(e) =>
                    setCurrentComponent({ ...currentComponent, nomeComponente: e.target.value })
                  }
                  placeholder="Ex. Gelo e limão"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="valorComponente" className="text-right">Valor Adicional</Label>
                <Input
                  id="valorComponente"
                  value={currentComponent ? moedaUtils.formatCurrency(currentComponent.valorAdicional) : ""}
                  onChange={handleMoedaChange}
                  placeholder="Ex. R$ 0,00"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter className="md:gap-0 gap-3">
              <Button onClick={handleSaveComponent}>{currentComponent?.id ? "Atualizar" : "Salvar"}</Button>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
