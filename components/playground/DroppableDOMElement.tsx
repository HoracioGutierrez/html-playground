"use client"
import { motion, AnimatePresence, Reorder } from "framer-motion"
import { useDraggableStore } from "@/stores/DraggableStore"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const DroppableDOMElement = ({ children = "dropzone", id, tagName, items, onReorder }) => {

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

  return (
    <motion.div
      className="bg-secondary px-3 py-2 border-black/20 border-dashed rounded-md text-accent dropzone outline-2 outline-accent outline-dashed"
      initial={{ opacity: 0, height: 0, width: 0 }}
      animate={{
        backgroundColor: isElementBeingDragged ? "hsl(210 34% 90%)" : "hsl(36 23% 80%)",
        color: isElementBeingDragged ? "white" : "hsl(36 43% 46%)",
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
      <motion.p
        className="text-sm leading-tight"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        {`<${tagName === "doctype" ? "!DOCTYPE html" : tagName}>`}
      </motion.p>
      {innerItems.length > 0 && (
        <motion.div className={cn(children === "dropzone" ? "py-2" : "py-2")}>
          <Reorder.Group values={items} onReorder={handleReorder} className="flex flex-col gap-2" axis="y">
            <AnimatePresence>
              {innerItems.map((item) => (
                <Reorder.Item key={item.id} value={item} as={"li"}>
                  <DroppableDOMElement id={item.id} tagName={item.tag} items={item.children || []} onReorder={() => { }}>
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