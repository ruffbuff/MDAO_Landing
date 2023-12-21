import Flex from "components/basic/flex";
import Grid from "components/basic/grid";
import Heading from "components/basic/heading";
import Icon from "components/basic/icon";
import Image from "components/basic/image";
import Button from "components/basic/button";
import { P, Span } from "components/basic/text";
import appConstants from "constant";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAddress } from "@thirdweb-dev/react";
import { useNft } from "NftContext";
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS_2, CONTRACT_ABI_2 } from "../../../solContracts";
interface NftData {
    media?: { gateway: string }[];
    description?: string;
    metadata?: {
        attributes?: {
            trait_type: string;
            value: string;
        }[];
    };
    title?: string;
    contractMetadata?: {
        name: string;
    };
}
export default function DetailPage() {
    const connectedAddress = useAddress();

    const { contractAddress, tokenId } = useParams();
    const { selectedNft } = useNft();
    const [nftData, setNftData] = useState<NftData | null>(null);

    const isOwner = () => {
        return selectedNft && selectedNft.seller === connectedAddress;
    };

    const handleCancelListing = async () => {
        if (!selectedNft) return;
    
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS_2, CONTRACT_ABI_2, signer);
    
            const transaction = await contract.cancelListing(selectedNft.listingId);
            await transaction.wait();
            console.log('Listing canceled successfully');
        } catch (error) {
            console.error('Error canceling listing:', error);
        }
    };

    const handleBuy = async () => {
        if (!selectedNft) return;

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS_2, CONTRACT_ABI_2, signer);

            let transaction;
            if (selectedNft.paymentType === 'MATIC') {
                transaction = await contract.buyWithMATIC(selectedNft.listingId, { value: ethers.utils.parseEther(selectedNft.price) });
            } else if (selectedNft.paymentType === 'AMBER') {
                transaction = await contract.buyWithAMBER(selectedNft.listingId, ethers.utils.parseEther(selectedNft.price));
            }

            await transaction.wait();
            console.log('Transaction successful');
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    };

    useEffect(() => {
        const apiKey = process.env.REACT_APP_ALCHEMY_API_KEY;
        const url = `https://polygon-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTMetadata?contractAddress=${contractAddress}&tokenId=${tokenId}`;

        fetch(url)
            .then(response => response.json())
            .then(data => setNftData(data))
            .catch(error => console.error('Error fetching NFT data:', error));
    }, [contractAddress, tokenId]);

    return (
        <Flex $style={{
            w: "100%",
            position: "relative",
            zIndex: "1",
            m: "5rem 0"
        }}>
            <Flex $style={{
                gap: "2rem",
                w: "100%",
                hAlign: "center",
                queries: {
                    768: {
                        fDirection: "column"
                    }
                }
            }}>
                <Flex $style={{
                    fDirection: "column",
                    gap: "2rem",
                    maxW: "40rem"
                }}>
                    <Image 
                        $style={{ radius: "1rem" }} 
                        src={nftData?.media?.[0]?.gateway || appConstants.Imgs.DETAIL} 
                    />
                    <Flex $style={{
                        fDirection: "column"
                    }}>
                        <Flex $style={{
                            gap: "1rem",
                            fDirection: "column",
                            background: "rgba(16,16,16,.2)",
                            p: "1rem",
                            radius: "1rem",
                            border: ".5px solid #2D2E36",
                            mb: "1rem"
                        }}>
                            <Heading level={5}>Description</Heading>
                            <P>{nftData?.description || 'Description here...'}</P>
                        </Flex>
                        <Flex $style={{
                            gap: "1rem",
                            fDirection: "column",
                            background: "rgba(16,16,16,.2)",
                            p: "1rem",
                            radius: "1rem",
                            border: ".5px solid #2D2E36"
                        }}>
                            <Heading level={5}>Attributes</Heading>
                            <Grid $style={{
                                columns: "2",
                                gap: "1rem"
                            }}>
                                {nftData?.metadata?.attributes?.map((attribute, index) => (
                                    <Flex $style={{
                                        gap: "0.5rem"
                                    }} key={index}>
                                    <Span $style={{
                                        weight: "bold"
                                    }}>
                                        {attribute.trait_type}:
                                    </Span>
                                    <Span style={{ marginLeft: "auto" }}>{attribute.value}</Span>
                                    </Flex>
                                ))}
                            </Grid>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex $style={{
                    fDirection: "column",
                    w: "100%",
                    maxW: "30rem"
                }}>
                    <Flex $style={{
                        mb: '1rem',
                        hAlign: "space-between"
                    }}>
                        <Heading level={3}>{nftData?.title || 'NFT Name'}</Heading>
                        <Flex $style={{
                            gap: ".5rem"
                        }}>
                            <Icon icon={'graph'} />
                            <Icon icon={'wallet'} />
                            <Icon icon={'message'} />
                        </Flex>
                    </Flex>
                    <Flex $style={{
                        gap: "1rem",
                        fDirection: "column",
                        background: "rgba(16,16,16,.2)",
                        p: "1rem",
                        radius: "1rem",
                        border: ".5px solid #2D2E36",
                        mb: "1rem"
                    }}>
                        <Heading level={5}>Collection</Heading>
                        <Flex $style={{
                            gap: ".5rem",
                            fDirection: "column",
                        }}>
                            <Flex $style={{
                                hAlign: "space-between"
                            }}>
                                <Span>{nftData?.contractMetadata?.name || 'Collection Name'}</Span>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex $style={{
                        gap: "1rem",
                        fDirection: "column",
                        background: "rgba(16,16,16,.2)",
                        p: "1rem",
                        radius: "1rem",
                        border: ".5px solid #2D2E36",
                        mb: "1rem"
                    }}>
                        <Heading level={5}>Price</Heading>
                        <Span>{selectedNft ? `${selectedNft.price} ${selectedNft.paymentType}` : 'Loading...'}</Span>
                    </Flex>
                    <Flex $style={{
                        gap: "1rem",
                        fDirection: "column",
                        background: "rgba(16,16,16,.2)",
                        p: "1rem",
                        radius: "1rem",
                        border: ".5px solid #2D2E36",
                        mb: "1rem"
                    }}>
                        <Heading level={5}>Activity</Heading>
                    </Flex>
                    <Button
                        onClick={handleBuy}
                        $style={{
                            bg: "#A259FF",
                            kind: "radius"
                        }}
                    >
                        <Flex $style={{
                            gap: ".5rem",
                        }}>
                            <Icon icon={'buy'} />
                            <Span>Buy</Span>
                        </Flex>
                    </Button>
                    {isOwner() && (
                        <Button
                            onClick={handleCancelListing}
                            $style={{
                                bg: "#FF4B4B",
                                kind: "radius"
                            }}
                        >
                            <Flex $style={{
                                gap: ".5rem",
                            }}>
                                <Icon icon={'cancel'} />
                                <Span>Cancel</Span>
                            </Flex>
                        </Button>
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}