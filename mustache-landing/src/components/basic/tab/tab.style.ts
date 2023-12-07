import styled from "styled-components";

export const TabWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const TabListWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    background: rgba(16,16,16,.2);
    margin-bottom: 3rem;
`

interface TabContentWrapperProps {
    isActive: boolean
}

export const TabContentWrapper = styled.div<TabContentWrapperProps>`
    width: 100%;
    max-width: 1440px;
    padding: 1rem;
    display:${(props: any) => props.isActive ? 'flex' : 'none'};
    flex-direction: column;
    flex: 1;
`

interface TabHeaderWrapperProps {
    isActive: boolean
}

export const TabHeaderWrapper = styled.div<TabHeaderWrapperProps>`
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 1rem;
    cursor: pointer;
    border-bottom: ${(props: any) => props.isActive ? '2px solid #3B3B3B' : ''};
`
