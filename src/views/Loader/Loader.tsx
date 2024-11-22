import style from "./Loader.module.scss";

type Props = {
  coverPage: Boolean;
  size?: "small" | "large" | "medium"
}

const Loader = (props: Props) => {
  const { size = "large", coverPage } = props;

  const classNames = [
    style.loader,
    style[`loader-${size}`],
    coverPage ? style.coverPage : style.coverRow,
  ]
  const loaderStyles = classNames.join(" ");

  return (
    <div className={loaderStyles}></div>
  )
}
export default Loader