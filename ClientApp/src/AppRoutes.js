import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { NewListingPage } from "./Pages/NewListingPage";
import { ViewListingPage } from "./Pages/ViewListingPage";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/newlisting',
        element: <NewListingPage />
    },
    {
        path: '/viewlisting',
        element: <ViewListingPage />
    },
    

];

export default AppRoutes;
