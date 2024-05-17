import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Draggable, Droppable } from "@hello-pangea/dnd";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const htmlTags = [
  "html",
  "head",
  "title",
  "meta",
  "link",
  "style",
  "script",
];

export type Element = {
  tagName?: string;
  children?: string[];
  currentChildren?: Element[];
  attributes?: Array<string>;
  parents?: string[];
  refId?: string;
};

export type TagsWithNesting = {
  [key: string]: Element;
};

export const tagsWithNesting: TagsWithNesting = {
  html: {
    children: ["head", "body"],
    attributes: ["lang"],
    tagName: "html",
    parents: [],
    currentChildren: [],
  },
  head: {
    children: ["title", "meta", "link", "style", "script"],
    attributes: [],
    tagName: "head",
    parents: ["html"],
    currentChildren: [],
  },
  title: {
    children: [],
    attributes: [],
    tagName: "title",
    parents: ["head"],
    currentChildren: [],
  },
  meta: {
    children: [],
    attributes: ["name", "content"],
    tagName: "meta",
    parents: ["head"],
    currentChildren: [],
  },
  link: {
    children: [],
    attributes: ["rel", "href"],
    tagName: "link",
    parents: ["head"],
    currentChildren: [],
  },
  style: {
    children: [],
    attributes: ["type"],
    tagName: "style",
    parents: ["head"],
    currentChildren: [],
  },
  script: {
    children: [],
    attributes: ["src", "type"],
    tagName: "script",
    parents: ["head"],
    currentChildren: [],
  },
};

type createDroppableProps = {
  id: string;
  children: any[];
  disabled?: boolean;
  combined?: boolean;
};

type createDraggableProps = {
  id: string;
  children: string | Element | any;
  index: number;
};

export const createDraggable = ({
  id,
  children,
  index,
}: createDraggableProps) => {
  const draggableId = `draggable-${id}`;

  if (typeof children === "string") {
    return (
      <Draggable draggableId={draggableId} index={index} key={index}>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              id={draggableId}
              draggable
              className='p-6 bg-green-500'
            >
              {children}
            </div>
          );
        }}
      </Draggable>
    );
  }
  return createDroppable({
    id: children.refId,
    children:
      children.currentChildren.length > 0
        ? children.currentChildren
        : [children.tagName],
    disabled: false,
    combined: true,
  });
};

export const createDroppable = ({
  id,
  children,
  disabled = false,
  combined = false,
}: createDroppableProps) => {
  const droppableId = `droppable-${id}`;

  return (
    <Droppable
      droppableId={droppableId}
      isDropDisabled={disabled}
      isCombineEnabled={combined}
    >
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            id={droppableId}
            className='w-full p-4 flex flex-col gap-2'
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
            key={id}
          >
            {children.map((child, index) => {
              if (typeof child === "string") {
                return createDraggable({
                  id: `${id}-${child}-${index}`,
                  children: child,
                  index,
                });
              } else {
                return createDroppable({
                  id: child.tagName,
                  children: [child.tagName],
                  combined: true,
                });
              }
            })}
          </div>
        );
      }}
    </Droppable>
  );
};

//new variables
export const bigBlockElements = [
  {
    content: "html",
    canContain: ["head", "body"],
    limits: { head: 1, body: 1 },
    parents: ["dom"],
  },
  {
    content: "head",
    canContain: ["title", "style", "meta", "link", "script"],
    limits: { title: 1 },
    parents: ["html"],
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
    parents: ["html"],
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
    exclude: ["header", "footer", "ul", "ol", "li", "a"],
    parents: ["body", "section", "main", "article", "aside", "nav"],
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
    exclude: ["header", "footer", "ul", "ol", "li", "a"],
    parents: ["body", "section", "main", "article", "aside", "nav"],
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
    parents: ["body", "section", "main", "article", "aside", "nav"],
    exclude: ["header", "footer", "ul", "ol", "li", "a"],
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
    parents: ["body", "div"],
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
    parents: ["body", "section", "main", "article", "aside", "nav", "div", "header", "footer","form"],
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
    parents: ["body", "section", "main", "article", "aside", "div" , "header", "footer"],
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
    parents: ["body", "section", "main", "article", "aside", "nav", "div"],
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
    parents: ["body", "section", "main", "article", "aside", "nav", "div"],
  },
];

export const textElements = [
  {
    content: "title",
    canContain: [],
    parents: ["head"],
    limits: {},
  },
  {
    content: "ul",
    canContain: ["li"],
    exclude: ["ul", "ol"],
    parents: [
      "nav",
      "aside",
      "article",
      "section",
      "main",
      "div",
      "body",
      "header",
      "footer",
    ],
  },
  {
    content: "ol",
    canContain: ["li"],
    exclude: ["ul", "ol"],
    parents: [
      "nav",
      "aside",
      "article",
      "section",
      "main",
      "div",
      "body",
      "header",
      "footer",
    ],
  },
  {
    content: "li",
    canContain: [],
    parents: ["ul", "ol"],
  },
  {
    content: "h1",
    canContain: [],
    parents: [
      "header",
      "footer",
      "section",
      "main",
      "article",
      "aside",
      "nav",
      "div",
      "body",
    ],
  },
  {
    content: "h2",
    canContain: [],
    parents: [
      "header",
      "footer",
      "section",
      "main",
      "article",
      "aside",
      "nav",
      "div",
      "body",
    ],
  },
  {
    content: "h3",
    canContain: [],
    parents: [
      "header",
      "footer",
      "section",
      "main",
      "article",
      "aside",
      "nav",
      "div",
      "body",
    ],
  },
  {
    content: "h4",
    canContain: [],
    parents: [
      "header",
      "footer",
      "section",
      "main",
      "article",
      "aside",
      "nav",
      "div",
      "body",
    ],
  },
  {
    content: "h5",
    canContain: [],
    parents: [
      "header",
      "footer",
      "section",
      "main",
      "article",
      "aside",
      "nav",
      "div",
      "body",
    ],
  },
  {
    content: "h6",
    canContain: [],
    parents: [
      "header",
      "footer",
      "section",
      "main",
      "article",
      "aside",
      "nav",
      "div",
      "body",
    ],
  },
  {
    content: "p",
    canContain: [],
    parents: [
      "header",
      "footer",
      "section",
      "main",
      "article",
      "aside",
      "nav",
      "div",
      "body",
    ],
  },
  {
    content: "a",
    canContain: [],
    parents: [
      "header",
      "footer",
      "section",
      "main",
      "article",
      "aside",
      "nav",
      "div",
      "body",
    ],
  },
  {
    content: "span",
    canContain: [],
    parents: [
      "header",
      "footer",
      "section",
      "main",
      "article",
      "aside",
      "nav",
      "div",
      "body",
      "a",
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "button",
      "label"
    ],
  },
];

export const formElements = [
  {
    content: "button",
    canContain: [],
    limits: {},
    parents: ["form", "div", "body", "section", "main", "article", "aside"],
  },
  {
    content: "input",
    canContain: [],
    parents: ["form", "div"],
  },
  {
    content: "form",
    canContain: ["input", "button", "select", "textarea", "label", "div"],
    parents: ["body", "section", "main", "article", "aside", "nav", "div"],
  },
  {
    content: "label",
    canContain: [],
    parents: ["form", "div"],
  },
  {
    content: "select",
    canContain: ["option"],
    parents: ["form", "div"],
  },
  {
    content: "option",
    canContain: [],
    parents: ["select"],
  },
  {
    content: "textarea",
    canContain: [],
    parents: ["form", "div"],
  },
];

export const mediaElements = [
  {
    content: "img",
    canContain: [],
    limits: {},
    parents: ["body", "section", "main", "article", "aside", "nav", "div"],
  },
  {
    content: "caption",
    canContain: [],
  },
  {
    content: "iframe",
    canContain: [],
    parents: ["body", "section", "main", "article", "aside", "nav", "div"],
  },
  {
    content: "video",
    canContain: ["source"],
    parents: ["body", "section", "main", "article", "aside", "nav", "div"],
  },
  {
    content: "audio",
    canContain: ["source"],
    parents: ["body", "section", "main", "article", "aside", "nav", "div"],
  },
  {
    content: "source",
    canContain: [],
  },
  {
    content: "canvas",
    canContain: [],
    parents: ["body", "section", "main", "article", "aside", "nav", "div"],
  },
  {
    content: "svg",
    canContain: ["path"],
    parents: ["body", "section", "main", "article", "aside", "nav", "div"],
  },
  {
    content: "path",
    canContain: [],
    parents: ["svg"],
  },
  {
    content: "style",
    canContain: [],
    parents: ["head"],
  },
  {
    content: "script",
    canContain: [],
    parents: ["head", "body"],
  },
  {
    content: "link",
    canContain: [],
    parents: ["head"],
  },
];

export const getRandomHSLColor = (hover = false) => {
  const prettyColors = [
    `hsla(300, 80%, 60%, ${1})`, // Light pink
    `hsla(120, 60%, 70%, ${1})`, // Light teal
    `hsla(210, 80%, 50%, ${1})`, // Light lavender
    `hsla(40, 90%, 50%, ${1})`, // Light sea green
    `hsla(270, 70%, 50%, ${1})`, // Light coral
    `hsla(0, 100%, 70%, ${1})`, // Red
    `hsla(60, 100%, 70%, ${1})`, // Orange
    `hsla(180, 100%, 60%, ${1})`, // Turquoise
    `hsla(240, 100%, 50%, ${1})`, // Blue violet
    `hsla(300, 100%, 40%, ${1})`, // Fuchsia
    `hsla(210, 60%, 30%, ${1})`, // Dusty purple
    `hsla(0, 30%, 80%, ${1})`, // Dark red
    `hsla(60, 30%, 70%, ${1})`, // Dark orange
    `hsla(120, 30%, 60%, ${1})`, // Dark teal
    `hsla(180, 30%, 50%, ${1})`, // Dark turquoise
    `hsla(240, 40%, 40%, ${1})`, // Dark blue violet
    `hsla(300, 20%, 30%, ${1})`, // Dark purple
    `hsla(120, 100%, 20%, ${1})`, // Mustard yellow
    `hsla(0, 0%, 20%, ${1})`, // Black
    `hsla(0, 0%, 90%, ${1})`, // White
  ];

  const randomIndex = Math.floor(Math.random() * prettyColors.length);
  const color = prettyColors[randomIndex];
  const colorWithHover = color.split(",").slice(0, 3).join(",") + ", 0.5)";
  return {
    background: colorWithHover,
    hover: color,
  };
};
