import configs from "configs";
import ActivityPage from "pages/private/activity";
import CollectionPage from "pages/private/collection";
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
        path: configs.appConfigs.path.ACTIVITY_PREFIX,
        element: <ActivityPage />
    }
]

export default privateRoutes;