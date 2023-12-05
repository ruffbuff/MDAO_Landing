import MarketFooter from "components/footer/MarketFooter";
import MarketHeader from "components/header/MarketHeader";
import { Outlet } from "react-router-dom";

export default function PrivatePages() {
    return (
        <>
            <MarketHeader />
            <Outlet />
            <MarketFooter />
        </>
    )
}