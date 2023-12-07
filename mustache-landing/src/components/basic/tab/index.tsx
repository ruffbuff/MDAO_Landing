import { TabContentWrapper, TabHeaderWrapper, TabListWrapper, TabWrapper } from "./tab.style"

interface TabProps {
    children: React.ReactNode;
}

interface TabHeaderProps {
    children: React.ReactNode;
    onClick?: any
    isActive: boolean;
}

interface TabContentProps {
    isActive:boolean
    children: React.ReactNode;
}

export const Tab = ({ children }: TabProps) => {
    return (
        <TabWrapper>
            {
                children
            }
        </TabWrapper>
    )
}

export const TabList = ({ children }: TabProps) => {
    return (
        <TabListWrapper>
            {
                children
            }
        </TabListWrapper>
    )
}

export const TabContent = ({ children, isActive }: TabContentProps) => {
    return (
        <TabContentWrapper isActive={isActive}>
            {
                children
            }
        </TabContentWrapper>
    )
}

export const TabHeader = ({ children, isActive, onClick }: TabHeaderProps) => {
    return (
        <TabHeaderWrapper isActive={isActive} onClick={onClick}>
            {
                children
            }
        </TabHeaderWrapper>
    )
}