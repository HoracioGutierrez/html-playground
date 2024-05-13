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
