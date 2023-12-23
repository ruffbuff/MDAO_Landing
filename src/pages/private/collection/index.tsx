import React, { useState, useEffect, useCallback } from 'react';
import Button from "components/basic/button";
import Flex from "components/basic/flex";
import Grid from "components/basic/grid";
import Image from "components/basic/image";
import Heading from "components/basic/heading";
import Icon from "components/basic/icon";
import { Input } from "components/basic/input";
import { P, Span } from "components/basic/text";
import {
    CONTRACT_ADDRESS_2, CONTRACT_ABI_2,
    CONTRACT_AWAKENED,
    CONTRACT_AMBER, CONTRACT_AMBER_ABI
} from "../../../solContracts";
import { ethers } from 'ethers';
import { useAddress } from "@thirdweb-dev/react";
import { useNavigate } from 'react-router-dom';
import { useNft } from 'NftContext';
interface NFT {
    id: string;
    seller: string;
    contractAddress: string;
    tokenId: number;
    listingId: number;
    price: string;
    paymentType: 'MATIC' | 'AMBER';
    media: { gateway: string }[];
    title: string;
}
export default function KabanaClubPage() {
    const connectedAddress = useAddress();
    const navigate = useNavigate();
    const { setSelectedNft } = useNft();
    const [nftsList, setNftsList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedNfts, setSelectedNfts] = useState<NFT[]>([]);
    const [collectionStats, setCollectionStats] = useState({
        totalListed: 0,
        totalSold: 0,
        floorPrice: 0,
        floorPriceEth: 0
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [totalOwners, setTotalOwners] = useState(0);
    const [uniqueOwnersPercentage, setUniqueOwnersPercentage] = useState('0%');
        
    const goToNftDetail = (nft: NFT) => {
        setSelectedNft(nft);
        navigate(`/market/${nft.contractAddress}/${nft.tokenId}`);
    };

    const handleSearchChange = (event: any) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const filteredNftsList = nftsList.filter(nft => 
        nft.title.toLowerCase().includes(searchQuery) ||
        nft.id.toString().includes(searchQuery)
    );

    const isNftSelected = (nft: NFT) => selectedNfts.some(selectedNft => selectedNft.id === nft.id);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    
    // Use this signer for all contract interactions
    const marketContract = new ethers.Contract(CONTRACT_ADDRESS_2, CONTRACT_ABI_2, signer);
    const amberContract = new ethers.Contract(CONTRACT_AMBER, CONTRACT_AMBER_ABI, signer);

    const approveAMBER = async (amount: any) => {
        try {
            const transaction = await amberContract.approve(CONTRACT_ADDRESS_2, amount);
            await transaction.wait();
            console.log('AMBER approved successfully');
        } catch (error) {
            console.error('Error during AMBER approve:', error);
        }
    };

    const apiKey = process.env.REACT_APP_ALCHEMY_API_KEY;
    
    const fetchCollectionData = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
            const contract = new ethers.Contract(CONTRACT_ADDRESS_2, CONTRACT_ABI_2, provider);
    
            const collectionAddress = CONTRACT_AWAKENED;
            const data = await contract.collectionsData(collectionAddress);
            
            setCollectionStats({
                totalListed: data.totalListed.toNumber(),
                totalSold: data.totalSold.toNumber(),
                floorPrice: parseFloat(ethers.utils.formatEther(data.floorPrice)),
                floorPriceEth: parseFloat(ethers.utils.formatEther(data.floorPrice))
            });            
        } catch (error) {
            console.error('Error fetching collection data:', error);
        }
    };
    
    useEffect(() => {
        fetchCollectionData();
    }, []);

    const selectNft = (nftToSelect: NFT) => {
        setSelectedNfts(prevSelectedNfts => {
            if (isNftSelected(nftToSelect)) {
                return prevSelectedNfts.filter(nft => nft.id !== nftToSelect.id);
            } else {
                return [...prevSelectedNfts, nftToSelect];
            }
        });
    };

    // Define the collection address for Kabana Club (or pass it as a prop)
    const kabanaClubCollectionAddress = CONTRACT_AWAKENED; // Replace with actual collection address if different

    // Modify fetchNFTs to filter NFTs by the collection address
    const fetchNFTs = useCallback(async () => {
        setIsLoading(true);
        try {
            const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
            const contract = new ethers.Contract(CONTRACT_ADDRESS_2, CONTRACT_ABI_2, provider);
            const listings = await contract.getActiveListings();

            const requests = listings.map(async (listing: any) => {
                const contractAddress = listing[2];
                const tokenId = listing[3];
                const listingId = listing[0];
                const priceInWei = listing[4];
                const priceInEther = ethers.utils.formatEther(priceInWei);
                const paymentType = listing[6] === 0 ? 'MATIC' : 'AMBER';

                if (contractAddress.toLowerCase() === kabanaClubCollectionAddress.toLowerCase()) {
                    const url = `https://polygon-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTMetadata?contractAddress=${contractAddress}&tokenId=${tokenId}`;
                    const response = await fetch(url, { headers: { accept: 'application/json' } });
                    const data = await response.json();
                    return {
                        ...data,
                        id: listingId.toString(),
                        contractAddress,
                        tokenId,
                        listingId,
                        price: priceInEther,
                        paymentType,
                        seller: listing[1]
                    };
                }
                return null;
            });

            const nftDataList = (await Promise.all(requests)).filter(nft => nft !== null);
            setNftsList(nftDataList);
        } catch (error) {
            console.error('Error fetching NFT data:', error);
        } finally {
            setIsLoading(false);
        }
    }, [kabanaClubCollectionAddress, apiKey]);

    useEffect(() => {
        fetchNFTs();
    }, [fetchNFTs]);

    useEffect(() => {
        const fetchOwnersData = async () => {
            const url = `https://polygon-mainnet.g.alchemy.com/nft/v3/${process.env.REACT_APP_ALCHEMY_API_KEY}/getOwnersForContract?contractAddress=${CONTRACT_AWAKENED}&withTokenBalances=true`;
            try {
                const response = await fetch(url, { headers: { accept: 'application/json' } });
                const data = await response.json();
                const owners = data.owners;
    
                const totalTokens = owners.reduce((acc: number, owner: { tokenBalances: { balance: string }[] }) => acc + owner.tokenBalances.length, 0);
    
                const uniqueOwners = owners.length;
    
                setTotalOwners(uniqueOwners);
                setUniqueOwnersPercentage(((uniqueOwners / totalTokens) * 100).toFixed(2) + '%');
            } catch (error) {
                console.error('Error fetching owners data:', error);
            }
        };
    
        fetchOwnersData();
    }, []);

    const handleBuy = async (selectedNft: NFT) => {
        if (!selectedNft) return;
        
        if (selectedNft.paymentType === 'AMBER') {
            const tokenAmount = ethers.utils.parseEther(selectedNft.price);
            await approveAMBER(tokenAmount);
    
            try {
                const transaction = await marketContract.buyWithAMBER(selectedNft.listingId, tokenAmount);
                await transaction.wait();
                console.log('AMBER NFT purchase successful');
            } catch (error) {
                console.error('AMBER purchase transaction failed:', error);
            }
        } else if (selectedNft.paymentType === 'MATIC') {
            try {
                const transaction = await marketContract.buyWithMATIC(selectedNft.listingId, { value: ethers.utils.parseEther(selectedNft.price) });
                await transaction.wait();
                console.log('MATIC NFT purchase successful');
            } catch (error) {
                console.error('MATIC purchase transaction failed:', error);
            }
        }
    };

    const handleBulkBuyWithMATIC = async () => {
        if (selectedNfts.length === 0) {
            alert('No NFTs selected');
            return;
        }

        const totalMaticAmount = selectedNfts.reduce((acc, nft) => {
            return acc.add(ethers.utils.parseEther(nft.price));
        }, ethers.BigNumber.from(0));
        
        const listingIds = selectedNfts.map(nft => nft.listingId);
    
        try {
            await marketContract.bulkBuyWithMATIC(listingIds, { value: totalMaticAmount });
            console.log('Bulk MATIC purchase successful');
        } catch (error) {
            console.error('Error during bulk MATIC purchase:', error);
        }
    };
    
    const handleBulkBuyWithAMBER = async () => {
        if (selectedNfts.length === 0) {
            alert('No NFTs selected');
            return;
        }

        const totalAmount = selectedNfts.reduce((acc, nft) => acc.add(ethers.utils.parseEther(nft.price)), ethers.BigNumber.from(0));
        await approveAMBER(totalAmount);
    
        const listingIds = selectedNfts.map(nft => nft.listingId);
        try {
            await marketContract.bulkBuyWithAMBER(listingIds, totalAmount);
            console.log('Bulk AMBER purchase successful');
        } catch (error) {
            console.error('Error during bulk AMBER purchase:', error);
        }
    };

    const handleSweep = async () => {
        if (selectedNfts.length === 0) {
            alert('No NFTs selected');
            return;
        }


        // Проверяем, что все выбранные NFT имеют одинаковый тип оплаты
        const paymentType = selectedNfts[0].paymentType;
        const allSamePaymentType = selectedNfts.every(nft => nft.paymentType === paymentType);
    
        if (!allSamePaymentType) {
            alert('All selected NFTs must have the same payment type');
            return;
        }
    
        // Вызываем соответствующую функцию покупки в зависимости от типа оплаты
        if (paymentType === 'AMBER') {
            await handleBulkBuyWithAMBER();
        } else if (paymentType === 'MATIC') {
            await handleBulkBuyWithMATIC();
        }
    };

    const firstNFT = nftsList.length > 0 ? nftsList[0] : null;

    return (
        <Flex $style={{
            fDirection: "column",
            flex: "1",
            vAlign: "center",
            position: "relative",
            zIndex: "1"
        }}>
            <Flex $style={{
                background: `url(https://i.seadn.io/gcs/files/5643ea2b3e6e6341df027bdebb027ab2.png?auto=format&dpr=1&w=3840)`,
                h: "32rem",
                mb: "2rem",
                w: "100%"
            }}>
                <Flex $style={{
                    background: "linear-gradient(180deg, rgba(162, 89, 255, 0.00) 0%, #232323 100%);",
                    h: "100%",
                    w: "100%",
                    hAlign: "center"
                }}>
                    <Flex $style={{
                        vAlign: "flex-end",
                        hAlign: "space-between",
                        w: "100%",
                        p: "3rem 0",
                        maxW: "1440px",
                        queries: {
                            620: {
                                fDirection: "column",
                                hAlign: "flex-end",
                                vAlign: "flex-start",
                                gap: "1rem"
                            }
                        }
                    }}>
                        <Flex $style={{
                            fDirection: "column",
                            vAlign: "flex-start",
                            gap: "1rem"
                        }}>
                            <Flex $style={{
                                background: "#3B3B3B",
                                p: ".5rem 1rem",
                                radius: "1rem"
                            }}>
                                <Span>Kabana Club</Span>
                            </Flex>
                            {firstNFT && (
                                <>
                                    <Heading level={2}>Awakened Mushrooms</Heading>
                                    <a href="https://kabana.club/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                        <Button $style={{
                                            bg: "white",
                                            color: "black",
                                            kind: "radius"
                                        }}>
                                            WEBSITE
                                        </Button>
                                    </a>
                                </>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex $style={{
                fDirection: "column",
                mb: "3rem",
                w: "100%",
                maxW: "1440px",
            }}>
                <Flex $style={{
                    gap: "2rem",
                    mb: "2rem"
                }}>
                    <Span>Whitepaper</Span>
                    <Span>Roadmap</Span>
                </Flex>
                <Flex $style={{
                    fDirection: "row",
                    alignItems: "flex-start",
                    gap: "1rem", 
                    mb: "2rem"
                }}>
                    <Image 
                        src="https://i.seadn.io/gae/Cb_v8uUJT_VBQPJzkYb1K6r88zCkWDQcFoPHYqc-HfsPFNpRCLxqLk64Pr6n00AdPNrNjVzg54n04V8MyQ45a4XUtE_6lQwXYLF6cA?auto=format&dpr=1&w=128" 
                        style={{ 
                            alignSelf: "start",
                            width: "100px",
                            height: "100px",
                            borderRadius: "2rem"
                        }} 
                    />
                    <Flex $style={{
                        fDirection: "column",
                        gap: "1rem",
                    }}>
                        {firstNFT && (
                            <>
                                <Heading level={4}>Description</Heading>
                                <P>{firstNFT.description}</P>
                            </>
                        )}
                    </Flex>
                </Flex>
                <Flex $style={{
                    gap: "2rem",
                    queries: {
                        420: {
                            fDirection: "column"
                        }
                    }
                }}>
                    <Flex $style={{
                        fDirection: "column",
                        gap: ".5rem"
                    }}>
                        <Heading level={4}>{collectionStats.floorPrice} AMBER</Heading>
                        <Span>Floor price</Span>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: ".5rem"
                    }}>
                        <Heading level={4}>{collectionStats.totalSold}</Heading>
                        <Span>Total Sold</Span>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: ".5rem"
                    }}>
                        <Heading level={4}>{collectionStats.totalListed}</Heading>
                        <Span>Listed</Span>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: ".5rem"
                    }}>
                        <Heading level={4}>{totalOwners}</Heading>
                        <Span>Owners</Span>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: ".5rem"
                    }}>
                        <Heading level={4}>{uniqueOwnersPercentage}</Heading>
                        <Span>Unique Owners</Span>
                    </Flex>
                </Flex>
            </Flex>
            <Flex $style={{
                gap: "1rem",
                vAlign: "center",
                mb: "3rem",
                w: "100%",
                maxW: "1440px",
                queries: {
                    768: {
                        fDirection: "column"
                    }
                }
            }}>
                <Flex $style={{
                }}>
                    <Span $style={{
                        wrap: "nowrap"
                    }}>Total Listed: {nftsList.length}</Span>
                </Flex>
                <Input 
                    $style={{ border: "1px solid #3B3B3B" }}
                    placeholder="Search by Name or ID"
                    onChange={handleSearchChange}
                />
                <Flex $style={{
                    gap: "1rem",
                    queries: {
                        380: {
                            fDirection: "column"
                        }
                    }
                }}>
                    {selectedNfts.length === 1 && (
                        <Button
                            onClick={() => handleBuy(selectedNfts[0])}
                            $style={{
                                bg: "#A259FF",
                                kind: "radius"
                            }}
                        >
                            <Flex $style={{
                                gap: ".5rem"
                            }}>
                                <Icon icon={'buy'} />
                                <Span>Buy</Span>
                            </Flex>
                        </Button>
                    )}
                    {selectedNfts.length > 1 && (
                        <Button onClick={handleSweep} $style={{
                            border: "1px solid #A259FF",
                            kind: "radius"
                        }}>
                            <Flex $style={{
                                gap: ".5rem"
                            }}>
                                <Icon icon={'sweep'} />
                                <Span>Sweep</Span>
                            </Flex>
                        </Button>
                    )}
                </Flex>
            </Flex>
            <Grid $style={{
                columns: "5",
                gap: "3rem",
                mb: "3rem",
                w: "100%",
                maxW: "1440px",
                $queries: {
                    1380: { columns: "4" },
                    1024: { columns: "3" },
                    768: { columns: "2" },
                    480: { columns: "1" }
                }
            }}>
                {filteredNftsList.map((nft, index) => {
                    const isOwnedByUser = nft.seller.toLowerCase() === connectedAddress?.toLowerCase();
                    const isSelected = isNftSelected(nft);

                    const nftStyle = {
                        cursor: 'pointer',
                        width: '100%',
                        border: isSelected ? "1px solid white" : "none",
                        borderRadius: "2rem",
                        background: isOwnedByUser ? "rgba(0, 128, 0, .5)" : (isSelected ? "rgba(16,16,16,.5)" : "rgba(16,16,16,.2)"),
                    };

                    return (
                        <div key={index} onClick={() => selectNft(nft)} style={nftStyle}>
                            <Flex $style={{
                                fDirection: "column",
                                background: isOwnedByUser ? "rgba(0, 128, 0, .5)" : (isNftSelected(nft) ? "rgba(16,16,16,.5)" : "rgba(16,16,16,.2)"),
                                radius: "2rem",
                                w: "100%"
                            }}>
                                <div
                                    style={{
                                        backgroundImage: `url(${nft.media[0]?.gateway || 'default_image_url'})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        borderRadius: "2rem 2rem 0 0",
                                        overflow: "hidden",
                                        height: "15rem"
                                    }}
                                >
                                </div>
                                <Flex $style={{
                                    p: "2rem",
                                    fDirection: "column",
                                    gap: "1rem"
                                }}>
                                    <Flex $style={{ fDirection: "column" }}>
                                        <Heading level={5}>{nft.title || 'NFT Name'}</Heading>
                                        <Flex $style={{
                                            alignItems: "center",
                                            gap: "0.5rem"
                                        }}>
                                            <Image 
                                                src="https://i.seadn.io/gae/Cb_v8uUJT_VBQPJzkYb1K6r88zCkWDQcFoPHYqc-HfsPFNpRCLxqLk64Pr6n00AdPNrNjVzg54n04V8MyQ45a4XUtE_6lQwXYLF6cA?auto=format&dpr=1&w=128" 
                                                style={{ 
                                                    width: "30px",
                                                    height: "30px",
                                                    borderRadius: "15px"
                                                }} 
                                            />
                                            <Span>{nft.contractMetadata?.name || 'Collection Name'}</Span>
                                        </Flex>
                                    </Flex>
                                    <Flex $style={{ hAlign: "space-between" }}>
                                        <Flex $style={{ fDirection: "column" }}>
                                            <Span>Price</Span>
                                            <Span>{nft.price || '0.00'} {nft.paymentType}</Span>
                                        </Flex>
                                    </Flex>
                                    <Button 
                                        onClick={() => goToNftDetail(nft)}
                                        $style={{
                                            bg: "#A259FF",
                                            kind: "radius",
                                        }}
                                    >
                                        View Details
                                    </Button>
                                </Flex>
                            </Flex>
                        </div>
                    );
                })}
            </Grid>
        </Flex>
    )
}