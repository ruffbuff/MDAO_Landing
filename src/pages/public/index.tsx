import Flex from "components/basic/flex";
import Image from "components/basic/image";
import appConstants from "constant";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export default function PublicPages() {
    const mode = useSelector((state: any) => state.app.mode);

    return (
        <Flex $style={{
            fDirection: "column",
            overflow: "hidden",
            position: "relative"
        }}>
            <Outlet />
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