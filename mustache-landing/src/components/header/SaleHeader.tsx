import Flex from "components/basic/flex";
import Heading from "components/basic/heading";
import { useEffect, useState } from "react";
import Icon from "components/basic/icon";
import {
  ConnectWallet
} from "@thirdweb-dev/react";
import Link from "components/basic/link";
import { Span } from "components/basic/text";

const SaleHeader = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setDarkMode();
  }, [isDark])

  const setDarkMode = () => {
    document.body.classList.toggle('dark-theme');
  }

  return (
    <Flex $style={{ vAlign: "center", w: "100%", hAlign: "center" }}>
      <Flex $style={{ maxW: "1440px", w: "100%", vAlign: "center", hAlign: "space-between", p: "1rem" }}>
        <Link to="/"><Heading level={3}>MustacheDAO</Heading></Link>
        <Link to="/" >
          <Span>
            Home
          </Span>
        </Link>
        <Flex $style={{
          gap: "2rem"
        }}>

          <Flex onClick={() => setIsDark(!isDark)}>
            {
              isDark ? <Flex $style={{
                cursor: "pointer"
              }}>
                <Icon icon="moon" />
              </Flex> :
                <Flex $style={{
                  cursor: "pointer"
                }}>
                  <Icon icon="sun" />
                </Flex>
            }
          </Flex>
          <ConnectWallet
            theme={"dark"}
            btnTitle={"Welcome"}
            modalTitle={"Choose your wallet"}
            switchToActiveChain={true}
            modalSize={"compact"}
            welcomeScreen={{ title: "Welcome" }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SaleHeader;
