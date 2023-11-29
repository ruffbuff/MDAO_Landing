import Flex from "components/basic/flex";
import Heading from "components/basic/heading";
import { Span } from "components/basic/text";
import { useEffect, useState } from "react";
import Icon from "components/basic/icon";
import {
  ConnectWallet
} from "@thirdweb-dev/react";

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
          <a href="/"><Heading level={3}>MustacheDAO</Heading></a>
          <Span as="a" href="/" $style={{ fontWeight: 'normal', size: '16px' }}>Home</Span>
          <Flex $style={{
                      gap: "2rem"
                  }}>

                      <Flex onClick={() => setIsDark(!isDark)}>
                          {
                            isDark ? <Icon icon="moon" /> : <Icon icon="sun" />
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
