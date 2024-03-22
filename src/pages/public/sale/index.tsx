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
  CONTRACT_POTION, CONTRACT_POTION_ABI,
  CONTRACT_WHALE, CONTRACT_WHALE_ABI // Assuming these are imported similarly
} from "../../../solContracts";
import { useEffect, useState } from 'react';

const SalePage = () => {
  const [potionAmount, setPotionAmount] = useState(1);
  const [whaleAmount, setWhaleAmount] = useState(1);
  const [totalPotions, setTotalPotions] = useState<number | null>(null);
  const [totalWhales, setTotalWhales] = useState<number | null>(null);

  const mintNFT = async (amount: any, type: 'POTION' | 'WHALE') => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        let contract, transaction;
        
        if (type === 'POTION') {
          contract = new ethers.Contract(CONTRACT_POTION, CONTRACT_POTION_ABI, signer);
          // Минт зелий бесплатный, передаём только количество
          transaction = await contract.mint(amount);
        } else {
          contract = new ethers.Contract(CONTRACT_WHALE, CONTRACT_WHALE_ABI, signer);
          
          const userAddress = await signer.getAddress();
          const ownerAddress = await contract.owner();
          const isUserOwner = userAddress.toLowerCase() === ownerAddress.toLowerCase();
          const mintPrice = await contract.mintPrice();
          const totalCost = isUserOwner ? ethers.constants.Zero : mintPrice.mul(ethers.BigNumber.from(amount));
          
          transaction = await contract.mint(amount, { value: totalCost });
        }
  
        await transaction.wait();
        
      } else {
        console.error("Ethereum object not found, you need to install MetaMask!");
      }
    } catch (error) {
      console.error(`Error minting ${type} NFT:`, error);
    }
  };  

  useEffect(() => {
    const getTotalSupply = async (type: 'POTION' | 'WHALE') => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        let contract;
        if (type === 'POTION') {
          contract = new ethers.Contract(CONTRACT_POTION, CONTRACT_POTION_ABI, provider);
          const supply = await contract.totalSupply();
          setTotalPotions(supply.toNumber());
        } else {
          contract = new ethers.Contract(CONTRACT_WHALE, CONTRACT_WHALE_ABI, provider);
          const supply = await contract.totalSupply();
          setTotalWhales(supply.toNumber());
        }
      } catch (error) {
        console.error(`Error fetching total supply for ${type}:`, error);
      }
    };

    getTotalSupply('POTION');
    getTotalSupply('WHALE');
  }, []);
  
  return (
    <div>
      <Flex $style={{
        gap: "2rem",
        fDirection: "column",
        minH: "100vh",
        vAlign: "center",
        position: "relative",
        zIndex: "1"
      }}>
        <SaleHeader />
        <Heading gradient level={3} $style={{ align: "center", mb: "2rem" }}>Whales & FREE Potions Mint</Heading>
        <Flex $style={{
          fDirection: "row",
          justifyContent: "center",
          gap: "4rem",
          alignItems: "center",
          p: "2rem",
          fWrap: "wrap"
        }}>
          <Flex $style={{
            fDirection: "column",
            gap: "2rem",
            vAlign: "center",
            hAlign: "center",
            alignItems: "center",
            p: "0.5rem"
          }}>
            <Image src={appConstants.Imgs.TEST3} alt="Potion NFT" $style={{ maxW: "250px", radius: "20px" }} />
            <Span $style={{ size: "16px", fontWeight: "bold", align: "center" }}>Mint price: 0 $MATIC</Span>
            <Span>Total Potions Minted: {totalPotions !== null ? totalPotions : 'Loading...'}</Span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <Span $style={{ size: "14px", fontWeight: "bold", color: "gray" }}>1. Mystery</Span>
              <Span $style={{ size: "14px", fontWeight: "bold", color: "cyan" }}>2. White List</Span>
              <Span $style={{ size: "14px", fontWeight: "bold", color: "gray" }}>3. Public</Span>
            </div>
            <input type="number" value={potionAmount} onChange={(e) => setPotionAmount(Number(e.target.value))} min="1" style={{ backgroundColor: "black" }} />
            <Button $style={{ border: "1px solid white", kind: "radius" }} onClick={() => mintNFT(potionAmount, 'POTION')}>Mint Potion</Button>
          </Flex>
          <Flex $style={{
            fDirection: "column",
            gap: "2.8rem",
            vAlign: "center",
            hAlign: "center",
            alignItems: "center",
            p: "0.5rem"
          }}>
            <Image src={appConstants.Imgs.TEST4} alt="Whale NFT" $style={{ maxW: "250px", radius: "20px" }} />
            <Span $style={{ size: "16px", fontWeight: "bold", align: "center" }}>Mint price: 25 $MATIC</Span>
            <Span>Total Whales Minted: {totalWhales !== null ? totalWhales : 'Loading...'}</Span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <Span $style={{ size: "14px", fontWeight: "bold", color: "gray" }}>1. White list</Span>
              <Span $style={{ size: "14px", fontWeight: "bold", color: "cyan" }}>2. Public</Span>
            </div>
            <input type="number" value={whaleAmount} onChange={(e) => setWhaleAmount(Number(e.target.value))} min="1" style={{ backgroundColor: "black" }} />
            <Button $style={{ border: "1px solid white", kind: "radius" }} onClick={() => mintNFT(whaleAmount, 'WHALE')}>Mint Whale</Button>
          </Flex>
        </Flex>
        <Footer />
      </Flex>
    </div>
  );
};

export default SalePage;