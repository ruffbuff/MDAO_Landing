import Flex from "components/basic/flex";
import Heading from "components/basic/heading";
import React, { useEffect, useState } from "react";
import Icon from "components/basic/icon";
import { ConnectWallet, darkTheme } from "@thirdweb-dev/react";
import Link from "components/basic/link";
import { Span } from "components/basic/text";
import { useDispatch } from "react-redux";
import { actions as appActions } from "store/app.slice";
import { Polygon } from "@thirdweb-dev/chains";

const SaleHeader = () => {
  const [isDark, setIsDark] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const setDarkMode = () => {
        document.body.classList.toggle('dark-theme');
        dispatch(appActions.toggleMode());
    };

    setDarkMode();
}, [isDark, dispatch]);

  return (
    <Flex $style={{
      vAlign: "center", w: "100%", hAlign: "center", position: "relative",
      zIndex: "1"
    }}>
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
                            theme={darkTheme({
                                fontFamily: "Inter, sans-serif",
                                colors: {
                                  modalBg: "#300146",
                                  accentText: "purple",
                                  walletSelectorButtonHoverBg: "#42125a",
                                  separatorLine: "#ffffff"
                                },
                            })}
                            displayBalanceToken={{
                              [Polygon.chainId]: "0x8865bc57c58be23137ace9ed1ae1a05fe5c8b209"
                            }}                          
                            btnTitle={"Connect"}
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
