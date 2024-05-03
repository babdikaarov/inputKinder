import { useState } from "react";
import Warn from "./allerts/warn";
import { FormOptionsProps } from "./types";

const FormOptions: React.FC<FormOptionsProps> = ({ changeHandler, opt, onBlur, error }) => {
   const [option, setOption] = useState("");
   const handleFormOptionChange = (event: { target: { value: string } }) => {
      setOption(event.target.value);
      changeHandler(event.target.value);
   };

   return (
      <div className="relative grid w-full max-w-[600px] grid-cols-2 grid-rows-2 gap-4">
         {Object.entries(opt).map(([key, value]) => (
            <label key={key} className="w-full hover:cursor-pointer">
               <input
                  className="mr-2 rounded-full"
                  type="radio"
                  name="options"
                  value={key}
                  onBlur={onBlur}
                  checked={option == key}
                  onChange={handleFormOptionChange}
               />
               {value.name}
            </label>
         ))}
         <Warn error={error} title={"strapi title mark field"} className="-top-[35px] h-4" />
      </div>
   );
};

export default FormOptions;
