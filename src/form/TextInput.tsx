import { InputProps } from "./types";
import Warn from "./allerts/warn";

export const TextInput: React.FC<InputProps> = ({ name, error, errorTitle, ...rest }) => {
   return (
      <>
         <div className={`relative flex w-full max-w-[600px]`}>
            <input
               {...rest}
               id={name}
               type="text"
               className={
                  "peer  h-[50px] min-w-full rounded border-[0.5px] border-dark-600 placeholder-transparent focus:border-dark-600 focus:outline-none"
               }
               placeholder={name}
               autoComplete="off"
            />
            <label
               htmlFor={name}
               className=" absolute -top-3 left-3 bg-theme-bg text-dark-300 opacity-100 transition-all  peer-placeholder-shown:top-3 peer-placeholder-shown:opacity-75 peer-focus:-top-3 peer-focus:opacity-100 "
            >
               {name}
            </label>
            <Warn error={error} title={errorTitle} className="" />
         </div>
      </>
   );
};
