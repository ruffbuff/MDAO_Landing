import React, { useState, useEffect } from 'react';
import Button from "components/basic/button";
import Flex from "components/basic/flex";
import Grid from "components/basic/grid";
import Image from "components/basic/image";
import Heading from "components/basic/heading";
import Icon from "components/basic/icon";
import { Input } from "components/basic/input";
import { P, Span } from "components/basic/text";
import appConstants from "constant";
import {
    CONTRACT_ADDRESS_2,
    CONTRACT_ABI_2
} from "../../../solContracts";
import { ethers } from 'ethers';
import { useAddress } from "@thirdweb-dev/react";
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
    const [nftsList, setNftsList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedNfts, setSelectedNfts] = useState<NFT[]>([]);

    const isNftSelected = (nft: NFT) => selectedNfts.some(selectedNft => selectedNft.id === nft.id);
    
    const apiKey = process.env.REACT_APP_ALCHEMY_API_KEY;

    const selectNft = (nftToSelect: NFT) => {
        setSelectedNfts(prevSelectedNfts => {
            if (isNftSelected(nftToSelect)) {
                return prevSelectedNfts.filter(nft => nft.id !== nftToSelect.id);
            } else {
                return [...prevSelectedNfts, nftToSelect];
            }
        });
    };

    const fetchNFTs = async () => {
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
            });
    
            const nftDataList = await Promise.all(requests);
            setNftsList(nftDataList);
        } catch (error) {
            console.error('Error fetching NFT data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNFTs();
    }, []);

    const handleBuy = async (selectedNft: NFT) => {
        if (!selectedNft) return;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS_2, CONTRACT_ABI_2, provider.getSigner());
        try {
            let transaction;
            if (selectedNft.paymentType === 'MATIC') {
                transaction = await contract.buyWithMATIC(selectedNft.listingId, { value: ethers.utils.parseEther(selectedNft.price) });
            } else if (selectedNft.paymentType === 'AMBER') {
                const tokenAmount = ethers.utils.parseEther(selectedNft.price);
                transaction = await contract.buyWithAMBER(selectedNft.listingId, tokenAmount);
            }

            if (transaction) {
                await transaction.wait();
                console.log('Transaction successful');
            }
        } catch (error) {
            console.error('Transaction failed:', error);
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
                background: `url(${appConstants.Imgs.BG2})`,
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
                        <Heading level={4}>0.00 AMBER</Heading>
                        <Span>Total Volume</Span>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: ".5rem"
                    }}>
                        <Heading level={4}>0.00 AMBER</Heading>
                        <Span>Floor price</Span>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: ".5rem"
                    }}>
                        <Heading level={4}>0.00 AMBER</Heading>
                        <Span>Best Offer</Span>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: ".5rem"
                    }}>
                        <Heading level={4}>0%</Heading>
                        <Span>Listed</Span>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: ".5rem"
                    }}>
                        <Heading level={4}>0</Heading>
                        <Span>Owners</Span>
                    </Flex>
                    <Flex $style={{
                        fDirection: "column",
                        gap: ".5rem"
                    }}>
                        <Heading level={4}>0%</Heading>
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
                    }}>Total NFTs: {nftsList.length}</Span>
                </Flex>
                <Input $style={{
                    border: "1px solid #3B3B3B"
                }} placeholder="Search by Name" />
                <Input $style={{
                    border: "1px solid #3B3B3B"
                }} placeholder="Price to Low" />
                <Flex $style={{
                    gap: "1rem",
                    queries: {
                        380: {
                            fDirection: "column"
                        }
                    }
                }}>
                    <Button
                        onClick={() => selectedNfts.length > 0 && handleBuy(selectedNfts[0])}
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
                    <Button $style={{
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
                {nftsList.map((nft, index) => {
                    const isOwnedByUser = nft.seller.toLowerCase() === connectedAddress?.toLowerCase();

                    return (
                        <div key={index} onClick={() => selectNft(nft)} style={{ cursor: 'pointer', width: '100%' }}>
                            <Flex $style={{
                                fDirection: "column",
                                background: isOwnedByUser ? "rgba(0, 128, 0, .5)" : (isNftSelected(nft) ? "rgba(16,16,16,.5)" : "rgba(16,16,16,.2)"),
                                radius: "2rem",
                                w: "100%"
                            }}>
                                <div style={{
                                    backgroundImage: `url(${nft.media[0]?.gateway || 'default_image_url'})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: "2rem 2rem 0 0",
                                    overflow: "hidden",
                                    height: "15rem"
                                }}></div>
                                <Flex $style={{
                                    p: "2rem",
                                    fDirection: "column",
                                    gap: "1rem"
                                }}>
                                    <Flex $style={{ fDirection: "column" }}>
                                        <Heading level={5}>{nft.title || 'NFT Name'}</Heading>
                                        <Span>{nft.contractMetadata?.name || 'Collection Name'}</Span>
                                    </Flex>
                                    <Flex $style={{ hAlign: "space-between" }}>
                                        <Flex $style={{ fDirection: "column" }}>
                                            <Span>Price</Span>
                                            <Span>{nft.price || '0.00'} {nft.paymentType}</Span>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </div>
                    );
                })}
            </Grid>
        </Flex>
    )
}