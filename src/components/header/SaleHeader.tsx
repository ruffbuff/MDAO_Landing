import Flex from "components/basic/flex";
import Heading from "components/basic/heading";
import { useEffect, useState } from "react";
import Icon from "components/basic/icon";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from "components/basic/link";
import { Span } from "components/basic/text";
import { useDispatch } from "react-redux";
import { actions as appActions } from "store/app.slice";

const SaleHeader = () => {
  const [isDark, setIsDark] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setDarkMode();
  }, [isDark])

  const setDarkMode = () => {
    document.body.classList.toggle('dark-theme');
    dispatch(appActions.toggleMode());
  }

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
          <ConnectButton
                            label="Welcome"
                            accountStatus={{
                                smallScreen: 'avatar',
                                largeScreen: 'full',
                            }}
                        />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SaleHeader;
