import { AccordionBody, AccordionContent, AccordionItem, AccordionTitle } from "components/basic/accordion";
import { StyledAccordionItemWrapper } from "components/basic/accordion/style";
import Flex from "components/basic/flex";
import Heading from "components/basic/heading";
import Icon from "components/basic/icon";
import { RefObject } from "react";

interface AccordionItemProp {
    title: string;
    content: string;
}

interface AccordionItemsProps {
    accordionContent: AccordionItemProp[],
    refs: RefObject<HTMLDivElement>[],
    currentAccordion: number | null,
    setCurrentAccordion: any,
    setBodyHeight: any,
    bodyHeight: number | null
}

export default function AccordionItems({
    accordionContent,
    refs,
    currentAccordion,
    setCurrentAccordion,
    setBodyHeight,
    bodyHeight
}: AccordionItemsProps) {
    return (
        <>
            {
                accordionContent.map(({ title, content }, i) => (
                    <AccordionItem active={currentAccordion === i} key={`accordion-item-${i}`}>
                        <StyledAccordionItemWrapper active={currentAccordion === i}>
                            <AccordionTitle
                                onClick={() => {
                                    if (i === currentAccordion) {
                                        setCurrentAccordion(99);
                                    } else {
                                        setCurrentAccordion(i);
                                        setBodyHeight(refs[i]?.current?.clientHeight);
                                    }
                                }}
                            >
                                <Flex $style={{
                                    vAlign: "center",
                                    hAlign: "space-between"
                                }}>
                                    <Heading level={4}>
                                        {title}
                                    </Heading>
                                    {
                                        currentAccordion === i ?
                                            <Icon icon={'up'} width="1rem" />
                                            :
                                            <Icon icon={'down'} width="1rem" />
                                    }
                                </Flex>
                            </AccordionTitle>
                            <AccordionBody active={currentAccordion === i} bodyHeight={bodyHeight}>
                                <AccordionContent cRef={refs[i]}>
                                    <Heading level={5}>
                                        {content}
                                    </Heading>
                                </AccordionContent>
                            </AccordionBody>
                        </StyledAccordionItemWrapper>
                    </AccordionItem>
                ))
            }
        </>
    )
}