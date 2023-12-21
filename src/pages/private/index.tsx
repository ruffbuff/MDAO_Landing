import MarketFooter from "components/footer/MarketFooter";
import MarketHeader from "components/header/MarketHeader";
import { Outlet } from "react-router-dom";
import Flex from "components/basic/flex";
import Image from "components/basic/image";
import appConstants from "constant";
import { useSelector } from "react-redux";
import AppSidebar from "components/sidebar/app";
export default function PrivatePages() {

    const mode = useSelector((state: any) => state.app.mode);

    return (
        <Flex $style={{
            fDirection: "column",
            overflow: "hidden",
            position: "relative",
        }}>
            <AppSidebar/>
            <MarketHeader />
            <Outlet />
            <MarketFooter />
            {
                !mode &&
                <>
                    <Flex $style={{
                        background: "rgba(35,35,35,.6)",
                        position: "absolute",
                        zIndex: "0",
                        top: "0",
                        bottom: "0",
                        right: "0",
                        left: "0"
                    }}>

                    </Flex>
                    <Flex $style={{
                        position: "absolute",
                        zIndex: "-1",
                        top: "-15%"
                    }}>
                        <Image src={appConstants.Imgs.ECLISPSE2} />
                    </Flex>
                    <Flex $style={{
                        position: "absolute",
                        zIndex: "-1",
                        bottom: "30%"
                    }}>
                        <Image src={appConstants.Imgs.ECLISPSE1} />
                    </Flex>
                    <Flex $style={{
                        position: "absolute",
                        zIndex: "-1",
                        bottom: "0"
                    }}>
                        <Image src={appConstants.Imgs.ECLISPSE3} />
                    </Flex>
                </>
            }
        </Flex>
    )
}