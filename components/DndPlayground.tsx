"use client";
import { motion, AnimatePresence, useAnimationControls, useDragControls } from "framer-motion"
import ToggleCategoryButton from "./playground/ToggleCategoryButton";
import DroppableDOMElement from "./playground/DroppableDOMElement";
import { useDraggableStore } from "@/stores/DraggableStore";
import React, { useEffect, useRef, useState } from "react";
import CategoryTitle from "./playground/CategoryTitle";
import { refactorInitialElements } from "@/lib/utils";
import DraggableTag from "./playground/DraggableTag";
import { toast } from "./ui/use-toast";
import TagDescription from "./playground/TagDescription";
import { Loader } from "lucide-react";
import { validate } from "@/lib/constants";
import AttributesDialog from "./playground/AttributesDialog";
import BemErrorDescription from "./playground/BemErrorDescription";
import BemSuccessDescription from "./playground/BemSuccessDescription";

const DndPlayground = () => {

  const containerRef = useRef(null)
  const dragControls = useDragControls()
  const [items, setItems] = useState([])
  const controls = useAnimationControls()
  const { elementName, description } = useDraggableStore((state) => state)
  const [selectedBadgeIndex, setSelectedBadgeIndex] = useState(0)
  const [isAttributesDialogOpen, setIsAttributesDialogOpen] = useState(false)
  const [dialogAttributes, setDialogAttributes] = useState([])
  const [selectedElementId, setSelectedElementId] = useState("")
  const [bemErrors, setBemErrors] = useState([])
  const [isBemValid, setIsBemValid] = useState(false)

  useEffect(() => {
    const animateCategoryTitle = async () => {
      await controls.start({ y: -20, opacity: 0 })
      await controls.start({ y: 0, opacity: 1 })
    }
    animateCategoryTitle()
  }, [])

  const handleReorder = (newOrder, containerId) => {
    //TODO: Implement reorder
  }

  const handleDrop = (event, info, item) => {
    if (elementName) {
      const dropzone = event.target.closest(".dropzone")
      const dropzoneId = dropzone.getAttribute("data-id")
      const dropzoneTag = dropzone.getAttribute("data-tag")
      const newElement = {
        id: Math.random().toString(),
        tag: item.tag,
        canContain: item.canContain || [],
        attributes: item.attributes || []
      }

      if (!dropzoneId && !dropzoneTag) return

      if (dropzoneId === "dom") {
        const newItems: any = [...items]
        if (newItems.length === 0) {
          if (newElement.tag === "html") {
            newItems.push(newElement)
            return setItems(newItems)
          } else {
            toast({
              title: "Not HTML!",
              description: "You can only add the root element (html tag) to the DOM",
              variant: "destructive",
            })
            return
          }
        } else {
          toast({
            title: "The DOM is full!",
            description: "The HTML element is already present in the DOM. All new elements must be added to the HTML tag now.",
            variant: "destructive",
          })
          return
        }
      }

      const pushItemToContainer = (containerId, item, elements) => {
        const newItems = [...elements]
        return newItems.map(item => {
          if (item.id === containerId) {
            if (item.canContain.includes(newElement.tag)) {
              return { ...item, children: item.children ? [...item.children, newElement] : [newElement] }
            }
            toast({
              title: `Incorrect parent!`,
              description: `The element <${newElement.tag}/> cannot be added as children to the <${item.tag}> element`,
              variant: "destructive",
            })
            return item
          }
          if (item.children && item.children.length > 0) {
            return { ...item, children: pushItemToContainer(containerId, item, item.children || []) }
          }
          return item
        })
      }

      const result = pushItemToContainer(dropzoneId, newElement, items)
      setItems(result)
    }
  }

  const handleNext = async () => {
    if (selectedBadgeIndex === refactorInitialElements.length - 1) {
      setSelectedBadgeIndex(0)
    } else {
      setSelectedBadgeIndex(selectedBadgeIndex + 1)
    }
    await controls.start({ x: -20, opacity: 0, transition: { duration: 0.1 } })
    await controls.start({ x: 40, opacity: 0, transition: { duration: 0.1 } })
    await controls.start({ x: 0, opacity: 1 })
  }

  const handlePrevious = async () => {
    if (selectedBadgeIndex === 0) {
      setSelectedBadgeIndex(refactorInitialElements.length - 1)
    } else {
      setSelectedBadgeIndex(selectedBadgeIndex - 1)
    }
    await controls.start({ x: 20, opacity: 0, transition: { duration: 0.1 } })
    await controls.start({ x: -40, opacity: 0, transition: { duration: 0.1 } })
    await controls.start({ x: 0, opacity: 1 })
  }

  const generateHTML = () => {
    let html = "<!doctype html>\n";
    const generateHTMLString = (item: any) => {

      let openingTag = `<${item.tag}`
      let closingTag = `</${item.tag}>`

      if (item.attributes && item.attributes.length) {
        item.attributes.forEach(attribute => {
          if (attribute.value) {
            openingTag += ` ${attribute.name}="${attribute.value}"`
          }
        })
      }

      openingTag += ">"

      html += openingTag + "\n"

      if (item.children) {
        item.children.forEach(generateHTMLString)
      }

      html += closingTag + "\n"

    }

    items.forEach(generateHTMLString)
    return html
  }

  const handleGenerateHTML = () => {
    const html = generateHTML()
    toast({
      title: <Loader className="animate-spin" /> as any,
      description: (
        <div>
          <p>Your HTML is being generated and copied to your clipboard.</p>

        </div>
      )
    })
    setTimeout(() => {
      navigator.clipboard.writeText(html)
      toast({
        title: "HTML code copied to clipboard",
        description: "You can now paste it into your HTML file.",
      })
    }, 500)
  }

  const validateBEM = () => {
    const html = generateHTML()
    const errors = validate(html)
    if (errors?.hasErrors) {
      setBemErrors(errors.errors[0].message as any)
      setIsBemValid(false)
    } else {
      setBemErrors([])
      setIsBemValid(true)
    }
  }

  const handleRemoveElement = (id: string) => {

    const getElementsWithoutId = (elements: any[]) => {
      return elements.filter((element: any) => {
        if (element.id == id) {
          return false
        }
        if (element.children) {
          element.children = getElementsWithoutId(element.children)
        }
        return true
      })
    }

    const newElements = getElementsWithoutId([...items])
    setItems(newElements as any)
  }

  const handleToggleAttributesDialog = () => {
    setIsAttributesDialogOpen(!isAttributesDialogOpen)
  }

  const getElementAttributes = (id) => {

    let foundElement;

    const findElement = (elements, id) => {
      elements.forEach(element => {
        if (element.id === id) {
          foundElement = element
        }
        if (element.children) {
          findElement(element.children, id)
        }
      })
    }

    findElement(items, id)

    return foundElement.attributes || []
  }

  const handleOpenAttributesDialog = (id) => {
    const attributes = getElementAttributes(id)
    setDialogAttributes(attributes)
    setIsAttributesDialogOpen(true)
    setSelectedElementId(id)
  }

  const handleAttributesDialogSubmit = (formData) => {
    const attributes = Object.fromEntries(formData)

    const editElement = (elements, id) => {
      return elements.map(element => {
        if (element.id === id) {
          return {
            ...element, attributes: Object.keys(attributes).map(key => {
              return {
                name: key,
                value: attributes[key]
              }
            })
          }
        }
        if (element.children) {
          return { ...element, children: editElement(element.children, id) }
        }
        return element
      })
    }

    const newElements = editElement(items, selectedElementId)

    setItems(newElements)
    setIsAttributesDialogOpen(false)
  }

  const closeBemSuccessDescription = () => {
    setIsBemValid(false)
  }

  const closeBemErrorDescription = () => {
    setBemErrors([])
  }

  return (
    <>
      <div id="container" ref={containerRef} className="relative flex flex-col justify-self-center place-content-center gap-10 md:grid grid-cols-[minmax(min(100%,300px),400px)_1fr] w-full max-w-screen-lg transition-all grow self-center">
        <div className="flex flex-col gap-4">
          <div id="badge-selectors" className="gap-2 grid grid-cols-[auto_1fr_auto]">
            <ToggleCategoryButton onClick={handlePrevious} variant="previous" />
            <CategoryTitle selectedBadgeIndex={selectedBadgeIndex} controls={controls} />
            <ToggleCategoryButton onClick={handleNext} variant="next" />
          </div>
          <motion.div className="flex flex-wrap justify-center gap-4 py-4 max-h-[500px]" transition={{ staggerChildren: 0.5 }} initial="initial" animate="animate" exit="exit">
            <AnimatePresence>
              {refactorInitialElements[selectedBadgeIndex].elements.map((item, i) => {
                return (
                  <DraggableTag key={item.id} containerRef={containerRef} item={item} handleDrop={handleDrop} delay={i * 0.05} dragControls={dragControls} />
                )
              })}
            </AnimatePresence>
          </motion.div>
          <TagDescription description={description} />
          {bemErrors.length > 0 && (
            <BemErrorDescription errors={bemErrors} onClose={closeBemErrorDescription} />
          )}
          {isBemValid && (
            <BemSuccessDescription onClose={closeBemSuccessDescription} />
          )}
        </div>
        <DroppableDOMElement
          id="dom"
          tagName="doctype"
          onReorder={handleReorder}
          items={items}
          handleGenerateHTML={handleGenerateHTML}
          validateBEM={validateBEM}
          handleRemoveElement={handleRemoveElement}
          handleOpenAttributesDialog={handleOpenAttributesDialog}
          attributes={[]}
        />
      </div>
      <AttributesDialog
        isOpen={isAttributesDialogOpen}
        onClose={handleToggleAttributesDialog}
        attributes={dialogAttributes}
        onSubmit={handleAttributesDialogSubmit}
      />
    </>
  );
};

export default DndPlayground;
