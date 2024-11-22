import { ReactNode } from "react";
import BoxModalHoc from "../../Hoc/BoxModalHoc/BoxModalHoc";
import { BoxModalHocProps } from "../../Hoc/BoxModalHoc/IBoxModalHoc";
import style from "./Button.module.scss";

type ButtonDefaultProps = JSX.IntrinsicElements['button'];

interface ButtonProps extends ButtonDefaultProps {
    fullWidth?: Boolean;
    children?: ReactNode;
    btntype?: "primary" | "secondary" | "danger";
    boxModalClasses?: BoxModalHocProps[],
    variant?: "outline" | "content" | "text";
    className?: string;
}

const H = (props: ButtonProps) => {
    const { fullWidth, children, btntype = "primary",
        boxModalClasses = [], variant = "content", className, ...other
    } = props;
    const classNames = [
        ...boxModalClasses,
        className,
        style.button,
        style[btntype],
        style[`${btntype}-${variant}`],
        fullWidth && style.fullWidth
    ]
    const btnStyles = classNames.join(" ");

    return (
        <button className={btnStyles} {...other}>
            {children}
        </button>
    )
}

const Button = BoxModalHoc(H);

export default Button;