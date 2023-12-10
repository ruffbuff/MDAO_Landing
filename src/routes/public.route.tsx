import configs from "configs";
import LandingPage from "pages/public/landing";
import SalePage from 'pages/public/sale';

const publicRoutes = [
    {
        path: configs.appConfigs.path.PUBLIC_PREFIX,
        element: <LandingPage/>
    },
    {
        path: '/sale',
        element: <SalePage/>
    }
]

export default publicRoutes;