import Button from "components/basic/button";
import Flex from "components/basic/flex";
import Icon from "components/basic/icon";
import { Span } from "components/basic/text";
import { useEffect, useState } from "react";
import Heading from "components/basic/heading";
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { actions as appActions } from "store/app.slice";
import Link from "components/basic/link";
import { useDispatch } from "react-redux";

export default function Header() {
    const [isDark, setIsDark] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const setDarkMode = () => {
            document.body.classList.toggle('dark-theme');
            dispatch(appActions.toggleMode());
        };
    
        setDarkMode();
    }, [isDark, dispatch]);

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
                    <RouterLink to="/market">
                        <Button disabled $style={{ border: "1px solid white", kind: "radius" }}>
                            WORKING
                        </Button>
                    </RouterLink>
                </Flex>
            </Flex>
        </Flex>
    )
}