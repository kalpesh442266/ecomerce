//styles
import style from "./ProductFilter.module.scss";

import { ChangeEvent, useEffect, useState } from "react";
import Select from 'react-select';
import Box from "../../../components/Box/Box";
import Card from "../../../components/Card/Card";
import Input from "../../../components/Form/Input/Input";
import Typography from "../../../components/Typography/Typography";
import { getCategories, getProducts } from "../../../services/productService";
import { setExternalFilters, setInbuiltFilters } from "../../../store/products/productsSlice";
import { useAppDispatch } from "../../../store/store";


type Props = {}

const ProductFilters = (props: Props) => {
  const [categories, setCategories] = useState<{ value: string, label: string }[]>([{ value: "all", label: "All" }]);
  const dispatch = useAppDispatch();

  const sortOptions = [
    { value: 'sortByPopularity_DSC', label: 'Popularity-High to Low' },
    { value: 'sortByPopularity_ASC', label: 'Popularity-Low to High' },
    { value: 'sortByPrice_ASC', label: 'Price-Low to High' },
    { value: 'sortByPrice_DSC', label: 'Price-High to Low' },
  ]

  useEffect(() => {
    getCategories().then((data: string[]) => {
      const processedData = data.map((category: string) => {
        return { value: category.toLowerCase(), label: category }
      })
      setCategories(prevData => ([...prevData, ...processedData]));
    });

  }, [])

  const handleFilter = (key: string, value: string) => {
    console.log(key, value)
    dispatch(setInbuiltFilters({ key: key, value: value }));
    dispatch(getProducts({ skip: 0, limit: 20 }))
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    let timerId: ReturnType<typeof setTimeout> = 0;

    clearTimeout(timerId);
    timerId = setTimeout(() => {
      handleFilter("searchBy", e.target.value)
    }, 1000)

  }

  const handleSortFilter = (value: string) => {
    dispatch(setExternalFilters(value))
  }

  return (
    <Card borderRadius backgroundColor="light" p={15}>
      <div className={style.container}>
        <Typography As={"h2"} fontSize="large">Product Filters</Typography>

        <Box mt={15}>
          <Typography As={"p"} fontSize="small">Search products</Typography>
          <Input onChange={handleSearch} placeholder="search products..." />
        </Box>

        <Box mt={15}>
          <Typography As={"p"} fontSize="small">Sort By</Typography>
          <Select onChange={(e) => { if (e) handleSortFilter(e.value) }} placeholder="Sort By..." options={sortOptions} />
        </Box>

        <Box mt={15}>
          <Typography As={"p"} fontSize="small" >Filter By Categories</Typography>
          <Select onChange={async (e) => { if (e) handleFilter("category", e.value) }} defaultValue={categories[0]} placeholder="Select catagory..." options={categories} />
        </Box>
      </div>
    </Card>
  )
}

export default ProductFilters