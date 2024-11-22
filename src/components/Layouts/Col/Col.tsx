import { ReactNode } from "react";
import style from "./Col.module.scss";
import { BoxModalHocProps } from "../../../Hoc/BoxModalHoc/IBoxModalHoc";
import BoxModalHoc from "../../../Hoc/BoxModalHoc/BoxModalHoc";

type ColProps = {
    boxModalClasses?: Array<BoxModalHocProps>;
    col?: number;
    className?: string;
    children: ReactNode;
    xl?: number;
    sm?: number;
    md?: number;
    lg?: number;
}

const H = (props: ColProps) => {
    const { col, className, children, boxModalClasses = [], sm, md, lg, xl } = props;
    const classNames = [
        ...boxModalClasses,
        className,
        style[`col-${col}`],
        xl && style[`col-${xl}`],
        sm && style[`col-${sm}`],
        md && style[`col-${md}`],
        lg && style[`col-${lg}`],
    ]
    const colStyle = classNames.join(" ")
    return (
        <div className={colStyle}>{children}</div>
    )
}
const Col = BoxModalHoc(H);
export default Col