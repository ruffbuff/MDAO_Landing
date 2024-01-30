// src/pages/private/mutate/index.tsx

import { ethers } from 'ethers';
import MarketHeader from "components/header/MarketHeader";
import Footer from "components/footer";
import Flex from "components/basic/flex";
import Heading from "components/basic/heading";
import appConstants from "constant";
import Image from "components/basic/image";
import Button from "components/basic/button";
import { Span } from "components/basic/text";
import {
  CONTRACT_WHALE, CONTRACT_WHALE_ABI
} from "../../../solContracts";
import { useState, useEffect } from 'react';

const MutatePage = () => {
  const [nftKitTokenId, setNftKitTokenId] = useState('');
  const [nftPotionTokenId, setNftPotionTokenId] = useState('');

  const handleMutate = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_WHALE, CONTRACT_WHALE_ABI, signer);

        const whaleTokenId = ethers.BigNumber.from(nftKitTokenId);
        const potionTokenId = ethers.BigNumber.from(nftPotionTokenId);

        const transaction = await contract.mutateWhale(whaleTokenId, potionTokenId);
        await transaction.wait();
        alert('Mutation successful!');
      } else {
        console.error("Ethereum object not found, you need to install MetaMask!");
      }
    } catch (error) {
      console.error("Error during NFT mutation:", error);
    }
  };

  return (
  <>
    <Flex $style={{
      fDirection: "column",
      minH: "100vh",
      vAlign: "center",
      position: "relative",
      zIndex: "1"
    }}>
      <MarketHeader />
      <Flex $style={{
        fDirection: "column",
        gap: "2rem",
        vAlign: "center",
        hAlign: "center",
        flex: "1",
        p: "2rem"
      }}>
        <Heading gradient level={3}>Mutate Your Whale NFT</Heading>
        <Flex $style={{
          fDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "6rem",
          fWrap: "wrap"
        }}>
          <Image 
            src={appConstants.Imgs.TEST1}
            $style={{ maxW: "380px", radius: "32px" }}
            alt="NFT Example Left" 
          />
          <Image 
            src={appConstants.Imgs.TEST1}
            $style={{ maxW: "380px", radius: "32px" }}
            alt="NFT Example Center" 
          />
          <Image 
            src={appConstants.Imgs.TEST1}
            $style={{ maxW: "380px", radius: "32px" }}
            alt="NFT Example Right" 
          />
        </Flex>
          <Span>Use your NFT Whale and a Potion to mutate it into a unique creation!</Span>
          <input
            type="text"
            value={nftKitTokenId}
            onChange={(e) => setNftKitTokenId(e.target.value)}
            placeholder="Enter your NFT Whale Token ID"
            style={{ backgroundColor: "black" }}
          />
          <input
            type="text"
            value={nftPotionTokenId}
            onChange={(e) => setNftPotionTokenId(e.target.value)}
            placeholder="Enter your NFT Potion Token ID"
            style={{ backgroundColor: "black" }}
          />
          <Button onClick={handleMutate}>Mutate NFT</Button>
      </Flex>
      <Footer />
    </Flex>
  </>
  );
};

export default MutatePage;