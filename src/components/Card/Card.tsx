import { MouseEventHandler, ReactNode } from "react";
import style from "./Card.module.scss";
import { Colors } from "../../styles/styleTypes";
import { BoxModalHocProps } from "../../Hoc/BoxModalHoc/IBoxModalHoc";
import BoxModalHoc from "../../Hoc/BoxModalHoc/BoxModalHoc";

type CardProps = {
    onClick?: MouseEventHandler;
    children: ReactNode;
    className?: string;
    boxModalClasses?: Array<BoxModalHocProps>,
    borderRadius?: Boolean,
    backgroundColor?: Colors
}


const H = (props: CardProps) => {
    const { children, onClick, className, boxModalClasses = [], borderRadius, backgroundColor="grey-10" } = props;
    const classNames = [
        ...boxModalClasses,
        className,
        style.card,
        borderRadius && style.borderRadius,
        style[`color-${backgroundColor}`]
    ]

    const cardStyle = classNames.join(" ")
    return (
        <div onClick={onClick} className={cardStyle} >{children}</div>
    )
}
const Card = BoxModalHoc(H);
export default Card;