import { Container, Section, InnerSection, AccordionContainer, AccordionInner } from "components/basic/accordion";
import { useState, useRef } from "react";
import AccordionItems from "./accordion.items";

const sampleAccordionData = [
    {
        title: "How does MustacheDAO emphasize community-driven governance ?",
        content: `MustacheDAO believes in decentralized decision-making. Through community-driven governance, all stakeholders have a voice ensuring decisions align with the collective interest and fostering transparency.`
    },
    {
        title: "What is the significance of the $AMBER architecture in MustacheDAO ?",
        content: `AMBER, an ERC-20 token from the DECISIONbet ecosystem, serves as the cornerstone of MustacheDAOs ecosystem. Adopting AMBER was a strategic move to collaboratively nature its nonlinear development model, enhancing both ecosystems through mutual growth and innovation.`
    },
    {
        title: "How does MustacheDAOs tokemonics ensure a fair distribution ?",
        content: `MustacheDAO tokenomics is tailored to reward early adopters and active community participants. This approach guarantees balanced token distribution and incentivizes ongoing engagement`
    },
    {
        title: "What assure does MustacheDAO employ to ensure platform security ?",
        content: `MustacheDAO prioritizes security through regular audits, bug bounties, and by integrating trusted, state-of-the-art technologies to safeguard its ecosystem.`
    },
    {
        title: "Why is decentrazilized finance (DeFi) pivotal in MustacheDAo's vision ?",
        content: `DeFi democratizes financial access. MustacheDAO embraces DeFi to provide users with powerful, trustless financial tools, aligning with its vision of a decentralized future.`
    },
    {
        title: "How does Chainlink Automation benefit MustacheDAO ?",
        content: `Chainlink Automation streamlines smart contract operations, allowing decentralized tools to autonomously execute tasks, trigger updates, and uphold peak performance.`
    }
];

function AccordionSection() {

    const [currentAccordion, setCurrentAccordion] = useState(-1);
    const [bodyHeight, setBodyHeight] = useState(0);

    const refs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    return (
        <Container>
            <Section>
                <InnerSection>
                    <AccordionContainer>
                        <AccordionInner>
                            <AccordionItems
                                accordionContent={sampleAccordionData}
                                refs={refs}
                                currentAccordion={currentAccordion}
                                setCurrentAccordion={setCurrentAccordion}
                                setBodyHeight={setBodyHeight}
                                bodyHeight={bodyHeight}
                            />
                        </AccordionInner>
                    </AccordionContainer>
                </InnerSection>
            </Section>
        </Container>
    )
}

export default AccordionSection;