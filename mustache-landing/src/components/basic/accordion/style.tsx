import styled, { css } from "styled-components";

interface AccordionBodyProps {
  active?: boolean;
  bodyHeight?: number;
}

interface AccordionWrapperProps {
  active?: boolean
}

export const StyledContainer = styled.main`
  position: relative;
`;

export const StyledSection = styled.section`
  position: relative;
`;

export const StyledInnerSection = styled.div`
  position: relative;
`;

export const StyledAccordionContainer = styled.div``;

export const StyledAccordionInner = styled.div`
  position: relative;
  width: 100%;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledAccordionItem = styled.div<AccordionWrapperProps>`
    box-shadow: var(--shadow);
    border-radius: 1rem;
    padding: 1px;
    background-color: rgba(16, 16, 16, 0.20);
    padding: 1rem;
    .dark-theme & {
      box-shadow: none;
    }
`;

export const StyledAccordionItemWrapper = styled.div<AccordionWrapperProps>`
    padding: 2rem;
    border-radius: 1rem;
`

export const StyledAccordionTitle = styled.h3`
  margin: 0;
  cursor: pointer;
`;

export const StyledAccordionBody = styled.div<AccordionBodyProps>`
  display: block;
  position: relative;
  padding: 0;
  margin: 0;
  height: 0;
  overflow: hidden;
  transition: height 0.3s;

  ${({ active, bodyHeight }) => active &&
    css`
            height: ${bodyHeight}px;
            margin-top: 1rem;
        `
  }
`;

export const StyledAccordionContent = styled.p`
  margin: 0;
  padding: 1rem;
  height: auto;
`;