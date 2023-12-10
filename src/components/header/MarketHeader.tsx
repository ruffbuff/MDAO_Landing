import Flex from "components/basic/flex";
import Icon from "components/basic/icon";
import { Span } from "components/basic/text";
import { useEffect, useState } from "react";
import Heading from "components/basic/heading";
import Link from "components/basic/link";
import configs from "configs";
import { useDispatch } from "react-redux";
import { actions as appActions } from "store/app.slice";
import { ConnectWallet } from "@thirdweb-dev/react";

function MarketHeader() {

    const [isDark, setIsDark] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setDarkMode();
    }, [isDark])

    const setDarkMode = () => {
        document.body.classList.toggle('dark-theme');
        dispatch(appActions.toggleMode());
    }

    return (
        <Flex $style={{
            vAlign: "center",
            w: "100%",
            hAlign: "center",
            position: "relative",
            zIndex: "1"
        }}>
            <Flex $style={{
                maxW: "1440px",
                w: "100%",
                vAlign: "center",
                hAlign: "space-between",
                p: "1rem"
            }}>
                <Flex $style={{
                    queries: {
                        420: {
                            display: "none"
                        }
                    }
                }}>
                    <Link to="/"><Heading level={3}>MustacheDAO</Heading></Link>
                </Flex>
                <Flex $style={{
                    display: "none",
                    queries: {
                        420: {
                            display: "flex"
                        }
                    }
                }}>
                    <Link to="/"><Heading level={3}>MustacheDAO</Heading></Link>
                </Flex>
                <Flex $style={{
                    gap:"2rem"
                }}>
                    <Flex as="ul" $style={{
                        gap: "2rem",
                        queries: {
                            860: {
                                display: 'none'
                            }
                        }
                    }}>
                        <Flex as="ul" $style={{ gap: "2rem" }}>
                            <Link to={configs.appConfigs.path.PUBLIC_PREFIX}><Span>Home</Span></Link>
                            <Link to={configs.appConfigs.path.PROFILE_PREFIX}><Span>Profile</Span></Link>
                        </Flex>
                    </Flex>
                    <Flex $style={{
                        gap: "2rem"
                    }}>
                        <Flex onClick={() => setIsDark(!isDark)}>
                            {
                                isDark ?
                                    <Flex $style={{
                                        cursor: "pointer"
                                    }}>
                                        <Icon icon="moon" />
                                    </Flex> :
                                    <Flex $style={{
                                        cursor: "pointer"
                                    }}>
                                        <Icon icon="sun" />
                                    </Flex>
                            }
                        </Flex>
                        <ConnectWallet
                            theme={"dark"}
                            btnTitle={"Welcome"}
                            modalTitle={"Choose your wallet"}
                            switchToActiveChain={true}
                            modalSize={"compact"}
                            welcomeScreen={{ title: "Welcome" }}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default MarketHeader;