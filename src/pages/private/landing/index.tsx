import Flex from "components/basic/flex"
import Heading from "components/basic/heading"
import { P } from "components/basic/text"
import { Span } from "components/basic/text"
import Table from "components/basic/table"
import { Tr, Th } from "components/basic/table"
import Image from "components/basic/image"
import Link from "components/basic/link";
import appConstants from "constant"
import Button from "components/basic/button"
import Grid from "components/basic/grid"
import { Input } from "components/basic/input"
import Icon from "components/basic/icon"
import configs from "configs";
import NFTCollectionFetcher from './NFTCollectionFetcher';
import TrendingCollection from './TrendingCollection';
import { CONTRACT_AWAKENED } from "../../../solContracts";

export default function MpLandingPage() {
    return (
        <Flex $style={{
            fDirection: "column",
            w: "100%",
            vAlign: "center",
            position: "relative",
            zIndex: "1"
        }}>
            <Flex $style={{
                background: `url(${appConstants.Imgs.BG2})`,
                h: "50rem",
                mb: "10rem",
                w: "100%"
            }}>
                <Flex $style={{
                    background: "linear-gradient(180deg, rgba(162, 89, 255, 0.00) 0%, #232323 100%);",
                    h: "100%",
                    w: "100%",
                    hAlign: "center",
                    p: '1rem'
                }}>
                    <Flex $style={{
                        vAlign: "flex-end",
                        hAlign: "space-between",
                        w: "100%",
                        p: "3rem 0",
                        maxW: "1440px",
                        queries: {
                            620: {
                                fDirection: "column",
                                hAlign: "flex-end",
                                vAlign: "flex-start",
                                gap: "1rem"
                            }
                        }
                    }}>
                        <Flex $style={{
                            fDirection: "column",
                            vAlign: "flex-start",
                            gap: "2rem"
                        }}>
                            <Flex $style={{
                                background: "#3B3B3B",
                                p: ".5rem 1rem",
                                radius: "1rem"
                            }}>
                                <Span>INCOMING</Span>
                            </Flex>
                            <Heading level={2}>MustacheDAO: Whales</Heading>
                            <Button $style={{
                                bg: "white",
                                color: "black",
                                kind: "radius"
                            }}>
                                EXPLORE MORE
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex $style={{
                fDirection: "column",
                maxW: "1440px",
                w: "100%",
                mb: "6rem",
                p: "1rem"
            }}>
                <Flex $style={{
                    fDirection: "column",
                    w: "100%",
                    hAlign: "center",
                    gap: "5rem",
                }}>
                    <Flex $style={{
                        fDirection: "column"
                    }}>
                        <Heading level={2}>Top Collections</Heading>
                        <P>Check out top ranking NFT collection on the MustachePlace Marketplace.</P>
                    </Flex>
                </Flex>
                <Flex $style={{
                    overflow: "auto"
                }}>
                    <Table>
                        <Tr>
                            <Th>Collection</Th>
                            <Th>Supply</Th>
                            <Th>NFTs Sold</Th>
                            <Th>Floor Price</Th>
                            <Th>Volume</Th>
                        </Tr>
                        <NFTCollectionFetcher />
                    </Table>
                </Flex>
            </Flex>
            <Flex $style={{
                gap: "2rem",
                fDirection: "column",
                mb: "6rem",
                maxW: "1440px",
                p: "1rem",
            }}>
                <Flex $style={{
                    fDirection: "column",
                    gap: ".5rem"
                }}>
                    <Heading level={3}>Trending Collection</Heading>
                    <P>Checkout our weekly updated trending collection.</P>
                </Flex>
                <Grid $style={{
                    columns: "5",
                    w: "100%",
                    gap: "2rem",
                    $queries: {
                        1240: {
                            columns: "4"
                        },
                        920: {
                            columns: "3"
                        },
                        480: {
                            columns: "2"
                        }
                    }
                }}>
                    <Link to={configs.appConfigs.path.COLLECTION_PREFIX}>
                        <TrendingCollection
                            contractAddress={CONTRACT_AWAKENED || 'defaultAddress'}
                            collectionTitle="Awakened Mushrooms"
                        />
                    </Link>
                </Grid>
            </Flex>
            <Flex $style={{
                fDirection: "column",
                gap: "2rem",
                mb: "5rem",
                w: "100%",
                maxW: "1440px",
                p: "1rem"
            }}>
                <Flex $style={{
                    fDirection: "column"
                }}>
                    <Heading level={3}>How It Works</Heading>
                    <Span>Find out how to get started</Span>
                </Flex>
                <Grid $style={{
                    columns: "3",
                    gap: "2rem",
                    $queries: {
                        980: {
                            columns: "2"
                        },
                        680: {
                            columns: "1"
                        }
                    }
                }}>
                    <Flex $style={{
                        background: "rgba(16,16,16,.2)",
                        hoverbackground: "rgba(16,16,16,.4)",
                        transition: "background 0.2s ease, transform 0.2s ease",
                        radius: "1rem",
                        fDirection: "column",
                        vAlign: "center",
                        p: "2rem 1rem"
                    }}>
                        <Icon icon="s-wallet" />
                        <Flex $style={{
                            fDirection: "column",
                            vAlign: "center",
                            gap: ".5rem"
                        }}>
                            <Heading level={4}>Setup your wallet</Heading>
                            <P $style={{
                                align: "center"
                            }}>Set up your wallet of choice. Connect it to the MustachePlace by clicking the "Connect" in the top right corner.</P>
                        </Flex>
                    </Flex>
                    <Flex $style={{
                        background: "rgba(16,16,16,.2)",
                        hoverbackground: "rgba(16,16,16,.4)",
                        transition: "background 0.2s ease, transform 0.2s ease",
                        radius: "1rem",
                        fDirection: "column",
                        vAlign: "center",
                        p: "2rem 1rem"
                    }}>
                        <Icon icon="s-collection" />
                        <Flex $style={{
                            fDirection: "column",
                            vAlign: "center",
                            gap: ".5rem"
                        }}>
                            <Heading level={4}>Fund your wallet</Heading>
                            <P $style={{
                                align: "center"
                            }}>Fund your wallet with some $MATIC or $AMBER.</P>
                        </Flex>
                    </Flex>
                    <Flex $style={{
                        background: "rgba(16,16,16,.2)",
                        hoverbackground: "rgba(16,16,16,.4)",
                        transition: "background 0.2s ease, transform 0.2s ease",
                        radius: "1rem",
                        fDirection: "column",
                        vAlign: "center",
                        p: "2rem 1rem"
                    }}>
                        <Icon icon="s-earn" />
                        <Flex $style={{
                            fDirection: "column",
                            vAlign: "center",
                            gap: ".5rem"
                        }}>
                            <Heading level={4}>Start Sweeping</Heading>
                            <P $style={{
                                align: "center"
                            }}>Choose between auctions and fixed-price listings. Start earning by selling your NFTs or trading others.</P>
                            <P $style={{
                                align: "center"
                            }}>'Auctions are not LIVE yet!'</P>
                        </Flex>
                    </Flex>
                </Grid>
            </Flex>
            <Flex $style={{
                p: "1rem",
                w: "100%",
                hAlign: "center"
            }}>
                <Flex $style={{
                    background: "rgba(16,16,16,.2)",
                    vAlign: "center",
                    gap: "3rem",
                    radius: "2rem",
                    mb: "5rem",
                    w: "100%",
                    maxW: "1440px",
                    p: "1rem"
                }}>
                    <Flex $style={{
                        queries: {
                            880: {
                                display: "none"
                            }
                        }
                    }}>
                        <Image src={appConstants.Imgs.BG3} />
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: "1rem",
                        queries: {
                            880: {
                                p: "2rem"
                            }
                        }
                    }}>
                        <Flex $style={{
                            fDirection: "column",
                            gap: ".5rem"
                        }}>
                            <Heading level={3}>Join Our Weekly Digest</Heading>
                            <P>Get exclusive promotions & updates straight to your mail.</P>
                        </Flex>
                        <Flex $style={{
                            gap: "1rem",
                            w: "100%",
                            queries: {
                                480: {
                                    fWrap: "wrap"
                                }
                            }
                        }}>
                            <Input $style={{
                                bg: "black"
                            }} placeholder="Enter your email here" />
                            <Flex $style={{
                                queries: {
                                    480: {
                                        w: "100%"
                                    }
                                }
                            }}>
                                <Button disabled $style={{
                                    bg: "gray",
                                    kind: "radius",
                                    w: "100%"
                                }}>
                                    Subscribe
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}