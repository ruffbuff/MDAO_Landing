import configs from "configs";
import { createBrowserRouter } from "react-router-dom";
import publicRoutes from "./public.route";

const mainRouter = createBrowserRouter([
    {
        path: configs.appConfigs.path.PUBLIC_PREFIX,
        children: publicRoutes
    }
]);

export default mainRouter;