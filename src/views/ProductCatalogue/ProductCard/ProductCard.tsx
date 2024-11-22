import { useNavigate } from "react-router-dom";
import Rating from "../../../Icons/Rating";
import { calulateDiscountedPrice } from "../../../utils/producUtils";
import { ProductCardProps } from "./IProductCard";

//styles
import styles from "./ProductCard.module.scss";
import Card from "../../../components/Card/Card";
import Typography from "../../../components/Typography/Typography";
import Stack from "../../../components/Layouts/Stack/Stack";
import Box from "../../../components/Box/Box";

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const discountedPrice = calulateDiscountedPrice(product.price, product.discountPercentage)
  return (
    <Card backgroundColor="light" onClick={() => { navigate(`/product/${product.id}`) }} className={styles.cardContainer} borderRadius>
      <div className={styles.imageContainer}>
        <img className={styles.productImage} src={product.images[0]} />
        <Stack direction="row" align="center" className={styles.ratingWrapper} pl={4} pr={4}>
          <Rating height={18} width={18} fill={product.rating < 3 ? "#dc3545" : "#28a745"} />
          <Typography As="span" fontSize="smaller">{product.rating}</Typography>
        </Stack>
      </div>
      <Box pr={12} pb={14} pl={12}>
        <Typography ellipsis mt={10} As="h3" fontSize="large" fontWeight="light">
          {product.title}
        </Typography>

        <Stack direction="row" align="center" mt={10}>
          <Typography As="span" fontSize="small" fontWeight="normal">Rs. {discountedPrice}</Typography>
          <Typography color="grey-10" ml={6} As="span" lineThrough fontSize="small" >Rs. {product.price}</Typography>
          <Typography ml={6} fontSize="small" As="span">{product.discountPercentage}% OFF</Typography>
        </Stack>
      </Box>
      <Box p={4} pl={6} pr={6} className={product.stock < 40 ? styles.fewRemaining : styles.inStock}>
        {product.stock < 40 ? "Only few remaining" : "In Stock"}
      </Box>
    </Card>
  )
}

export default ProductCard
