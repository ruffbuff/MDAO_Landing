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
    const [trumpDtcData, setTrumpDtcData] = useState<CollectionData>({ name: '', totalSupply: '', imageUrl: '', totalSold: 0, floorPrice: '' });
    const [wildPassData, setWildPassData] = useState<CollectionData>({ name: '', totalSupply: '', imageUrl: '', totalSold: 0, floorPrice: '' });
    const [sandboxData, setSandboxData] = useState<CollectionData>({ name: '', totalSupply: '', imageUrl: '', totalSold: 0, floorPrice: '' });
    const [trumpDtcS2Data, setTrumpDtcS2Data] = useState<CollectionData>({ name: '', totalSupply: '', imageUrl: '', totalSold: 0, floorPrice: '' });

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
                const trumpDtcCollectionTotalSupply = await fetchTotalSupply("0x24a11e702cd90f034ea44faf1e180c0c654ac5d9");
                const wildPassCollectionTotalSupply = await fetchTotalSupply("0xef41141fbc0a7c870f30fee81c6214582dc2a494");
                const sandboxCollectionTotalSupply = await fetchTotalSupply("0x9d305a42A3975Ee4c1C57555BeD5919889DCE63F");
                const trumpDtcS2CollectionTotalSupply = await fetchTotalSupply("0xe28d2d8746d855251ba677a91626009cb33aa4f9");

                const awakenedCollection = await contract.collectionsData("0x564e6588dafa2f79c5805e07860cb869aedb33d9");
                const trumpDtcCollection = await contract.collectionsData("0x24a11e702cd90f034ea44faf1e180c0c654ac5d9");
                const wildPassCollection = await contract.collectionsData("0xef41141fbc0a7c870f30fee81c6214582dc2a494");
                const sandboxCollection = await contract.collectionsData("0x9d305a42A3975Ee4c1C57555BeD5919889DCE63F");
                const trumpDtcS2Collection = await contract.collectionsData("0xe28d2d8746d855251ba677a91626009cb33aa4f9");

                setAwakenedData({
                    name: 'Awakened Collection',
                    totalSupply: awakenedCollectionTotalSupply,
                    imageUrl: 'https://i.seadn.io/gae/Cb_v8uUJT_VBQPJzkYb1K6r88zCkWDQcFoPHYqc-HfsPFNpRCLxqLk64Pr6n00AdPNrNjVzg54n04V8MyQ45a4XUtE_6lQwXYLF6cA?auto=format&dpr=1&w=128',
                    totalSold: awakenedCollection.totalSold.toNumber(),
                    floorPrice: ethers.utils.formatUnits(awakenedCollection.floorPrice, 'ether')
                });

                setTrumpDtcData({
                    name: 'Trump DTC Collection',
                    totalSupply: trumpDtcCollectionTotalSupply,
                    imageUrl: 'https://i.seadn.io/gcs/files/f980181df268011a4491137fc71afdb5.jpg?auto=format&dpr=1&w=128',
                    totalSold: trumpDtcCollection.totalSold.toNumber(),
                    floorPrice: ethers.utils.formatUnits(trumpDtcCollection.floorPrice, 'ether')
                });

                setWildPassData({
                    name: 'Genesis WildPass',
                    totalSupply: wildPassCollectionTotalSupply,
                    imageUrl: 'https://i.seadn.io/gcs/files/3b07b9fce58b1b438a818c1c00152fe3.png?auto=format&dpr=1&w=128',
                    totalSold: wildPassCollection.totalSold.toNumber(),
                    floorPrice: ethers.utils.formatUnits(wildPassCollection.floorPrice, 'ether')
                });

                setSandboxData({
                    name: 'The Sandbox',
                    totalSupply: sandboxCollectionTotalSupply,
                    imageUrl: 'https://i.seadn.io/gae/SXH8tW1siikB80rwCRnjm1a5xM_MwTg9Xl9Db6mioIk9HIlDM09pVoSR7GKJgS6ulSUpgW9BDtMk_ePX_NKgO9A?auto=format&dpr=1&w=128',
                    totalSold: sandboxCollection.totalSold.toNumber(),
                    floorPrice: ethers.utils.formatUnits(sandboxCollection.floorPrice, 'ether')
                });

                setTrumpDtcS2Data({
                    name: 'Trump Digital Trading Cards Series 2',
                    totalSupply: trumpDtcS2CollectionTotalSupply,
                    imageUrl: 'https://i.seadn.io/gcs/files/1ec5a6456907bd1c78c09bd975418386.jpg?auto=format&dpr=1&w=128',
                    totalSold: trumpDtcS2Collection.totalSold.toNumber(),
                    floorPrice: ethers.utils.formatUnits(trumpDtcS2Collection.floorPrice, 'ether')
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
                            <Image $style={{ radius: "1rem" }} src={trumpDtcData.imageUrl} />
                        </Flex>
                        <Heading level={4}>{trumpDtcData.name}</Heading>
                    </Flex>
                </Td>
                <Td><Span>{trumpDtcData.totalSupply}</Span></Td>
                <Td><Span>{trumpDtcData.totalSold}</Span></Td>
                <Td><Span>{trumpDtcData.floorPrice} AMBER</Span></Td>
                <Td><Span>0</Span></Td>
            </Tr>
            <Tr>
                <Td>
                    <Flex $style={{ vAlign: "center", gap: "1rem" }}>
                        <Flex $style={{ maxW: "5rem" }}>
                            <Image $style={{ radius: "1rem" }} src={wildPassData.imageUrl} />
                        </Flex>
                        <Heading level={4}>{wildPassData.name}</Heading>
                    </Flex>
                </Td>
                <Td><Span>{wildPassData.totalSupply}</Span></Td>
                <Td><Span>{wildPassData.totalSold}</Span></Td>
                <Td><Span>{wildPassData.floorPrice} AMBER</Span></Td>
                <Td><Span>0</Span></Td>
            </Tr>
            <Tr>
                <Td>
                    <Flex $style={{ vAlign: "center", gap: "1rem" }}>
                        <Flex $style={{ maxW: "5rem" }}>
                            <Image $style={{ radius: "1rem" }} src={sandboxData.imageUrl} />
                        </Flex>
                        <Heading level={4}>{sandboxData.name}</Heading>
                    </Flex>
                </Td>
                <Td><Span>{sandboxData.totalSupply}</Span></Td>
                <Td><Span>{sandboxData.totalSold}</Span></Td>
                <Td><Span>{sandboxData.floorPrice} AMBER</Span></Td>
                <Td><Span>0</Span></Td>
            </Tr>
            <Tr>
                <Td>
                    <Flex $style={{ vAlign: "center", gap: "1rem" }}>
                        <Flex $style={{ maxW: "5rem" }}>
                            <Image $style={{ radius: "1rem" }} src={trumpDtcS2Data.imageUrl} />
                        </Flex>
                        <Heading level={4}>{trumpDtcS2Data.name}</Heading>
                    </Flex>
                </Td>
                <Td><Span>{trumpDtcS2Data.totalSupply}</Span></Td>
                <Td><Span>{trumpDtcS2Data.totalSold}</Span></Td>
                <Td><Span>{trumpDtcS2Data.floorPrice} AMBER</Span></Td>
                <Td><Span>0</Span></Td>
            </Tr>
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