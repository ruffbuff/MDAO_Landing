// src/pages/private/mutate/index.tsx

import SaleHeader from "components/header/SaleHeader";
import Footer from "components/footer";
import Flex from "components/basic/flex";
import Heading from "components/basic/heading";
import appConstants from "constant";
import Image from "components/basic/image";
import Button from "components/basic/button";
import { Span } from "components/basic/text";

const MergePage = () => {

  return (
  <>
    <Flex $style={{
      fDirection: "column",
      minH: "100vh",
      vAlign: "center",
      position: "relative",
      zIndex: "1"
    }}>
      <SaleHeader />
      <Flex $style={{
        fDirection: "column",
        gap: "2rem",
        vAlign: "center",
        hAlign: "center",
        flex: "1",
        p: "2rem"
      }}>
          <Image 
            src={appConstants.Imgs.TEST4}
            $style={{ maxW: "380px", radius: "32px" }}
            alt="NFT Example Left" 
          />
          <Heading gradient level={3}>Merge you Whale</Heading>
          <Span>If you are holding a whale, you can merge it by clicking on the Claim button below.</Span>
          <Button $style={{ border: "1px solid white", kind: "radius" }}>Claim</Button>
      </Flex>
      <Footer />
    </Flex>
  </>
  );
};

export default MergePage;