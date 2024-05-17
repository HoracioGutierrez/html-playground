import { useDroppable } from "@dnd-kit/core";
import { Edit, X } from "lucide-react";
import { useRef, useState } from "react";

type DroppableProps = {
  id: string;
  items: string[];
  display: string;
  background: string;
  backgroundHover: string;
  hover: string;
  pathToElement: string[];
  tag: string;
  handleRemoveElement?: any;
};

function Droppable({
  id,
  items,
  display,
  background,
  backgroundHover,
  hover,
  pathToElement,
  tag,
  handleRemoveElement
}: DroppableProps) {

  const droppableId = "droppable-" + id;
  const [open, setOpen] = useState(false);
  const { setNodeRef } = useDroppable({
    id: droppableId,
    data: { id, pathToElement, tag },
  });

  const handleRemove = () => {
    //console.log("remove", pathToElement);
    handleRemoveElement(pathToElement);
  }

  return (
    <>
      <div
        ref={setNodeRef}
        id={droppableId}
        className='p-4 flex flex-col gap-2 rounded-md drop-shadow-xl shadow-md'
        style={{ background: hover ? backgroundHover : background }}
      >
        <div className='flex items-center justify-between'>
          <p className="font-bold">
            {display !== "DOM" ? `<${display}>` : display + " (index.html)"}
          </p>
          {display !== "DOM" && (
            <div className="flex items-center gap-2">
              <button popovertarget="form" popoveraction="show">
                <Edit />
              </button>
              <button onClick={handleRemove}>
                <X />
              </button>
            </div>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          {items.length > 0 &&
            items.map((item: any, i: number) => {
              return (
                <Droppable
                  id={item.id}
                  items={item.children}
                  key={i}
                  display={item.display}
                  background={item.background}
                  backgroundHover={item.backgroundHover}
                  hover={item.hover}
                  pathToElement={item.pathToElement}
                  tag={item.tag}
                  handleRemoveElement={handleRemoveElement}
                />
              );
            })}
        </div>
        {display !== "DOM" && <p className="font-bold">{`<\\${display}>`}</p>}
      </div>
    </>
  );
}
export default Droppable;
