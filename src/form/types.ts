import {
   DeepKeys,
   DeepValue,
   FieldComponent,
   FormState,
   Updater,
   ValidationCause,
   ValidationError,
} from "@tanstack/react-form";

export type Ttext = {
   inn: string;
   fileUpload: string;
   deleteButton: string;
   fileName: string;
   fileAdd: string;
   send: string;
   error: {
      size: string;
   };
};
export type Inputs = {
   inn: string;
   lastN: string;
   firstN: string;
   file_1: string;
   fileName_1: string;
   default: string;
   file: FileList;
   upload: {
      name: string | null;
      file: FileList | null;
   }[];
};

export interface DocFileInputProps {
   removeField: () => void;
   show: FileList | null;
   multiple?: boolean;
   onChange: (file: any) => void;
   error: ValidationError[];
}

export type fileUrls = {
   name: string;
   shortName: string;
   size: string;
   url: string;
};

export interface DocNameInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   name?: string;
}

export interface FormOptionsProps {
   changeHandler: (updater: Updater<string>) => void;
   opt: Record<string, OptionOPT>;
   onBlur: () => void;
   error: ValidationError[];
}

export type TFormData = {
   formOption: string;
   inn: string;
   lastName: string;
   firstName: string;
   docLength: number;
   phoneNumber: string;
   email: string;
   docs: {
      name: string;
      file: FileList | null;
   }[];
};

export interface SelectButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
   text: string;
   getOption: () => string;
   pushField: (name: string) => void;
   opt: Record<string, OptionOPT>;
   originOpt: Record<string, OptionOPT>;
   isOpen: boolean;
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
   wrapper: <TSelected = FormState<TFormData>>(props: {
      selector?: (state: FormState<TFormData>) => TSelected;
      children: ((state: NoInfer<TSelected>) => React.ReactNode) | React.ReactNode;
   }) => JSX.Element;
   field: FieldComponent<TFormData, NoInfer<any>>;
   error: ValidationError[];
   setFieldValue: <TField extends DeepKeys<TFormData>>(
      field: TField,
      updater: Updater<DeepValue<TFormData, TField>> | string,
      opts?: {
         touch?: boolean;
      },
   ) => void;
   docArrayLength: () => number;
   compare: number;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   name: string;
   error: ValidationError[];
   errorTitle: string;
}

export type Ioptions = "default" | "passport" | "COB";

export interface TSFormProps {
   opt: Record<string, OptionOPT>;
}

export type OptionOPT = {
   name: string;
   options: (
      | {
           option: string;
           text: {
              ky: string;
              ru: string;
           };
           multiple: boolean;
           mOptions: {
              option: string;
              text: {
                 ky: string;
                 ru: string;
              };
           }[];
        }
      | {
           option: string;
           text: {
              ky: string;
              ru: string;
           };
           multiple: boolean;
           mOptions?: undefined;
        }
   )[];
};

export type TAlert = {
   isOpen: boolean;
   title?: string;
   description?: string;
};
