// src/pages/private/profile/index.tsx
import Button from "components/basic/button";
import Flex from "components/basic/flex";
import Grid from "components/basic/grid";
import Heading from "components/basic/heading";
import Icon from "components/basic/icon";
import Image from "components/basic/image";
import { Span } from "components/basic/text";
import appConstants from "constant";
import { TabContent, TabHeader, TabList } from "components/basic/tab";
import { ChangeEvent, useState, useEffect, useMemo } from "react";
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

    const [avatarUrl, setAvatarUrl] = useState(appConstants.Imgs.Avatar6);
    const [bannerUrl, setBannerUrl] = useState(appConstants.Imgs.Banner);
    const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
    const [selectedBannerFile, setSelectedBannerFile] = useState<File | null>(null);

    const [bio, setBio] = useState('Your bio here');
    const [inputBio, setInputBio] = useState('');

    const [links, setLinks] = useState<string[]>(['']);

    const [isBioModalOpen, setBioModalOpen] = useState(false);
    const [isDataChanged, setIsDataChanged] = useState(false);

    useEffect(() => {
        if (window.ethereum && address) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contractInstance = new ethers.Contract(CONTRACT_SMARTDB, CONTRACT_SMARTDB_ABI, signer);
            setContract(contractInstance);
        }
    }, [address]);
    
    const prepareLinksForTransaction = (linksString: string): string[] => {
        return linksString.split(',').map((link: string) => link.trim());
    };         
    
    const handleBioChange = (event: any) => {
        setInputBio(event.target.value);
        setIsDataChanged(true);
    };

    const openBioModal = () => {
        setBioModalOpen(true);
    };

    const closeBioModal = () => {
        setBioModalOpen(false);
    };

    const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedAvatarFile(event.target.files[0]);
        }
    };

    const handleBannerChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedBannerFile(event.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!address || !contract) {
            console.error('Address or contract not available');
            return;
        }
    
        // Fetch user ID
        let fetchedUserId;
        try {
            fetchedUserId = await contract.getUserIdByWallet(address);
            //console.log('User ID fetched:', fetchedUserId);
        } catch (error) {
            console.error('Error fetching user ID:', error);
            return;
        }
    
        const formData = new FormData();
        let avatarLink = '0'; // Default value
        let bannerLink = '0'; // Default value
        let bioData = '0';    // Default value

        if (!isDataChanged) {
            //console.log('No data changed, skipping update');
            return;
        }

        if (selectedAvatarFile) {
            formData.append('avatar', selectedAvatarFile);
        }
        if (selectedBannerFile) {
            formData.append('banner', selectedBannerFile);
        }
        if (inputBio.trim() !== '') {
            bioData = inputBio;
        }
        formData.append('bio', bioData);
    
        try {
            const response = await fetch('http://localhost:3001/api/data', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Failed to upload profile data');
            }
    
            const data = await response.json();
            //console.log('Profile data:', data);
    
            // Use the received data if available
            avatarLink = data.avatarLink || avatarLink;
            bannerLink = data.bannerLink || bannerLink;
            bioData = data.bio || bioData;
    
            // Update frontend state with the new data
            setAvatarUrl(avatarLink);
            setBannerUrl(bannerLink);
            setBio(bioData);
    
            // Convert BigNumber to a string or number as required
            const userIdNumber = fetchedUserId.toString();
            const linksString = links.join(',');
            const linksArray = prepareLinksForTransaction(linksString);
        
            // Call the smart contract function
            try {
                await contract.updateProfile(userIdNumber, avatarLink, bannerLink, bioData, linksArray);
                //console.log('Profile updated in smart contract');
                setIsDataChanged(false);
            } catch (error) {
                console.error('Error updating profile in smart contract:', error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };    

    useEffect(() => {
        const debouncedFetchNFTs = debounce((address) => {
            const options = { method: 'GET', headers: { accept: 'application/json' } };
            const apiKey = process.env.REACT_APP_ALCHEMY_API_KEY;
            const timestamp = new Date().getTime();
            const alchemyURL = `https://polygon-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?owner=${address}&withMetadata=true&pageSize=100&timestamp=${timestamp}`;
    
            fetch(alchemyURL, options)
                .then(response => response.json())
                .then(data => {
                    // ... process data
                })
                .catch(err => console.error('Error fetching NFTs:', err));
        }, 1000);
    
        debouncedFetchNFTs(address);
    }, [address]);    
    
    useEffect(() => {
        const fetchProfile = async () => {
            if (!address || !contract) {
                console.error('Address or contract instance not available for fetching profile');
                return;
            }

            try {
                const fetchedUserId = await contract.getUserIdByWallet(address);
                const profileData = await contract.getProfile(fetchedUserId);
                setAvatarUrl(profileData.avatarPic);
                setBannerUrl(profileData.bannerPic);
                setBio(profileData.bioData);
                setLinks(profileData.links);
                //console.log('Profile data fetched:', profileData);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfile();
    }, [address, contract]);         
    
    const changeActiveTab = (index: number) => {
        setActiveTab(() => index);
    }

    const getSocialIconName = (url: any) => {
        if (url.includes('github.com')) return 'github';
        if (url.includes('twitter.com')) return 'x-twitter';
        if (url.includes('discord.com')) return 'discord';
        if (url.includes('linkedin.com')) return 'linkedin';
        return null;
    };

    const shortenAddress = (address: any, chars = 4) => {
        return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
    }

    const allowedAddresses = useMemo(() => [
        "0x564e6588DAfA2F79c5805e07860CB869AEdb33d9",
        "0x24a11e702cd90f034ea44faf1e180c0c654ac5d9",
        "0xEf41141fBC0A7C870F30feE81c6214582DC2A494",
        "0x9d305a42A3975Ee4c1C57555BeD5919889DCE63F",
        "0xE28D2D8746D855251BA677a91626009CB33aA4F9",
        "0x72fDE21792157AFfFcdCfEa7382d048BeC80a41A"
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
                    break; // Выход из цикла, если успешно
                } catch (error) {
                    if (i < 2) {
                        // Ждем перед следующей попыткой
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    } else {
                        throw error; // Переброс ошибки после последней попытки
                    }
                }
            }
    
            console.log(`${listingType} Transaction successful:`, receipt);
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
                //console.log("Filtered NFTs:", filteredNfts);
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
                background: `url(${bannerUrl})`,
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
                                <Image src={avatarUrl} />
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
                        <Flex $style={{
                            gap: "0.5rem"
                        }}>
                            {links.map((link, index) => {
                            const iconName = getSocialIconName(link);
                            if (!iconName) return null;
                            return (
                                <a
                                key={index}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none' }} // To ensure styling doesn't interfere with functionality
                                >
                                <Icon icon={iconName} style={{ cursor: 'pointer' }} />
                                </a>
                            );
                            })}
                        </Flex>
                            <Heading gradient level={3}>{address ? shortenAddress(address) : 'Connect Wallet'}</Heading>
                            <Flex $style={{
                                fDirection: "column"
                            }}>
                            <Heading level={5}>About me</Heading>
                            <Span>{bio}</Span>
                            </Flex>
                        </Flex>
                        <Modal
                            open={isBioModalOpen}
                            onClose={closeBioModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '20vh',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 400,
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                                borderRadius: '1rem',
                            }}
                        >
                            <Span $style={{ mb: "1rem", color: "#A259FF" }}>
                                <Heading level={4}>About me</Heading>
                            </Span>
                            <input type="file" onChange={handleAvatarChange} accept="image/*" />
                            <input type="file" onChange={handleBannerChange} accept="image/*" />
                            <TextField
                                value={inputBio}
                                onChange={handleBioChange}
                                fullWidth
                                variant="outlined"
                                placeholder="Your bio here"
                            />
                                {links.length > 0 && links[0] !== '' && (
                                    <Flex>
                                        {links.map((link, index) => (
                                            <a key={index} href={link} target="_blank" rel="noopener noreferrer">
                                                {link}
                                            </a>
                                        ))}
                                    </Flex>
                                )}
                            <Button $style={{ bg: "#A259FF", color: "white", p: "0.5rem 1rem", kind: "radius" }} onClick={handleSubmit}>Save Bio</Button>
                        </Box>
                        </Modal>
                        <Flex $style={{
                            gap: "3rem"
                        }}>
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
                            <button
                            onClick={openBioModal}
                            style={{
                                border: "1px solid #A259FF",
                                borderRadius: "1rem",
                                padding: "1rem",
                                zIndex: "1000"
                            }}
                            >
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