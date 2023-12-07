import Button from "components/basic/button";
import Flex from "components/basic/flex";
import Heading from "components/basic/heading";
import { Span } from "components/basic/text";
import appConstants from "constant";

interface ContributionTitleProps {
    date: string,
    count: number
}

const ContributionTile = ({ date, count }: ContributionTitleProps) => {
    return (
        <Flex className="contribution-tile" $style={{
            w: "12px",
            h: "12px",
            radius: "1px",
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
            mb:"10rem"
        }}>
            <Flex $style={{
                w: "100%",
                maxW: "1440px",
                fDirection: "column",
                gap:"2rem"
            }}>
                <h2>Contribution Overview</h2>
                <Flex $style={{
                    fWrap: 'wrap'
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
    );
};

export default function AcitivityPage() {
    return (
        <Flex $style={{
            fDirection:"column"
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
            <ContributionOverview year={2023} />
        </Flex>
    )
}
