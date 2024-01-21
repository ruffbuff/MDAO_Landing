

import { ethers } from 'ethers';
import Image from "components/basic/image";
import Flex from "components/basic/flex";
import Heading from "components/basic/heading";
import { Span } from "components/basic/text";
import {
    CONTRACT_WHALE, CONTRACT_WHALE_ABI
  } from "../../../solContracts";
import { useEffect, useState } from 'react';

const MutatePage: React.FC = () => {
  useEffect(() => {
    // Add any initialization or side effects here
    // For example, you can fetch data or set up subscriptions
  }, []);

  return (
    <div>
      <Heading gradient level={3}>Mutate Page</Heading>
      <Flex>
        <Image src="path_to_image" alt="Image" />
        <Span>This is the Mutate Page</Span>
      </Flex>
    </div>
  );
};

export default MutatePage;
