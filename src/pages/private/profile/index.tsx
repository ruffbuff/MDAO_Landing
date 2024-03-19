// src/pages/private/profile/index.tsx
import Button from "components/basic/button";
import Flex from "components/basic/flex";
import Grid from "components/basic/grid";
import Heading from "components/basic/heading";
import Image from "components/basic/image";
import { Span } from "components/basic/text";
import appConstants from "constant";
import { TabContent, TabHeader, TabList } from "components/basic/tab";
import { useState, useEffect, useMemo } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { ethers } from 'ethers';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
    CONTRACT_ABI_2, CONTRACT_ADDRESS_2,
    CONTRACT_ABI_AWAKENED, CONTRACT_AWAKENED,
    CONTRACT_SMARTDB, CONTRACT_SMARTDB_ABI
} from "../../../solContracts";
import ContributionOverview from './components/Contribution';
import { debounce } from 'lodash';
import styled from 'styled-components';

interface NFTImage {
  url?: string;
  cachedUrl?: string;
}

interface NFTContract {
  address?: string;
  name?: string;
}

interface NFT {
  tokenId: string;
  tokenType: string;
  name?: string;
  description?: string;
  tokenUri?: string;
  image: NFTImage;
  contract: NFTContract;
}

const AvatarContainer = styled.div`
    border-radius: 50%;
    overflow: hidden;
    marginTop: 2rem;
    width: 100px;
    height: 100px;
    position: absolute;    
`;

/* =====================================================PROFILEPAGE===================================================== */

export default function ProfilePage() {
    const address = useAddress();
    const [contract, setContract] = useState<ethers.Contract | null>(null);

    const [activeTab, setActiveTab] = useState(0);
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [isListing, setIsListing] = useState(false);
    const [selectedNft, setSelectedNft] = useState<NFT | null>(null);

    const [open, setOpen] = useState(false);
    const [nftAddress, setNftAddress] = useState('');
    const [tokenId, setTokenId] = useState('');
    const [price, setPrice] = useState('');
    const [listingType, setListingType] = useState<'AMBER' | 'MATIC'>('AMBER');

    const [popup, setPopup] = useState({ open: false, message: '', success: false });

    useEffect(() => {
        if (window.ethereum && address) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contractInstance = new ethers.Contract(CONTRACT_SMARTDB, CONTRACT_SMARTDB_ABI, signer);
            setContract(contractInstance);
        }
    }, [address]);

    useEffect(() => {
        if (address) {
          const options = { method: 'GET', headers: { accept: 'application/json' } };
          const apiKey = process.env.REACT_APP_ALCHEMY_API_KEY;
          const timestamp = new Date().getTime();
          const alchemyURL = `https://polygon-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?owner=${address}&withMetadata=true&pageSize=100&timestamp=${timestamp}`;
          
          const fetchNFTs = () => {
            fetch(alchemyURL, options)
                .then(response => response.json())
                .then(data => {
                })
                .catch(err => console.error('Error fetching NFTs:', err));
          };
      
          const debouncedFetchNFTs = debounce(fetchNFTs, 1000);
          debouncedFetchNFTs();
      
          return () => {
            debouncedFetchNFTs.cancel();
          };
        }
      }, [address]);      
    
    const changeActiveTab = (index: number) => {
        setActiveTab(() => index);
    }

    const shortenAddress = (address: any, chars = 4) => {
        return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
    }

    const allowedAddresses = useMemo(() => [
        "0x564e6588DAfA2F79c5805e07860CB869AEdb33d9"
    ], []);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        bgcolor: 'background.paper',
        boxShadow: '2px 2px 2px gray',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const selectNft = (nft: NFT) => {
        if (selectedNft?.tokenId === nft.tokenId) {
            setSelectedNft(null);
            setNftAddress('');
            setTokenId('');
        } else {
            setSelectedNft(nft);
            setNftAddress(nft.contract.address || '');
            setTokenId(nft.tokenId || '');
        }
    };

    const approveNFT = async (nftAddress: string, tokenId: string, priceInWei: string, listingType: 'AMBER' | 'MATIC') => {
        setIsListing(true);
    
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const nftContract = new ethers.Contract(nftAddress, CONTRACT_ABI_AWAKENED, signer);
    
            const approvedAddress = await nftContract.getApproved(tokenId);
            if (approvedAddress !== CONTRACT_ADDRESS_2) {
                let approveTransaction = await nftContract.approve(CONTRACT_ADDRESS_2, tokenId);
                await approveTransaction.wait();
                console.log(`Approval successful for token ID ${tokenId}`);
            } else {
                console.log(`Token ID ${tokenId} is already approved for the marketplace`);
            }
    
            await listNFT(nftAddress, tokenId, priceInWei, listingType);
        } catch (error) {
            console.error(`Error approving NFT for listing:`, error);
        }
    };

    const getNFTCountFromAlchemy = async (ownerAddress: string): Promise<number> => {
        const alchemyApiKey = process.env.REACT_APP_ALCHEMY_API_KEY;
        const awakenedContractAddress = CONTRACT_AWAKENED;
        const url = `https://polygon-mainnet.g.alchemy.com/nft/v3/${alchemyApiKey}/getNFTsForOwner?owner=${ownerAddress}&contractAddresses[]=${encodeURIComponent(awakenedContractAddress)}&withMetadata=true&pageSize=100&orderBy=transferTime`;
        
        try {
            const response = await fetch(url, { method: 'GET', headers: { accept: 'application/json' } });
            const data = await response.json();
            return data.ownedNfts.length;
        } catch (error) {
            console.error('Error fetching NFT count:', error);
            return 0;
        }
    };

    const handlePopup = (message: any, success: any) => {
        setPopup({ open: true, message, success });
        setTimeout(() => {
        setPopup({ open: false, message: '', success: false });
        }, 5000);
    };  
    
    const listNFT = async (
        nftAddress: string, 
        tokenId: string, 
        price: string,
        listingType: 'AMBER' | 'MATIC'
    ): Promise<void> => {
        setIsListing(true);
    
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS_2, CONTRACT_ABI_2, signer);
    
            if (!address) {
                console.error("Address is undefined.");
                setIsListing(false);
                return;
            }
    
            const nftCount = await getNFTCountFromAlchemy(address);
            let commission = ethers.BigNumber.from(0);
            if (nftCount < 1) {
                commission = ethers.utils.parseUnits('0.35', 'ether');
            } else if (nftCount < 3) {
                commission = ethers.utils.parseUnits('0.07', 'ether');
            }
    
            const transactionOptions = { value: commission };
    
            const priceInWei = ethers.utils.parseUnits(price, 'ether');

            let transaction;
            if (listingType === 'AMBER') {
                transaction = await contract.listForAMBER(nftAddress, tokenId, priceInWei, transactionOptions);
            } else {
                transaction = await contract.listForMATIC(nftAddress, tokenId, priceInWei, transactionOptions);
            }
    
            let receipt;
            for (let i = 0; i < 3; i++) {
                try {
                    receipt = await transaction.wait();
                    break;
                } catch (error) {
                    if (i < 2) {
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    } else {
                        throw error;
                    }
                }
            }
    
            console.log(`${listingType} Transaction successful:`, receipt);
            handlePopup(`Transaction successful!`, true);
            setOpen(false);
        } catch (error) {
            console.error(`Error listing NFT for ${listingType}:`, error);
            handlePopup(`Transaction failed!`, false);
        } finally {
            setIsListing(false);
        }
    };    
    
    const handleListNFT = () => {
        if (!selectedNft) {
            alert('Please select an NFT to list.');
            return;
        }
        setOpen(true);
    };
    
    const handleSubmitListing = async () => {
        if (!selectedNft) {
            alert('Please select an NFT to list.');
            return;
        }
    
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice)) {
            alert('Please enter a valid number for the price.');
            return;
        }
    
        const priceInEther = numericPrice.toString();
        await approveNFT(selectedNft.contract.address || '', selectedNft.tokenId || '', priceInEther, listingType);
    };

    useEffect(() => {
        if (address) {
          const fetchNFTs = async () => {
            const options = { method: 'GET', headers: { accept: 'application/json' } };
            const apiKey = process.env.REACT_APP_ALCHEMY_API_KEY;
            const contractAddress = allowedAddresses[0];
            const alchemyURL = `https://polygon-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?owner=${address}&contractAddresses[]=${contractAddress}&withMetadata=true&pageSize=100`;
      
            try {
              const response = await fetch(alchemyURL, options);
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              console.log(data);
              const ownedNfts = data.ownedNfts.filter((nft: any) => nft.contract.address === contractAddress);
              setNfts(ownedNfts);
            } catch (error) {
              console.error('Error fetching NFTs:', error);
            }
          };
      
          fetchNFTs();
        }
      }, [address, allowedAddresses]);

    return (
    <>
        {popup.open && (
        <div
            style={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: popup.success ? 'green' : 'red',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            zIndex: 1000,
            }}
        >
            {popup.message}
        </div>
        )}
        <Flex $style={{
            fDirection: "column",
            w: "100%",
            vAlign: "center",
            position: "relative",
            zIndex: "1"
        }}>
            <Flex $style={{
                background: `url(${appConstants.Imgs.Banner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minH: "15rem",
                w: "100%",
            }}>
                <Flex $style={{
                    background: "linear-gradient(180deg, rgba(162, 89, 255, 0.00) 0%, #232323 100%);",
                    w: "100%",
                    position: "relative",
                }}>
                    <Flex $style={{
                        w: "100%",
                        hAlign: "center"
                    }}>
                        <Flex $style={{
                            w: "100%",
                            maxW: "1440px",
                            transform: "translateY(50%)",
                            p: "2rem 1rem 2rem 1rem",
                            queries: {
                                480: {
                                    p: "2rem"
                                }
                            }
                        }}>
                            <AvatarContainer>
                                <Image src={appConstants.Imgs.Avatar6} />
                            </AvatarContainer>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex $style={{
                fDirection: "column",
                p: "2.5rem 1rem 0 1rem",
                vAlign: "center",
                w: "100%"
            }}>
                <Flex $style={{
                    hAlign: "space-between",
                    p: "2rem 0rem 2rem 0rem",
                    maxW: "1440px",
                    w: "100%",
                    queries: {
                        768: {
                            fDirection: "column",
                            gap: "1rem"
                        },
                        480: {
                            p: "2rem"
                        }
                    }
                }}>
                    <Flex $style={{
                        fDirection: "column",
                        gap: "1rem"
                    }}>
                        <Flex $style={{
                            fDirection: "column",
                            gap: "1rem"
                        }}>
                            <Heading gradient level={3}>{address ? shortenAddress(address) : 'Connect Wallet'}</Heading>
                        </Flex>
                        <Flex $style={{
                            gap: "3rem"
                        }}>
                        </Flex>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: "2rem"
                    }}>
                        <Flex $style={{
                            gap: "1rem",
                            queries: {
                                380: {
                                    fDirection: "column"
                                }
                            }
                        }}>
                            <button
                                onClick={handleListNFT}
                                style={{
                                    backgroundColor: "#A259FF",
                                    borderRadius: "1rem",
                                    padding: "1rem",
                                    zIndex: "1000"
                                }}
                            >
                                LIST NFT
                            </button>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex $style={{
                    p: "2rem 2rem 0rem 5rem",
                    hAlign: "space-between",
                    gap: "1rem",
                    overflow: "auto",
                    w: "100%",
                    maxW: "1440px",
                    queries: {
                        480: {
                            p: "2rem"
                        }
                    }
                }}>
                </Flex>
            </Flex>
            <TabList>
                <Flex $style={{
                    maxW: "1440px",
                    w: "100%",
                    hAlign: "space-between"
                }}>
                    <TabHeader onClick={() => changeActiveTab(0)} isActive={0 === activeTab}>
                        <Span>Inventory</Span>
                    </TabHeader>
                    <TabHeader onClick={() => changeActiveTab(2)} isActive={2 === activeTab}>
                        <Span>Activity</Span>
                    </TabHeader>
                </Flex>
            </TabList>
            <TabContent isActive={2 === activeTab}>
                <ContributionOverview initialYear={new Date().getFullYear()} />
            </TabContent>
            <TabContent isActive={0 === activeTab}>
            <Grid $style={{
                columns: "5",
                gap: "2rem",
                p: "0rem 1rem 5rem 1rem",
                maxW: "1440px",
                w: "100%",
            }}>
                {nfts.map((nft) => (
                    <Flex
                        key={nft.tokenId}
                        $style={{
                            fDirection: "column",
                            background: selectedNft?.tokenId === nft.tokenId ? '#A259FF' : "rgba(16,16,16,.2)",
                            radius: "1rem",
                            transition: "0.5s ease",
                            cursor: "pointer",
                        }}
                        onClick={() => selectNft(nft)}
                    >
                        <div style={{
                            backgroundImage: `url(${nft.image.cachedUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: "1rem 1rem 0 0",
                            overflow: "hidden",
                            height: "15rem",
                        }}>
                        </div>
                        <Flex $style={{
                        p: "2rem",
                        fDirection: "column",
                        gap: "1rem",
                        }}>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Heading level={5}>{nft.name || 'Unnamed NFT'}</Heading>
                                <Span>{nft.contract.name}</Span>
                            </Flex>
                            <Flex $style={{
                                hAlign: "space-between"
                            }}>
                                <Flex $style={{
                                fDirection: "column"
                                }}>
                                <Span>Last Price</Span>
                                <Span>0.00 ETH</Span>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                ))}
            </Grid>
            </TabContent>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box zIndex={1001} borderRadius="1rem" sx={style}>
                    <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        <Button
                            onClick={() => setListingType('AMBER')}
                            $style={{
                                bg: listingType === 'AMBER' ? '#e6a903' : 'grey',
                                color: 'white',
                                p: '10px 20px',
                                kind: 'radius',
                            }}
                        >
                            AMBER
                        </Button>
                        <Button
                            onClick={() => setListingType('MATIC')}
                            $style={{
                                bg: listingType === 'MATIC' ? '#A259FF' : 'grey',
                                color: 'white',
                                p: '10px 20px',
                                kind: 'radius',
                            }}
                        >
                            MATIC
                        </Button>
                    </Box>
                    <TextField
                        margin="normal"
                        id="nft-address"
                        label="NFT Address"
                        fullWidth
                        variant="outlined"
                        value={nftAddress}
                        onChange={e => setNftAddress(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        id="token-id"
                        label="Token ID"
                        fullWidth
                        variant="outlined"
                        value={tokenId}
                        onChange={e => setTokenId(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        id="price"
                        label="Price"
                        fullWidth
                        variant="outlined"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <Button
                        onClick={handleSubmitListing}
                        $style={{
                            bg: isListing ? 'grey' : '#A259FF',
                            color: 'white',
                            p: '10px 20px',
                            kind: 'radius',
                        }}
                        disabled={isListing}
                    >
                        Submit Listing
                    </Button>
                </Box>
            </Modal>
        </Flex>
    </>
    )
}