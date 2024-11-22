import { FC } from "react";
import style from "./BoxModalHoc.module.scss";
import { BoxModalHocProps } from "./IBoxModalHoc";


const BoxModalHoc = <P extends object>(Component: React.FC<P>): FC<P & BoxModalHocProps> => {
    return function HOC(props: P & BoxModalHocProps) {
        const { m, ml, mr, mt, mb, p, pl, pr, pt, pb } = props;

        const classNames = [
            style[`m-${m}`], style[`ml-${ml}`], style[`mr-${mr}`], style[`mt-${mt}`], style[`mb-${mb}`],
            style[`p-${p}`], style[`pl-${pl}`], style[`pr-${pr}`], style[`pt-${pt}`], style[`pb-${pb}`]
        ]
        return (
            <Component boxModalClasses={classNames} {...props} />
        )
    }
}

export default BoxModalHoc;