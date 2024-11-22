//styles
import { ElementType, HTMLAttributes, ReactNode } from "react";
import BoxModalHoc from "../../Hoc/BoxModalHoc/BoxModalHoc";
import { BoxModalHocProps } from "../../Hoc/BoxModalHoc/IBoxModalHoc";


type BoxProps = {
    children: ReactNode;
    boxModalClasses?: BoxModalHocProps[];
    As?: ElementType;
} & HTMLAttributes<HTMLElement>


const H: React.FC<BoxProps> = (props: BoxProps) => {
    const { children, boxModalClasses = [], As = "div", className, ...other } = props;

    const classNames = [
        className,
        ...boxModalClasses,
    ]

    const boxStyles = classNames.join(" ");

    return (
        <As className={boxStyles} {...other}>{children}</As>
    )
}
const Box = BoxModalHoc(H);
export default Box;