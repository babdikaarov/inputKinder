import { Eye, FilePlus2, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import DialogDemo from "./Modal";
import { cn } from "./cn";
import { DocFileInputProps, fileUrls } from "./types";
import Warn from "./allerts/warn";

const DocFileInput: React.FC<DocFileInputProps> = ({ show, removeField, multiple = false, onChange, error }) => {
   const [fileUrls, setFileUrls] = useState<fileUrls[]>([]);
   const refDialog = useRef(null);
   const refInput = useRef(null);
   const createObjectUrls = useCallback(() => {
      if (show) {
         const newFileUrls: fileUrls[] = [];
         for (let i = 0; i < show.length; i++) {
            const file = show.item(i);
            if (file) {
               newFileUrls.push({
                  name: file.name,
                  shortName: shortenFileName(file.name),
                  size: (file.size / (1024 * 1024)).toFixed(2),
                  url: URL.createObjectURL(file),
               });
            }
         }
         setFileUrls(newFileUrls);
      }
   }, [show]);

   useEffect(() => {
      createObjectUrls();
      return () => {
         fileUrls.forEach((e) => URL.revokeObjectURL(e.url));
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [createObjectUrls, show]);

   const handleRemove = () => {
      removeField();
      fileUrls.forEach((e) => URL.revokeObjectURL(e.url));
      setFileUrls([]);
   };

   function openDialog() {
      if (!refDialog.current) return;
      const dialog = refDialog.current as HTMLButtonElement;
      dialog.click();
   }
   function handleOpenInput() {
      if (!refInput.current) return;
      const input = refInput.current as HTMLInputElement;
      input.click();
   }

   return (
      <div
         className={cn(
            "absolute left-full top-0 ml-3 flex items-center gap-5",
            "lgExtra:relative lgExtra:left-0 lgExtra:ml-0 lgExtra:mt-4",
         )}
      >
         <div className="button relative h-[50px] min-w-[196px] flex-1">
            <div
               className={cn(
                  "flex h-[50px] min-w-[196px] items-center justify-center  gap-2  p-2",
                  "text-center lgExtra:w-full lgExtra:justify-between lgExtra:px-6 sm:px-2",
               )}
            >
               {fileUrls.length ? <Eye className="min-h-6 min-w-6 hover:cursor-default" /> : null}
               <div className="flex flex-col items-end lgExtra:flex-row lgExtra:gap-6 sm:flex-col sm:gap-0">
                  {fileUrls.map((el, i) => (
                     <a
                        key={i}
                        href={el.url}
                        target="_blank"
                        className=" flex items-center gap-2 text-[12px] hover:underline"
                     >
                        {el.shortName} - {el.size}mb
                     </a>
                  ))}
               </div>
            </div>
            {multiple ? (
               <DialogDemo
                  text={{
                     button: "choose file",
                     title: "add docs",
                     save: "save",
                     note: "strapi: Уважаемый родитель папорт должен быть с обеих сторон обеих родителей",
                     clickDrop: {
                        clickAndDrop: "drag or click to choose",
                        drop: "drop here",
                     },
                     upload: "upload",
                  }}
                  myRef={refDialog}
                  forwardInput={onChange}
                  className={!fileUrls.length ? " z-0" : "-z-10"}
                  setFileUrls={setFileUrls}
                  fileUrls={fileUrls}
               ></DialogDemo>
            ) : (
               <label
                  className={cn(
                     // 'button absolute left-0 flex h-[50px] min-w-[196px] items-center justify-center p-2 hover:cursor-pointer ',
                     !fileUrls.length ? " z-0" : "-z-10",
                     "absolute top-0 flex h-[50px] w-full min-w-[196px] items-center justify-center hover:cursor-pointer",
                  )}
               >
                  choose file2
                  <input
                     ref={refInput}
                     multiple={multiple}
                     type="file"
                     className="absolute z-10 w-0 opacity-0"
                     onChange={(e) => onChange(e.target.files)}
                  />
               </label>
            )}
            <Warn error={error} title={"strapi: file"} className={"z-30"} />
         </div>

         <button
            className={cn(" button h-[50px] min-w-[50px]", !fileUrls.length ? "absolute -z-10" : "")}
            onClick={multiple ? openDialog : handleOpenInput}
         >
            <FilePlus2 className="m-auto" />
         </button>
         <button className=" button h-[50px] min-w-[50px]" onClick={handleRemove}>
            <Trash2 className="m-auto" />
         </button>
      </div>
   );
};

export default DocFileInput;

export const shortenFileName = (fileName: string, maxLength = 18) => {
   if (fileName.length <= maxLength) {
      return fileName;
   } else {
      const extensionIndex = fileName.lastIndexOf(".");
      const extension = fileName.substring(extensionIndex);
      const truncatedName = "..." + fileName.substring(fileName.length - (maxLength - 3 - extension.length));
      return truncatedName;
   }
};
