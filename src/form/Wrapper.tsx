import { cn } from "./cn";

interface WrapperProps extends React.HTMLAttributes<HTMLElement> {
   children: React.ReactNode;
   header?: string;
   id?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ id, header, children, className, ...rest }) => {
   return (
      <section id={id} {...rest} className={cn("w-full max-w-wrapperLimit scroll-mt-20", className)}>
         {header ? <h2 className={cn("text-center font-poppins text-fs-1 font-bold ")}>{header}</h2> : null}
         {children}
      </section>
   );
};

export default Wrapper;
