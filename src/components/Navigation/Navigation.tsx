//styles
import { NavLink, useNavigate } from "react-router-dom";
import Cart from "../../Icons/Cart";
import Box from "../Box/Box";
import Stack from "../Layouts/Stack/Stack";
import Typography from "../Typography/Typography";
import style from "./Navigation.module.scss";
import { useAppSelector } from "../../store/store";

type Props = {}

const Navigation = (props: Props) => {
    const cart = useAppSelector(state => state.cart);
    const navigate = useNavigate()
    return (
        <Stack direction="row" pl={10} pr={10} align="center" justify="space-between" className={style.container}>
            <Typography As="h2" fontSize="x-large">
                <NavLink className={style.icon} to={"/"}>ShopCart</NavLink>
            </Typography>
            <Stack direction="row" spacing={16}>
                <Stack onClick={() => {navigate('/cart')}} direction="row" align="center" className={style.cartIconWrapper}>
                    <Box className={style.cartIcon}>
                        <Cart height={24} width={24} />
                        <Typography p={4} fontSize="x-small" className={style.cartLabel} As="span">{cart.totalQuantity}</Typography>
                    </Box>
                    <Box As="span" pl={8}>Cart</Box>
                </Stack>
            </Stack>
        </Stack >
    )
}

export default Navigation