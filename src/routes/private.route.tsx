import configs from "configs";
import KabanaClubPage from "pages/private/collection";
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
        element: <KabanaClubPage />
    },
    {
        path: `${configs.appConfigs.path.MARKET_PREFIX}:contractAddress/:tokenId`,
        element: <DetailPage />
    }
]

export default privateRoutes;