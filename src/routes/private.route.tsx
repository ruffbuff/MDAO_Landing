import configs from "configs";
import CollectionPage from "pages/private/collection";
import DetailPage from "pages/private/detail";
import MpLandingPage from "pages/private/landing";
import ProfilePage from "pages/private/profile";

const privateRoutes = [
    {
        path: configs.appConfigs.path.MARKET_PREFIX,
        element: <MpLandingPage />
    },
    {
        path: configs.appConfigs.path.PROFILE_PREFIX,
        element: <ProfilePage />
    },
    {
        path: configs.appConfigs.path.COLLECTION_PREFIX,
        element: <CollectionPage />
    },
    {
        path: configs.appConfigs.path.DETAIL_PREFIX,
        element: <DetailPage />
    }
]

export default privateRoutes;