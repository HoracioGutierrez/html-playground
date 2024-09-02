"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "@radix-ui/react-dropdown-menu"

type AttributesDialogProps = {
  isOpen: boolean
  onClose: () => void
  attributes: string[] | []
  onSubmit: (formData: FormData) => void
}

function AttributesDialog({ isOpen, onClose, attributes, onSubmit }: AttributesDialogProps) {

  const handleSubmit = (formData) => {
    onSubmit && onSubmit(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-primary">Tag Attributes</DialogTitle>
          <DialogDescription>
            You can add attributes to this HTML tag to provide additional information, different behavior like the type or language of content, or other properties such as the class or id which can be used for further styling or scripting with CSS or JavaScript.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit}>
          {attributes.map((attribute, index) => (
            <div key={index} className="flex flex-col gap-2 mb-4">
              <Label className="text-muted">{attribute.name}</Label>
              <Input type="text" placeholder="Value..." className="bg-accent text-card dark:text-card-foreground placeholder:text-black/30" name={attribute.name} defaultValue={attribute.value} />
            </div>
          ))}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="destructive" onClick={onClose} className="bg-secondary text-card dark:text-card-foreground">
              Close
            </Button>
            <Button type="submit" variant="default" className="bg-accent text-card dark:text-card-foreground">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

  )
}
export default AttributesDialog