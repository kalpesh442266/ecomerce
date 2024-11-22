import { ElementType, ReactNode } from "react";

import { Colors, FontSizes, FontWeights } from "../../styles/styleTypes";
import style from "./Typography.module.scss";
import { BoxModalHocProps } from "../../Hoc/BoxModalHoc/IBoxModalHoc";
import BoxModalHoc from "../../Hoc/BoxModalHoc/BoxModalHoc";

type Props = {
    boxModalClasses?: Array<BoxModalHocProps>;
    children: ReactNode;
    As?: ElementType;
    fontSize?: FontSizes;
    fontWeight?: FontWeights;
    className?: string;
    color?: Colors;
    ellipsis?: Boolean;
    lineThrough?: Boolean
}

const H = (props: Props) => {
    const {
        children, ellipsis = false, boxModalClasses = [], As = "p",
        fontSize = "smaller", fontWeight = "normal", className, color,
        lineThrough
    } = props;

    const classNames = [
        ...boxModalClasses,
        className,
        style[`size-${fontSize}`],
        style[`weight-${fontWeight}`],
        style[`color-${color}`],
        ellipsis && style.ellipsis,
        lineThrough && style.lineThrough
    ]

    const typographyStyles = classNames.join(" ");

    return (
        <As className={typographyStyles}>{children}</As>
    )
}

const Typography = BoxModalHoc(H);
export default Typography;