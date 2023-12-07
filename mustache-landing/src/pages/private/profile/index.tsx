import Button from "components/basic/button";
import Flex from "components/basic/flex";
import Grid from "components/basic/grid";
import Heading from "components/basic/heading";
import Icon from "components/basic/icon";
import Image from "components/basic/image";
import { Span } from "components/basic/text";
import appConstants from "constant";
import { TabContent, TabHeader, TabList } from "components/basic/tab";
import { useState } from "react";

interface ContributionTitleProps {
    date: string,
    count: number
}

const ContributionTile = ({ date, count }: ContributionTitleProps) => {
    return (
        <Flex className="contribution-tile" $style={{
            minH: "12px",
            minW: "12px",
            radius: "3px",
            background: count > 5 ? '#1DAEFF' : 'rgba(29,174,255, .1)',
            m: "5px",
            display: "flex",
            fDirection: "column",
            hAlign: "center",
            vAlign: "center"
        }}>
        </Flex>
    );
};

interface ContributionOverviewProps {
    year: number
}

const ContributionOverview = ({ year }: ContributionOverviewProps) => {

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const contributions = [];

    // Generate contributions data for each day within the year
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split('T')[0];
        const count = Math.floor(Math.random() * 10); // Example: Random count for demonstration

        contributions.push({
            id: dateString,
            date: dateString,
            count: count
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return (
        <Flex $style={{
            fDirection: "column",
            vAlign: "center",
            mb: "10rem",
        }}>
            <Flex $style={{
                w: "100%",
                maxW: "1440px",
                fDirection: "column",
                gap: "2rem"
            }}>
                <h2>Contribution Overview</h2>
                <Flex $style={{
                    vAlign: "flex-start",
                    gap: "3rem"
                }}>
                    <Flex $style={{
                        fDirection: "column",
                        gap: "1rem"
                    }}>
                        <Span $style={{
                            wrap: "nowrap"
                        }}>95 edits in the last year</Span>
                        <Flex $style={{
                            fDirection: "column",
                            gap: ".5rem"
                        }}>
                            <Flex $style={{
                                vAlign: "center",
                                gap: "1rem"
                            }}>
                                <Flex className="contribution-tile" $style={{
                                    minH: "12px",
                                    minW: "12px",
                                    radius: "3px",
                                    background: 'rgba(29,174,255, .1)',
                                    display: "flex",
                                    fDirection: "column",
                                    hAlign: "center",
                                    vAlign: "center"
                                }}>
                                </Flex>
                                <Span>136 low days</Span>
                            </Flex>
                            <Flex $style={{
                                vAlign: "center",
                                gap: "1rem"
                            }}>
                                <Flex className="contribution-tile" $style={{
                                    minH: "12px",
                                    minW: "12px",
                                    radius: "3px",
                                    background: 'rgba(29,174,255, .65)',
                                    display: "flex",
                                    fDirection: "column",
                                    hAlign: "center",
                                    vAlign: "center"
                                }}>
                                </Flex>
                                <Span>69 Normal days</Span>
                            </Flex>
                            <Flex $style={{
                                vAlign: "center",
                                gap: "1rem"
                            }}>
                                <Flex className="contribution-tile" $style={{
                                    minH: "12px",
                                    minW: "12px",
                                    radius: "3px",
                                    background: 'rgba(29,174,255, 1)',
                                    display: "flex",
                                    fDirection: "column",
                                    hAlign: "center",
                                    vAlign: "center"
                                }}>
                                </Flex>
                                <Span>20 hard days</Span>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex $style={{
                        fDirection: "column",
                    }}>
                        <Flex $style={{
                            p: "0 0 0 2rem",
                            gap: "72px"
                        }}>
                            <Span $style={{
                                size: "12px"
                            }}>Dec</Span>
                            <Span $style={{
                                size: "12px"
                            }}>Jan</Span>
                            <Span $style={{
                                size: "12px"
                            }}>Feb</Span>
                            <Span $style={{
                                size: "12px"
                            }}>Mar</Span>
                            <Span $style={{
                                size: "12px"
                            }}>Apr</Span>
                            <Span $style={{
                                size: "12px"
                            }}>May</Span>
                            <Span $style={{
                                size: "12px"
                            }}>June</Span>
                            <Span $style={{
                                size: "12px"
                            }}>July</Span>
                            <Span $style={{
                                size: "12px"
                            }}>Aug</Span>
                            <Span $style={{
                                size: "12px"
                            }}>Sep</Span>
                            <Span $style={{
                                size: "12px"
                            }}>Oct</Span>
                            <Span $style={{
                                size: "12px"
                            }}>Nov</Span>
                        </Flex>
                        <Flex>
                            <Flex $style={{
                                fDirection: "column",
                                gap: "26px",
                                m: "3px"
                            }}>
                                <Span $style={{
                                    size: "12px",
                                }}>Mon</Span>
                                <Span $style={{
                                    size: "12px",
                                }}>Wed</Span>
                                <Span $style={{
                                    size: "12px",
                                }}>Fri</Span>
                            </Flex>
                            <Flex $style={{
                                fWrap: "wrap",
                            }}>
                                {contributions.map((contribution) => (
                                    <ContributionTile
                                        key={contribution.id}
                                        date={contribution.date}
                                        count={contribution.count}
                                    />
                                ))}
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default function ProfilePage() {

    const [activeTab, setActiveTab] = useState(0);

    const changeActiveTab = (index: number) => {
        setActiveTab(() => index);
    }

    return (
        <Flex $style={{
            fDirection: "column",
            w: "100%",
            vAlign: "center"
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
                        w:"100%",
                        hAlign:"center"
                    }}>
                        <Flex $style={{
                            w:"100%",
                            maxW:"1440px",
                            transform:"translateY(50%)",
                            p: "2rem 0rem 2rem 0rem",
                            queries:{
                                480: {
                                    p: "2rem"
                                }
                            }
                        }}>
                        <Image src={appConstants.Imgs.Avatar6} />
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex $style={{
                fDirection: "column",
                p: "3rem 0 0 0",
                vAlign: "center",
                w: "100%"
            }}>
                <Flex $style={{
                    hAlign: "space-between",
                    p: "2rem 0rem 2rem 0rem",
                    maxW: "1440px",
                    w: "100%",
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
                    p: "2rem 2rem 0rem 5rem",
                    hAlign: "space-between",
                    gap: "1rem",
                    overflow: "auto",
                    w: "100%",
                    maxW: "1440px",
                    queries: {
                        480: {
                            p: "2rem"
                        }
                    }
                }}>
                </Flex>
            </Flex>
            <TabList>
                <Flex $style={{
                    maxW: "1440px",
                    w: "100%",
                    hAlign: "space-between"
                }}>
                    <TabHeader onClick={() => changeActiveTab(0)} isActive={0 === activeTab}>
                        <Span>Owned</Span>
                    </TabHeader>
                    <TabHeader onClick={() => changeActiveTab(1)} isActive={1 === activeTab}>
                        <Span>Created</Span>
                    </TabHeader>
                    <TabHeader onClick={() => changeActiveTab(2)} isActive={2 === activeTab}>
                        <Span>Activity</Span>
                    </TabHeader>
                </Flex>
            </TabList>
            <TabContent isActive={0 === activeTab}>
                <Grid $style={{
                    columns: "5",
                    gap: "2rem",
                    p: "0rem 0rem 5rem 0rem",
                    maxW: "1440px",
                    w: "100%",
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
            </TabContent>
            <TabContent isActive={1 === activeTab}>
            </TabContent>
            <TabContent isActive={2 === activeTab}>
                <ContributionOverview year={2023} />
            </TabContent>
        </Flex>
    )
}