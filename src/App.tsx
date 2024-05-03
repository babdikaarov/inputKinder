import TSForm from "./form/TSForm";
import Wrapper from "./form/Wrapper";
import "./output.css";

function App() {
   const options = {
      twoParents: {
         name: "twoParents option",
         options: [
            populate("twoParents", false, 1),
            populate("twoParents", false, 2),
            populate("twoParents", false, 3),
         ],
      },
      oneParent: {
         name: "oneParent option",
         options: [populate("oneParent", false, 1), populate("oneParent", false, 2)],
      },
      svoenazvine: {
         name: "guardian option",
         options: [populate("guardian", false, 1), populate("guardian", true, 2)],
      },
      divorsed: {
         name: "divorsed option",
         options: [populate("divorsed", false, 1), populate("divorsed", false, 2)],
      },
   };

   function populate(letter: string, multi: boolean, index: number) {
      if (multi) {
         return {
            option: `${letter}-${index}`,
            text: {
               ky: `${letter}-${index}T=KY`,
               ru: `${letter}-${index}T-RU`,
            },
            multiple: true,
            mOptions: [
               {
                  option: `${letter}-${index}MO1`,
                  text: {
                     ky: `${letter}-${index}MO1=KY`,
                     ru: `${letter}-${index}MO1-RU`,
                  },
               },
               {
                  option: `${letter}-${index}MO2`,
                  text: {
                     ky: `${letter}-${index}MOT2=KY`,
                     ru: `${letter}-${index}MOT2-RU`,
                  },
               },
            ],
         };
      }
      return {
         option: `${letter}-${index}`,
         text: {
            ky: `${letter}-${index}T=KY`,
            ru: `${letter}-${index}T-RU`,
         },
         multiple: false,
      };
   }

   return (
      <main className="mb-32 max-w-wrapperLimit relative mt-24 flex w-full flex-1 flex-col items-center justify-between gap-32">
         <Wrapper className=" m-auto flex  flex-col  items-start justify-center  gap-[10vh] ">
            <article className="w-full text-center">
               <p className="text-dark-700"> from strapi instruction replace me</p>
            </article>
            <TSForm opt={options} />
         </Wrapper>
      </main>
   );
}
export default App;
