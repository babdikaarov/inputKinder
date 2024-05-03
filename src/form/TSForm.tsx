import { useEffect, useState } from "react";
import FormOptions from "./FormOptions";
import { TextInput } from "./TextInput";
import { SelectButton } from "./SelectButton";
import DocNameInput from "./DocNameInput";
import DocFileInput from "./DocFileInput";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { TSFormProps } from "./types";
import { cn } from "./cn";
import { useForm } from "@tanstack/react-form";

export default function TSForm({ opt }: TSFormProps) {
   async function sendData(formData: FormData, url: string) {
      try {
         const response = await fetch(url, {
            method: "POST",
            body: formData,
         });
         if (!response.ok) {
            throw new Error("Failed to send data");
         }
         const data = await response.json();
         console.log("Data sent successfully:", data);
      } catch (error) {
         console.error("Error sending data:", error);
      }
   }
   const [isOpen, setIsOpen] = useState(false);
   const [options, setOptions] = useState(opt);
   const [compare, setCompare] = useState(0);
   const form = useForm({
      defaultValues: {
         formOption: "",
         inn: "",
         url: "",
         lastName: "",
         firstName: "",
         phoneNumber: "",
         email: "",
         docs: [] as Array<{
            name: string;
            file: FileList | null;
         }>,
         docLength: 0,
      },
      onSubmit({ value }) {
         // console.log('submit')
         // console.log(value);
         const url = value.url;
         console.log("URL: " + url);
         const formData = new FormData();
         const data: any = {};
         data.formOption = value.formOption;
         data.inn = value.inn;
         data.lastName = value.lastName;
         data.firstName = value.firstName;
         data.docs = {};
         value.docs.forEach((el) => {
            data.docs[el.name] = el.file;
         });
         formData.append("data", data);
         console.log("DATA: ", data);

         sendData(formData, url);
      },

      validatorAdapter: zodValidator,
   });

   const { Subscribe, Field, setFieldValue, getFieldValue } = form;

   useEffect(() => {
      if (!getFieldValue("formOption")) return;
      setCompare(opt[getFieldValue("formOption")].options.length);

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [getFieldValue, options]);
   // FIXME react-international-phone react-share
   return (
      <>
         {/* <Alert
        alertState={alertState}
        setAlertState={setAlertState}
        variant={'warn'}
      /> */}
         <form
            onSubmit={(e) => {
               e.preventDefault();
               e.stopPropagation();
               form.handleSubmit();
            }}
            className={cn(
               "ml-[200px] flex w-full max-w-[600px] flex-col items-center justify-center gap-14 xl:items-start",
               "lgExtra:m-auto",
               "xl:ml-[120px]",
            )}
         >
            <form.Field
               name="formOption"
               validators={{
                  onChange: z.string().min(1, "choose type of form"),
               }}
            >
               {(field) => {
                  return (
                     <>
                        <FormOptions
                           changeHandler={(e) => {
                              setIsOpen(false);
                              field.handleChange(e);
                              setOptions(opt);
                              const docs = form.state.values.docs;
                              for (let i = docs.length - 1; i >= 0; i--) {
                                 form.removeFieldValue("docs", i);
                                 docs.splice(i, 1);
                              }
                           }}
                           onBlur={field.handleBlur}
                           opt={options}
                           error={field.state.meta.touchedErrors}
                        />
                     </>
                  );
               }}
            </form.Field>
            <form.Field
               name="url"
               validators={{
                  onChange: z.string().min(1, "Provide url"),
               }}
            >
               {(field) => {
                  return (
                     <TextInput
                        errorTitle={"URL needed"}
                        name={"url"}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={field.state.meta.touchedErrors}
                     />
                  );
               }}
            </form.Field>
            <form.Field
               name="inn"
               validators={{
                  onChange: z.string().min(1, "fill this inn strapi"),
               }}
            >
               {(field) => {
                  return (
                     <TextInput
                        errorTitle={"strapi tiltle INN"}
                        name={"inn"}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={field.state.meta.touchedErrors}
                     />
                  );
               }}
            </form.Field>
            <form.Field
               name="firstName"
               validators={{
                  onChange: z.string().min(1, "fill this Name strapi"),
               }}
            >
               {(field) => {
                  return (
                     <TextInput
                        errorTitle={"strapi tiltle Name"}
                        name={"firstName"}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={field.state.meta.touchedErrors}
                     />
                  );
               }}
            </form.Field>
            <form.Field
               name="lastName"
               validators={{
                  onChange: z.string().min(1, "fill this Last Name strapi"),
               }}
            >
               {(field) => {
                  return (
                     <TextInput
                        errorTitle={"strapi tiltle Last Name"}
                        name={"lastName"}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={field.state.meta.touchedErrors}
                     />
                  );
               }}
            </form.Field>
            <form.Field
               name="phoneNumber"
               validators={{
                  onChange: z.string().min(1, "fill this Last Name strapi"),
               }}
            >
               {(field) => {
                  return (
                     <TextInput
                        errorTitle={"strapi tiltle Last Name"}
                        name={"phoneNumber"}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={field.state.meta.touchedErrors}
                     />
                  );
               }}
            </form.Field>
            <form.Field
               name="email"
               validators={{
                  onChange: z.string().min(1, "fill this Last Name strapi"),
               }}
            >
               {(field) => {
                  return (
                     <TextInput
                        errorTitle={"strapi tiltle Last Name"}
                        name={"email"}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={field.state.meta.touchedErrors}
                     />
                  );
               }}
            </form.Field>

            <form.Field name="docs" mode="array">
               {(field) => {
                  return (
                     <>
                        {field.state.value.map((_, i) => {
                           return (
                              <div key={i} className="relative  flex w-full max-w-[600px] gap-5">
                                 <div className="w-full">
                                    <form.Field name={`docs[${i}].name`}>
                                       {(subField) => {
                                          return <DocNameInput value={subField.state.value} />;
                                       }}
                                    </form.Field>
                                    <form.Field
                                       name={`docs[${i}].file`}
                                       validators={{
                                          // onChange: ({ value }) => {
                                          //   if (value) {
                                          //     return undefined
                                          //   }
                                          //   return 'upload file'
                                          // },
                                          // onChangeAsync: async ({value}) => {
                                          //   const response = await fetch(
                                          //     `casdl.com/inn?id=${value}`
                                          //   )
                                          //   if(response.ok) return 'vy mojete otpravit 4asti4no'

                                          //   return 'vy doljny zapolnit; vse polya'
                                          // },
                                          onSubmit: ({ value }) => {
                                             if (value?.length) {
                                                return undefined;
                                             }
                                             return "upload file";
                                          },
                                       }}
                                    >
                                       {(subField) => {
                                          return (
                                             <DocFileInput
                                                error={subField.state.meta.touchedErrors}
                                                multiple={
                                                   opt[form.getFieldValue("formOption")].options.find(
                                                      (el) => el.option === field.state.value[i].name,
                                                   )?.multiple
                                                }
                                                onChange={(e) => {
                                                   subField.handleChange(e);
                                                }}
                                                show={subField.getValue()}
                                                removeField={() => {
                                                   setOptions((prev) => {
                                                      const selectedOptionKey = form.getFieldValue("formOption");
                                                      const updatedOptions = { ...prev };

                                                      opt[selectedOptionKey].options.forEach((optItem) => {
                                                         if (optItem.option === field.state.value[i].name) {
                                                            const existsInState = prev[selectedOptionKey].options.some(
                                                               (stateItem) => stateItem.option == optItem.option,
                                                            );

                                                            if (!existsInState) {
                                                               updatedOptions[selectedOptionKey].options.push(optItem);
                                                            }
                                                         }
                                                      });

                                                      return updatedOptions;
                                                   });

                                                   field.removeValue(i);
                                                }}
                                             />
                                          );
                                       }}
                                    </form.Field>
                                 </div>
                              </div>
                           );
                        })}
                        <SelectButton
                           docArrayLength={() => form.getFieldValue("docs").length}
                           setFieldValue={setFieldValue as any}
                           error={field.state.meta.errors}
                           wrapper={Subscribe}
                           field={Field}
                           setIsOpen={setIsOpen}
                           isOpen={isOpen}
                           text={"add file"}
                           getOption={() => form.getFieldValue("formOption")}
                           pushField={(name: string) => {
                              field.pushValue({ name: name, file: null });
                              setOptions((prev) => ({
                                 ...prev,
                                 [form.getFieldValue("formOption")]: {
                                    ...prev[form.getFieldValue("formOption")],
                                    options: prev[form.getFieldValue("formOption")].options.filter(
                                       (el) => el.option !== name,
                                    ),
                                 },
                              }));
                           }}
                           compare={compare}
                           opt={options}
                           originOpt={opt}
                        />
                     </>
                  );
               }}
            </form.Field>
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
               {([canSubmit, isSubmitting]) => (
                  <button
                     type="submit"
                     disabled={!canSubmit}
                     className="h-[50px] w-full  rounded bg-blue-500 text-white"
                  >
                     {isSubmitting ? "..." : "Submit strapi"}
                  </button>
               )}
            </form.Subscribe>
         </form>
      </>
   );
}
