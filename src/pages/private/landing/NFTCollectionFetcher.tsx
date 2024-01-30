// src/pages/private/landing/NFTCollectionFetcher.tsx
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Flex from "components/basic/flex";
import Heading from "components/basic/heading";
import { Span } from "components/basic/text";
import Image from "components/basic/image";
import { Tr, Td } from "components/basic/table";
import { CONTRACT_ABI_2, CONTRACT_ADDRESS_2 } from "../../../solContracts";

interface CollectionData {
    name: string;
    totalSupply: string;
    imageUrl: string;
    totalSold: number;
    floorPrice: string;
}

const NFTCollectionFetcher = () => {
    const [awakenedData, setAwakenedData] = useState<CollectionData>({ name: '', totalSupply: '', imageUrl: '', totalSold: 0, floorPrice: '' });

    useEffect(() => {
        const apiKey = process.env.REACT_APP_ALCHEMY_API_KEY;
        const alchemyProviderUrl = `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}`;
        const provider = new ethers.providers.JsonRpcProvider(alchemyProviderUrl);
        const contract = new ethers.Contract(CONTRACT_ADDRESS_2, CONTRACT_ABI_2, provider);

        const fetchTotalSupply = async (contractAddress: string) => {
            const options = { method: 'GET', headers: { accept: 'application/json' } };
            const response = await fetch(`https://polygon-mainnet.g.alchemy.com/nft/v3/${apiKey}/getContractMetadata?contractAddress=${contractAddress}`, options);
            const data = await response.json();
            return data.totalSupply;
        };

        const fetchCollectionData = async () => {
            try {
                const awakenedCollectionTotalSupply = await fetchTotalSupply("0x564e6588dafa2f79c5805e07860cb869aedb33d9");
                const awakenedCollection = await contract.collectionsData("0x564e6588dafa2f79c5805e07860cb869aedb33d9");
                setAwakenedData({
                    name: 'Awakened Collection',
                    totalSupply: awakenedCollectionTotalSupply,
                    imageUrl: 'https://i.seadn.io/gae/Cb_v8uUJT_VBQPJzkYb1K6r88zCkWDQcFoPHYqc-HfsPFNpRCLxqLk64Pr6n00AdPNrNjVzg54n04V8MyQ45a4XUtE_6lQwXYLF6cA?auto=format&dpr=1&w=128',
                    totalSold: awakenedCollection.totalSold.toNumber(),
                    floorPrice: ethers.utils.formatUnits(awakenedCollection.floorPrice, 'ether')
                });
            } catch (error) {
                console.error('Error fetching contract data', error);
            }
        };
        fetchCollectionData();
    }, []);

    return (
        <>
            <Tr>
                <Td>
                    <Flex $style={{ vAlign: "center", gap: "1rem" }}>
                        <Flex $style={{ maxW: "5rem" }}>
                            <Image $style={{ radius: "1rem" }} src={awakenedData.imageUrl} />
                        </Flex>
                        <Heading level={4}>{awakenedData.name}</Heading>
                    </Flex>
                </Td>
                <Td><Span>{awakenedData.totalSupply}</Span></Td>
                <Td><Span>{awakenedData.totalSold}</Span></Td>
                <Td><Span>{awakenedData.floorPrice} AMBER</Span></Td>
                <Td><Span>0</Span></Td>
            </Tr>
        </>
    );
};

export default NFTCollectionFetcher;