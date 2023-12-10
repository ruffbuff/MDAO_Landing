import { StyledAccordionBody, StyledAccordionContainer, StyledAccordionInner, StyledAccordionItem, StyledAccordionTitle, StyledContainer, StyledInnerSection, StyledSection } from "./style"

interface componentProps {
    children: any,
    [key: string]: any
}

export const Container = ({ children, ...rest }: componentProps) => {
    return (
        <StyledContainer {...rest}>
            {
                children
            }
        </StyledContainer>
    )
}

export const Section = ({ children, ...rest }: componentProps) => {
    return (
        <StyledSection {...rest}>
            {
                children
            }
        </StyledSection>
    )
}

export const InnerSection = ({ children, ...rest }: componentProps) => {
    return (
        <StyledInnerSection {...rest}>
            {
                children
            }
        </StyledInnerSection>
    )
}

export const AccordionContainer = ({ children, ...rest }: componentProps) => {
    return (
        <StyledAccordionContainer {...rest}>
            {
                children
            }
        </StyledAccordionContainer>
    )
}


export const AccordionInner = ({ children, ...rest }: componentProps) => {
    return (
        <StyledAccordionInner {...rest}>
            {
                children
            }
        </StyledAccordionInner>
    )
}

export const AccordionItem = ({ children, ...rest }: componentProps) => {
    return (
        <StyledAccordionItem {...rest}>
            {
                children
            }
        </StyledAccordionItem>
    )
}

export const AccordionTitle = ({ children, ...rest }: componentProps) => {
    return (
        <StyledAccordionTitle {...rest}>
            {
                children
            }
        </StyledAccordionTitle>
    )
}


export const AccordionBody = ({ children, ...rest }: componentProps) => {
    return (
        <StyledAccordionBody {...rest}>
            {
                children
            }
        </StyledAccordionBody>
    )
}

export const AccordionContent = ({ children, cRef, ...rest }: componentProps) => {
    return (
        <StyledAccordionContainer ref={cRef} {...rest}>
            {
                children
            }
        </StyledAccordionContainer>
    )
}

