import configs from "configs";
import { createBrowserRouter } from "react-router-dom";
import publicRoutes from "./public.route";
import privateRoutes from "./private.route";
import PrivatePages from "pages/private";

const mainRouter = createBrowserRouter([
    {
        path: configs.appConfigs.path.PUBLIC_PREFIX,
        children: publicRoutes
    },
    {
        path: configs.appConfigs.path.MARKET_PREFIX,
        children: privateRoutes,
        element: <PrivatePages/>
    }
]);

export default mainRouter;