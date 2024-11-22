import { createBrowserRouter } from "react-router-dom";
import MainPageHoc from "../Hoc/MainPageHoc/MainPageHoc";
import { getProduct, getProductsData } from "../services/productService";
import { setData } from "../store/products/productsSlice";
import { dispatch } from "../store/store";
import ErrorPage from "../views/ErrorPage/ErrorPage";
import ProductCart from "../views/ProductCart/ProductCart";
import ProductCatalogue from "../views/ProductCatalogue/ProductCatalogue";
import ProductDetails from "../views/ProductDetails/ProductDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPageHoc />,
        children: [
            {
                path: "",
                loader: async () => {
                    const data = await getProductsData({ skip: 0, limit: 10 })
                    dispatch(setData({ data }))
                    return data;
                },
                element: <ProductCatalogue />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/product/:id",
                loader: async ({ params }) => {
                    return await getProduct(params.id ? params.id : "")
                },
                element: <ProductDetails />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/cart",
                element: <ProductCart />,
                errorElement: <ErrorPage />,
            },
            {
                path: "*",
                element: <ErrorPage />
            }

        ]
    },

]);




