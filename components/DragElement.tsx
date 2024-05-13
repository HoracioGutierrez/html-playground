"use client";

import {
  Element,
  TagsWithNesting,
  createDroppable,
  htmlTags,
  tagsWithNesting,
} from "@/lib/utils";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import { toast } from "./ui/use-toast";

function DragElement() {
  const [items, setItems] = useState(htmlTags);
  const [dom, setDom] = useState<any>([]);
  const [domStarted, setDomStarted] = useState(false);
  const [isDomDisabled, setIsDomDisabled] = useState(false);

  /*  const onDragEnd = (dragEndProps: any) => {
    const targetList =
      dragEndProps.destination?.droppableId ||
      dragEndProps.combine?.droppableId; //"droppable-dom"

    if (targetList === "droppable-elements") {
      return toast({
        title: "You can't drop here",
        description: "Please drop in the DOM area",
      });
    }

    const elementName = dragEndProps.draggableId.split(
      "-"
    )[1] as keyof TagsWithNesting; // "html"
    const element = tagsWithNesting[elementName]; // { children : ["head", "body"] , attributes : ["lang"] ,tagName : "html" , parents : []}

    console.log(element);

    const isCombination = dragEndProps.combine ? true : false;

    if (!domStarted) {
      if (elementName !== "html") {
        return toast({
          title: "You can't drop here",
          description:
            "Please drop the HTML tag first. Every valid HTML file starts with an HTML tag!",
        });
      }
      setDom([{ ...element, draggableId: dragEndProps.draggableId }]);
      setDomStarted(true);
      return toast({
        title: "HTML tag added!",
        description: "You can now add other tags",
      });
    } else {
      if (!isCombination) {
        return toast({
          title: "You can't drop here",
          description:
            "Please drop inside the right tag. There's an HTML tag already so every other tag should go inside this one and not the other way around!",
        });
      }
    }

    const hasParents = element.parents?.length;
    if (!hasParents) {
      return toast({
        title: "You can't drop here",
        description:
          "This tag can't be dropped here. Please drop it inside one of it's valid parent tags!",
      });
    }

    const parentMatch = element.parents?.some((parent) => {
      console.log(dragEndProps);
      return dragEndProps.combine.draggableId.includes(parent);
    });

    if (!parentMatch) {
      return toast({
        title: "You can't drop here",
        description:
          "This tag can't be dropped here. Please drop it inside one of it's valid parent tags!",
      });
    }

    const newDom = [...dom];
    let indexInState = 0;
    const parentInDom = newDom.find((item, i) => {
      if (item.currentChildren) {
        item.currentChildren.find((child: Element) => {
          console.log(child);
        });
      }
      const nameSplit = dragEndProps.combine.draggableId.split("-");
      const newName = "draggable-" + nameSplit[2] + "-" + nameSplit[3];
      indexInState = i;
      return newName === item.draggableId;
    });

    parentInDom.currentChildren = parentInDom.currentChildren || [];
    parentInDom.currentChildren = [...parentInDom.currentChildren, element];
    newDom[indexInState] = parentInDom;
    setDom(newDom);
  }; */

  const isCorrectDroppable = (dragEndProps: any /* , listName: string */) => {
    const targetList =
      dragEndProps.destination?.droppableId ||
      dragEndProps.combine?.droppableId;
    if (!targetList || targetList === "droppable-elements") {
      toast({
        title: "No se puede soltar aquí",
        description: "Por favor suelta en el área DOM",
        variant: "destructive",
      });

      return false;
    }

    return targetList;
  };

  const getElementName = (dragEndProps: any) => {
    const splitName = dragEndProps.draggableId.split("-");

    return splitName[splitName.length - 2] as keyof TagsWithNesting;
  };

  const startDom = (
    elementName: keyof TagsWithNesting,
    element: Element,
    elementId: string
  ) => {
    if (elementName !== "html") {
      return toast({
        title: "No se puede soltar aquí",
        description:
          "Por favor suelta la etiqueta HTML primero. ¡Cada archivo HTML válido comienza con una etiqueta HTML!",
        variant: "destructive",
      });
    }
    setDom([{ ...element, refId: elementId }]);
    setDomStarted(true);
    return toast({
      title: "¡Etiqueta HTML añadida!",
      description: "Ahora puedes agregar otras etiquetas",
    });
  };

  const htmlElementExists = (elementName: keyof TagsWithNesting) => {
    if (elementName === "html") {
      const htmlElement = dom.find((item: Element) => item.tagName === "html");
      if (htmlElement) {
        return toast({
          title: "No se puede soltar aquí",
          description:
            "Ya hay una etiqueta HTML. Por favor, arrastra otra etiqueta dentro de esta.",
          variant: "destructive",
        });
      }
      return false;
    }
    return false;
  };

  const elementParentMatch = (element: Element,targetList: string) => {
    const hasParents = element.parents?.length;
    if (!hasParents) {
      return toast({
        title: "No se puede soltar aquí",
        description:
          "Esta etiqueta no se puede soltar aquí. Por favor, suéltela dentro de una de sus etiquetas padres válidas.",
        variant: "destructive",
      });
    }

    const parentMatch = element.parents?.some((parent) => {
      console.log(parent)
      console.log(targetList)
      //return dom.some((item: Element) => item.refId === parent);
    });

    if (!parentMatch) {
      return toast({
        title: "No se puede soltar aquí",
        description:
          "Esta etiqueta no se puede soltar aquí. Por favor, suéltela dentro de una de sus etiquetas padres válidas.",
        variant: "destructive",
      });
    }

    return false;
  };

  const onDragEnd = (dragEndProps: any) => {
    console.log("drag eng");
    console.log(dragEndProps);

    const targetList = isCorrectDroppable(dragEndProps)
    //"droppable-dom"
    if (!targetList) return;
    // "html"
    const elementName = getElementName(dragEndProps);
    // { children : ["head", "body"] , attributes : ["lang"] ,tagName : "html" , parents : [] , currentChildren : []}
    const element = tagsWithNesting[elementName];
    // "draggable-elements-html-0"
    const elementId = dragEndProps.draggableId;

    if (!domStarted) {
      setIsDomDisabled(true);
      return startDom(elementName, element, elementId);
    }

    if (htmlElementExists(elementName)) return;

    if (elementParentMatch(element,targetList)) return;

    console.log("not html");
  };

  console.log(dom);

  return (
    <div className='flex justify-between gap-10'>
      <DragDropContext onDragEnd={onDragEnd}>
        {createDroppable({ id: "elements", children: items, disabled: true })}
        {createDroppable({ id: "dom", children: dom, combined: true , disabled : isDomDisabled})}
      </DragDropContext>
    </div>
  );
}
export default DragElement;
