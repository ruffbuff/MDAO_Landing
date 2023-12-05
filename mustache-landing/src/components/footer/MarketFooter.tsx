import Flex from "components/basic/flex";
import { Span } from "components/basic/text";

export default function MarketFooter() {
    return (
        <Flex $style={{
            background: "rgba(16,16,16,.2)",
            p: ".5rem",
            hAlign:"center"
        }}>
            <Flex $style={{
                w:"100%",
                maxW:"1440px",
                hAlign:"space-between",
                gap:"1rem"
            }}>
                <Flex>
                    <Span>XRPL Network: 3,976 TPS</Span>
                </Flex>
                <Flex>
                    <Span>Volume 24h: 90,595 SOL</Span>
                </Flex>
                <Flex>
                    <Span>SOL/USD $21.24</Span>
                </Flex>
                <Flex>
                    <Span>XRPL Network: 3,976 TPS</Span>
                </Flex>
            </Flex>
        </Flex>
    )
}