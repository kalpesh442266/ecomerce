import style from "./Input.module.scss";

type InputElemProps = JSX.IntrinsicElements['input'];

interface InputCompProps extends InputElemProps {
    placeHolder?: string,
    classname?: string
}

const Input = (props: InputCompProps) => {
    const { classname } = props;
    const classNames = [
        style.input,
        classname
    ]
    const inputStyles = classNames.join(" ")
    return (
        <input className={inputStyles} {...props} />
    )
}

export default Input