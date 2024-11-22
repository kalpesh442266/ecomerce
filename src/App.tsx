import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import store from "./store/store";
import Loader from "./views/Loader/Loader";

function App() {
  /**
    make hoc for navbar
    add cart list component - cart button
    add filters - by price, sorting 
    create cart component
    create a profile page
    create filters
    create sorting

    add animations
    add loader - added (check it)
    add error page for react router
    add dynamic skeleton with shimmering effect
    add storybook
  **/


  return (
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={<Loader coverPage />} />
    </Provider>
  )
}

export default App;
