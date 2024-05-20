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
  handleRemoveElement,
}: DroppableProps) {
  const droppableId = "droppable-" + id;
  const { setNodeRef, isOver } = useDroppable({
    id: droppableId,
    data: { id, pathToElement, tag },
  });

  const handleRemove = () => {
    handleRemoveElement(pathToElement);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        id={droppableId}
        className='p-4 flex flex-col gap-2 rounded-md drop-shadow-xl shadow-md'
        style={{
          background: isOver ? backgroundHover : background,
          border: isOver ? `2px dashed rgba(255,255,255,0.6)` : "none",
        }}
      >
        <div className='flex items-center justify-between'>
          <p className='font-bold text-white'>
            {display !== "DOM" ? `<${display}>` : display + " (index.html)"}
          </p>
          {display !== "DOM" && (
            <div className='flex items-center gap-2 text-white'>
              <button popovertarget='form' popoveraction='show'>
                <Edit width={20} height={20} />
              </button>
              <button onClick={handleRemove}>
                <X width={20} height={20} />
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
        {display !== "DOM" && (
          <p className='font-bold text-white'>{`<\\${display}>`}</p>
        )}
      </div>
    </>
  );
}
export default Droppable;
