import ProductCard from "./ProductCard/ProductCard";
import ProductFilters from "./ProductFilters/ProductFilters";

//styles
import Col from "../../components/Layouts/Col/Col";
import Row from "../../components/Layouts/Row/Row";
import InfiniteScroller from "../../hooks/InfiniteScroll";
import { getProducts } from "../../services/productService";
import { dispatch, useAppSelector } from "../../store/store";
import styles from "./ProductCatalogue.module.scss";

const ProductCatalogue = () => {

  const { productData, isLoading, skip, total } = useAppSelector(state => state.products);

  const getMoreData = async () => {
    dispatch(getProducts({ skip: skip + 10, limit: 10 }))
  }

  return (
    <Row m={10} colGap={15}>
      <Col col={6}>
        <ProductFilters />
      </Col>
      <Col col={17}>

        <InfiniteScroller callback={getMoreData} isLoading={isLoading} hideSentinal={total - 1 >= productData.length} >
          <div className={styles.grid}>
            {productData.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </InfiniteScroller>
      </Col>
    </Row>
  )
}

export default ProductCatalogue