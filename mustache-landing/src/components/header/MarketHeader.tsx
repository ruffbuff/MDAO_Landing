import Button from "components/basic/button";
import Flex from "components/basic/flex";
import Icon from "components/basic/icon";
import { Span } from "components/basic/text";
import { useEffect, useState } from "react";
import Heading from "components/basic/heading";
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import Link from "components/basic/link";
import configs from "configs";

export default function MarketHeader() {

    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setDarkMode();
    }, [isDark])

    const setDarkMode = () => {
        document.body.classList.toggle('dark-theme');
    }

    return (
        <Flex $style={{
            vAlign: "center",
            w: "100%",
            hAlign: "center",
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
                            <Link to={configs.appConfigs.path.PROFILE_PREFIX}><Span>Profile</Span></Link>
                            <Link to={configs.appConfigs.path.COLLECTION_PREFIX}><Span>Collections</Span></Link>
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
                        <Button $style={{ kind: "radius", bg: "#A259FF" }}>
                            Sign up
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}