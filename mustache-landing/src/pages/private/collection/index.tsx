import Button from "components/basic/button";
import Flex from "components/basic/flex";
import Grid from "components/basic/grid";
import Heading from "components/basic/heading";
import Icon from "components/basic/icon";
import Image from "components/basic/image";
import { Input } from "components/basic/input";
import { P, Span } from "components/basic/text";
import appConstants from "constant";

export default function CollectionPage() {
    return (
        <Flex $style={{
            fDirection: "column",
            flex: "1",
            vAlign: "center"
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
                    hAlign: "center"
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
                                <Span>Shroomie</Span>
                            </Flex>
                            <Heading level={2}>Magic Mashrooms</Heading>
                            <Button $style={{
                                bg: "white",
                                color: "black",
                                kind: "radius"
                            }}>
                                See NFT
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex $style={{
                fDirection: "column",
                mb: "3rem",
                w: "100%",
                maxW: "1440px",
            }}>
                <Flex $style={{
                    gap: "2rem",
                    mb: "2rem"
                }}>
                    <Span>Whitepaper</Span>
                    <Span>Roadmap</Span>
                </Flex>
                <Flex $style={{
                    fDirection: "column",
                    gap: "1rem",
                    mb: "2rem"
                }}>
                    <Heading level={4}>Description</Heading>
                    <P>
                        The Orbitians is a collection of 10,000 unique NFTs on the Ethereum blockchain,There are all sorts of beings in the NFT Universe. The most advanced and friendly of the bunch are Orbitians. They live in a metal space machines, high up in the sky and only have one foot on Earth.
                        These Orbitians are a peaceful race, but they have been at war with a group of invaders for many generations. The invaders are called Upside-Downs, because of their inverted bodies that live on the ground, yet do not know any other way to be. Upside-Downs believe that they will be able to win this war if they could only get an eye into Orbitian territory, so they've taken to make human beings their target.
                    </P>
                </Flex>
                <Flex $style={{
                    gap: "2rem",
                    queries: {
                        420: {
                            fDirection: "column"
                        }
                    }
                }}>
                    <Flex $style={{
                        fDirection: "column",
                        gap: ".5rem"
                    }}>
                        <Heading level={4}>116 ETH</Heading>
                        <Span>Total Volume</Span>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: ".5rem"
                    }}>
                        <Heading level={4}>0.03 ETH</Heading>
                        <Span>Floor price</Span>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: ".5rem"
                    }}>
                        <Heading level={4}>0.16 ETH</Heading>
                        <Span>Best Offer</Span>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: ".5rem"
                    }}>
                        <Heading level={4}>18%</Heading>
                        <Span>Listed</Span>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: ".5rem"
                    }}>
                        <Heading level={4}>1230</Heading>
                        <Span>Owners</Span>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: ".5rem"
                    }}>
                        <Heading level={4}>16%</Heading>
                        <Span>Unique Owners</Span>
                    </Flex>
                </Flex>
            </Flex>
            <Flex $style={{
                gap: "1rem",
                vAlign: "center",
                mb: "3rem",
                w: "100%",
                maxW: "1440px",
                queries: {
                    768: {
                        fDirection: "column"
                    }
                }
            }}>
                <Flex $style={{
                }}>
                    <Span $style={{
                        wrap: "nowrap"
                    }}>Live 7777 results</Span>
                </Flex>
                <Input $style={{
                    border: "1px solid #3B3B3B"
                }} placeholder="Search by Name" />
                <Input $style={{
                    border: "1px solid #3B3B3B"
                }} placeholder="Price to Low" />
                <Flex $style={{
                    gap: "1rem",
                    queries: {
                        380: {
                            fDirection: "column"
                        }
                    }
                }}>
                    <Button $style={{
                        bg: "#A259FF",
                        kind: "radius"
                    }}>
                        <Flex $style={{
                            gap:".5rem"
                        }}>
                            <Icon icon={'buy'}/>
                            <Span>Buy</Span>
                        </Flex>
                    </Button>
                    <Button $style={{
                        border: "1px solid #A259FF",
                        kind: "radius"
                    }}>
                        <Flex $style={{
                            gap:".5rem"
                        }}>
                            <Icon icon={'sweep'}/>
                            <Span>Sweep</Span>
                        </Flex>
                    </Button>
                </Flex>
            </Flex>
            <Grid $style={{
                columns: "4",
                gap: "2rem",
                mb: "3rem",
                w: "100%",
                maxW: "1440px",
                $queries: {
                    1380: {
                        columns: "4"
                    },
                    1024: {
                        columns: "3"
                    },
                    768: {
                        columns: "2"
                    },
                    480: {
                        columns: "1"
                    }
                }
            }}>
                <Flex $style={{
                    fDirection: "column",
                    background: "rgba(16,16,16,.2)",
                    radius: "1rem"
                }}>
                    <Flex $style={{
                        background: `url(${appConstants.Imgs.NFT1})`,
                        radius: "2rem 2rem 0 0",
                        overflow: "hidden",
                        h: "15rem"
                    }}>
                    </Flex>
                    <Flex $style={{
                        p: "2rem",
                        fDirection: "column",
                        gap: "1rem"
                    }}>
                        <Flex $style={{
                            fDirection: "column"
                        }}>
                            <Heading level={5}>Distant Galaxy</Heading>
                            <Span>MoonDancer</Span>
                        </Flex>
                        <Flex $style={{
                            hAlign: "space-between"
                        }}>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Span>Price</Span>
                                <Span>1.63 ETH</Span>
                            </Flex>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Span>Price</Span>
                                <Span>1.63 ETH</Span>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex $style={{
                    fDirection: "column",
                    background: "rgba(16,16,16,.2)",
                    radius: "1rem"
                }}>
                    <Flex $style={{
                        background: `url(${appConstants.Imgs.NFT3})`,
                        radius: "2rem 2rem 0 0",
                        overflow: "hidden",
                        h: "15rem"
                    }}>
                    </Flex>
                    <Flex $style={{
                        p: "2rem",
                        fDirection: "column",
                        gap: "1rem"
                    }}>
                        <Flex $style={{
                            fDirection: "column"
                        }}>
                            <Heading level={5}>Distant Galaxy</Heading>
                            <Span>MoonDancer</Span>
                        </Flex>
                        <Flex $style={{
                            hAlign: "space-between"
                        }}>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Span>Price</Span>
                                <Span>1.63 ETH</Span>
                            </Flex>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Span>Price</Span>
                                <Span>1.63 ETH</Span>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex $style={{
                    fDirection: "column",
                    background: "rgba(16,16,16,.2)",
                    radius: "1rem"
                }}>
                    <Flex $style={{
                        background: `url(${appConstants.Imgs.NFT1})`,
                        radius: "2rem 2rem 0 0",
                        overflow: "hidden",
                        h: "15rem"
                    }}>
                    </Flex>
                    <Flex $style={{
                        p: "2rem",
                        fDirection: "column",
                        gap: "1rem"
                    }}>
                        <Flex $style={{
                            fDirection: "column"
                        }}>
                            <Heading level={5}>Distant Galaxy</Heading>
                            <Span>MoonDancer</Span>
                        </Flex>
                        <Flex $style={{
                            hAlign: "space-between"
                        }}>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Span>Price</Span>
                                <Span>1.63 ETH</Span>
                            </Flex>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Span>Price</Span>
                                <Span>1.63 ETH</Span>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex $style={{
                    fDirection: "column",
                    background: "rgba(16,16,16,.2)",
                    radius: "1rem"
                }}>
                    <Flex $style={{
                        background: `url(${appConstants.Imgs.NFT2})`,
                        radius: "2rem 2rem 0 0",
                        overflow: "hidden",
                        h: "15rem"
                    }}>
                    </Flex>
                    <Flex $style={{
                        p: "2rem",
                        fDirection: "column",
                        gap: "1rem"
                    }}>
                        <Flex $style={{
                            fDirection: "column"
                        }}>
                            <Heading level={5}>Distant Galaxy</Heading>
                            <Span>MoonDancer</Span>
                        </Flex>
                        <Flex $style={{
                            hAlign: "space-between"
                        }}>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Span>Price</Span>
                                <Span>1.63 ETH</Span>
                            </Flex>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Span>Price</Span>
                                <Span>1.63 ETH</Span>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex $style={{
                    fDirection: "column",
                    background: "rgba(16,16,16,.2)",
                    radius: "1rem"
                }}>
                    <Flex $style={{
                        background: `url(${appConstants.Imgs.NFT3})`,
                        radius: "2rem 2rem 0 0",
                        overflow: "hidden",
                        h: "15rem"
                    }}>
                    </Flex>
                    <Flex $style={{
                        p: "2rem",
                        fDirection: "column",
                        gap: "1rem"
                    }}>
                        <Flex $style={{
                            fDirection: "column"
                        }}>
                            <Heading level={5}>Distant Galaxy</Heading>
                            <Span>MoonDancer</Span>
                        </Flex>
                        <Flex $style={{
                            hAlign: "space-between"
                        }}>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Span>Price</Span>
                                <Span>1.63 ETH</Span>
                            </Flex>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Span>Price</Span>
                                <Span>1.63 ETH</Span>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex $style={{
                    fDirection: "column",
                    background: "rgba(16,16,16,.2)",
                    radius: "1rem"
                }}>
                    <Flex $style={{
                        background: `url(${appConstants.Imgs.NFT1})`,
                        radius: "2rem 2rem 0 0",
                        overflow: "hidden",
                        h: "15rem"
                    }}>
                    </Flex>
                    <Flex $style={{
                        p: "2rem",
                        fDirection: "column",
                        gap: "1rem"
                    }}>
                        <Flex $style={{
                            fDirection: "column"
                        }}>
                            <Heading level={5}>Distant Galaxy</Heading>
                            <Span>MoonDancer</Span>
                        </Flex>
                        <Flex $style={{
                            hAlign: "space-between"
                        }}>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Span>Price</Span>
                                <Span>1.63 ETH</Span>
                            </Flex>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Span>Price</Span>
                                <Span>1.63 ETH</Span>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex $style={{
                    fDirection: "column",
                    background: "rgba(16,16,16,.2)",
                    radius: "1rem"
                }}>
                    <Flex $style={{
                        background: `url(${appConstants.Imgs.NFT3})`,
                        radius: "2rem 2rem 0 0",
                        overflow: "hidden",
                        h: "15rem"
                    }}>
                    </Flex>
                    <Flex $style={{
                        p: "2rem",
                        fDirection: "column",
                        gap: "1rem"
                    }}>
                        <Flex $style={{
                            fDirection: "column"
                        }}>
                            <Heading level={5}>Distant Galaxy</Heading>
                            <Span>MoonDancer</Span>
                        </Flex>
                        <Flex $style={{
                            hAlign: "space-between"
                        }}>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Span>Price</Span>
                                <Span>1.63 ETH</Span>
                            </Flex>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Span>Price</Span>
                                <Span>1.63 ETH</Span>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex $style={{
                    fDirection: "column",
                    background: "rgba(16,16,16,.2)",
                    radius: "1rem"
                }}>
                    <Flex $style={{
                        background: `url(${appConstants.Imgs.NFT1})`,
                        radius: "2rem 2rem 0 0",
                        overflow: "hidden",
                        h: "15rem"
                    }}>
                    </Flex>
                    <Flex $style={{
                        p: "2rem",
                        fDirection: "column",
                        gap: "1rem"
                    }}>
                        <Flex $style={{
                            fDirection: "column"
                        }}>
                            <Heading level={5}>Distant Galaxy</Heading>
                            <Span>MoonDancer</Span>
                        </Flex>
                        <Flex $style={{
                            hAlign: "space-between"
                        }}>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Span>Price</Span>
                                <Span>1.63 ETH</Span>
                            </Flex>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Span>Price</Span>
                                <Span>1.63 ETH</Span>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex $style={{
                    fDirection: "column",
                    background: "rgba(16,16,16,.2)",
                    radius: "1rem"
                }}>
                    <Flex $style={{
                        background: `url(${appConstants.Imgs.NFT2})`,
                        radius: "2rem 2rem 0 0",
                        overflow: "hidden",
                        h: "15rem"
                    }}>
                    </Flex>
                    <Flex $style={{
                        p: "2rem",
                        fDirection: "column",
                        gap: "1rem"
                    }}>
                        <Flex $style={{
                            fDirection: "column"
                        }}>
                            <Heading level={5}>Distant Galaxy</Heading>
                            <Span>MoonDancer</Span>
                        </Flex>
                        <Flex $style={{
                            hAlign: "space-between"
                        }}>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Span>Price</Span>
                                <Span>1.63 ETH</Span>
                            </Flex>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Span>Price</Span>
                                <Span>1.63 ETH</Span>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex $style={{
                    fDirection: "column",
                    background: "rgba(16,16,16,.2)",
                    radius: "1rem"
                }}>
                    <Flex $style={{
                        background: `url(${appConstants.Imgs.NFT3})`,
                        radius: "2rem 2rem 0 0",
                        overflow: "hidden",
                        h: "15rem"
                    }}>
                    </Flex>
                    <Flex $style={{
                        p: "2rem",
                        fDirection: "column",
                        gap: "1rem"
                    }}>
                        <Flex $style={{
                            fDirection: "column"
                        }}>
                            <Heading level={5}>Distant Galaxy</Heading>
                            <Span>MoonDancer</Span>
                        </Flex>
                        <Flex $style={{
                            hAlign: "space-between"
                        }}>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Span>Price</Span>
                                <Span>1.63 ETH</Span>
                            </Flex>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Span>Price</Span>
                                <Span>1.63 ETH</Span>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Grid>
        </Flex>
    )
}