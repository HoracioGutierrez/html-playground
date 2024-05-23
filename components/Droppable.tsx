import { DroppableProps } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { Edit, X } from "lucide-react";


function Droppable({ handleRemoveElement, setAttributes, setPathToElement, setOpen,
  element: { id, display, children: items, background, backgroundHover, pathToElement, tag, attributes, currentAttributes }
}: DroppableProps) {

  const droppableId = "droppable-" + id;
  const { setNodeRef, isOver } = useDroppable({ id: droppableId, data: { id, pathToElement, tag } });

  const handleRemove = () => {
    handleRemoveElement(pathToElement);
  };

  const handleClick = () => {
    const stateAttributes = currentAttributes || attributes.reduce((acc: any, attribute: any) => {
      acc[attribute] = "";
      return acc;
    }, {});
    setAttributes(stateAttributes);
    setPathToElement(pathToElement);
    setOpen(true);
  };

  const getCurrentAttributes = () => {
    let attributes = "";
    for (const key in currentAttributes) {
      if(currentAttributes[key] !== ""){
        attributes += `${key}="${currentAttributes[key]}" `;
      }
    }
    return attributes;
  };

  return (
    <div ref={setNodeRef} id={droppableId} className='p-4 flex flex-col gap-2 rounded-md drop-shadow-xl shadow-md' style={{
      background: isOver ? backgroundHover : background,
      border: isOver ? `2px dashed rgba(255,255,255,0.6)` : "none",
    }}>
      <div className='flex items-center justify-between'>
        <p className='font-bold text-white'>
          {display === "DOM" && "index.html"}
          {display !== "DOM" && `<${display}`}
          {currentAttributes && <>&nbsp; &nbsp;</>}
          <span className='font-light text-[rgba(255,255,255,0.5)]'>
            {getCurrentAttributes()}
          </span>
          {display !== "DOM" && `>`}
        </p>
        {display !== "DOM" && (
          <div className='flex items-center gap-2 text-white'>
            <button popovertarget='form' popoveraction='show' onClick={handleClick}>
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
                key={i}
                handleRemoveElement={handleRemoveElement}
                setAttributes={setAttributes}
                setPathToElement={setPathToElement}
                element={item}
                setOpen={setOpen}
              />
            );
          })}
      </div>
      {display !== "DOM" && (
        <p className='font-bold text-white'>{`<\\${display}>`}</p>
      )}
    </div>
  );
}
export default Droppable;
