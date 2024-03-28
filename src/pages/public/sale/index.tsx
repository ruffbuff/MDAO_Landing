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
  CONTRACT_WHALE, CONTRACT_WHALE_ABI,
} from "../../../solContracts";
import { useEffect, useState } from 'react';
import Alert from "../../../components/basic/alert";

const SalePage = () => {
  const [whaleAmount, setWhaleAmount] = useState(1);
  const [totalWhales, setTotalWhales] = useState<number | null>(null);

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
      console.error(`Error minting Whale NFT:`, error);
    }
  };

  useEffect(() => {
    const getTotalSupply = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_WHALE, CONTRACT_WHALE_ABI, provider);
        const supply = await contract.totalSupply();
        setTotalWhales(supply.toNumber());
      } catch (error) {
        console.error(`Error fetching total supply for Whale:`, error);
      }
    };

    getTotalSupply();
  }, []);
  
  return (
    <div>
      <Flex $style={{
        gap: "2rem", // change to 1, after add alert
        fDirection: "column",
        minH: "100vh",
        vAlign: "center",
        position: "relative",
        zIndex: "1"
      }}>
        <SaleHeader />
        <Heading gradient level={3} $style={{ align: "center", mb: "2rem" }}>MustacheDAO: Whales, Mint</Heading>
        <Flex $style={{
          fDirection: "column",
          justifyContent: "center",
          gap: "1rem",
          alignItems: "center",
          p: "2rem",
          fWrap: "wrap"
        }}>
          <div style={{ position: 'relative', backgroundColor: "transparent", padding: "1rem", marginBottom: "1rem" }}>
            <Image
                src={appConstants.Imgs.TEST3}
                alt="Rotated Icon"
                $style={{
                  position: 'absolute',
                  top: '0',
                  left: '-40px',
                  transform: 'translate(-50%, -50%) rotate(-45deg)',
                  maxW: '250px'
                }}
            />
          <Alert style={{ backgroundColor: "#800080", padding: "1rem", marginBottom: "1rem" }}>
            <Span $style={{ size: "16px", fontWeight: "bold", m: "0 0.5rem 0 0" }}>Bonus Bot Activated!</Span>
            <Span $style={{ size: "14px", color: "#333" }}>Mint now for a chance to win Bonus!</Span>
          </Alert>
          </div>        
          <Flex $style={{
            fDirection: "column",
            gap: "1rem",
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
            <Button $style={{ border: "1px solid white", kind: "radius" }} onClick={() => mintNFT(whaleAmount)}>Mint Whale</Button>
          </Flex>
        </Flex>
        <Footer />
      </Flex>
    </div>

  );
};

export default SalePage;