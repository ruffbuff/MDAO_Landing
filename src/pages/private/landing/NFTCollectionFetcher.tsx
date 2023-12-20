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
    const [plutoData, setPlutoData] = useState<CollectionData>({ name: '', totalSupply: '', imageUrl: '', totalSold: 0, floorPrice: '' });
    const [apeironPlanetsData, setApeironPlanetsData] = useState<CollectionData>({ name: '', totalSupply: '', imageUrl: '', totalSold: 0, floorPrice: '' });
    const [owlphaData, setOwlphaData] = useState<CollectionData>({ name: '', totalSupply: '', imageUrl: '', totalSold: 0, floorPrice: '' });
    const [drillClubData, setDrillClubData] = useState<CollectionData>({ name: '', totalSupply: '', imageUrl: '', totalSold: 0, floorPrice: '' });
    const [voxiesData, setVoxiesData] = useState<CollectionData>({name: '', totalSupply: '', imageUrl: '', totalSold: 0, floorPrice: ''});
    const [sunflowerLandCollectiblesData, setSunflowerlandcollectiblesData] = useState<CollectionData>({name: '', totalSupply: '', imageUrl: '', totalSold: 0, floorPrice: ''});
    const [simplenftcollectionData, setSimplenftcollectionData] = useState<CollectionData>({name: '', totalSupply: '', imageUrl: '', totalSold: 0, floorPrice: ''});

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
                const simplenftcollectionCollectionTotalSupply = await fetchTotalSupply("0x72fDE21792157AFfFcdCfEa7382d048BeC80a41A");
                const simplenftcollectionCollection = await contract.collectionsData("0x72fDE21792157AFfFcdCfEa7382d048BeC80a41A");
                const sunflowerLandCollectiblesCollectionTotalSupply = await fetchTotalSupply("0x22d5f9b75c524fec1d6619787e582644cd4d7422");
                const sunflowerLandCollectiblesCollection = await contract.collectionsData("0x22d5f9b75c524fec1d6619787e582644cd4d7422");
                const voxiesCollectionTotalSupply = await fetchTotalSupply("0xfbe3ab0cbfbd17d06bdd73aa3f55aaf038720f59");
                const voxiesCollection = await contract.collectionsData("0xfbe3ab0cbfbd17d06bdd73aa3f55aaf038720f59");
                const awakenedCollectionTotalSupply = await fetchTotalSupply("0x564e6588dafa2f79c5805e07860cb869aedb33d9");
                const trumpDtcCollectionTotalSupply = await fetchTotalSupply("0x24a11e702cd90f034ea44faf1e180c0c654ac5d9");
                const wildPassCollectionTotalSupply = await fetchTotalSupply("0xef41141fbc0a7c870f30fee81c6214582dc2a494");
                const sandboxCollectionTotalSupply = await fetchTotalSupply("0x9d305a42A3975Ee4c1C57555BeD5919889DCE63F");
                const trumpDtcS2CollectionTotalSupply = await fetchTotalSupply("0xe28d2d8746d855251ba677a91626009cb33aa4f9");
                const plutoCollectionTotalSupply = await fetchTotalSupply("0xa131b877b12b0ae8bb7da7229b8a1095881497a6");
                const apeironPlanetCollectionTotalSupply = await fetchTotalSupply("0x24f9b0837424c62d2247d8a11a6d6139e4ab5ed2");
                const owlphaCollectionTotalSupply = await fetchTotalSupply("0x12aa01f646fe5c993c66c9c86eddad4e514f6cbc");
                const drillClubCollectionTotalSupply = await fetchTotalSupply("0x39cd103414106b922eb09c7d45df89608b59e887");

                const awakenedCollection = await contract.collectionsData("0x564e6588dafa2f79c5805e07860cb869aedb33d9");
                const trumpDtcCollection = await contract.collectionsData("0x24a11e702cd90f034ea44faf1e180c0c654ac5d9");
                const wildPassCollection = await contract.collectionsData("0xef41141fbc0a7c870f30fee81c6214582dc2a494");
                const sandboxCollection = await contract.collectionsData("0x9d305a42A3975Ee4c1C57555BeD5919889DCE63F");
                const trumpDtcS2Collection = await contract.collectionsData("0xe28d2d8746d855251ba677a91626009cb33aa4f9");
                const plutoCollection = await contract.collectionsData("0xa131b877b12b0ae8bb7da7229b8a1095881497a6");
                const apeironPlanetCollection = await contract.collectionsData("0x24f9b0837424c62d2247d8a11a6d6139e4ab5ed2");
                const owlphaCollection = await contract.collectionsData("0x12aa01f646fe5c993c66c9c86eddad4e514f6cbc");
                const drillClubCollection = await contract.collectionsData("0x39cd103414106b922eb09c7d45df89608b59e887");

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
                setPlutoData({
                    name: 'Misfits by Pluto',
                    totalSupply: plutoCollectionTotalSupply,
                    imageUrl: 'https://i.seadn.io/gcs/files/200cc78cea7606cf151de263ecb5b65d.gif?auto=format&dpr=1&w=128',
                    totalSold: plutoCollection.totalSold.toNumber(),
                    floorPrice: ethers.utils.formatUnits(plutoCollection.floorPrice, 'ether')
                });
                setApeironPlanetsData({
                    name: 'Apeiron Planets',
                    totalSupply: apeironPlanetCollectionTotalSupply,
                    imageUrl: 'https://i.seadn.io/gae/NM3qxp3rBvvwEInfFHQUXIBy_mOl0sFP0DYUNGsxeICm0NA7x_mucx0PV1pyMLSc8-x-gkFbIFpFqAeRQdX2ckthQaIrGtVoTO9sYA?auto=format&dpr=1&w=128',
                    totalSold: apeironPlanetCollection.totalSold.toNumber(),
                    floorPrice: ethers.utils.formatUnits(apeironPlanetCollection.floorPrice, 'ether')
                });
                setOwlphaData({
                    name: 'Owlpha',
                    totalSupply: owlphaCollectionTotalSupply,
                    imageUrl: 'https://i.seadn.io/gcs/files/48d0c6fe91b0432cb80d03f32673c842.jpg?auto=format&dpr=1&w=128',
                    totalSold: owlphaCollection.totalSold.toNumber(),
                    floorPrice: ethers.utils.formatUnits(owlphaCollection.floorPrice, 'ether')
                });
                setDrillClubData({
                    name: 'Drill Club',
                    totalSupply: drillClubCollectionTotalSupply,
                    imageUrl: 'https://i.seadn.io/gcs/files/0f13d65eef9c527cd9ec380e66efa162.png?auto=format&dpr=1&w=128',
                    totalSold: drillClubCollection.totalSold.toNumber(),
                    floorPrice: ethers.utils.formatUnits(drillClubCollection.floorPrice, 'ether')
                });
                setVoxiesData({
                    name: 'Voxies',
                    totalSupply: voxiesCollectionTotalSupply,
                    imageUrl: 'https://i.seadn.io/gcs/files/01295592e6f93fa045b329beda60bc79.jpg?auto=format&dpr=1&w=128',
                    totalSold: voxiesCollection.totalSold.toNumber(),
                    floorPrice: ethers.utils.formatUnits(voxiesCollection.floorPrice, 'ether')
                });
                setSunflowerlandcollectiblesData({
                    name: 'Sunflower Land Collectibles',
                    totalSupply: sunflowerLandCollectiblesCollectionTotalSupply,
                    imageUrl: 'https://i.seadn.io/gcs/files/28fa724d563d487f753580f2c9bf6c3e.png?auto=format&dpr=1&w=128',
                    totalSold: sunflowerLandCollectiblesCollection.totalSold.toNumber(),
                    floorPrice: ethers.utils.formatUnits(sunflowerLandCollectiblesCollection.floorPrice, 'ether')
                });
                setSimplenftcollectionData({
                    name: 'SimpleNFTCollection',
                    totalSupply: simplenftcollectionCollectionTotalSupply,
                    imageUrl: 'https://ipfs.io/ipfs/QmW55fwqJW6JgPs2BiSoZDcsJLfSCf91Vz8BhqYmDtU9my/pp.webp',
                    totalSold: simplenftcollectionCollection.totalSold.toNumber(),
                    floorPrice: ethers.utils.formatUnits(simplenftcollectionCollection.floorPrice, 'ether')
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
            <Tr>
                <Td>
                    <Flex $style={{ vAlign: "center", gap: "1rem" }}>
                        <Flex $style={{ maxW: "5rem" }}>
                            <Image $style={{ radius: "1rem" }} src={plutoData.imageUrl} />
                        </Flex>
                        <Heading level={4}>{plutoData.name}</Heading>
                    </Flex>
                </Td>
                <Td><Span>{plutoData.totalSupply}</Span></Td>
                <Td><Span>{plutoData.totalSold}</Span></Td>
                <Td><Span>{plutoData.floorPrice} AMBER</Span></Td>
                <Td><Span>0</Span></Td>
            </Tr>
            <Tr>
                <Td>
                    <Flex $style={{ vAlign: "center", gap: "1rem" }}>
                        <Flex $style={{ maxW: "5rem" }}>
                            <Image $style={{ radius: "1rem" }} src={apeironPlanetsData.imageUrl} />
                        </Flex>
                        <Heading level={4}>{apeironPlanetsData.name}</Heading>
                    </Flex>
                </Td>
                <Td><Span>{apeironPlanetsData.totalSupply}</Span></Td>
                <Td><Span>{apeironPlanetsData.totalSold}</Span></Td>
                <Td><Span>{apeironPlanetsData.floorPrice} AMBER</Span></Td>
                <Td><Span>0</Span></Td>
            </Tr>
            <Tr>
                <Td>
                    <Flex $style={{ vAlign: "center", gap: "1rem" }}>
                        <Flex $style={{ maxW: "5rem" }}>
                            <Image $style={{ radius: "1rem" }} src={owlphaData.imageUrl} />
                        </Flex>
                        <Heading level={4}>{owlphaData.name}</Heading>
                    </Flex>
                </Td>
                <Td><Span>{owlphaData.totalSupply}</Span></Td>
                <Td><Span>{owlphaData.totalSold}</Span></Td>
                <Td><Span>{owlphaData.floorPrice} AMBER</Span></Td>
                <Td><Span>0</Span></Td>
            </Tr>
            <Tr>
                <Td>
                    <Flex $style={{ vAlign: "center", gap: "1rem" }}>
                        <Flex $style={{ maxW: "5rem" }}>
                            <Image $style={{ radius: "1rem" }} src={drillClubData.imageUrl} />
                        </Flex>
                        <Heading level={4}>{drillClubData.name}</Heading>
                    </Flex>
                </Td>
                <Td><Span>{drillClubData.totalSupply}</Span></Td>
                <Td><Span>{drillClubData.totalSold}</Span></Td>
                <Td><Span>{drillClubData.floorPrice} AMBER</Span></Td>
                <Td><Span>0</Span></Td>
            </Tr>
            <Tr>
                <Td>
                    <Flex $style={{vAlign: "center", gap: "1rem"}}>
                        <Flex $style={{maxW: "5rem"}}>
                            <Image $style={{radius: "1rem"}} src={voxiesData.imageUrl}/>
                        </Flex>
                        <Heading level={4}>{voxiesData.name}</Heading>
                    </Flex>
                </Td>
                <Td><Span>{voxiesData.totalSupply}</Span></Td>
                <Td><Span>{voxiesData.totalSold}</Span></Td>
                <Td><Span>{voxiesData.floorPrice} AMBER</Span></Td>
                <Td><Span>0</Span></Td>
            </Tr>
            <Tr>
                <Td>
                    <Flex $style={{vAlign: "center", gap: "1rem"}}>
                        <Flex $style={{maxW: "5rem"}}>
                            <Image $style={{radius: "1rem"}} src={sunflowerLandCollectiblesData.imageUrl}/>
                        </Flex>
                        <Heading level={4}>{sunflowerLandCollectiblesData.name}</Heading>
                    </Flex>
                </Td>
                <Td><Span>{sunflowerLandCollectiblesData.totalSupply}</Span></Td>
                <Td><Span>{sunflowerLandCollectiblesData.totalSold}</Span></Td>
                <Td><Span>{sunflowerLandCollectiblesData.floorPrice} AMBER</Span></Td>
                <Td><Span>0</Span></Td>
            </Tr>
            <Tr>
                <Td>
                    <Flex $style={{vAlign: "center", gap: "1rem"}}>
                        <Flex $style={{maxW: "5rem"}}>
                            <Image $style={{radius: "1rem"}} src={simplenftcollectionData.imageUrl}/>
                        </Flex>
                        <Heading level={4}>{simplenftcollectionData.name}</Heading>
                    </Flex>
                </Td>
                <Td><Span>{simplenftcollectionData.totalSupply}</Span></Td>
                <Td><Span>{simplenftcollectionData.totalSold}</Span></Td>
                <Td><Span>{simplenftcollectionData.floorPrice} AMBER</Span></Td>
                <Td><Span>0</Span></Td>
            </Tr>
        </>
    );
};

export default NFTCollectionFetcher;