"use client";
import { bigBlockElements, formElements, getRandomHSLColor, mediaElements, starterDom, textElements } from "@/lib/utils";
import { DndContext } from "@dnd-kit/core";
import Draggable from "./Draggable";
import { useState } from "react";
import Droppable from "./Droppable";
import { toast } from "./ui/use-toast";
import AttributePopup from "./AttributePopup";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";


const DndDashboard = () => {
  const [elements, setElements] = useState([starterDom] as any);
  const [count, setCount] = useState(0);
  const [over, setOver] = useState({} as any);
  const [canBeDropped, setCanBeDropped] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [attributes, setAttributes] = useState([] as any);
  const [pathToElement, setPathToElement] = useState([] as any);
  const [open, setOpen] = useState(false);
  const [htmlString, setHtmlString] = useState("")
  const [generating, setGenerating] = useState(false)

  const handleDragEng = (event: any) => {

    const parents = event.active.data.current.parents;
    const over = event.over;

    if (!parents?.includes(over?.data.current?.tag)) {
      if (over?.data.current?.tag === "dom") {
        toast({
          title: "No se puede soltar aquí",
          description: `El ${over?.data.current?.tag.toUpperCase()} no puede contener a la etiqueta <${event.active.data.current.current}/>. Intenta utilizar una etiqueta distinta para comenzar tu HTML!.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "No se puede soltar aquí",
          description: `La etiqueta <${over?.data.current?.tag}> no es una etiqueta padre válida y no puede contener <${event.active.data.current.current}>.`,
          variant: "destructive",
        });
      }
      return;
    }

    const newCount = count + 1;
    const newColor = getRandomHSLColor();

    let elementsCopy = [...elements];
    let possibleParent: any;

    over.data.current.pathToElement.forEach((path: any) => {
      if (!possibleParent) {
        possibleParent = elementsCopy[path];
      } else {
        possibleParent = possibleParent[path];
      }
    });

    if (!possibleParent) {
      return toast({
        title: "No se puede soltar aquí",
        description: "Hubo un problema inesperado y no se puede va a poder soltar aca :(. Intenta de nuevo!",
        variant: "destructive",
      });
    }

    if(possibleParent.canContain.length === 0){
      return toast({
        title: "No se puede soltar aquí",
        description: `La etiqueta <${possibleParent.display}/> no puede contener elementos hijos.`,
        variant: "destructive",
      });
    }

    if(!possibleParent.canContain.includes(event.active.data.current.current)){
      return toast({
        title: "No se puede soltar aquí",
        description: `La etiqueta <${possibleParent.display}/> no puede contener la etiqueta <${event.active.data.current.current}/> como hijo.`,
        variant: "destructive",
      });
    }

    const elementLimit = possibleParent.limits[event.active.data.current.current];

    if (elementLimit && possibleParent.children.filter(
      (child: any) => child.display === event.active.data.current.current
    ).length >= elementLimit) {
      return toast({
        title: "No se puede soltar aquí",
        description: `La etiqueta <${possibleParent.display}/> ya tiene el máximo de elementos hijos de tipo <${event.active.data.current.current}/> permitidos.`,
        variant: "destructive",
      });
    }

    const newItem = {
      display: event.active.data.current.current,
      id: `${event.active.data.current.current}-${newCount}`,
      tag: event.active.data.current.current,
      children: [],
      canContain: [...event.active.data.current.canContain],
      background: newColor.background,
      backgroundHover: newColor.hover,
      limits: { ...event.active.data.current.limits },
      parents: event.active.data.current.parents
        ? [...event.active.data.current.parents]
        : [],
      pathToElement: [
        ...over.data.current.pathToElement,
        "children",
        possibleParent.children ? possibleParent.children.length : 0,
      ],
      attributes: event.active.data.current.HTMLAttributes,
    };

    possibleParent.children.push(newItem);

    setElements(elementsCopy);
    setCount(newCount);
    setCanBeDropped(false);
    setErrorMessage("");
  };

  const handleRemoveElement = (path: any[]) => {
    let elementsCopy = [...elements];
    let current = elementsCopy;

    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        return elementsCopy;
      }
      current = current[path[i]];
    }

    const index = path[path.length - 1];

    if (index >= 0 && index < current.length) {
      current.splice(index, 1);
    }

    setElements(elementsCopy);
  };

  const handleAttributeSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const attributes = {};

    Array.from(data.keys()).forEach((key) => {
      if (data.get(key)) {
        attributes[key] = data.get(key);
      } else {
        attributes[key] = "";
      }
    });

    let elementsCopy = [...elements];
    let current = elementsCopy;

    for (let i = 0; i < pathToElement.length - 1; i++) {
      if (!current[pathToElement[i]]) {
        return elementsCopy;
      }
      current = current[pathToElement[i]];
    }


    //current[0].currentAttributes = attributes;
    current[pathToElement[pathToElement.length - 1]].currentAttributes = attributes;
    setElements(elementsCopy);
    e.target.reset();
  };

  const generateAttributes = (element: any) => {
    let attributes = "";

    for (const key in element.currentAttributes) {
      if (element.currentAttributes[key] !== "") {
        attributes += `${key}="${element.currentAttributes[key]}" `;
      }
    }

    return attributes;
  }

  const generateHTML = () => {
    setGenerating(true);
    let html = "<!DOCTYPE html>\n";

    const generateElement = (element: any) => {
      html += `<${element.display} ${generateAttributes(element)}>\n`;

      if (element.children.length > 0) {
        element.children.forEach(generateElement);
      }

      html += `</${element.display}>\n`;
    }

    setTimeout(() => {
      elements[0].children.forEach(generateElement);
      setHtmlString(html);
      navigator.clipboard.writeText(html);
      setGenerating(false);
      toast({
        title: "HTML generado",
        description: "El código HTML ha sido copiado al portapapeles.",
        variant: "default",
      });
    }, 1000)

  }

  const draggableELements = [
    { title: "Blocks", elements: bigBlockElements },
    { title: "Texts", elements: textElements },
    { title: "Form", elements: formElements },
    { title: "Multimedia", elements: mediaElements },
  ];

  return (
    <DndContext onDragEnd={handleDragEng}>
      <div className='grid grid-flow-row gap-10'>
        <div className='container justify-self-center'>
          {elements.map((element: any, i: number) => {
            return (
              <Droppable
                key={i}
                handleRemoveElement={handleRemoveElement}
                setAttributes={setAttributes}
                setPathToElement={setPathToElement}
                element={element}
                setOpen={setOpen}
              />
            );
          })}
        </div>
        {elements[0].children.length > 0 && (
          <div className="flex justify-center">
            <Button className="bg-amber-500 shadow-md drop-shadow-md uppercase animate-pulse text-xl" onClick={generateHTML}>{generating ? (<>generando &nbsp; <Loader className="animate-spin" /></>) : "generar html"}</Button>
          </div>
        )}
        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-20 container text-accent'>
          {draggableELements.map((group, i) => {
            return (
              <div key={i}>
                <h2 className='font-bold mb-4'>{group.title}</h2>
                <div className='flex gap-4 flex-wrap'>
                  {group.elements.map((element, i) => {
                    return (
                      <Draggable
                        key={i}
                        setCanBeDropped={setCanBeDropped}
                        isLast={i === group.elements.length - 1}
                        setErrorMessage={setErrorMessage}
                        element={element}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <AttributePopup attributes={attributes} handleAttributeSubmit={handleAttributeSubmit} open={open} setOpen={setOpen} />
    </DndContext>
  );
};

export default DndDashboard;
