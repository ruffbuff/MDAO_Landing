// src/pages/private/profile/components/Contribution.tsx
import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, getDay } from 'date-fns';
import { useAddress } from "@thirdweb-dev/react";
import { CONTRACT_ABI_2, CONTRACT_ADDRESS_2 } from "../../../../solContracts";
import { ethers } from 'ethers';
import Flex from "components/basic/flex";
import Heading from 'components/basic/heading';
import Button from 'components/basic/button';

type Contributions = {
  [key: string]: number;
};

interface ContributionOverviewProps {
  initialYear: number;
}

interface EthereumEvent {
  blockNumber: number;
  transactionHash?: string;
  eventName?: string;
  listingId?: string;
  buyer?: string;
  seller?: string;
  nftAddress?: string;
  tokenId?: string;
  price?: string;
  paymentType?: string;
  amountSpent?: string;
  listingIds?: string[];
  totalSpent?: string;
}

const styles = {
  calendar: {
    display: 'grid',
    gridTemplateColumns: 'min-content repeat(52, minmax(18px, 18px))',
    gridTemplateRows: 'min-content repeat(7, 18px)',
    gap: '3px',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    backgroundColor: '#858585',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  day: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '3px',
    fontSize: '0.7rem',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#e0e0e0',
    },
  },
  monthLabel: {
    gridRow: '1',
    gridColumnStart: '2',
    gridColumnEnd: '54',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 4px',
    fontSize: '0.8rem',
  },
  dayLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
  },
  button: {
    padding: '8px 15px',
    cursor: 'pointer',
    margin: '5px',
    border: 'none',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#A259FF',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#0056b3',
    },
    ':focus': {
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(0, 123, 255, 0.25)',
    },
  },
};

const tableHeaderStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
  backgroundColor: '#A259FF',
  fontWeight: 'bold',
};

const tableCellStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
};

const sampleCellStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  borderRadius: '3px',
  marginRight: '5px',
};

const sampleLabelStyle = {
  fontSize: '0.8rem',
  marginRight: '10px',
  padding: '8px'
};

const sampleRowStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
};

const getColorForCount = (count: number): string => {
  if (count === 0) return '#e0e0e0'; // Empty color
  if (count <= 5) return '#c6e48b'; // Light green
  if (count <= 10) return '#7bc96f'; // Medium green
  if (count <= 15) return '#239a3b'; // Dark green
  return '#196127'; // Darkest green
};

const getDaysArray = (year: number) => {
  const startDay = startOfWeek(new Date(year, 0, 1));
  const daysArray = Array.from({ length: 52 * 7 }, (_, i) => addDays(startDay, i));
  return daysArray.filter(day => getDay(day) < 7);
};

const ContributionOverview: React.FC<ContributionOverviewProps> = ({ initialYear }) => {
  const userAddress = useAddress();

  const [year, setYear] = useState(initialYear);
  const [contributionCounts, setContributionCounts] = useState<Contributions>({});
  const [events, setEvents] = useState<EthereumEvent[]>([]);

  const shortenString = (str: string | undefined) => {
    if (typeof str === 'undefined') {
      return '';
    }
    if (str.length <= 10) {
      return str;
    }
    return `${str.slice(0, 6)}...${str.slice(-4)}`;
  };

  const SampleCells = () => {
    const samples = [
      { count: 0, label: 'Chill Day == 0' },
      { count: 5, label: 'Easy Day <= 1' },
      { count: 10, label: 'Proper Work <= 5' },
      { count: 15, label: 'Trader Day <= 10' },
      { count: 20, label: 'Hard Work <= 15' },
    ];

    return (
      <Flex $style={{
        fDirection:"column",
        queries:{
          1420:{
            w:"100%"
          }
        }
      }}>
        {samples.map((sample) => (
          <div key={sample.label} style={sampleRowStyle}>
            <div style={{ ...sampleCellStyle, backgroundColor: getColorForCount(sample.count) }} />
            <span style={sampleLabelStyle}>{sample.label}</span>
          </div>
        ))}
      </Flex>
    );
  };

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS_2, CONTRACT_ABI_2, provider);

    const getBlockTimestamp = async (blockNumber: number): Promise<number> => {
      const block = await provider.getBlock(blockNumber);
      return block.timestamp;
    };

    const transformEventToEthereumEvent = (event: any) => {
      const safeConvertBigNumber = (value: any) =>
        ethers.BigNumber.isBigNumber(value) ? value.toString() : value;

      let transformedEvent: EthereumEvent = {
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
        eventName: event.event,
        listingId: safeConvertBigNumber(event.args[0]),
        buyer: undefined,
        seller: undefined,
        nftAddress: undefined,
        tokenId: undefined,
        price: undefined,
        paymentType: undefined,
        amountSpent: undefined,
        listingIds: undefined,
        totalSpent: undefined,
      };

      switch (event.event) {
        case 'NFTListed':
          transformedEvent.seller = event.args[1];
          transformedEvent.nftAddress = event.args[2];
          transformedEvent.tokenId = safeConvertBigNumber(event.args[3]);
          transformedEvent.price = event.args[4] ? ethers.utils.formatEther(event.args[4]) : undefined;
          transformedEvent.paymentType = event.args[5] === 0 ? 'MATIC' : 'AMBER';
          break;
        case 'NFTPurchased':
          transformedEvent.buyer = event.args[1];
          transformedEvent.amountSpent = event.args[2] ? ethers.utils.formatEther(event.args[2]) : undefined;
          transformedEvent.nftAddress = event.args[3];
          transformedEvent.tokenId = safeConvertBigNumber(event.args[4]);
          transformedEvent.paymentType = event.args[5] === 0 ? 'MATIC' : 'AMBER';
          break;
        case 'BulkPurchase':
          transformedEvent.buyer = event.args[0];
          transformedEvent.listingIds = event.args[1].map((id: any) => safeConvertBigNumber(id));
          transformedEvent.totalSpent = safeConvertBigNumber(event.args[2]);
          break;
      }

      return transformedEvent;
    };

    const updateContributionCounts = async (events: any) => {
      const newCounts: Contributions = {};
      const transformedEvents: EthereumEvent[] = [];

      for (const event of events) {
        const timestamp = await getBlockTimestamp(event.blockNumber);
        const date = new Date(timestamp * 1000).toISOString().split('T')[0];
        newCounts[date] = (newCounts[date] || 0) + 1;

        transformedEvents.push(transformEventToEthereumEvent(event));
      }

      setContributionCounts(newCounts);
      setEvents(transformedEvents);
    };

    const getPastEvents = async () => {
      const nftListedEvents = await contract.queryFilter(
        contract.filters.NFTListed(null, userAddress, null, null, null, null),
        'earliest',
        'latest'
      );

      const nftPurchasedEvents = await contract.queryFilter(
        contract.filters.NFTPurchased(null, userAddress, null, null, null, null),
        'earliest',
        'latest'
      );

      const bulkPurchaseEvents = await contract.queryFilter(
        contract.filters.BulkPurchase(userAddress, null, null),
        'earliest',
        'latest'
      );

      const allEvents = [...nftListedEvents, ...nftPurchasedEvents, ...bulkPurchaseEvents];
      await updateContributionCounts(allEvents);
    };

    getPastEvents();

    const eventListener = async (blockNumber: number) => {
      await updateContributionCounts([{ blockNumber }]);
    };

    contract.on(contract.filters.NFTListed(null, userAddress, null, null, null, null), eventListener);
    contract.on(contract.filters.NFTPurchased(null, userAddress, null, null, null, null), eventListener);
    contract.on(contract.filters.BulkPurchase(userAddress, null, null), eventListener);

    return () => {
      contract.removeAllListeners();
    };
  }, [userAddress]);

  const EventTabs = ({ events }: { events: EthereumEvent[] }) => {
    return (
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            textAlign: 'left',
            marginTop: '20px',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Event Name</th>
              <th style={tableHeaderStyle}>Block Number</th>
              <th style={tableHeaderStyle}>Transaction Hash</th>
              <th style={tableHeaderStyle}>Listing ID</th>
              <th style={tableHeaderStyle}>Buyer</th>
              <th style={tableHeaderStyle}>Seller</th>
              <th style={tableHeaderStyle}>NFT Address</th>
              <th style={tableHeaderStyle}>Token ID</th>
              <th style={tableHeaderStyle}>Price</th>
              <th style={tableHeaderStyle}>Payment Type</th>
              <th style={tableHeaderStyle}>Amount Spent</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event: any, index: any) => (
              <tr key={index}>
                <td style={tableCellStyle}>{event.eventName}</td>
                <td style={tableCellStyle}>{event.blockNumber}</td>
                <td style={tableCellStyle}>{shortenString(event.transactionHash)}</td>
                <td style={tableCellStyle}>{event.listingId}</td>
                <td style={tableCellStyle}>{shortenString(event.buyer)}</td>
                <td style={tableCellStyle}>{shortenString(event.seller)}</td>
                <td style={tableCellStyle}>{shortenString(event.nftAddress)}</td>
                <td style={tableCellStyle}>{event.tokenId}</td>
                <td style={tableCellStyle}>{`${event.price} ${event.paymentType}`}</td>
                <td style={tableCellStyle}>{event.paymentType}</td>
                <td style={tableCellStyle}>{`${event.amountSpent} ${event.paymentType}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const getDayStyle = (count: number) => ({
    ...styles.day,
    backgroundColor: getColorForCount(count),
  });

  const handlePrevYear = () => {
    setYear(prevYear => prevYear - 1);
  };

  const handleNextYear = () => {
    setYear(prevYear => prevYear + 1);
  };

  return (
    <Flex $style={{
      fDirection:"column",
    }}>
      <Heading level={3} $style={{ align: 'center', mb: "2rem" }}>Year: {year}</Heading>

      <Flex $style={{
        hAlign: "center",
        gap: "1rem",
        mb: "1rem"
      }}>
        <Button onClick={handlePrevYear} $style={{
          bg: "#A259FF",
          kind: "radius"
        }}>Previous Year</Button>
        <Button onClick={handleNextYear} $style={{
          bg: "#A259FF",
          kind: "radius"
        }}>Next Year</Button>
      </Flex>
      <Flex $style={{ display: 'flex', fWrap: "wrap",  gap: "1rem", hAlign:"center", overflow:"auto", queries:{

      } }}>
        <SampleCells />
        <Flex $style={{
          overflow:"auto"
        }}>
          <div style={styles.calendar}>
            <div style={styles.monthLabel}>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                <span key={month}>{month}</span>
              ))}
            </div>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={day} style={{ ...styles.dayLabel, gridRow: index + 2, gridColumn: '1' }}>
                {day}
              </div>
            ))}
            {getDaysArray(year).map((day, index) => {
              const dayKey = format(day, 'yyyy-MM-dd');
              const count = contributionCounts[dayKey] || 0;
              const gridColumn = (Math.floor(index / 7) % 52) + 2;
              const gridRow = getDay(day) + 2;
              const titleText = `${dayKey} (${count})`;
              return (
                <div
                  key={dayKey}
                  style={{ ...getDayStyle(count), gridRow, gridColumn }}
                  title={titleText}
                />
              );
            })}
          </div>
        </Flex>
      </Flex>
      <div>
        <EventTabs events={events} />
      </div>
    </Flex>
  );
};

export default ContributionOverview;