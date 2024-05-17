"use client";
import { cn } from "@/lib/utils";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import { CrossIcon, X } from "lucide-react";

const draggableElements = [
  {
    content: "html",
    canContain: ["head", "body"],
    limits: { head: 1, body: 1 },
  },
  {
    content: "head",
    canContain: ["title", "style", "meta", "link", "script"],
    limits: { title: 1 },
  },
  {
    content: "title",
    canContain: [],
  },
  {
    content: "body",
    canContain: [
      "p",
      "div",
      "header",
      "footer",
      "section",
      "main",
      "ul",
      "ol",
      "nav",
      "aside",
      "article",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "img",
      "a",
      "span",
      "button",
      "input",
      "form",
      "label",
      "select",
      "option",
      "textarea",
      "table",
      "caption",
      "style",
      "script",
      "link",
      "hr",
      "iframe",
      "video",
      "audio",
      "source",
      "canvas",
      "svg",
    ],
  },
  {
    content: "header",
    canContain: [
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "img",
      "a",
      "span",
      "button",
      "input",
      "form",
      "label",
      "select",
      "textarea",
      "hr",
      "svg",
      "nav",
    ],
  },
  {
    content: "footer",
    canContain: [
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "img",
      "a",
      "span",
      "button",
      "input",
      "form",
      "label",
      "select",
      "textarea",
      "hr",
      "svg",
    ],
  },
  {
    content: "section",
    canContain: [
      "p",
      "div",
      "header",
      "footer",
      "section",
      "main",
      "ul",
      "ol",
      "nav",
      "aside",
      "article",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "img",
      "a",
      "span",
      "button",
      "input",
      "form",
      "label",
      "select",
      "option",
      "textarea",
      "table",
      "caption",
      "style",
      "script",
      "link",
      "hr",
      "iframe",
      "video",
      "audio",
      "source",
      "canvas",
      "svg",
    ],
  },
  {
    content: "main",
    canContain: [
      "p",
      "div",
      "header",
      "footer",
      "section",
      "main",
      "ul",
      "ol",
      "nav",
      "aside",
      "article",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "img",
      "a",
      "span",
      "button",
      "input",
      "form",
      "label",
      "select",
      "option",
      "textarea",
      "table",
      "caption",
      "style",
      "script",
      "link",
      "hr",
      "iframe",
      "video",
      "audio",
      "source",
      "canvas",
      "svg",
    ],
  },
  {
    content: "ul",
    canContain: ["li"],
  },
  {
    content: "ol",
    canContain: ["li"],
  },
  {
    content: "nav",
    canContain: [
      "a",
      "ul",
      "ol",
      "li",
      "div",
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "img",
      "span",
      "button",
      "svg",
    ],
  },
  {
    content: "aside",
    canContain: [
      "p",
      "div",
      "header",
      "footer",
      "section",
      "main",
      "ul",
      "ol",
      "nav",
      "aside",
      "article",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "img",
      "a",
      "span",
      "button",
      "input",
      "form",
      "label",
      "select",
      "option",
      "textarea",
      "table",
      "caption",
      "style",
      "script",
      "link",
      "hr",
      "iframe",
      "video",
      "audio",
      "source",
      "canvas",
      "svg",
    ],
  },
  {
    content: "article",
    canContain: [
      "p",
      "div",
      "header",
      "footer",
      "section",
      "main",
      "ul",
      "ol",
      "nav",
      "aside",
      "article",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "img",
      "a",
      "span",
      "button",
      "input",
      "form",
      "label",
      "select",
      "option",
      "textarea",
      "table",
      "caption",
      "style",
      "script",
      "link",
      "hr",
      "iframe",
      "video",
      "audio",
      "source",
      "canvas",
      "svg",
    ],
  },
  {
    content: "h1",
    canContain: [],
  },
  {
    content: "h2",
    canContain: [],
  },
  {
    content: "h3",
    canContain: [],
  },
  {
    content: "h4",
    canContain: [],
  },
  {
    content: "h5",
    canContain: [],
  },
  {
    content: "h6",
    canContain: [],
  },
  {
    content: "img",
    canContain: [],
  },
  {
    content: "a",
    canContain: [],
  },
  {
    content: "span",
    canContain: [],
  },
  {
    content: "button",
    canContain: [],
  },
  {
    content: "input",
    canContain: [],
  },
  {
    content: "form",
    canContain: ["input", "button", "select", "textarea"],
  },
  {
    content: "label",
    canContain: [],
  },
  {
    content: "select",
    canContain: ["option"],
  },
  {
    content: "option",
    canContain: [],
  },
  {
    content: "textarea",
    canContain: [],
  },
  {
    content: "table",
    canContain: ["tr"],
  },
  {
    content: "caption",
    canContain: [],
  },
  {
    content: "style",
    canContain: [],
  },
  {
    content: "script",
    canContain: [],
  },
  {
    content: "link",
    canContain: [],
  },
  {
    content: "hr",
    canContain: [],
  },
  {
    content: "iframe",
    canContain: [],
  },
  {
    content: "video",
    canContain: ["source"],
  },
  {
    content: "audio",
    canContain: ["source"],
  },
  {
    content: "source",
    canContain: [],
  },
  {
    content: "canvas",
    canContain: [],
  },
  {
    content: "svg",
    canContain: ["path"],
  },
  {
    content: "path",
    canContain: [],
  },
  {
    content: "p",
    canContain: [],
  },
  {
    content: "div",
    canContain: [
      "p",
      "div",
      "header",
      "footer",
      "section",
      "main",
      "ul",
      "ol",
      "nav",
      "aside",
      "article",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "img",
      "a",
      "span",
      "button",
      "input",
      "form",
      "label",
      "select",
      "option",
      "textarea",
      "table",
      "caption",
      "style",
      "script",
      "link",
      "hr",
      "iframe",
      "video",
      "audio",
      "source",
      "canvas",
      "svg",
    ],
  },
  {
    content: "li",
    canContain: [],
  },
];

const getRandomHSLColor = (hover = false) => {
  const prettyColors = [
    `hsla(300, 80%, 60%, ${hover ? 1 : 0.8})`, // Light pink
    `hsla(120, 60%, 70%, ${hover ? 1 : 0.8})`, // Light teal
    `hsla(210, 80%, 50%, ${hover ? 1 : 0.8})`, // Light lavender
    `hsla(40, 90%, 50%, ${hover ? 1 : 0.8})`, // Light sea green
    `hsla(270, 70%, 50%, ${hover ? 1 : 0.8})`, // Light coral
    `hsla(0, 100%, 70%, ${hover ? 1 : 0.8})`, // Red
    `hsla(60, 100%, 70%, ${hover ? 1 : 0.8})`, // Orange
    `hsla(180, 100%, 60%, ${hover ? 1 : 0.8})`, // Turquoise
    `hsla(240, 100%, 50%, ${hover ? 1 : 0.8})`, // Blue violet
    `hsla(300, 100%, 40%, ${hover ? 1 : 0.8})`, // Fuchsia
    `hsla(210, 60%, 30%, ${hover ? 1 : 0.8})`, // Dusty purple
    `hsla(0, 30%, 80%, ${hover ? 1 : 0.8})`, // Dark red
    `hsla(60, 30%, 70%, ${hover ? 1 : 0.8})`, // Dark orange
    `hsla(120, 30%, 60%, ${hover ? 1 : 0.8})`, // Dark teal
    `hsla(180, 30%, 50%, ${hover ? 1 : 0.8})`, // Dark turquoise
    `hsla(240, 40%, 40%, ${hover ? 1 : 0.8})`, // Dark blue violet
    `hsla(300, 20%, 30%, ${hover ? 1 : 0.8})`, // Dark purple
    `hsla(120, 100%, 20%, ${hover ? 1 : 0.8})`, // Mustard yellow
    `hsla(0, 0%, 20%, ${hover ? 1 : 0.8})`, // Black
    `hsla(0, 0%, 90%, ${hover ? 1 : 0.8})`, // White
  ];

  const randomIndex = Math.floor(Math.random() * prettyColors.length);
  return prettyColors[randomIndex];
};

function Draggable({
  content = "draggable",
  canContain,
  limits = {},
}: {
  content: string;
  canContain: string[];
  limits?: { [key: string]: number };
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${content}`,
    data: { current: content, canContain, limits },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className='bg-green-600 p-2 rounded-full z-20'
    >
      {content}
    </button>
  );
}

function Droppable({
  id,
  items,
  display,
  background,
  hover,
}: {
  id: string;
  items: any;
  display: string;
  background: string;
  hover: boolean;
}) {
  const { setNodeRef } = useDroppable({
    id: `droppable-${id}`,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "p-4 flex flex-col gap-2 rounded-md",
        id == "dom" ? "w-full" : "w-full"
      )}
      id={`droppable-${id}`}
      style={{
        background: background,
        border: hover ? "2px solid black" : "none",
      }}
    >
      <div className='flex items-center justify-between'>
        <p>{display !== "DOM" ? `<${display}>` : display + " (index.html)"}</p>
        <button>
          <X />
        </button>
      </div>
      <div className='px-2 flex flex-col gap-2'>
        {items.length > 0 &&
          items.map((item: any, i: number) => {
            return (
              <Droppable
                id={item.id}
                items={item.children}
                key={i}
                display={item.display}
                background={item.background}
                hover={item.hover}
              />
            );
          })}
      </div>
      {display !== "DOM" && <p>{`<\\${display}>`}</p>}
    </div>
  );
}

function NewDragElement() {
  const [count, setCount] = useState(0);
  const [activeHover, setActiveHover] = useState(null as any);
  const [newItems, setNewItems] = useState([
    {
      display: "DOM",
      id: "dom",
      children: [],
      canContain: ["html"],
      background: getRandomHSLColor(),
      limits: { html: 1 },
    },
  ] as any);

  useEffect(() => {
    const search = (item: any) => {
      if (item.id === activeHover?.id) {
        item.hover = true;
      } else {
        item.hover = false;
      }

      if (item.children) {
        item.children.forEach((child: any) => {
          search(child);
        });
      }

      return item;
    };

    const test = newItems.map(search);

    setNewItems(test);
  }, [activeHover]);

  const handleDragEng = (e: any) => {
    let parent: any;

    const search = (item: any) => {
      item.hover = false;
      if (item.id === e.over?.id.split("-").slice(1).join("-")) {
        parent = item;
      } else {
        if (item.children) {
          item.children.forEach((child: any) => {
            search(child);
          });
        }
      }
    };

    const itemsCopy = [...newItems];
    const newCount = count + 1;
    itemsCopy.forEach(search);

    if (!parent || !parent.canContain.includes(e.active.data.current.current)) {
      return toast({
        title: "Etiqueta incorrecta",
        description: `No se puede soltar una etiqueta <\\${e.active.data.current.current}> acá!`,
        variant: "destructive",
      });
    }

    const elementLimit = parent.limits[e.active.data.current.current];
    const currentElementCount = parent.children.filter(
      (child: any) => child.display === e.active.data.current.current
    ).length;

    if (elementLimit && currentElementCount >= elementLimit) {
      return toast({
        title: "Limite alcanzado",
        description: `No se pueden agregar más elementos <${e.active.data.current.current}> a <${parent.display}>`,
        variant: "destructive",
      });
    }
    const newItem = {
      display: e.active.data.current.current,
      id: `${e.active.data.current.current}-${newCount}`,
      children: [],
      canContain: [...e.active.data.current.canContain],
      background: getRandomHSLColor(),
      limits: { ...e.active.data.current.limits },
    };

    if (parent) {
      parent.children.push(newItem);
    }

    setNewItems(itemsCopy);
    setCount(newCount);
  };

  const handleDragOver = (e: any) => {
    let parent: any;

    const search = (item: any) => {
      if (item.id === e.over?.id.split("-").slice(1).join("-")) {
        parent = item;
      } else {
        if (item.children) {
          item.children.forEach((child: any) => {
            search(child);
          });
        }
      }
    };

    const itemsCopy = [...newItems];
    itemsCopy.forEach(search);
    if (parent) {
      setActiveHover(parent);
    } else {
      setActiveHover(null);
    }
    setNewItems(itemsCopy);
  };

  return (
    <DndContext onDragEnd={handleDragEng} onDragOver={handleDragOver}>
      <div className='flex justify-between gap-10'>
        <div className='bg-blue-800 p-2 w-full gap-4 rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
          {draggableElements.map((element, i) => (
            <Draggable
              content={element.content}
              canContain={element.canContain}
              limits={element.limits && {}}
              key={i}
            />
          ))}
        </div>
        {newItems.map((item: any, i: number) => (
          <Droppable
            id={item.id}
            display={item.display}
            items={item.children}
            key={i}
            background={item.background}
            hover={item.hover}
          />
        ))}
      </div>
    </DndContext>
  );
}
export default NewDragElement;
