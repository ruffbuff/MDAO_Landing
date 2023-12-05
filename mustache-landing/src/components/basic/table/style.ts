import styled from "styled-components";

export const StyledTable = styled.table`
    text-align: left;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 1em;

`

export const StyledTr = styled.tr`
  padding-bottom: 1em;
    &:first-child { border-top-left-radius: 10px; }
    &:first-child { border-top-right-radius: 10px; }
    &:last-child { border-bottom-left-radius: 10px; }
    &:last-child { border-bottom-right-radius: 10px; }

    &:first-child { border-top-style: solid; }
    &:first-child { border-left-style: solid; }

`

export const StyledTh = styled.th`
    font-family: var(--heading-font);
    padding: 1rem;
`

export const StyledTd = styled.td`
    font-family: var(--body-font);
    padding: 1rem;
    background-color: rgba(16,16,16,.2);
    
    &:first-child { border-top-left-radius: 10px; }
    &:last-child { border-top-right-radius: 10px; }
    &:first-child { border-bottom-left-radius: 10px; }
    &:last-child { border-bottom-right-radius: 10px; }
`