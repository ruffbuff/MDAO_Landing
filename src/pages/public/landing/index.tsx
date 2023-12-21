import Button from "components/basic/button";
import Flex from "components/basic/flex";
import Grid from "components/basic/grid";
import Heading from "components/basic/heading";
import Icon from "components/basic/icon";
import Image from "components/basic/image";
import { Span } from "components/basic/text";
import Header from "components/header";
import appConstants from "constant";
import { Chrono } from "react-chrono";
import AccordionSection from "./accordion";
import Footer from "components/footer";
import React, { useState } from 'react';
import styled from 'styled-components';

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

export default function LandingPage() {
    const [activeProfile, setActiveProfile] = useState<number | null>(null);

    const hoverStyle = {
        opacity: 1,
    };
    const teamMembers = [
        {
            name: "0xruffbuff.eth",
            role: "CEO & Founder",
            image: appConstants.Imgs.TEAM1,
            socialLinks: [
                { icon: "github", url: "https://github.com/ruffbuff" },
                { icon: "x-twitter", url: "https://twitter.com/RuffBuff_" },
                { icon: "linkedin", url: "https://www.linkedin.com/in/sergei-avramtsuk-59a040255/" },
            ],
        },
        {
            name: "N I T O",
            role: "Main Artist",
            image: appConstants.Imgs.TEAM3,
            socialLinks: [
                { icon: "x-twitter", url: "#twitter" },
            ],
        },
        {
            name: "Abcrypt100",
            role: "BD & CM",
            image: appConstants.Imgs.TEAM2,
            socialLinks: [
                { icon: "x-twitter", url: "https://twitter.com/Abcrypt100" },
                { icon: "linkedin", url: "https://www.linkedin.com/in/abdulgafar-ojewale-6b660325b/" },
            ],
        },
        {
            name: "Tadashi",
            role: "Front-end Dev",
            image: appConstants.Imgs.TEAM5,
            socialLinks: [
                { icon: "github", url: "https://github.com/shinobi8894" },
                { icon: "x-twitter", url: "https://twitter.com/TadashiAmano" },
                { icon: "linkedin", url: "https://www.linkedin.com/in/tadashi-amano/" },
            ],
        },
        // Добавьте других членов команды здесь
    ];

    const items = [
        {
            title: "Start 2023 May",
            cardTitle: "Marketplace, Raffle and Bank smart contracts developing",
            cardSubtitle: "",
            cardDetailedText: "The journey began with the drafting some of the smart contracts, laying the first stones in building MustacheDAO's decentralized application",
        },
        {
            title: "Milestone 1",
            cardTitle: "DEV Testing ( 2 months )",
            cardSubtitle: "",
            cardDetailedText: "An intensive two-month period of developer testing commenced, scrutinizing every line of code to ensure robustness and reliability.",
        },
        {
            title: "Milestone 2",
            cardTitle: "Simple UI Creation for dApp",
            cardSubtitle: "",
            cardDetailedText: "Development transitioned to crafting a simplistic user interface for the decentralized application, enhancing user interaction and experience.",
        },
        {
            title: "Milestone 3",
            cardTitle: "Kabana Club Tester's Collaboration",
            cardSubtitle: "",
            cardDetailedText: "A collaborative testing phase with developers and testers from Kabana Club, striving to fine-tune the application.",
        },
        {
            title: "Milestone 4",
            cardTitle: "Bug Fixes and Error Rectifications",
            cardSubtitle: "",
            cardDetailedText: `Efforts were directed towards identifying and rectifying bugs, ensuring a seamless user experience.
            ...
            A rigorous cycle of testing and re-testing ensued, ensuring the application's readiness for a broader audience.`,
        },
        {
            title: "Milestone 5",
            cardTitle: "DApp Restructuring ( 1 month )",
            cardSubtitle: "",
            cardDetailedText: "A month dedicated to refining and restructuring the dApp, gearing up for the next phase of the roadmap.",
        },
        {
            title: "Milestone 6",
            cardTitle: "Marketplace Contract Initiation",
            cardSubtitle: "",
            cardDetailedText: "The quarter kicked off with the commencement of the marketplace contract creation, marking the inception of a new feature in our ecosystem.",
        },
        {
            title: "Milestone 7",
            cardTitle: "Marketplace UI Creation & Dev Preliminary Testing",
            cardSubtitle: "",
            cardDetailedText: "MP Design creationg with the preliminary testigns.",
        },
        {
            title: "Milestone 8",
            cardTitle: "Discord Server Creation",
            cardSubtitle: "",
            cardDetailedText: "Opening discord server, fulfill information in, and first invites.",
        },
        {
            title: "Milestone 9",
            cardTitle: "Documentation Drafting",
            cardSubtitle: "",
            cardDetailedText: "Docs drafting, main 1st Version of Documentation will be publicly opened.",
        },
        {
            title: "Milestone 10",
            cardTitle: "Discord Custom Bots Drafting",
            cardSubtitle: "",
            cardDetailedText: "Fulfill custom bots for MDAO discord server",
        },
        {
            title: "Milestone 11",
            cardTitle: "1st Wave",
            cardSubtitle: "",
            cardDetailedText: "1st NFT collection pre-sales and launch, + add-ons Collection. MustachePlace grand launch.",
        },
        {
            title: "Q4.2023 END",
            cardTitle: "Airdrops",
            cardSubtitle: "",
            cardDetailedText: "Early adopters and supportes will be rewarded with airdrops.",
        },
        {
            title: "Start 2024",
            cardTitle: "Audits",
            cardSubtitle: "",
            cardDetailedText: "First smart contract audits for MDAO tools.",
        },
        {
            title: "Milestone 1",
            cardTitle: "Secreto-tool? Mini-game?",
            cardSubtitle: "",
            cardDetailedText: "HODL, AMBER, BURN!?!",
        },
        {
            title: "Milestone 2",
            cardTitle: "New Collections at MustachePlace",
            cardSubtitle: "",
            cardDetailedText: "MusctachePlace Marketplace updates & add-ons.",
        },
        {
            title: "Milestone 3",
            cardTitle: "WEB3 Messanger | Friends Airdrop | NFT BIds | W2W (Wallet to Wallet)",
            cardSubtitle: "",
            cardDetailedText: "New project tools.",
            media: {
                type: "IMAGE",
                source: {
                    url: appConstants.Imgs.TEST
                }
            }
        },
    ];

    return (
        <Flex $style={{
            fDirection: "column",
            vAlign: "center",
            position: "relative",
            zIndex: "1"
        }}>
            <Header />
            <Flex $style={{
                maxW: "1440px",
                w: "100%",
                fDirection: "column",
                gap: "5rem",
                vAlign: "flex-start",
                mb: "5rem",
                p: '0 1rem',
                minH: "80vh",
                hAlign: "center"
            }}>
                <Flex $style={{
                    fDirection: "column",
                    gap: "1rem"
                }}>
                    <Flex $style={{
                        fDirection: "column"
                    }}>
                        <Heading level={2}>
                            Experience the
                        </Heading>
                        <Heading level={2} gradient>
                            Future of MDAO Whales
                        </Heading>
                    </Flex>
                    <Flex $style={{
                        gap: "2rem",
                        vAlign: "center",
                        queries: {
                            550: {
                                fDirection: "column",
                                vAlign: "flex-start"
                            }
                        }
                    }}>
                        <Icon icon={'nfts'} />
                        <Button
                            $style={{ border: "1px solid white", kind: "radius" }}
                            onClick={() => window.open('https://ruffbuff.gitbook.io/mustachedao-documentation/', '_blank')}
                        >
                            Let's Explore More
                        </Button>
                    </Flex>
                </Flex>
                <Icon icon={'scroll-down'} />
            </Flex>
            <Flex $style={{
                fDirection: "column",
                maxW: "1440px",
                w: "100%",
                gap: "1rem",
                p: "0 1rem",
                mb: "5rem"
            }}>
                <Flex id="about" $style={{
                    gap: "1rem",
                    fWrap:'wrap'
                }}>
                    <Heading level={2}>About </Heading>
                    <Heading gradient level={2}>MustacheDAO</Heading>
                </Flex>
                <Span $style={{ fontWeight: 'normal', size: '22px' }}>
                    MustacheDAO emerges as a vibrant Web3 community, designed as a nexus for decentralized autonomous tools, beckoning enthusiasts to partake in a novel ecosystem. Underpinned by the cost-effective and nimble Polygon blockchain, the initiative showcases a commitment to transparency, security, and affordability in unleashing the potential of decentralized tools
                </Span>
            </Flex>
            <Flex $style={{
                background: "linear-gradient(270deg, rgba(49, 49, 49, 0.70) 0%, rgba(49, 49, 49, 0.00) 100%)",
                w: "100%",
                hAlign: "center",
                mb: "5rem"
            }}>
                <Grid $style={{
                    w: "100%",
                    maxW: "1440px",
                    p: "2rem",
                    columns: "5",
                    gap: "2rem",
                    $queries: {
                        1280: {
                            columns: "4"
                        },
                        1024: {
                            columns: "3"
                        },
                        480: {
                            columns: "2"
                        }
                    }
                }}>
                    <Flex $style={{
                        fDirection: "column"
                    }}>
                        <Flex $style={{
                            gap: "1rem"
                        }}>
                            <Heading level={4}>Hosted</Heading>
                            <Heading level={5} gradient>With</Heading>
                        </Flex>
                        <Span $style={{
                            color: "#0000FF",
                            size: "2rem"
                        }}>Alchemy</Span>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column"
                    }}>
                        <Flex $style={{
                            gap: "1rem"
                        }}>
                            <Heading level={4}>Incubated</Heading>
                            <Heading level={5} gradient>By</Heading>
                        </Flex>
                        <Span $style={{
                            color: "yellow",
                            size: "2rem"
                        }}>DECISIONbet</Span>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column"
                    }}>
                        <Flex $style={{
                            gap: "1rem"
                        }}>
                            <Heading level={4}>Powered</Heading>
                            <Heading level={5} gradient>By</Heading>
                        </Flex>
                        <Span $style={{
                            color: "purple",
                            size: "2rem"
                        }}>Thirdweb</Span>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column"
                    }}>
                        <Flex $style={{
                            gap: "1rem"
                        }}>
                            <Heading level={4}>Developed</Heading>
                            <Heading level={5} gradient>With</Heading>
                        </Flex>
                        <Span $style={{
                            color: "#0096FF",
                            size: "2rem"
                        }}>ChainLink</Span>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column"
                    }}>
                        <Flex $style={{
                            gap: "1rem"
                        }}>
                            <Heading level={4}>Minor help</Heading>
                            <Heading level={5} gradient>By</Heading>
                        </Flex>
                        <Span $style={{
                            color: "lightgreen",
                            size: "2rem"
                        }}>Rubic Exchange</Span>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column"
                    }}>
                        <Flex $style={{
                            gap: "1rem"
                        }}>
                            <Heading level={4}>Minor help</Heading>
                            <Heading level={5} gradient>By</Heading>
                        </Flex>
                        <Span $style={{
                            color: "red",
                            size: "2rem"
                        }}>1INCH</Span>
                    </Flex>
                </Grid>
            </Flex>
            <Flex $style={{
                fDirection: "column",
                maxW: "1440px",
                w: "100%",
                gap: "1rem",
                p: "0 1rem",
                mb: "5rem"
            }}>
                <Flex id="roadmap" $style={{
                    gap: "1rem"
                }}>
                    <Heading level={2}>Our </Heading>
                    <Heading gradient level={2}>ROADMAP</Heading>
                </Flex>
                <Span $style={{
                    color: "#FFFFF",
                    size: "2rem"
                }}>Roadmap: Genesis I</Span>
            </Flex>
            <Flex $style={{
                mb: "5rem",
                w: "100%"
            }}>
                <Chrono items={items} />
            </Flex>
            <Flex $style={{
                w: "100%",
                maxW: "1440px",
                fDirection: "column",
                vAlign: "flex-start",
                gap: "3rem",
                mb: "5rem",
                p: "1rem"
            }}>
                <Flex $style={{
                    fDirection: "column"
                }}>
                    <Flex id="team" $style={{
                        gap: "1rem"
                    }}>
                        <Heading level={2}>MDAO Core</Heading>
                        <Heading gradient level={2}>Team</Heading>
                    </Flex>
                    <Heading level={5} $style={{ fontWeight: 'normal', }}>"We don&apos;t belive in just art"</Heading>
                </Flex>
                <Grid $style={{
                    columns: "4",
                    gap: "2rem",
                    $queries: {
                        1180: { columns: "3" },
                        880: { columns: "2" },
                        450: { columns: "1" }
                    }
                }}>
                    {teamMembers.map((member, index) => (
                        <Flex
                            key={index}
                            onMouseEnter={() => setActiveProfile(index)}
                            onMouseLeave={() => setActiveProfile(null)}
                            $style={{
                                fDirection: "column",
                                background: "rgba(16, 16, 16, 0.20)",
                                radius: "25px",
                                overflow: "hidden"
                            }}
                        >
                            <Image src={member.image} />
                            <Flex $style={{ fDirection: "column", p: "1rem" }}>
                                <Heading level={4}>{member.name}</Heading>
                                <Heading gradient level={5}>{member.role}</Heading>
                            </Flex>

                            <SocialLinks style={{ ...(activeProfile === index ? hoverStyle : { opacity: 0 }) }}>
                                {member.socialLinks.map((link, linkIndex) => (
                                    <a key={linkIndex} href={link.url} style={{ margin: '0 5px' }}>
                                        <Icon icon={link.icon} />
                                    </a>
                                ))}
                            </SocialLinks>
                        </Flex>
                    ))}
                </Grid>
            </Flex>
            <Flex $style={{
                w: "100%",
                maxW: "1440px",
                fDirection: "column",
                gap: "3rem",
                mb: "5rem",
                p: "1rem"
            }}>
                <Flex id="faq" $style={{
                    fDirection: "column"
                }}>
                    <Heading level={2} >Frequently Asked</Heading>
                    <Heading level={2} gradient>Questions</Heading>
                </Flex>
                <AccordionSection />
            </Flex>
            <Footer />
        </Flex>
    )
}