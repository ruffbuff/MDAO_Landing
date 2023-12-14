import React, { createContext, useContext, useState } from 'react';

const NftContext = createContext();

export const NftProvider = ({ children }) => {
    const [selectedNft, setSelectedNft] = useState(null);

    return (
        <NftContext.Provider value={{ selectedNft, setSelectedNft }}>
            {children}
        </NftContext.Provider>
    );
};

export const useNft = () => useContext(NftContext);