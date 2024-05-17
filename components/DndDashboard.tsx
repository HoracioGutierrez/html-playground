//@ts-ignore
"use client";

import {
  bigBlockElements,
  formElements,
  getRandomHSLColor,
  mediaElements,
  textElements,
} from "@/lib/utils";
import { DndContext } from "@dnd-kit/core";
import Draggable from "./Draggable";
import { useState } from "react";
import Droppable from "./Droppable";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
const starterColor = getRandomHSLColor();
const starterDom = {
  display: "DOM",
  id: "dom",
  children: [],
  canContain: ["html"],
  background: starterColor.background,
  backgroundHover: starterColor.hover,
  limits: { html: 1 },
  parents: [],
  pathToElement: ["0"],
  tag: "dom",
};

const DndDashboard = () => {
  const [elements, setElements] = useState([starterDom] as any);
  const [count, setCount] = useState(0);
  const [over, setOver] = useState({} as any);
  const [canBeDropped, setCanBeDropped] = useState(false);

  const handleDragEng = (event: any) => {
    if (!canBeDropped) {
      toast({
        title: "No se puede soltar aquí",
        description: "No se puede soltar este elemento aquí.",
        variant: "destructive",
      });
      return;
    }

    const newCount = count + 1;
    const newColor = getRandomHSLColor();
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
        over.data.current.children ? over.data.current.children.length : 0,
      ],
    };

    let elementsCopy = [...elements];
    let possibleParent: any;

    over.data.current.pathToElement.forEach((path: any) => {
      if (!possibleParent) {
        possibleParent = elementsCopy[path];
      } else {
        possibleParent = possibleParent[path];
      }
    });

    possibleParent.children.push(newItem);

    setElements(elementsCopy);
    setCount(newCount);
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

  return (
    <DndContext onDragEnd={handleDragEng}>
      <div className='grid grid-flow-row gap-10'>
        <div className="container justify-self-center">
          {elements.map((element: any, i: number) => {
            return (
              <Droppable
                id={element.id}
                display={element.display}
                items={element.children}
                key={i}
                background={element.background}
                backgroundHover={element.backgroundHover}
                hover={element.hover}
                pathToElement={element.pathToElement}
                tag={element.tag}
                handleRemoveElement={handleRemoveElement}
              />
            );
          })}
        </div>
        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-20 container text-accent'>
          <div>
            <h2 className='font-bold mb-4'>Bloques</h2>
            <div className='flex gap-3 flex-wrap'>
              {bigBlockElements.map((element, i) => {
                return (
                  <Draggable
                    content={element.content}
                    canContain={element.canContain}
                    limits={element.limits}
                    key={i}
                    handleDragOver={handleDragOver}
                    parents={element.parents || []}
                    setCanBeDropped={setCanBeDropped}
                    isLast={i === bigBlockElements.length - 1}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <h2 className='font-bold mb-4'>Textos</h2>
            <div className='flex gap-3 flex-wrap'>
              {textElements.map((element, i) => {
                return (
                  <Draggable
                    content={element.content}
                    canContain={element.canContain}
                    limits={element.limits}
                    key={i}
                    handleDragOver={handleDragOver}
                    parents={element.parents || []}
                    setCanBeDropped={setCanBeDropped}
                    isLast={i === textElements.length - 1}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <h2 className='font-bold mb-4'>Formularios</h2>
            <div className='flex gap-3 flex-wrap'>
              {formElements.map((element, i) => {
                return (
                  <Draggable
                    content={element.content}
                    canContain={element.canContain}
                    limits={element.limits}
                    key={i}
                    handleDragOver={handleDragOver}
                    parents={element.parents || []}
                    setCanBeDropped={setCanBeDropped}
                    isLast={i === formElements.length - 1}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <h2 className='font-bold mb-4'>Multimedia</h2>
            <div className='flex gap-3 flex-wrap'>
              {mediaElements.map((element, i) => {
                return (
                  <Draggable
                    content={element.content}
                    canContain={element.canContain}
                    limits={element.limits}
                    key={i}
                    handleDragOver={handleDragOver}
                    parents={element.parents || []}
                    setCanBeDropped={setCanBeDropped}
                    isLast={i === mediaElements.length - 1}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div popover='auto' id='form'>
        <h2 className='font-bold text-xl mb-6'>Atributos</h2>
        <form className='flex flex-col gap-3'>
          <div>
            <label className='text-sm font-semibold' htmlFor='id'>
              id
            </label>
            <input
              type='text'
              id='id'
              className='border rounded-sm w-full p-1 text-gray-500'
            />
          </div>
          <div>
            <label className='text-sm font-semibold' htmlFor='class'>
              class
            </label>
            <input
              type='text'
              id='class'
              className='border rounded-sm w-full p-1 text-gray-500'
            />
          </div>
          <div>
            <label className='text-sm font-semibold' htmlFor='href'>
              href
            </label>
            <input
              type='text'
              id='href'
              className='border rounded-sm w-full p-1 text-gray-500'
            />
          </div>
          <div>
            <label className='text-sm font-semibold' htmlFor='href'>
              href
            </label>
            <input
              type='text'
              id='href'
              className='border rounded-sm w-full p-1 text-gray-500'
            />
          </div>
          <div>
            <label className='text-sm font-semibold' htmlFor='src'>
              src
            </label>
            <input
              type='text'
              id='src'
              className='border rounded-sm w-full p-1 text-gray-500'
            />
          </div>
          <Button className='bg-transparent border text-foreground hover:text-accent'>
            guardar
          </Button>
        </form>
      </div>
    </DndContext>
  );
};

export default DndDashboard;
