import Flex from "components/basic/flex"
import Heading from "components/basic/heading"
import { P } from "components/basic/text"
import { Span } from "components/basic/text"
import Table from "components/basic/table"
import { Tr, Td, Th } from "components/basic/table"
import Image from "components/basic/image"
import appConstants from "constant"
import Button from "components/basic/button"
import Grid from "components/basic/grid"

export default function MpLandingPage() {
    return (
        <Flex $style={{
            fDirection: "column",
            w: "100%",
            vAlign:"center"
        }}>
            <Flex $style={{
                background: `url(${appConstants.Imgs.BG2})`,
                h: "50rem",
                mb: "10rem",
                w:"100%"
            }}>
                <Flex $style={{
                    background: "linear-gradient(180deg, rgba(162, 89, 255, 0.00) 0%, #232323 100%);",
                    h: "100%",
                    w: "100%",
                    hAlign:"center"
                }}>
                    <Flex $style={{
                        vAlign: "flex-end",
                        hAlign: "space-between",
                        w: "100%",
                        p: "3rem 0",
                        maxW:"1440px",
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
                        <Flex $style={{
                            background: "rgba(59, 59, 59, 0.50);",
                            p: "2rem",
                            fDirection: "column",
                            radius: "1rem"
                        }}>
                            <Span>Auction ends in:</Span>
                            <Flex $style={{
                                gap: ".5rem"
                            }}>
                                <Heading level={3}>59</Heading>
                                <Heading level={3}>:</Heading>
                                <Heading level={3}>59</Heading>
                                <Heading level={3}>:</Heading>
                                <Heading level={3}>59</Heading>
                            </Flex>
                            <Flex $style={{
                                gap: "1rem"
                            }}>
                                <Span>Hours</Span>
                                <Span>Minutes</Span>
                                <Span>Seconds</Span>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex $style={{
                fDirection:"column",
                maxW:"1440px",
                w:"100%",
                mb:"8rem"
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
                        <P>Check out top ranking NFT artists on the NFT Marketplace.</P>
                    </Flex>
                </Flex>
                <Flex $style={{
                    overflow: "auto"
                }}>
                    <Table>
                        <Tr>
                            <Th>Artist</Th>
                            <Th>Change</Th>
                            <Th>NFTs Sold</Th>
                            <Th>Volume</Th>
                        </Tr>
                        <Tr>
                            <Td>
                                <Flex $style={{
                                    vAlign: "center",
                                    gap: "1rem"
                                }}>
                                    <Flex $style={{
                                        maxW: "5rem"
                                    }}>
                                        <Image src={appConstants.Imgs.Avatar6} />
                                    </Flex>
                                    <Heading level={4}>Jaydon Ekstrom Bothman</Heading>
                                </Flex>
                            </Td>
                            <Td>
                                <Span $style={{
                                    color: "color-6"
                                }}>+1.41%</Span>
                            </Td>
                            <Td>
                                <Span>662</Span>
                            </Td>
                            <Td>
                                12.4 ETH
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <Flex $style={{
                                    vAlign: "center",
                                    gap: "1rem"
                                }}>
                                    <Flex $style={{
                                        maxW: "5rem"
                                    }}>
                                        <Image src={appConstants.Imgs.Avatar7} />
                                    </Flex>
                                    <Heading level={4}>Ruben Carder</Heading>
                                </Flex>
                            </Td>
                            <Td>
                                <Span $style={{
                                    color: "color-6"
                                }}>+1.41%</Span>
                            </Td>
                            <Td>
                                <Span>662</Span>
                            </Td>
                            <Td>
                                12.4 ETH
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <Flex $style={{
                                    vAlign: "center",
                                    gap: "1rem"
                                }}>
                                    <Flex $style={{
                                        maxW: "5rem"
                                    }}>
                                        <Image src={appConstants.Imgs.Avatar8} />
                                    </Flex>
                                    <Heading level={4}>Alfredo Septimus</Heading>
                                </Flex>
                            </Td>
                            <Td>
                                <Span $style={{
                                    color: "color-6"
                                }}>+1.41%</Span>
                            </Td>
                            <Td>
                                <Span>662</Span>
                            </Td>
                            <Td>
                                12.4 ETH
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <Flex $style={{
                                    vAlign: "center",
                                    gap: "1rem"
                                }}>
                                    <Flex $style={{
                                        maxW: "5rem"
                                    }}>
                                        <Image src={appConstants.Imgs.Avatar9} />
                                    </Flex>
                                    <Heading level={4}>Davis Franci</Heading>
                                </Flex>
                            </Td>
                            <Td>
                                <Span $style={{
                                    color: "color-6"
                                }}>+1.41%</Span>
                            </Td>
                            <Td>
                                <Span>662</Span>
                            </Td>
                            <Td>
                                12.4 ETH
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <Flex $style={{
                                    vAlign: "center",
                                    gap: "1rem"
                                }}>
                                    <Flex $style={{
                                        maxW: "5rem"
                                    }}>
                                        <Image src={appConstants.Imgs.Avatar6} />
                                    </Flex>
                                    <Heading level={4}>Jaydon Ekstrom Bothman</Heading>
                                </Flex>
                            </Td>
                            <Td>
                                <Span $style={{
                                    color: "color-6"
                                }}>+1.41%</Span>
                            </Td>
                            <Td>
                                <Span>662</Span>
                            </Td>
                            <Td>
                                12.4 ETH
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <Flex $style={{
                                    vAlign: "center",
                                    gap: "1rem"
                                }}>
                                    <Flex $style={{
                                        maxW: "5rem"
                                    }}>
                                        <Image src={appConstants.Imgs.Avatar7} />
                                    </Flex>
                                    <Heading level={4}>Ruben Carder</Heading>
                                </Flex>
                            </Td>
                            <Td>
                                <Span $style={{
                                    color: "color-6"
                                }}>+1.41%</Span>
                            </Td>
                            <Td>
                                <Span>662</Span>
                            </Td>
                            <Td>
                                12.4 ETH
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <Flex $style={{
                                    vAlign: "center",
                                    gap: "1rem"
                                }}>
                                    <Flex $style={{
                                        maxW: "5rem"
                                    }}>
                                        <Image src={appConstants.Imgs.Avatar8} />
                                    </Flex>
                                    <Heading level={4}>Alfredo Septimus</Heading>
                                </Flex>
                            </Td>
                            <Td>
                                <Span $style={{
                                    color: "color-6"
                                }}>+1.41%</Span>
                            </Td>
                            <Td>
                                <Span>662</Span>
                            </Td>
                            <Td>
                                12.4 ETH
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <Flex $style={{
                                    vAlign: "center",
                                    gap: "1rem"
                                }}>
                                    <Flex $style={{
                                        maxW: "5rem"
                                    }}>
                                        <Image src={appConstants.Imgs.Avatar9} />
                                    </Flex>
                                    <Heading level={4}>Davis Franci</Heading>
                                </Flex>
                            </Td>
                            <Td>
                                <Span $style={{
                                    color: "color-6"
                                }}>+1.41%</Span>
                            </Td>
                            <Td>
                                <Span>662</Span>
                            </Td>
                            <Td>
                                12.4 ETH
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <Flex $style={{
                                    vAlign: "center",
                                    gap: "1rem"
                                }}>
                                    <Flex $style={{
                                        maxW: "5rem"
                                    }}>
                                        <Image src={appConstants.Imgs.Avatar6} />
                                    </Flex>
                                    <Heading level={4}>Jaydon Ekstrom Bothman</Heading>
                                </Flex>
                            </Td>
                            <Td>
                                <Span $style={{
                                    color: "color-6"
                                }}>+1.41%</Span>
                            </Td>
                            <Td>
                                <Span>662</Span>
                            </Td>
                            <Td>
                                12.4 ETH
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <Flex $style={{
                                    vAlign: "center",
                                    gap: "1rem"
                                }}>
                                    <Flex $style={{
                                        maxW: "5rem"
                                    }}>
                                        <Image src={appConstants.Imgs.Avatar7} />
                                    </Flex>
                                    <Heading level={4}>Ruben Carder</Heading>
                                </Flex>
                            </Td>
                            <Td>
                                <Span $style={{
                                    color: "color-6"
                                }}>+1.41%</Span>
                            </Td>
                            <Td>
                                <Span>662</Span>
                            </Td>
                            <Td>
                                12.4 ETH
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <Flex $style={{
                                    vAlign: "center",
                                    gap: "1rem"
                                }}>
                                    <Flex $style={{
                                        maxW: "5rem"
                                    }}>
                                        <Image src={appConstants.Imgs.Avatar8} />
                                    </Flex>
                                    <Heading level={4}>Alfredo Septimus</Heading>
                                </Flex>
                            </Td>
                            <Td>
                                <Span $style={{
                                    color: "color-6"
                                }}>+1.41%</Span>
                            </Td>
                            <Td>
                                <Span>662</Span>
                            </Td>
                            <Td>
                                12.4 ETH
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <Flex $style={{
                                    vAlign: "center",
                                    gap: "1rem"
                                }}>
                                    <Flex $style={{
                                        maxW: "5rem"
                                    }}>
                                        <Image src={appConstants.Imgs.Avatar9} />
                                    </Flex>
                                    <Heading level={4}>Davis Franci</Heading>
                                </Flex>
                            </Td>
                            <Td>
                                <Span $style={{
                                    color: "color-6"
                                }}>+1.41%</Span>
                            </Td>
                            <Td>
                                <Span>662</Span>
                            </Td>
                            <Td>
                                12.4 ETH
                            </Td>
                        </Tr>
                    </Table>
                </Flex>
            </Flex>
            <Flex $style={{
                gap: "2rem",
                fDirection: "column",
                mb: "6rem",
                maxW:"1440px"
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
                    gap: "2rem",
                    $queries: {
                        1240: {
                            columns: "4"
                        },
                        968: {
                            columns: "3"
                        },
                        720: {
                            columns: "2"
                        },
                        480: {
                            columns: "1"
                        }
                    }
                }}>
                    <Flex $style={{
                        fDirection: "column",
                        gap: "1rem",
                        maxW: "20rem"
                    }}>
                        <Image src={appConstants.Imgs.NFT1} />
                        <Grid $style={{
                            columns: "3",
                            gap: "1rem",
                        }}>
                            <Image src={appConstants.Imgs.NFT1} />
                            <Image src={appConstants.Imgs.NFT1} />
                            <Flex $style={{
                                background: "#A259FF",
                                radius: "1rem",
                                vAlign: "center",
                                hAlign: "center"
                            }}>
                                <Heading level={5}>1025+</Heading>
                            </Flex>
                        </Grid>
                        <Flex $style={{
                            fDirection: "column"
                        }}>
                            <Heading level={4}>DSGN Animals</Heading>
                            <Span>MrFox</Span>
                        </Flex>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: "1rem",
                        maxW: "20rem"
                    }}>
                        <Image src={appConstants.Imgs.NFT3} />
                        <Grid $style={{
                            columns: "3",
                            gap: "1rem",
                        }}>
                            <Image src={appConstants.Imgs.NFT1} />
                            <Image src={appConstants.Imgs.NFT1} />
                            <Flex $style={{
                                background: "#A259FF",
                                radius: "1rem",
                                vAlign: "center",
                                hAlign: "center"
                            }}>
                                <Heading level={5}>1025+</Heading>
                            </Flex>
                        </Grid>
                        <Flex $style={{
                            fDirection: "column"
                        }}>
                            <Heading level={4}>DSGN Animals</Heading>
                            <Span>MrFox</Span>
                        </Flex>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: "1rem",
                        maxW: "20rem"
                    }}>
                        <Image src={appConstants.Imgs.NFT1} />
                        <Grid $style={{
                            columns: "3",
                            gap: "1rem",
                        }}>
                            <Image src={appConstants.Imgs.NFT1} />
                            <Image src={appConstants.Imgs.NFT1} />
                            <Flex $style={{
                                background: "#A259FF",
                                radius: "1rem",
                                vAlign: "center",
                                hAlign: "center"
                            }}>
                                <Heading level={5}>1025+</Heading>
                            </Flex>
                        </Grid>
                        <Flex $style={{
                            fDirection: "column"
                        }}>
                            <Heading level={4}>DSGN Animals</Heading>
                            <Span>MrFox</Span>
                        </Flex>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: "1rem",
                        maxW: "20rem"
                    }}>
                        <Image src={appConstants.Imgs.NFT2} />
                        <Grid $style={{
                            columns: "3",
                            gap: "1rem",
                        }}>
                            <Image src={appConstants.Imgs.NFT1} />
                            <Image src={appConstants.Imgs.NFT1} />
                            <Flex $style={{
                                background: "#A259FF",
                                radius: "1rem",
                                vAlign: "center",
                                hAlign: "center"
                            }}>
                                <Heading level={5}>1025+</Heading>
                            </Flex>
                        </Grid>
                        <Flex $style={{
                            fDirection: "column"
                        }}>
                            <Heading level={4}>DSGN Animals</Heading>
                            <Span>MrFox</Span>
                        </Flex>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: "1rem",
                        maxW: "20rem"
                    }}>
                        <Image src={appConstants.Imgs.NFT3} />
                        <Grid $style={{
                            columns: "3",
                            gap: "1rem",
                        }}>
                            <Image src={appConstants.Imgs.NFT1} />
                            <Image src={appConstants.Imgs.NFT1} />
                            <Flex $style={{
                                background: "#A259FF",
                                radius: "1rem",
                                vAlign: "center",
                                hAlign: "center"
                            }}>
                                <Heading level={5}>1025+</Heading>
                            </Flex>
                        </Grid>
                        <Flex $style={{
                            fDirection: "column"
                        }}>
                            <Heading level={4}>DSGN Animals</Heading>
                            <Span>MrFox</Span>
                        </Flex>
                    </Flex>
                </Grid>
            </Flex>
        </Flex>
    )
}