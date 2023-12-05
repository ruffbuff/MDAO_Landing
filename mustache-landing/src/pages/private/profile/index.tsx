import Button from "components/basic/button";
import Flex from "components/basic/flex";
import Grid from "components/basic/grid";
import Heading from "components/basic/heading";
import Icon from "components/basic/icon";
import Image from "components/basic/image";
import { Span } from "components/basic/text";
import appConstants from "constant";

export default function ProfilePage() {

    return (
        <Flex $style={{
            fDirection: "column",
            w: "100%",
            vAlign:"center"
        }}>
            <Flex $style={{
                background: `url(${appConstants.Imgs.Banner})`,
                minH: "15rem",
                w: "100%",
            }}>
                <Flex $style={{
                    background: "linear-gradient(180deg, rgba(162, 89, 255, 0.00) 0%, #232323 100%);",
                    w: "100%",
                    position: "relative"
                }}>
                    <Flex $style={{
                        position: "absolute",
                        bottom: "-23%",
                        left: "12rem"
                    }}>
                        <Image src={appConstants.Imgs.Avatar6} />
                    </Flex>
                </Flex>
            </Flex>
            <Flex $style={{
                fDirection: "column",
                background: "rgba(16,16,16,.2)",
                p: "3rem 0 0 0",
                mb: "3rem",
                vAlign:"center",
                w:"100%"
            }}>
                <Flex $style={{
                    hAlign: "space-between",
                    p: "2rem 0rem 2rem 0rem",
                    maxW:"1440px",
                    w:"100%",
                    queries: {
                        768: {
                            fDirection: "column",
                            gap: "1rem"
                        },
                        480: {
                            p: "2rem"
                        }
                    }
                }}>
                    <Flex $style={{
                        fDirection: "column",
                        gap: "1rem"
                    }}>
                        <Flex $style={{
                            fDirection: "column",
                            gap: "1rem"
                        }}>
                            <Heading level={3}>Animakid</Heading>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Heading level={5}>Bio</Heading>
                                <Span>The internet's friendliest designer kid.</Span>
                            </Flex>
                        </Flex>
                        <Flex $style={{
                            gap: "3rem"
                        }}>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Heading level={4}>250K+</Heading>
                                <Span>Volume</Span>
                            </Flex>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Heading level={4}>50+</Heading>
                                <Span>NFTs Sold</Span>
                            </Flex>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Heading level={4}>3000+</Heading>
                                <Span>Followers</Span>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: "2rem"
                    }}>
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
                                Wallet
                            </Button>
                            <Button $style={{
                                border: "1px solid #A259FF",
                                kind: "radius"
                            }}>
                                Follow
                            </Button>
                        </Flex>
                        <Flex $style={{
                            gap: "1rem"
                        }}>
                            <Icon icon="web" />
                            <Icon icon="discord" />
                            <Icon icon="youtube" />
                            <Icon icon="twitter" />
                            <Icon icon="instagram" />
                        </Flex>
                    </Flex>
                </Flex>
                <Flex $style={{
                    p: "2rem 2rem 2rem 5rem",
                    hAlign: "space-between",
                    gap: "1rem",
                    overflow: "auto",
                    w:"100%",
                    maxW:"1440px",
                    queries: {
                        480: {
                            p: "2rem"
                        }
                    }
                }}>
                    <Flex $style={{
                        vAlign: "center",
                        gap: ".5rem"
                    }}>
                        <Span>Collections</Span>
                        <Flex $style={{
                            background: "#858584",
                            radius: "3rem",
                            w: "1.5rem",
                            h: "1.5rem",
                            vAlign: "center",
                            hAlign: "center"
                        }}>
                            <Span>2</Span>
                        </Flex>
                    </Flex>
                    <Flex $style={{
                        vAlign: "center",
                        gap: ".5rem"
                    }}>
                        <Span>Owned</Span>
                        <Flex $style={{
                            background: "#858584",
                            radius: "3rem",
                            w: "1.5rem",
                            h: "1.5rem",
                            vAlign: "center",
                            hAlign: "center"
                        }}>
                            <Span>1</Span>
                        </Flex>
                    </Flex>
                    <Flex $style={{
                        vAlign: "center",
                        gap: ".5rem"
                    }}>
                        <Span>Offers</Span>
                        <Flex $style={{
                            background: "#858584",
                            radius: "3rem",
                            w: "1.5rem",
                            h: "1.5rem",
                            vAlign: "center",
                            hAlign: "center"
                        }}>
                            <Span>0</Span>
                        </Flex>
                    </Flex>
                    <Flex $style={{
                        vAlign: "center",
                        gap: ".5rem"
                    }}>
                        <Span>Favorites</Span>
                        <Flex $style={{
                            background: "#858584",
                            radius: "3rem",
                            w: "1.5rem",
                            h: "1.5rem",
                            vAlign: "center",
                            hAlign: "center"
                        }}>
                            <Span>0</Span>
                        </Flex>
                    </Flex>
                    <Flex $style={{
                        vAlign: "center",
                        gap: ".5rem"
                    }}>
                        <Span>History</Span>
                        <Flex $style={{
                            background: "#858584",
                            radius: "3rem",
                            w: "1.5rem",
                            h: "1.5rem",
                            vAlign: "center",
                            hAlign: "center"
                        }}>
                            <Span>0</Span>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Grid $style={{
                columns: "5",
                gap: "2rem",
                p: "0rem 0rem 5rem 0rem",
                maxW:"1440px",
                w:"100%",
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
            </Grid>
        </Flex>
    )
}