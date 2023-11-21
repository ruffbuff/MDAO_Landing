import configs from "configs";
import LandingPage from "pages/public/landing";

const publicRoutes = [
    {
        path: configs.appConfigs.path.PUBLIC_PREFIX,
        element: <LandingPage/>
    }
]

export default publicRoutes;