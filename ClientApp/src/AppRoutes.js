import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { NewListingPage } from "./Pages/NewListingPage";
import { ViewListingPage } from "./Pages/ViewListingPage";
import { ViewListingsPage } from "./Pages/ViewListingsPage";
import { LoginPage } from "./Pages/LoginPage";
import { LogoutPage } from "./Pages/LogoutPage";


const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/home',
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
    {
        path: '/viewlistings',
        element: <ViewListingsPage />
    },    
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/logout',
        element: <LogoutPage />
    },

];

export default AppRoutes;
