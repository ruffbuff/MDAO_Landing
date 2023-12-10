import Flex from "components/basic/flex";
import Grid from "components/basic/grid";
import Heading from "components/basic/heading";
import Icon from "components/basic/icon";
import Image from "components/basic/image";
import { P, Span } from "components/basic/text";
import appConstants from "constant";

export default function DetailPage() {

    return (
        <Flex $style={{
            w: "100%",
            position: "relative",
            zIndex: "1",
            m: "5rem 0"
        }}>
            <Flex $style={{
                gap: "2rem",
                w: "100%",
                hAlign: "center",
                queries: {
                    768: {
                        fDirection: "column"
                    }
                }
            }}>
                <Flex $style={{
                    fDirection: "column",
                    gap: "2rem",
                    maxW: "40rem"
                }}>
                    <Image $style={{
                        radius: "1rem"
                    }} src={appConstants.Imgs.DETAIL} />
                    <Flex $style={{
                        fDirection: "column"
                    }}>
                        <Flex $style={{
                            gap: "1rem",
                            fDirection: "column",
                            background: "rgba(16,16,16,.2)",
                            p: "1rem",
                            radius: "1rem",
                            border: ".5px solid #2D2E36",
                            mb: "1rem"
                        }}>
                            <Heading level={5}>Description</Heading>
                            <P>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                            </P>
                        </Flex>
                        <Flex $style={{
                            gap: "1rem",
                            fDirection: "column",
                            background: "rgba(16,16,16,.2)",
                            p: "1rem",
                            radius: "1rem",
                            border: ".5px solid #2D2E36"
                        }}>
                            <Heading level={5}>Attributes</Heading>
                            <Grid $style={{
                                columns: "3",
                                gap: "1rem"
                            }}>

                            </Grid>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex $style={{
                    fDirection: "column",
                    w: "100%",
                    maxW: "30rem"
                }}>
                    <Flex $style={{
                        mb: '1rem',
                        hAlign: "space-between"
                    }}>
                        <Heading level={3}>Abstact Smoke Red Blue</Heading>
                        <Flex $style={{
                            gap: ".5rem"
                        }}>
                            <Icon icon={'graph'} />
                            <Icon icon={'wallet'} />
                            <Icon icon={'message'} />
                        </Flex>
                    </Flex>
                    <Flex $style={{
                        gap: "1rem",
                        fDirection: "column",
                        background: "rgba(16,16,16,.2)",
                        p: "1rem",
                        radius: "1rem",
                        border: ".5px solid #2D2E36",
                        mb: "1rem"
                    }}>
                        <Heading level={5}>Details</Heading>
                        <Flex $style={{
                            gap: ".5rem",
                            fDirection: "column",
                        }}>
                            <Flex $style={{
                                hAlign: "space-between"
                            }}>
                                <Span>Owner</Span>
                                <Span></Span>
                            </Flex>
                            <Flex $style={{
                                hAlign: "space-between"
                            }}>
                                <Span>Fee</Span>
                                <Span></Span>
                            </Flex>

                        </Flex>
                    </Flex>
                    <Flex $style={{
                        gap: "1rem",
                        fDirection: "column",
                        background: "rgba(16,16,16,.2)",
                        p: "1rem",
                        radius: "1rem",
                        border: ".5px solid #2D2E36",
                        mb: "1rem"
                    }}>
                        <Heading level={5}> Buy Offers</Heading>

                    </Flex>
                    <Flex $style={{
                        gap: "1rem",
                        fDirection: "column",
                        background: "rgba(16,16,16,.2)",
                        p: "1rem",
                        radius: "1rem",
                        border: ".5px solid #2D2E36",
                        mb: "1rem"
                    }}>
                        <Heading level={5}>Activity</Heading>

                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}