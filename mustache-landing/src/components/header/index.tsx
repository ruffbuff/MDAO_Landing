import Button from "components/basic/button";
import Flex from "components/basic/flex";
import Icon from "components/basic/icon";
import { Span } from "components/basic/text";
import { useEffect, useState } from "react";
import Heading from "components/basic/heading";
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

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
                     <a href="/"><Heading level={3}>MustacheDAO</Heading></a>
                </Flex>
                <Flex $style={{
                    display: "none",
                    queries: {
                        420: {
                            display: "flex"
                        }
                    }
                }}>
                     <a href="/"><Heading level={3}>MustacheDAO</Heading></a>
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
                </Flex>
                </Flex>
                <Flex $style={{
                    gap: "2rem"
                }}>
                    <Flex onClick={() => setIsDark(!isDark)}>
                        {
                            isDark ? <Icon icon="moon" /> : <Icon icon="sun" />
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