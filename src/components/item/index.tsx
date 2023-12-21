import Flex from "components/basic/flex";
import Icon from "components/basic/icon";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

interface ItemProps {
    text?: string,
    icon?: string,
    link?: string,
    onClick?: any,
    type?: number
}

export default function MenuItem({ text, icon, link, onClick, type = 0 }: ItemProps) {

    const menuState = useSelector((state: any) => state.app.menu);
    const [isOpen, setIsOpen] = useState(menuState);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        setIsOpen(menuState)
    }, [menuState])


    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Flex onClick={() => onClick(link, type)} $style={{
            vAlign: "center",
            gap: "0.5rem",
            cursor: "pointer"
        }}>
            {
                windowSize.width > 1024 ?
                    <Icon width="1.5rem" icon={icon || 'dashboard'} />
                    :
                    <Icon width="1.5rem" icon={icon || 'dashboard'} />

            }
            <Flex $style={{

            }}>{text}</Flex>
        </Flex>
    )
}