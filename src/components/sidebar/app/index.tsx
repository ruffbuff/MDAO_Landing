import { useSelector, useDispatch } from "react-redux";
import { actions as appActions } from "store/app.slice";
import AppSidebarUI from "./ui";

export default function AppSidebar() {

    const sidebar = useSelector((state: any) => state.app.sidebar);

    const dispatch = useDispatch();

    const handleClose = async () => {
        dispatch(appActions.toggleMenu());
    };

    return (
        <AppSidebarUI
            handleClose={handleClose}
            isOpen={sidebar}
        />
    )
}