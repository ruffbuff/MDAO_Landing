import React, { useState, useEffect } from 'react';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import Flex from "components/basic/flex";
import { Span } from "components/basic/text";

Moralis.start({ apiKey: process.env.REACT_APP_MORALIS_API_KEY });

export default function MarketFooter() {
    const [amberData, setAmberData] = useState({ price: 'Loading...', exchange: 'Loading...' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const address = "0x8865bc57c58be23137ace9ed1ae1a05fe5c8b209";
                const chain = EvmChain.POLYGON;
        
                const response = await Moralis.EvmApi.token.getTokenPrice({ address, chain });
                console.log('Moralis Response:', response);
                const price = response.result ? `$${parseFloat(response.result.usdPriceFormatted || '0').toFixed(8)}` : 'Unavailable';
                const exchange = response.result?.exchangeName || 'Unknown';
                setAmberData({
                    price,
                    exchange: exchange as string
                });
            } catch (error) {
                console.error('Error fetching AMBER data:', error);
                setAmberData({ price: 'Error', exchange: 'Error' });
            }
        };        
            
        fetchData();
    }, []);      

    return (
        <Flex $style={{
            background: "rgba(16,16,16,.2)",
            p: ".5rem",
            hAlign:"center"
        }}>
            <Flex $style={{
                w:"100%",
                maxW:"1440px",
                hAlign:"space-between",
                gap:"1rem"
            }}>
                <Flex>
                    <Span>AMBER Price: {amberData.price}</Span>
                </Flex>
                <Flex>
                    <Span>0x8865bc57c58be23137ace9ed1ae1a05fe5c8b209</Span>
                </Flex>
                <Flex>
                    <Span>Exchange: {amberData.exchange}</Span>
                </Flex>
            </Flex>
        </Flex>
    );
}
