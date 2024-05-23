"use client";

import { bigBlockElements, formElements, getRandomHSLColor, mediaElements, starterDom, textElements } from "@/lib/utils";
import { DndContext } from "@dnd-kit/core";
import Draggable from "./Draggable";
import { useState } from "react";
import Droppable from "./Droppable";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";


const DndDashboard = () => {
  const [elements, setElements] = useState([starterDom] as any);
  const [count, setCount] = useState(0);
  const [over, setOver] = useState({} as any);
  const [canBeDropped, setCanBeDropped] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [attributes, setAttributes] = useState([] as any);
  const [pathToElement, setPathToElement] = useState([] as any);

  const handleDragEng = (event: any) => {
    if (!canBeDropped) {
      toast({
        title: "No se puede soltar aquí",
        description: errorMessage || "No se puede soltar aquí",
        variant: "destructive",
      });
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

  const handleDragOver = (over: any, elementName: string) => {
    setOver(over);
    setCanBeDropped(false);

    let possibleParent: any = [...elements];

    over.data.current.pathToElement.forEach((path: any) => {
      possibleParent = possibleParent[path];
    });

    if (!possibleParent) {
      setCanBeDropped(false);
      return false;
    }

    if (!possibleParent.canContain.includes(elementName)) {
      setCanBeDropped(false);
      return false;
    }

    const elementLimit = possibleParent.limits[elementName];
    const currentElementCount = possibleParent.children.filter(
      (child: any) => child.display === elementName
    ).length;

    if (elementLimit && currentElementCount >= elementLimit) {
      setCanBeDropped(false);
      return false;
    }
    setCanBeDropped(true);
    return true;
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

    current[0].currentAttributes = attributes;
    setElements(elementsCopy);
  };

  const draggableELements = [
    { title: "Bloques", elements: bigBlockElements },
    { title: "Textos", elements: textElements },
    { title: "Formularios", elements: formElements },
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
              />
            );
          })}
        </div>
        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-20 container text-accent'>
          {draggableELements.map((group, i) => {
            return (
              <div key={i}>
                <h2 className='font-bold mb-4'>{group.title}</h2>
                <div className='flex gap-4 flex-wrap'>
                  {group.elements.map((element, i) => {
                    return (
                      <Draggable
                        /* content={element.content} */
                        /* canContain={element.canContain}
                        limits={element.limits} */
                        key={i}
                        handleDragOver={handleDragOver}
                        /* parents={element.parents || []} */
                        setCanBeDropped={setCanBeDropped}
                        isLast={i === group.elements.length - 1}
                        setErrorMessage={setErrorMessage}
                        /* HTMLAttributes={
                          element.attributes ? element.attributes : []
                        } */
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
      <div popover='auto' id='form'>
        <h2 className='font-bold text-xl mb-6'>Atributos</h2>
        {attributes && attributes.length > 0 && (
          <form className='flex flex-col gap-3' onSubmit={handleAttributeSubmit}>
            {attributes.map((attribute: any, i: number) => {
              return (
                <div key={i}>
                  <label className='text-sm font-semibold' htmlFor={attribute}>
                    {attribute}
                  </label>
                  <input type='text' id={attribute} name={attribute} className='border rounded-sm w-full p-1 text-gray-500' />
                </div>
              );
            })}
            <Button className='bg-transparent border text-foreground hover:text-accent'>
              guardar
            </Button>
          </form>
        )}
      </div>
    </DndContext>
  );
};

export default DndDashboard;
