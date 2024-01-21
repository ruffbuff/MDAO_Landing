// src/pages/public/sale/index.tsx

import { ethers } from 'ethers';
import SaleHeader from "components/header/SaleHeader";
import Button from "components/basic/button";
import Flex from "components/basic/flex";
import Heading from "components/basic/heading";
import Image from "components/basic/image";
import { Span } from "components/basic/text";
import appConstants from "constant";
import Footer from "components/footer";
import {
  CONTRACT_WHALE, CONTRACT_WHALE_ABI
} from "../../../solContracts";
import { useEffect, useState } from 'react';

const SalePage = () => {
  const [amount, setAmount] = useState(1);
  const [totalNFTs, setTotalNFTs] = useState<number | null>(null);

  const mintNFT = async (amount: any) => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(CONTRACT_WHALE, CONTRACT_WHALE_ABI, signer);
        const userAddress = await signer.getAddress();

        const ownerAddress = await contract.owner();
        const isUserOwner = userAddress.toLowerCase() === ownerAddress.toLowerCase();

        const mintPrice = await contract.mintPrice();
        const totalCost = isUserOwner ? ethers.constants.Zero : mintPrice.mul(ethers.BigNumber.from(amount));
  
        const transaction = await contract.mint(amount, { value: totalCost });
        await transaction.wait();
      
      } else {
        console.error("Ethereum object not found, you need to install MetaMask!");
      }
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  };

  useEffect(() => {
    const getTotalSupply = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_WHALE, CONTRACT_WHALE_ABI, provider);

        const supply = await contract.totalSupply();
        setTotalNFTs(supply.toNumber());
      } catch (error) {
        console.error("Error fetching total supply:", error);
      }
    };

    getTotalSupply();
  }, []);
  
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
        <Heading gradient level={3}>MUstacheDAO: Public NFT Minting</Heading>
        <Image 
          src={appConstants.Imgs.TEST1}
          $style={{ maxW: "380px", radius: "32px" }}
          alt="NFT Example" 
        />
        <Span $style={{ fontWeight: 'normal', size: '22px' }}>
          Mint your unique NFT for just 25 $MATIC each.
          <br/>Every NFT is a unique piece of digital art.
          <br/>Special Offer:
          <br/>Mint 3 NFTs to receive a special edition "Potion NFT", exclusive to early minters.
        </Span>
        <Heading level={5}>
          Join the exciting world of NFTs with our MustacheDAO collection.
          <br/>Be part of our growing community and explore the potential of digital art ownership.
        </Heading>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(Number(e.target.value))} 
          min="1"
          style={{ backgroundColor: "black" }}
        />
        <Button $style={{ border: "1px solid white", kind: "radius" }} onClick={() => mintNFT(amount)}>
          Mint NFT
        </Button>
        {totalNFTs !== null && <div>Total NFTs Minted: {totalNFTs}</div>}
      </Flex>
      <Footer />
    </Flex>
  </>
  );
};

export default SalePage;