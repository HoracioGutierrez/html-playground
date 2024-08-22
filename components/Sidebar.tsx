"use client"
import { Button } from "./ui/button";
import { X } from "lucide-react";

export default function Sidebar({ className = "", handleClose }: { className?: string, handleClose?: () => void }) {
  return (
    <div className={`overflow-y-auto xl:overflow-hidden box-border p-6 bg-accent flex flex-col xl:bg-[rgba(0,0,0,0.4)] text-white ${className} max-w-[40ch]`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className='font-bold text-fluid-lg text-primary'>About this playground</h2>
        <X className="xl:hidden cursor-pointer" onClick={handleClose} />
      </div>
      <div className="flex flex-col gap-4 mb-6 text-fluid-md dark:text-secondary-foreground">
        <p>This playground was created with the intention of having a tool for beginners to better learn HTML nesting and the structure of the DOM. You can drag and drop elements to the DOM and see how they nest.</p>
        <p>In case you try to nest an element inside another element that doesn&apos;t allow it, the playground will show you an error message. You will also get an error message if you exceed the nesting limit for that particular element.</p>
        <p>You can start by dragging the yellow badges on the right side of the screen and dropping them into the area that says <span className="font-thin italic"> &apos;index.html&apos;</span>.</p>
        <p>Once you have nested at least one element, a button that says <span className="font-thin italic">&apos;generate html&apos;</span> will appear. Clicking on it will generate the HTML code for the elements you have nested and copy it to your clipboard automatically.</p>
        <p>You can also remove elements by clicking on the <span className="font-thin italic">&apos;x&apos;</span> icons that appears on the top right corner of the element you want to remove.</p>
        <p>Also, you can edit the attributes of the elements by clicking on the <span className="font-thin italic">&apos;edit&apos;</span> icons that appears on the top right corner of the element you want to edit. A popup will appear with the attributes of the element, you can edit them and click on the <span className="font-thin italic">&apos;save&apos;</span> button to save the changes.</p>
      </div>
      <p className="font-bold text-center text-primary text-xl">Enjoy! 🚀</p>
      <Button className="xl:hidden bg-primary drop-shadow-md shadow-md mt-auto w-full text-xl uppercase" onClick={handleClose}>
        Close
      </Button>
    </div>
  )
}