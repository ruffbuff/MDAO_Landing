import Flex from "components/basic/flex";
import Icon from "components/basic/icon";
import MenuItem from "../../item";

interface SidebarProps {
    isOpen: boolean,
    handleClose: any,
}

export default function AppSidebarUI({ isOpen, handleClose }: SidebarProps) {
    return (
        <Flex as="sidebar" $style={{
            fDirection: "column",
            gap: "3rem",
            background: "#000000",
            position: "fixed",
            w: "0",
            overflow: "hidden",
            queries: {
                860: isOpen ? {
                    zIndex: "99",
                    h: "100vh",
                    w: "100%",
                    top: "0",
                    p: "4rem 1rem 1rem 1rem",
                } : {

                }
            }
        }}>
            <Flex onClick={() => handleClose()} $style={{
                position: 'absolute',
                right: "1rem",
                top: "1rem",
            }}>
                <Icon icon={'close-white'} />
            </Flex>
            <Flex $style={{
                fDirection: "column",
                gap: "2rem"
            }}>
                <MenuItem
                    onClick={handleClose}
                    type={0}
                    icon="dashboard"
                    text="Dashboard"
                />
                <MenuItem
                    onClick={handleClose}
                    type={0}
                    icon="graph-pie"
                    text="Overview"
                />
                <MenuItem onClick={handleClose} type={0} icon="wallet" text="Governance" />
                <MenuItem onClick={handleClose} type={0} icon="coin" text="Purchase coin" />
                <MenuItem onClick={handleClose} type={0} icon="user" text="Account" />
            </Flex>
            <Flex>
                <MenuItem
                    onClick={handleClose}
                    type={1}
                    icon="logout"
                    text="Logout"
                />
            </Flex>
        </Flex>
    )
}