import { Outlet } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";


const MainPageHoc = () => {

    return (
        <>
            <Navigation />
            <Outlet context={"Hello"} />
        </>
    )
}

export default MainPageHoc