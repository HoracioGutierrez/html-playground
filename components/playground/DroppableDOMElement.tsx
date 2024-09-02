"use client"
import { motion, AnimatePresence, Reorder } from "framer-motion"
import { useDraggableStore } from "@/stores/DraggableStore"
import { useEffect, useState } from "react"
import { cn, DroppableDOMElementProps } from "@/lib/utils"
import ActionButton from "./ActionButton"



const DroppableDOMElement = ({ children = "dropzone", id, tagName, items, onReorder, handleGenerateHTML, validateBEM, handleRemoveElement, handleOpenAttributesDialog, attributes }: DroppableDOMElementProps) => {

  const [innerItems, setInnerItems] = useState(items)
  const { setElementName, elementName } = useDraggableStore((state) => state)
  const isElementBeingDragged = elementName === id

  useEffect(() => {
    setInnerItems(items)
  }, [items])

  const handleMouseLeave = (e) => {
    e.stopPropagation()
    setElementName("")
  }

  const handleMouseOver = (e) => {
    e.stopPropagation()
    setElementName(id)
  }

  const handleReorder = (newOrder) => {
    setInnerItems(newOrder)
    onReorder && onReorder(newOrder, id)
  }

  const onDialogOpen = () => {
    handleOpenAttributesDialog && handleOpenAttributesDialog(id)
  }

  const getAttributesString = () => {

    let attributesSpans: React.ReactNode[] = []

    if (!attributes || !attributes.length) return attributesSpans

    attributes.forEach(attribute => {
      if (attribute.value) {
        attributesSpans.push(
          <span key={attribute.name} className="text-black/20 text-sm">
            {attribute.name}=&quot;{attribute.value}&quot;
          </span>
        )
      }
    })

    return attributesSpans

  }

  return (
    <motion.div
      className="bg-secondary px-3 py-2 border-black/20 border-dashed rounded-md text-accent dropzone outline-2 outline-accent outline-dashed"
      initial={{ opacity: 0, height: 0, width: 0 }}
      animate={{
        backgroundColor: isElementBeingDragged ? "hsl(210 34% 90%)" : "hsl(36 23% 80%)",
        color: isElementBeingDragged ? "hsl(0 0% 100%)" : "hsl(36 43% 46%)",
        borderColor: isElementBeingDragged ? "rgb(0 0 0 / 0.7)" : "rgb(0 0 0 / 0.2)",
        opacity: 1,
        height: "auto",
        width: "auto",
      }}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseOver}
      data-tag={tagName}
      data-id={id}
    >
      <div className={cn("flex justify-between items-center gap-2", { "pb-6": tagName === "doctype" })}>
        <motion.p
          className="flex items-center gap-2 text-sm leading-tight"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {`<${tagName === "doctype" ? "!DOCTYPE html" : tagName}`}
          <span className="flex items-center gap-2">
            {getAttributesString()}
            {">"}
          </span>
        </motion.p>
        {tagName === "doctype" && (
          <div className="flex items-center gap-2">
            <ActionButton onClick={handleGenerateHTML} title="Copy HTML code" variant="copy" />
            <ActionButton onClick={validateBEM} title="Validate BEM code" variant="check" />
          </div>
        )}
        {tagName !== "doctype" && (
          <div className="flex items-center gap-2">
            <ActionButton onClick={onDialogOpen} title="Add attributes" variant="edit" isSmall />
            <ActionButton onClick={handleRemoveElement} title="Delete" variant="delete" isSmall id={id} />
          </div>
        )}
      </div>
      {innerItems.length > 0 && (
        <motion.div className={cn(children === "dropzone" ? "py-2" : "py-2")}>
          <Reorder.Group values={innerItems.length > 0 ? innerItems : ["placeholder"]} onReorder={handleReorder} className="flex flex-col gap-2" axis="y" transition={{ duration: 0.1 }}>
            <AnimatePresence>
              {innerItems.map((item) => (
                <Reorder.Item key={item.id} value={item} as={"li"}>
                  <DroppableDOMElement
                    id={item.id}
                    tagName={item.tag}
                    items={item.children || []}
                    onReorder={() => { }}
                    handleRemoveElement={handleRemoveElement}
                    validateBEM={validateBEM}
                    handleGenerateHTML={handleGenerateHTML}
                    handleOpenAttributesDialog={handleOpenAttributesDialog}
                    attributes={item.attributes || []}
                  >
                    {item}
                  </DroppableDOMElement>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        </motion.div>
      )}
      {tagName !== "doctype" && (
        <motion.p
          className="text-sm"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {`</${tagName}>`}
        </motion.p>
      )}
    </motion.div>
  )
}

export default DroppableDOMElement