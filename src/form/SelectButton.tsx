import { Plus } from "lucide-react";
import { SelectButtonProps } from "./types";
import { useState } from "react";
import Warn from "./allerts/warn";

export const SelectButton: React.FC<SelectButtonProps> = ({
   pushField,
   opt,
   text,
   getOption,
   setIsOpen,
   isOpen,
   wrapper: Subscribe,
   field: Field,
   originOpt,
}) => {
   const handleOptionClick = (e: any) => {
      const nameOption = e.target.value;
      setIsOpen(false);
      pushField(nameOption);
   };

   return (
      <div className="relative z-10 w-full max-w-[600px]">
         <Subscribe>
            {() => {
               return (
                  <>
                     <button
                        type={!getOption() ? "submit" : "button"}
                        className="relative z-20 flex h-[50px] min-w-full items-center gap-4 text-nowrap rounded border-[0.5px] border-solid border-dark-600 bg-white px-2 text-dark-300"
                        onClick={() => {
                           if (getOption()) {
                              setIsOpen(!isOpen);
                           }
                        }}
                     >
                        <Plus className="size-[32px] rounded bg-blue-500 stroke-white" />
                        {text}
                     </button>
                  </>
               );
            }}
         </Subscribe>
         <Field
            name="docLength"
            validators={{
               onChangeListenTo: ["docs", "formOption"],
               onChange: ({ fieldApi }: { fieldApi: any }) => {
                  if (!fieldApi.form.getFieldValue("formOption")) {
                     return "No document variant selected";
                  } else {
                     if (fieldApi.form.getFieldValue("docs").length !== originOpt[getOption()].options.length) {
                        return "add all documents";
                     } else {
                        return undefined;
                     }
                  }
               },
            }}
         >
            {(field) => {
               return (
                  <>
                     <Warn error={field.state.meta.touchedErrors} title={"include all files"} className="z-40" />
                     <div
                        className={`grid w-full transition-grid-rows duration-300 ease-linear ${
                           isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                     >
                        <div className="flex  w-full flex-col items-start overflow-hidden rounded bg-white shadow">
                           {!getOption()
                              ? null
                              : opt[getOption()].options.length > 0
                                ? opt[getOption()].options.map((option, index) => (
                                     <input
                                        key={index}
                                        className="mx-3 my-4 h-[46] w-full text-start hover:cursor-pointer"
                                        type="button"
                                        value={option.option}
                                        onClick={(e) => {
                                          //  const value: { value: string } = e.target as unknown as { value: string };
                                           handleOptionClick(e);
                                           field.handleChange(Math.random());
                                        }}
                                     />
                                  ))
                                : null}
                        </div>
                     </div>
                  </>
               );
            }}
         </Field>
      </div>
   );
};
