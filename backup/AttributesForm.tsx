import { AttributesFormProps } from "@/lib/utils";
import { Button } from "./ui/button";

function AttributesForm({ attributes, handleAttributeSubmit, setOpen }: AttributesFormProps) {
  return (
    <form className='flex flex-col gap-3' onSubmit={handleAttributeSubmit}>
      {Object.keys(attributes).map((attribute: any, i: number) => {
        return (
          <div key={i}>
            <label className='text-sm font-semibold' htmlFor={attribute}>
              {attribute}
            </label>
            <input type='text' id={attribute} name={attribute} className='border rounded-sm w-full p-1 text-gray-500' defaultValue={attributes[attribute]}/>
          </div>
        );
      })}
      <Button className='bg-transparent border text-foreground hover:text-accent' onClick={() => setOpen(false)}>
        guardar
      </Button>
    </form>
  )
}
export default AttributesForm