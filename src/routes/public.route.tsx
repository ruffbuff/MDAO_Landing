import configs from "configs";
import LandingPage from "pages/public/landing";
import SalePage from 'pages/public/sale';
import MutatePage from 'pages/public/mutate';
import MergePage from 'pages/public/merge';

const publicRoutes = [
    {
        path: configs.appConfigs.path.PUBLIC_PREFIX,
        element: <LandingPage/>
    },
    {
        path: '/sale',
        element: <SalePage/>
    },
    {
        path: '/mutate',
        element: <MutatePage/>
    },
    {
        path: '/merge',
        element: <MergePage/>
    }
]

export default publicRoutes;