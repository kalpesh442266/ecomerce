import { ReactNode } from "react";
import style from "./Row.module.scss";

import { ColGap, RowGap } from "../../../styles/styleTypes";
import { BoxModalHocProps } from "../../../Hoc/BoxModalHoc/IBoxModalHoc";
import BoxModalHoc from "../../../Hoc/BoxModalHoc/BoxModalHoc";

type RowProps = {
    boxModalClasses?: Array<BoxModalHocProps>;
    className?: string;
    children: ReactNode;
    colGap?: ColGap;
    rowGap?: RowGap;
    noWrap?: Boolean
}

const H = (props: RowProps) => {
    const { boxModalClasses = [], className, children, colGap, rowGap, noWrap } = props;

    const classNames = [
        ...boxModalClasses,
        className,
        style.row,
        style[`col-gap-${colGap}`],
        style[`row-gap-${rowGap}`],
        noWrap && style.noWrap
    ]

    const rowStyles = classNames.join(" ");

    return (
        <div className={rowStyles}>{children}</div>
    )
}
const Row = BoxModalHoc(H);
export default Row;