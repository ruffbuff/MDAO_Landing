// src/components/TrendingCollection.tsx
import React, { useState, useEffect } from 'react';
import Flex from "components/basic/flex";
import Heading from "components/basic/heading";
import Grid from "components/basic/grid";
import Image from "components/basic/image";

interface TrendingCollectionProps {
    contractAddress: string;
    collectionTitle: string;
}

const TrendingCollection: React.FC<TrendingCollectionProps> = ({ contractAddress, collectionTitle }) => {
    const [nftImages, setNftImages] = useState<string[]>([]);
    const [remainingNfts, setRemainingNfts] = useState<number>(0);
    const [collectionName, setCollectionName] = useState<string>(collectionTitle);
    const [fetchedData, setFetchedData] = useState<any>(null);

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const options = { method: 'GET', headers: { accept: 'application/json' } };
                const response = await fetch(`https://polygon-mainnet.g.alchemy.com/nft/v3/${process.env.REACT_APP_ALCHEMY_API_KEY}/getNFTsForContract?contractAddress=${contractAddress}&withMetadata=true&startToken=1`, options);
                const data = await response.json();
                setFetchedData(data); // Store fetched data
            } catch (error) {
                console.error('Error fetching NFT data', error);
            }
        };

        fetchNFTs();
    }, [contractAddress, collectionTitle]);

    useEffect(() => {
        if (fetchedData && Array.isArray(fetchedData.nfts)) {
            const images = fetchedData.nfts.map((nft: any) => nft.image.originalUrl).slice(0, 3);
            setNftImages(images);
            const totalSupply = parseInt(fetchedData.nfts[0]?.contract?.totalSupply, 10);
            setRemainingNfts(Math.max(totalSupply - images.length, 0));
            if (!collectionTitle && fetchedData.nfts[0]?.contract?.name) {
                setCollectionName(fetchedData.nfts[0].contract.name);
            }
        }
    }, [fetchedData, collectionTitle]);

    return (
        <Flex $style={{ gap: "2rem", fDirection: "column", mb: "6rem", maxW: "1440px" }}>
            <Flex $style={{ fDirection: "column", gap: "1rem", maxW: "20rem" }}>
                {nftImages.length > 0 && <Image $style={{ radius: "1.5rem" }} src={nftImages[0]} />}
                <Grid $style={{ columns: "3", gap: "1rem" }}>
                    {nftImages.length > 1 && <Image $style={{ radius: "1rem" }} src={nftImages[1]} />}
                    {nftImages.length > 2 && <Image $style={{ radius: "1rem" }} src={nftImages[2]} />}
                    <Flex $style={{ background: "#A259FF", radius: "1rem", vAlign: "center", hAlign: "center" }}>
                        <Heading level={5}>{remainingNfts}+</Heading>
                    </Flex>
                </Grid>
                <Heading level={4}>{collectionName}</Heading>
            </Flex>
        </Flex>
    );
};

export default TrendingCollection;