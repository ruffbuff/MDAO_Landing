import { ethers } from 'ethers';
import SaleHeader from "components/header/SaleHeader";
import Button from "components/basic/button";
import Flex from "components/basic/flex";
import Heading from "components/basic/heading";
import Image from "components/basic/image";
import { Span } from "components/basic/text";
import appConstants from "constant";
import Footer from "components/footer";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../../solContracts";
import React, { useEffect, useState } from 'react';

const SalePage = () => {
  const [totalSpots, setTotalSpots] = useState(0);

  useEffect(() => {
    getTotalSpots();
  }, []);

  const getTotalSpots = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

      const presaleId = 4;
      const buyers = await contract.getPresaleBuyers(presaleId);

      const total = buyers.reduce((sum: number, buyer: any) => sum + buyer.spotsBought.toNumber(), 0);
      setTotalSpots(total);
    } catch (error) {
      console.error('Error fetching total spots:', error);
    }
  };

  const joinPreSale = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        const presaleId = 4;
        const transaction = await contract.buyPlaceInPresale(presaleId, { value: ethers.utils.parseEther("25") });

        await transaction.wait();

        alert("Successfully joined the pre-sale!");
      } else {
        console.error("Ethereum object not found, you need to install MetaMask!");
      }
    } catch (error) {
      console.error("Error joining pre-sale:", error);
    }
  };

  return (
    <Flex $style={{
      fDirection: "column",
      minH: "100vh",
      vAlign: "center",
      position:"relative",
      zIndex:"1"
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
        <Heading gradient level={3}>The Second WLS Pre-sale Phase</Heading>
        <Image 
          src={appConstants.Imgs.TEST1} 
          $style={{ maxW: "380px", radius: "32px" }}
          alt="Whale" 
        />
        <Span $style={{ fontWeight: 'normal', size: '22px' }}>
            The spot price will be 25 $MATIC per spot.
            <br/>Each spot will be equivalent to 1 NFT.
            <br/>Special Bonus:
            <br/>Purchase 3 spots to receive 4 NFTs, or 5 spots for 7 NFTs.
        </Span>
        <Heading level={5}>
            After reaching our minimum progress target,
            <br/>we will transition to the public minting phase.
            <br/>This period will also allow us to finalize our MustachePlace Martketplace,
            <br/>and will prepare for an big event which will be connected with NFT Whales!
        </Heading>
        <Span>{`Total spots sold: ${totalSpots}`}</Span>
        <Button $style={{ border: "1px solid white", kind: "radius" }} onClick={joinPreSale}>
          Join Pre-Sale
        </Button>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default SalePage;