import Button from "components/basic/button";
import Flex from "components/basic/flex";
import Grid from "components/basic/grid";
import Heading from "components/basic/heading";
import Icon from "components/basic/icon";
import Image from "components/basic/image";
import { Span } from "components/basic/text";
import appConstants from "constant";
import { TabContent, TabHeader, TabList } from "components/basic/tab";

import React, { useState, useEffect, useMemo } from "react";
import { useAddress,  } from "@thirdweb-dev/react";
import { ethers } from 'ethers';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
    CONTRACT_ABI_2,
    CONTRACT_ADDRESS_2,
    CONTRACT_ABI_AWAKENED
} from "../../../solContracts";

interface ContributionTitleProps {
    date: string,
    count: number
}
interface NFTImage {
  url?: string;
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

interface ContributionOverviewProps {
    year: number
}

const ContributionTile = ({ date, count }: ContributionTitleProps) => {
    return (
        <Flex className="contribution-tile" $style={{
            minH: "12px",
            minW: "12px",
            radius: "3px",
            background: count > 5 ? '#1DAEFF' : 'rgba(29,174,255, .1)',
            m: "5px",
            display: "flex",
            fDirection: "column",
            hAlign: "center",
            vAlign: "center"
        }}>
        </Flex>
    );
};

const ContributionOverview = ({ year }: ContributionOverviewProps) => {

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const contributions = [];

    // Generate contributions data for each day within the year
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split('T')[0];
        const count = Math.floor(Math.random() * 10); // Example: Random count for demonstration

        contributions.push({
            id: dateString,
            date: dateString,
            count: count
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return (
        <Flex $style={{
            fDirection: "column",
            vAlign: "center",
            mb: "10rem",
            position: "relative",
            zIndex: "1"
        }}>
            <Flex $style={{
                w: "100%",
                maxW: "1440px",
                fDirection: "column",
                gap: "2rem"
            }}>
                <h2>Contribution Overview</h2>
                <Flex $style={{
                    vAlign: "flex-start",
                    gap: "3rem"
                }}>
                    <Flex $style={{
                        fDirection: "column",
                        gap: "1rem"
                    }}>
                        <Span $style={{
                            wrap: "nowrap"
                        }}>95 edits in the last year</Span>
                        <Flex $style={{
                            fDirection: "column",
                            gap: ".5rem"
                        }}>
                            <Flex $style={{
                                vAlign: "center",
                                gap: "1rem"
                            }}>
                                <Flex className="contribution-tile" $style={{
                                    minH: "12px",
                                    minW: "12px",
                                    radius: "3px",
                                    background: 'rgba(29,174,255, .1)',
                                    display: "flex",
                                    fDirection: "column",
                                    hAlign: "center",
                                    vAlign: "center"
                                }}>
                                </Flex>
                                <Span>136 low days</Span>
                            </Flex>
                            <Flex $style={{
                                vAlign: "center",
                                gap: "1rem"
                            }}>
                                <Flex className="contribution-tile" $style={{
                                    minH: "12px",
                                    minW: "12px",
                                    radius: "3px",
                                    background: 'rgba(29,174,255, .65)',
                                    display: "flex",
                                    fDirection: "column",
                                    hAlign: "center",
                                    vAlign: "center"
                                }}>
                                </Flex>
                                <Span>69 Normal days</Span>
                            </Flex>
                            <Flex $style={{
                                vAlign: "center",
                                gap: "1rem"
                            }}>
                                <Flex className="contribution-tile" $style={{
                                    minH: "12px",
                                    minW: "12px",
                                    radius: "3px",
                                    background: 'rgba(29,174,255, 1)',
                                    display: "flex",
                                    fDirection: "column",
                                    hAlign: "center",
                                    vAlign: "center"
                                }}>
                                </Flex>
                                <Span>20 hard days</Span>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex $style={{
                        fDirection: "column",
                    }}>
                        <Flex $style={{
                            p: "0 0 0 2rem",
                            gap: "72px"
                        }}>
                            <Span $style={{
                                size: "12px"
                            }}>Dec</Span>
                            <Span $style={{
                                size: "12px"
                            }}>Jan</Span>
                            <Span $style={{
                                size: "12px"
                            }}>Feb</Span>
                            <Span $style={{
                                size: "12px"
                            }}>Mar</Span>
                            <Span $style={{
                                size: "12px"
                            }}>Apr</Span>
                            <Span $style={{
                                size: "12px"
                            }}>May</Span>
                            <Span $style={{
                                size: "12px"
                            }}>June</Span>
                            <Span $style={{
                                size: "12px"
                            }}>July</Span>
                            <Span $style={{
                                size: "12px"
                            }}>Aug</Span>
                            <Span $style={{
                                size: "12px"
                            }}>Sep</Span>
                            <Span $style={{
                                size: "12px"
                            }}>Oct</Span>
                            <Span $style={{
                                size: "12px"
                            }}>Nov</Span>
                        </Flex>
                        <Flex>
                            <Flex $style={{
                                fDirection: "column",
                                gap: "26px",
                                m: "3px"
                            }}>
                                <Span $style={{
                                    size: "12px",
                                }}>Mon</Span>
                                <Span $style={{
                                    size: "12px",
                                }}>Wed</Span>
                                <Span $style={{
                                    size: "12px",
                                }}>Fri</Span>
                            </Flex>
                            <Flex $style={{
                                fWrap: "wrap",
                            }}>
                                {contributions.map((contribution) => (
                                    <ContributionTile
                                        key={contribution.id}
                                        date={contribution.date}
                                        count={contribution.count}
                                    />
                                ))}
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

/* =====================================================PROFILEPAGE===================================================== */

export default function ProfilePage() {
    const address = useAddress();
    const [activeTab, setActiveTab] = useState(0);
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [isListing, setIsListing] = useState(false);
    const [selectedNft, setSelectedNft] = useState<NFT | null>(null);

    const [open, setOpen] = useState(false);
    const [nftAddress, setNftAddress] = useState('');
    const [tokenId, setTokenId] = useState('');
    const [price, setPrice] = useState('');
    const [listingType, setListingType] = useState<'AMBER' | 'MATIC'>('AMBER');

    const shortenAddress = (address: any, chars = 4) => {
        return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
    }

    const allowedAddresses = useMemo(() => [
        "0x564e6588DAfA2F79c5805e07860CB869AEdb33d9",
        "0x24A11e702CD90f034Ea44FaF1e180C0C654AC5d9",
        "0xEf41141fBC0A7C870F30feE81c6214582DC2A494",
        "0x9d305a42A3975Ee4c1C57555BeD5919889DCE63F",
        "0xE28D2D8746D855251BA677a91626009CB33aA4F9"
    ], []);

    const changeActiveTab = (index: number) => {
        setActiveTab(() => index);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const selectNft = (nft: NFT) => {
        if (selectedNft?.tokenId === nft.tokenId) {
            // Deselect the NFT if it is already selected
            setSelectedNft(null);
            setNftAddress('');
            setTokenId('');
        } else {
            // Select the NFT
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
    
            // Check if the token is already approved for the marketplace contract
            const approvedAddress = await nftContract.getApproved(tokenId);
            if (approvedAddress !== CONTRACT_ADDRESS_2) {
                let approveTransaction = await nftContract.approve(CONTRACT_ADDRESS_2, tokenId);
                await approveTransaction.wait();
                console.log(`Approval successful for token ID ${tokenId}`);
            } else {
                console.log(`Token ID ${tokenId} is already approved for the marketplace`);
            }
    
            // Call listNFT with the correct price in Wei after approval
            await listNFT(nftAddress, tokenId, priceInWei, listingType);
        } catch (error) {
            console.error(`Error approving NFT for listing:`, error);
        } finally {
            setIsListing(false);
        }
    };

    const getNFTCountFromAlchemy = async (ownerAddress: string): Promise<number> => {
        const alchemyApiKey = process.env.REACT_APP_ALCHEMY_API_KEY;
        const contractAddress = "0x564e6588DAfA2F79c5805e07860CB869AEdb33d9";
        const url = `https://polygon-mainnet.g.alchemy.com/nft/v3/${alchemyApiKey}/getNFTsForOwner?owner=${ownerAddress}&contractAddresses[]=${contractAddress}&withMetadata=true&pageSize=100&orderBy=transferTime`;
    
        try {
            const response = await fetch(url, { method: 'GET', headers: { accept: 'application/json' } });
            const data = await response.json();
            return data.ownedNfts.length;
        } catch (error) {
            console.error('Error fetching NFT count:', error);
            return 0;
        }
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
            
            if (!address) {
                console.error("Address is undefined.");
                return;
            }
    
            const nftCount = await getNFTCountFromAlchemy(address);
            const contract = new ethers.Contract(CONTRACT_ADDRESS_2, CONTRACT_ABI_2, signer);
    
            const priceInWei = ethers.utils.parseUnits(price, 'ether');
            let commission;
    
            if (nftCount >= 3) {
                commission = 0;
            } else if (nftCount >= 1) {
                commission = ethers.utils.parseUnits('0.07', 'ether');
            } else {
                commission = ethers.utils.parseUnits('0.35', 'ether');
            }
    
            if (listingType === 'AMBER') {
                await contract.listForAMBER(nftAddress, tokenId, price, { value: commission });
            } else {
                await contract.listForMATIC(nftAddress, tokenId, priceInWei, { value: commission });
            }
    
            console.log(`${listingType} listing successful for token ID ${tokenId}`);
            setOpen(false);
        } catch (error) {
            console.error(`Error listing NFT for ${listingType}:`, error);
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
    
        let priceInWei;
        if (listingType === 'AMBER') {
            priceInWei = ethers.utils.parseUnits(price || '0', 'ether').toString();
        } else {
            priceInWei = price || '0';
        }
    
        await approveNFT(selectedNft.contract.address || '', selectedNft.tokenId || '', priceInWei, listingType);
    };
    
    useEffect(() => {
        if (address) {
            const options = { method: 'GET', headers: { accept: 'application/json' } };
            const apiKey = process.env.REACT_APP_ALCHEMY_API_KEY;
            const timestamp = new Date().getTime();
            const alchemyURL = `https://polygon-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?owner=${address}&withMetadata=true&pageSize=100&timestamp=${timestamp}`;
        
            fetch(alchemyURL, options)
                .then(response => response.json())
                .then(data => {
                    const filteredNfts = data.ownedNfts
                        .filter((nft: any) => allowedAddresses.includes(nft.contract.address))
                        .map((nft: any) => ({
                            tokenId: nft.tokenId,
                            tokenType: nft.tokenType,
                            name: nft.name || 'Unnamed NFT',
                            description: nft.description,
                            tokenUri: nft.tokenUri,
                            image: {
                                url: nft.image?.cachedUrl || nft.image?.originalUrl,
                            },
                            contract: {
                                address: nft.contract?.address,
                                name: nft.contract?.name,
                            },
                }));
              setNfts(filteredNfts);
            })
            .catch(err => console.error(err));
        }
      }, [address, allowedAddresses]);
    
    return (
        <Flex $style={{
            fDirection: "column",
            w: "100%",
            vAlign: "center",
            position: "relative",
            zIndex: "1"
        }}>

            <Flex $style={{
                background: `url(${appConstants.Imgs.Banner})`,
                minH: "15rem",
                w: "100%",
            }}>
                <Flex $style={{
                    background: "linear-gradient(180deg, rgba(162, 89, 255, 0.00) 0%, #232323 100%);",
                    w: "100%",
                    position: "relative"
                }}>
                    <Flex $style={{
                        w: "100%",
                        hAlign: "center"
                    }}>
                        <Flex $style={{
                            w: "100%",
                            maxW: "1440px",
                            transform: "translateY(50%)",
                            p: "2rem 0rem 2rem 0rem",
                            queries: {
                                480: {
                                    p: "2rem"
                                }
                            }
                        }}>
                            <Image src={appConstants.Imgs.Avatar6} $style={{ maxW: "100px" }} />
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex $style={{
                fDirection: "column",
                p: "3rem 0 0 0",
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
                        <Flex $style={{
                            gap: "1rem"
                        }}>
                            <Icon icon="discord" />
                            <Icon icon="youtube" />
                            <Icon icon="twitter" />
                        </Flex>
                            <Heading gradient level={3}>{address ? shortenAddress(address) : 'Err'}</Heading>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Heading level={5}>Bio</Heading>
                                <Span>Database Bio here.</Span>
                            </Flex>
                        </Flex>
                        <Flex $style={{
                            gap: "3rem"
                        }}>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Heading level={4}>0.00</Heading>
                                <Span>Volume</Span>
                            </Flex>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Heading level={4}>0</Heading>
                                <Span>NFTs Sold</Span>
                            </Flex>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                                <Heading level={4}>0</Heading>
                                <Span>Followers</Span>
                            </Flex>
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
                            <button style={{
                                border: "1px solid #A259FF",
                                borderRadius: "1rem",
                                padding: "1rem",
                                zIndex: "1000"
                            }}>
                                SETTINGS
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
                        <Span>Owned</Span>
                    </TabHeader>
                    <TabHeader onClick={() => changeActiveTab(1)} isActive={1 === activeTab}>
                        <Span>Created</Span>
                    </TabHeader>
                    <TabHeader onClick={() => changeActiveTab(2)} isActive={2 === activeTab}>
                        <Span>Activity</Span>
                    </TabHeader>
                </Flex>
            </TabList>
            <TabContent isActive={0 === activeTab}>
            <Grid $style={{
                columns: "5",
                gap: "2rem",
                p: "0rem 0rem 5rem 0rem",
                maxW: "1440px",
                w: "100%",
            }}>
                { nfts.map((nft) => (
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
                        backgroundImage: `url(${nft.image.url})`,
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
            <TabContent isActive={2 === activeTab}>
                <ContributionOverview year={2023} />
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
    )
}