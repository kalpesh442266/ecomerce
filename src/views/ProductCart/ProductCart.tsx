import style from "./ProductCart.module.scss";

import Delete from "../../Icons/Delete";
import Discount from "../../Icons/Discount";
import Box from "../../components/Box/Box";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Col from "../../components/Layouts/Col/Col";
import Row from "../../components/Layouts/Row/Row";
import Stack from "../../components/Layouts/Stack/Stack";
import Typography from "../../components/Typography/Typography";
import { decQuantity, deleteProduct, incQuantity } from "../../store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { calulateDiscountedPrice } from "../../utils/producUtils";
import { CartProducts } from "../../store/cart/ICart";


const ProductCart = () => {
    const cart = useAppSelector(state => state.cart);
    const discountedPrice = (price: number, discountPercentage: number) => calulateDiscountedPrice(price, discountPercentage);
    const dispatch = useAppDispatch();

    if (!cart.totalQuantity) {
        return (
            <Box className={style.emptyCart}>
                <Typography fontSize="large">No items...!</Typography>
            </Box>
        )
    }

    return (
        <Box p={50} className={style.cartWrapper}>
            <Typography As={"h1"} fontSize="x-large">My Cart</Typography>
            <Row colGap={10}>
                <Col col={17}>
                    {cart.cartProducts.map((product: CartProducts) => (
                        <Card key={product.id} backgroundColor="light" borderRadius p={10} mt={20}>
                            <Stack direction="row" spacing={10}>
                                <Box className={style.imageContainer}>
                                    <img className={style.thumbnailImg} src={product.thumbnail} />
                                </Box>
                                <Stack direction="col">
                                    <Typography As="h3" fontSize="large">{product.title}</Typography>
                                    <Stack direction="row" mt={10} align="center">
                                        <Typography fontSize="large" As="span">Rs. {discountedPrice(product.price, product.discountPercentage)}</Typography>
                                        <Typography color="grey-10" className={style.originalPrice} ml={16} As="span" lineThrough>Rs. {product.price}</Typography>
                                        <Typography fontSize="small" ml={16} As="span">{product.discountPercentage}% OFF</Typography>
                                    </Stack>
                                    <Stack direction="row" align="center" spacing={10}>
                                        <Box>Quantity: </Box>
                                        <Button onClick={() => { dispatch(incQuantity({ id: product.id })) }}>+</Button>
                                        <Typography> {product.quantity}</Typography>
                                        <Button onClick={() => { dispatch(decQuantity({ id: product.id })) }}>-</Button>
                                    </Stack>
                                    <Typography fontSize="medium">Total amount: {product.quantity * discountedPrice(product.price, product.discountPercentage)}</Typography>
                                </Stack>
                            </Stack>
                            <Button btntype="primary" variant="text" className={style.crossBtn} onClick={() => { dispatch(deleteProduct({ id: product.id })) }}>
                                <Delete height={20} width={20} fill="#dc3545" />
                            </Button>
                        </Card>
                    ))}
                </Col>
                <Col col={6}>
                    <Card mt={20} backgroundColor="light" borderRadius p={10}>
                        <Typography fontSize="large">Price Breakup</Typography>
                        <Stack direction="row" justify="space-between">
                            <Typography As="span" fontSize="small">Original amount:</Typography>
                            <Typography As="span" fontSize="medium" color="grey-10" lineThrough>Rs. {cart.totalPrice}</Typography>
                        </Stack>

                        <Stack direction="row" justify="space-between" mt={10}>
                            <Typography As="span" fontSize="small">Discount:</Typography>
                            <Typography As="span" ml={10} color="danger">- Rs.{cart.totalPrice - cart.totalDiscountedPrice}</Typography>
                        </Stack>

                        <Stack direction="row" justify="space-between" mt={10}>
                            <Typography As="span" fontSize="medium">Total Price:</Typography>
                            <Typography As="span" fontSize="medium">Rs. {cart.totalDiscountedPrice}</Typography>
                        </Stack>

                        <Stack direction="row" align="center">
                            <Discount width={20} fill="#28a745" height={20} />
                            <Typography ml={10} color="success">Discount of {cart.totalDiscount}% Applied!</Typography>
                        </Stack>
                    </Card>
                </Col>
            </Row>
        </Box>
    )
}

export default ProductCart;
