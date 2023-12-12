import Flex from "components/basic/flex";
import Heading from "components/basic/heading";
import Icon from "components/basic/icon";

export default function Footer() {
    return (
        <Flex $style={{
            vAlign: "center",
            hAlign: "space-between",
            w: "100%",
            maxW: "1440px",
            p: "1rem",
            queries: {
                600: {
                    fDirection: "column",
                    gap: "1rem"
                }
            }
        }}>
            <Heading level={5}>Terms Of Use</Heading>
            <Flex $style={{
                fDirection: "column",
                gap: "1rem",
                vAlign: "center"
            }}>
            <a href="/" style={{ textDecoration: 'none' }}>
                <Heading gradient level={2}>MustacheDAO</Heading>
            </a>
                <Flex $style={{
                    hAlign: "center",
                    gap: '1rem'
                }}>
                    <a href="https://discord.gg/YDYvF29bkZ" target="_blank" rel="noopener noreferrer">
                        <Flex $style={{
                            w: "3rem",
                            h: "2rem",
                            radius: "1rem",
                            vAlign: "center",
                            hAlign: "center",
                            border: "1px solid #CCC"
                        }}>
                            <Icon icon={'discord'} />
                        </Flex>
                    </a>
                    <a href="https://twitter.com/_MustacheDAO" target="_blank" rel="noopener noreferrer">
                        <Flex $style={{
                            w: "3rem",
                            h: "2rem",
                            radius: "1rem",
                            vAlign: "center",
                            hAlign: "center",
                            border: "1px solid #CCC"
                        }}>
                            <Icon icon={'twitter'} />
                        </Flex>
                    </a>
                </Flex>
            </Flex>
            <Heading level={5}>Privacy & Policy</Heading>
        </Flex>
    );
}
