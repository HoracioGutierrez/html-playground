"use client"
import { baseElements, blockElements, multimediaBaseElements, structureElements, textBaseElements, validate } from "@/lib/constants";
import { Container, ContainerOptions, Draggable, DragStartParams, DropResult } from "react-smooth-dnd";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { Edit2, Loader, TriangleIcon, X } from "lucide-react";
import { useEffect, useState } from 'react';
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const colours = [
  "hsl(var(--accent))",
  "hsl(var(--secondary))",
  "hsl(var(--primary))",
  "hsl(var(--destructive))",
]

type DropContainerProps = {
  onDrop?: (item: DropResult, name: string | undefined, isSource: boolean | undefined, indexes: any) => void;
  children?: React.ReactNode;
  droppable?: boolean | ((sourceContainerOptions: ContainerOptions, payload: any) => boolean);
  name?: string;
  orientation?: "vertical" | "horizontal";
  elements: any[];
  attributes?: any[];
  nameWithAttributes?: string;
};

type DraggableProps = {
  className?: string;
  children?: React.ReactNode | React.ReactNode[] | string;
};

type NestedDroppableDraggableProps = {
  element: any;
  onDrop?: (item: DropResult, element: any, isSource: boolean | undefined, indexes: any) => void;
  onDelete: (element: any) => void;
  onEdit: (element: any) => void;
};

type DraggableActionsProps = {
  element: any;
  onEdit: (element: any) => void;
  onDelete: (element: any) => void;
};

let colorIndex = 0;
let lastColor = "";

//Component
function DropContainer({ children, droppable, onDrop, name, orientation = 'vertical', elements, nameWithAttributes }: DropContainerProps) {

  const [color, setColor] = useState("rgb(255, 0, 0)");



  const [isReady, setIsReady] = useState(false);
  const [isSource, setIsSource] = useState(false);
  const [indexes, setIndexes] = useState<any>({});
  const [isTag, setIsTag] = useState(false);

  useEffect(() => {
    if (isTag) {
      const calculateColor = () => {
        if (colorIndex >= colours.length) {
          colorIndex = 0;
        } else {
          colorIndex += 1;
        }

        if (lastColor === colours[colorIndex]) {
          calculateColor()
        }
      }

      calculateColor()

      lastColor = colours[colorIndex]
      setColor(lastColor)
    }
  }, [isTag])

  const handleDrop = (item: DropResult) => {
    if (isReady) {
      if (typeof onDrop === 'function') {
        onDrop(item, name, isSource, indexes)
        setIsReady(false)
      }
    }
  }

  const handleShouldAcceptDrop = () => {
    if (droppable) {
      if (typeof droppable === 'boolean') return droppable;
      return true
    }
    return false;
  }

  const handleGetChildPayload = (index: number) => {
    return { ...elements[index] };
  }

  const handleReady = (props) => {
    setIndexes(props)
    setIsReady(true)
  }

  const handleLeave = () => {
    setIsReady(false)
  }

  const handleDragStart = (params: DragStartParams) => {
    setIsSource(params.isSource)
  }

  if (!children) return null;

  return (
    <Container
      onDrop={handleDrop}
      onDropReady={handleReady}
      onDragLeave={handleLeave}
      onDragStart={handleDragStart}
      dropPlaceholder={{ animationDuration: 500, showOnTop: true, className: "drop-class" }}
      shouldAcceptDrop={handleShouldAcceptDrop}
      orientation={orientation}
      groupName={name}
      getChildPayload={handleGetChildPayload}
      render={(rootRef) => {
        if (rootRef && rootRef.current) {
          if (!rootRef.current.classList.contains("tag-container") && !name?.includes("blocks")) {
            if (name === "dom") {
              rootRef.current.classList.add("dom-container")
            } else {
              rootRef.current.classList.add("tag-container")
            }
          }
        }

        if (!name?.includes("blocks")) {
          setIsTag(true)
        }


        const styles = {
          backgroundColor: !name?.includes("blocks") ? color : "transparent",
        }

        if (!name?.includes("blocks")) {
          styles["--tagName"] = name
        }

        return (
          <div
            ref={rootRef}
            style={styles}
            data-tagname={nameWithAttributes}
            data-endtagname={name}
          >
            {children}
          </div>
        )
      }}
    />
  )
}

//Component
function DraggableItem({ children }: DraggableProps) {
  return (
    <Draggable render={() => <div>{children ? children : "draggable item"}</div>} />
  )
}

//Component
function DraggableActions({ element, onEdit, onDelete }: DraggableActionsProps) {
  const handleEdit = () => {
    onEdit(element)
  }

  const handleDelete = () => {
    onDelete(element)
  }

  return (
    <div className="top-1 right-1 z-10 absolute flex gap-2 text-gray-400">
      <Button variant="ghost" size="icon" className="hover:bg-transparent w-4 h-4" onClick={handleEdit}>
        <Edit2 />
      </Button>
      <Button variant="ghost" size="icon" className="hover:bg-transparent w-5 h-5" onClick={handleDelete}>
        <X />
      </Button>
    </div>
  );
}

//Component
function NestedDroppableDraggable({ element, onDrop, onDelete, onEdit }: NestedDroppableDraggableProps) {

  let nameWithAttributes = element.tagName;

  if (element.currentAttributes && element.currentAttributes.length > 0) {
    element.currentAttributes.forEach((attribute: any) => {
      if (attribute.value) {
        nameWithAttributes += ` ${attribute.name}="${attribute.value}"`
      }
    })
  }

  const handleElementDrop = (item: DropResult, name: string | undefined, isSource: boolean | undefined, indexes: any) => {
    if (onDrop) {
      onDrop(item, element, isSource, indexes)
    }
  }

  if (element.hasChildren) {
    return (
      <DraggableItem key={element.id}>
        <DraggableActions element={element} onEdit={onEdit} onDelete={onDelete} />
        <DropContainer name={element.tagName} droppable onDrop={handleElementDrop} elements={element.children} nameWithAttributes={nameWithAttributes}>
          {element.children && element.children.map((child: any) => {
            return (
              <NestedDroppableDraggable key={child.id} element={child} onDrop={onDrop} onEdit={onEdit} onDelete={onDelete} />
            )
          })}
        </DropContainer>
      </DraggableItem>
    )
  }

  return (
    <DraggableItem key={element.id}>
      <DraggableActions element={element} onEdit={onEdit} onDelete={onDelete} />
      {`<${nameWithAttributes}/>`}
    </DraggableItem>
  )
}

//Component
function DndPlayground() {

  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState<any>([]);
  const [attributes, setAttributes] = useState<any>([]);
  const [element, setElement] = useState<any>(null);
  const [generating, setGenerating] = useState(false);
  const [BEMerrors, setBEMerrors] = useState<any>({ message: "", hasErrors: false, errors: [] });
  const [setBemError, setSetBemError] = useState(false);


  const handleDomDrop = (item: DropResult) => {
    if (selected.length === 0) {
      if (item.payload.tagName === "doctype") {
        return setSelected([item.payload]);
      }
      return toast({
        title: "Error",
        description: "You can only drop a doctype declaration on the top of the page",
        variant: "destructive",
      })
    }

    if (selected.length === 1) {
      if (item.payload.tagName === "html") {
        const newElement = {
          ...item.payload,
          children: [],
        }
        return setSelected([...selected, newElement]);
      }
      return toast({
        title: "Error",
        description: "You can only drop an html element next to the doctype declaration. The DOM can only contain up to two entries : doctype and html.",
        variant: "destructive",
      })
    }

    if (selected.length === 2) {
      return toast({
        title: "Error",
        description: "The DOM can only contain up to two entries : doctype and html. Your current DOM is full!",
        variant: "destructive",
      })
    }

  }

  const pushElementToPath = (id: any, newElement: any) => {
    const search = (elements: any[]) => {
      return elements.map((element: any, index: number) => {
        if (element.id === id) {
          return {
            ...element,
            children: [...element.children, newElement]
          }
        } else {
          if (element.hasChildren) {
            return {
              ...element,
              children: search(element.children)
            }
          } else {
            return element
          }
        }
      })
    }

    const newElements = search(selected)
    setSelected(newElements)
  }

  const reorderChildren = (indexes: any, container: any) => {

    const search = (elements: any[]) => {
      return elements.map((element: any) => {
        if (element.id === container.id) {

          [
            element.children[indexes.addedIndex],
            element.children[indexes.removedIndex],
          ] = [
              element.children[indexes.removedIndex],
              element.children[indexes.addedIndex],
            ]

          return {
            ...element,
            children: [
              ...element.children
            ],
          }
        } else {
          if (element.hasChildren) {
            return {
              ...element,
              children: search(element.children)
            }
          } else {
            return element
          }
        }
      })
    }

    return search(selected)

  }

  const handleElementDrop = (item: DropResult, container: any, isSource: boolean | undefined, indexes: any) => {

    if (isSource) {

      const newElements = reorderChildren(indexes, container)
      setSelected(newElements)

      return toast({
        title: "Warning",
        description: "Reordering elements is not allowed yet.",
        variant: "default",
      })
    }

    if (!container.hasChildren) {
      return toast({
        title: "Error",
        description: `You can only drop an element inside another element that can contain children. The element ${container.tagName} can't contain children.`,
        variant: "destructive",
      })
    }

    const newCount = count + 1;

    const newElement = {
      ...item.payload,
      children: item.payload.children ? item.payload.children : [],
      id: container.tagName + "-" + item.payload.tagName + "-" + newCount,
    }

    if (!container.possibleChildren) {
      return toast({
        title: "Error",
        description: `The element ${container.tagName} can't contain children elements.`,
        variant: "destructive",
      })
    }

    let hasLimit = true;
    let limit = 0;
    const isChildrenAllowed = container.possibleChildren.some((child: any) => {
      if (typeof child === 'string') {
        return child === item.payload.tagName;
      }
      if (typeof child === 'object') {
        if (child.tag === item.payload.tagName) {
          limit = child.limit;
          let count = 0;
          container.children.forEach((child: any) => {
            if (child.tagName === item.payload.tagName) {
              count += 1;
            }
          })
          if (count >= child.limit) {
            hasLimit = false;
          }
          return true
        }
      }
    })

    if (!isChildrenAllowed) {
      return toast({
        title: "Error",
        description: `The element ${item.payload.tagName} is not allowed as a child of ${container.tagName}.`,
        variant: "destructive",
      })
    }

    if (!hasLimit) {
      return toast({
        title: "Error",
        description: `The element ${item.payload.tagName} has reached its limit of ${limit} children in the ${container.tagName} element.`,
        variant: "destructive",
      })
    }

    pushElementToPath(container.id, newElement)
    setCount(newCount)
  }

  const handleElementDelete = (element: any) => {
    const search = (elements: any[]) => {
      return elements.filter((item: any) => {
        if (item.id === element.id) {
          return false
        }
        if (item.hasChildren) {
          const newChildren = search(item.children)
          item.children = newChildren
          return true
        }
        return true
      })
    }

    const newElements = search(selected)
    setSelected(newElements)
  }

  const handleElementEdit = (element: any) => {
    setAttributes(element.attributes || [])
    setElement(element)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setAttributes([])
    setElement(null)
  }

  const handleAttributesSubmit = (data: FormData) => {
    const newAttributes = attributes.map((attribute: any) => {
      return {
        name: attribute,
        value: data.get(attribute)
      }
    })

    const search = (elements: any[]) => {
      return elements.map((item: any) => {
        if (item.id === element.id) {
          return {
            ...item,
            currentAttributes: newAttributes,
          }
        } else {
          if (item.hasChildren) {
            return {
              ...item,
              children: search(item.children)
            }
          } else {
            return item
          }
        }
      })
    }

    const newElements = search(selected)
    setSelected(newElements)
    setOpen(false)
  }

  const handleGenerateHTML = () => {
    setGenerating(true)
    let string = ""
    let indentationLevel = 0
    const search = (elements: any[]) => {
      elements.forEach((element: any) => {
        string += `<${element.tagName}`
        if (element.currentAttributes && element.currentAttributes.length > 0) {
          element.currentAttributes.forEach((attribute: any) => {
            if (attribute.value) {
              string += ` ${attribute.name}="${attribute.value}"`
            }
          })
        }

        if (element.children && element.children.length > 0) {
          string += `>\n`
          indentationLevel += 1
          search(element.children)
          string += `</${element.tagName}>\n`
        } else {
          string += `/>\n`
          indentationLevel += 1
        }

      })
    }

    search(selected)
    setTimeout(() => {
      const errors = validate(string)
      setBEMerrors(errors)
      setGenerating(false)
      if (navigator.clipboard) {
        navigator.clipboard.writeText(string)
      }
      toast({
        title: "Success",
        description: "The HTML code has been copied to your clipboard.",
        variant: "default",
      })
    }, 1000)
  }

  const handleBEMValidation = () => {
    let string = ""
    let indentationLevel = 0
    const search = (elements: any[]) => {
      elements.forEach((element: any) => {
        string += `<${element.tagName}`
        if (element.currentAttributes && element.currentAttributes.length > 0) {
          element.currentAttributes.forEach((attribute: any) => {
            if (attribute.value) {
              string += ` ${attribute.name}="${attribute.value}"`
            }
          })
        }

        if (element.children && element.children.length > 0) {
          string += `>\n`
          indentationLevel += 1
          search(element.children)
          string += `</${element.tagName}>\n`
        } else {
          string += `/>\n`
          indentationLevel += 1
        }

      })
    }
    search(selected)
    const errors = validate(string)
    setBEMerrors(errors)
    setSetBemError(true)
  }

  const hideFeedback = () => {
    setSetBemError(false)
  }

  return (
    <>
      <div className="flex flex-col items-center gap-20 grow">
        <div className="relative sm:gap-6 border-2 border-accent sm:grid sm:grid-cols-[100px_1fr] lg:grid-cols-[150px_1fr] p-6 border-dashed rounded-lg w-full max-w-5xl grow">
          <div id="tags" className="top-6 left-6 absolute flex flex-col items-start gap-10 w-full max-w-[100px] lg:max-w-[150px] h-[calc(100%-48px)]">
            <div className="relative flex flex-col justify-center items-center gap-10 w-full min-h-0 grow">
              <TriangleIcon className="top-0 left-[calc(50%_-_10px)] absolute text-accent -translate-x-1/2" />
              <TriangleIcon className="bottom-0 left-[calc(50%_-_10px)] absolute text-accent -translate-x-1/2 rotate-180" />
              <p className="top-7 left-[calc(50%_-_10px)] z-10 absolute w-full text-[12px] text-accent text-center -translate-x-1/2 animate-pulse">
                Scroll down to see which elements are available
              </p>
              <div className="relative py-28 pt-44 pr-2 w-full min-h-0 overflow-y-scroll grow" id="test">
                <DropContainer name="structureblocks" droppable={false} elements={structureElements} onDrop={() => { }}>
                  {structureElements.map((element: any) => {
                    return (
                      <DraggableItem key={element.id}>
                        {element.tagName}
                      </DraggableItem>
                    )
                  })}
                </DropContainer>
                <DropContainer name="blocks" droppable={false} elements={blockElements} onDrop={() => { }}>
                  {blockElements.map((element: any) => {
                    return (
                      <DraggableItem key={element.id}>
                        {element.tagName}
                      </DraggableItem>
                    )
                  })}
                </DropContainer>
                <DropContainer name="textblocks" droppable={false} elements={textBaseElements} onDrop={() => { }}>
                  {textBaseElements.map((element: any) => {
                    return (
                      <DraggableItem key={element.id}>
                        {element.tagName}
                      </DraggableItem>
                    )
                  })}
                </DropContainer>
                <DropContainer name="multimediablocks" droppable={false} elements={multimediaBaseElements} onDrop={() => { }}>
                  {multimediaBaseElements.map((element: any) => {
                    return (
                      <DraggableItem key={element.id}>
                        {element.tagName}
                      </DraggableItem>
                    )
                  })}
                </DropContainer>
              </div>
            </div>
          </div>
          <div id="dom" className="flex flex-col items-center gap-4 col-start-2">
            <DropContainer name="dom" droppable onDrop={handleDomDrop} elements={selected} >
              {selected.map((element: any) => {
                return (
                  <NestedDroppableDraggable key={element.id} element={element} onDrop={handleElementDrop} onDelete={handleElementDelete} onEdit={handleElementEdit} />
                )
              })}
            </DropContainer>
            {BEMerrors.hasErrors && (
              <div className="w-full">
                <div className="bg-red-500 p-4 rounded-lg text-white">
                  <p className="mb-4 font-bold text-xl">BEM errors:</p>
                  <ul className="flex flex-col gap-4 font-light">
                    {BEMerrors.errors.map((error: any, index: number) => {
                      return (
                        <li key={index} className="flex items-center gap-2">
                          <span className="block bg-white rounded-full w-3 h-2"></span>
                          {error.message[0]}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            )}
            {setBemError && !BEMerrors.hasErrors && (
              <div className="w-full">
                <div className="bg-green-500 p-4 rounded-lg text-white">
                  <p className="mb-4 font-bold text-xl">{BEMerrors.message}</p>
                </div>
              </div>
            )}

          </div>
        </div>
        <div className="flex justify-center gap-2">
          <Button className="bg-accent text-muted-foreground" onClick={handleGenerateHTML}
            disabled={selected.length === 0}>
            {generating && <Loader className="mr-2 animate-spin" />}
            GENERATE HTML
          </Button>
          <Button className="bg-accent text-muted-foreground" onClick={handleBEMValidation}
            disabled={selected.length === 0}>
            {generating && <Loader className="mr-2 animate-spin" />}
            VALIDATE BEM
          </Button>
          {setBemError && (
            <Button className="text-muted-foreground" variant="destructive" onClick={hideFeedback}>HIDE FEEDBACK</Button>
          )}
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle className="text-muted-foreground">Attributes</DialogTitle>
          <form action={handleAttributesSubmit}>
            <div className="flex flex-col gap-4 text-primary">
              {attributes.length === 0 && (
                <p>This element doesn't have any attributes to add</p>
              )}
              {attributes.map((attribute: any, index: number) => {
                return (
                  <div key={index} className="flex items-center gap-2">
                    <label htmlFor={attribute} className="font-medium text-muted-foreground text-sm">
                      {attribute}
                    </label>
                    <span>=</span>
                    <span>&quot;</span>
                    <Input id={attribute} type="text" className="placeholder-shown:placeholder-primary" placeholder="Attribute value" name={attribute} />
                    <span>&quot;</span>
                  </div>
                )
              })}
              <div className="flex justify-end gap-2">
                <Button variant="destructive" onClick={handleClose} type="button" className="text-muted-foreground">
                  Cancel
                </Button>
                {attributes.length > 0 && (
                  <Button type="submit">
                    Save
                  </Button>
                )}
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DndPlayground