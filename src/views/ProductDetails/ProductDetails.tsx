// styles
import { useState } from "react";
import { ProductData } from "../../store/products/IProducts";
import styles from "./ProductDetails.module.scss";

import { useLoaderData } from "react-router-dom";
import Rating from "../../Icons/Rating";
import Truck from "../../Icons/Truck";
import WritingPad from "../../Icons/WritingPad";
import Box from "../../components/Box/Box";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Col from "../../components/Layouts/Col/Col";
import Row from "../../components/Layouts/Row/Row";
import Stack from "../../components/Layouts/Stack/Stack";
import Typography from "../../components/Typography/Typography";
import { calulateDiscountedPrice } from "../../utils/producUtils";
import { setCartProduct } from "../../store/cart/cartSlice";
import { useDispatch } from "react-redux";

type Props = {}

const ProductDetails = (props: Props) => {
  const product = useLoaderData() as ProductData;
  const dispatch = useDispatch();

  const [currImg, setCurrImg] = useState(product.images[0]);
  const discountedPrice = calulateDiscountedPrice(product.price, product.discountPercentage);

  return (
    <Row m={18}>
      <Col pr={15} col={12}>
        <Row noWrap>
          <Col pr={15} col={4}>
            <Stack direction="col">
              {
                product.images.map((image, i) => {
                  return i < 5 &&
                    (
                      <Box key={image} mb={8} onClick={() => setCurrImg(image)} className={styles.thumbnailContainer}>
                        <img className={styles.thumbnailImg} src={image} alt="" />
                      </Box>
                    )
                }
                )
              }
            </Stack>
          </Col>
          <Col col={19} className={styles.imgWrapper}>
            <img className={styles.mainImg} src={currImg} />
          </Col>
        </Row>
      </Col>
      <Col col={8}>
        <Typography mb={16} As="h2" fontSize="x-large" fontWeight="bold">
          {product.title}
        </Typography>
        <Stack direction="row" align="center" >
          {[...Array(5)].map((_, i) => (
            <Rating key={i} fill={i < Math.floor(product.rating) ? "#28a745" : "#8d8a8a"} height={18} width={18} />
          ))
          }
          <Typography fontSize="smaller" ml={12} As={"span"}>(211)</Typography>
        </Stack>
        <Stack direction="row" mt={8} align="center">
          <Typography fontSize="large" As="span">Rs. {discountedPrice}</Typography>
          <Typography color="grey-10" className={styles.originalPrice} ml={16} As="span">Rs. {product.price}</Typography>
          <Typography fontSize="small" ml={16} As="span">{product.discountPercentage}% OFF</Typography>
        </Stack>
        <Typography As="p" fontSize="small">
          {product.description}
        </Typography>

        <Card mb={5} borderRadius backgroundColor="light" p={15} mt={30}>
          <Stack direction="col">
            <Stack direction="row" align="center" mb={8}>
              <Truck height={25} width={25} fill={"#008DDA"} />
              <Typography ml={8} As="span" fontSize="medium" >Free Devliery</Typography>
            </Stack>
            <Typography As="span" fontSize={"smaller"}>Check you postal code for free delivery availability</Typography >
          </Stack>
        </Card>
        <Card borderRadius backgroundColor="light" p={15} >
          <Stack direction="col" justify="left">
            <Stack direction="row" align="center" mb={8}>
              <WritingPad height={20} width={20} fill={"#008DDA"} />
              <Typography ml={8} As="span" fontSize="medium">30 days return policy</Typography>
            </Stack>
            <Typography As="span" fontSize={"smaller"}>Free 30 days return delivery</Typography >
          </Stack>
        </Card>
        <Stack direction="row" spacing={10} mt={30}>
          <Button onClick={() => dispatch(setCartProduct({product}))} btntype="primary" fullWidth pt={12} pb={12}>Add to cart</Button>
          <Button btntype="primary" variant="outline" fullWidth>Buy Now</Button>
        </Stack>
      </Col>
    </Row>
  )
}

export default ProductDetails