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

export default function Header() {

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
                <Flex as="ul" $style={{
                    gap: "2rem",
                    queries: {
                        860: {
                            display: 'none'
                        }
                    }
                }}>
                    <Flex as="ul" $style={{ gap: "2rem" }}>
                        <ScrollLink to="about" smooth={true} duration={500}><Span>About</Span></ScrollLink>
                        <ScrollLink to="roadmap" smooth={true} duration={500}><Span>Roadmap</Span></ScrollLink>
                        <ScrollLink to="team" smooth={true} duration={500}><Span>Team</Span></ScrollLink>
                        <ScrollLink to="faq" smooth={true} duration={500}><Span>FAQ</Span></ScrollLink>
                        {/*<Link to={configs.appConfigs.path.MARKET_PREFIX}><Span>Market</Span></Link>*/}
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
                    <RouterLink to="/sale">
                        <Button $style={{ border: "1px solid white", kind: "radius" }}>
                            Sale
                        </Button>
                    </RouterLink>
                </Flex>
            </Flex>
        </Flex>
    )
}