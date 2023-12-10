// src/preSaleContract.js

// Replace with your actual contract address and ABI
const CONTRACT_ADDRESS = "0x2523b7B9c9Ef3cd494F6fBf4f74Dd28907c2333b";
const CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address[]","name":"addrs","type":"address[]"}],"name":"addToWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"buyPlaceInPresale","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_entryPrice","type":"uint256"},{"internalType":"uint256","name":"_startTime","type":"uint256"},{"internalType":"uint256","name":"_endTime","type":"uint256"},{"internalType":"bool","name":"_useWhitelist","type":"bool"},{"internalType":"uint256","name":"_whitelistEndTime","type":"uint256"}],"name":"createPresale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"endPresale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"getPresaleBuyers","outputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"spotsBought","type":"uint256"}],"internalType":"struct PresaleContract.Buyer[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"pausePresale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"presaleBuyers","outputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"spotsBought","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"presales","outputs":[{"internalType":"uint256","name":"entryPrice","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"paused","type":"bool"},{"internalType":"bool","name":"ended","type":"bool"},{"internalType":"bool","name":"useWhitelist","type":"bool"},{"internalType":"uint256","name":"whitelistEndTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"addr","type":"address"}],"name":"removeFromWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"unpausePresale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"whitelist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawERC20","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const CONTRACT_ADDRESS_2 = "0x27aD33e795FE13a1824633f385D691c0beFCcb2C";
const CONTRACT_ABI_2 = [{"inputs":[{"internalType":"address","name":"_deployer","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"listingIds","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"totalSpent","type":"uint256"}],"name":"BulkPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"ListingDelisted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":true,"internalType":"address","name":"seller","type":"address"},{"indexed":true,"internalType":"address","name":"nftAddress","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":false,"internalType":"enum MustachePlace.PaymentType","name":"paymentType","type":"uint8"}],"name":"NFTListed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountSpent","type":"uint256"},{"indexed":true,"internalType":"address","name":"nftAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"enum MustachePlace.PaymentType","name":"paymentType","type":"uint8"}],"name":"NFTPurchased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"oldPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"PriceUpdated","type":"event"},{"inputs":[],"name":"BULK_PURCHASE_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"COMMISSION_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"COMMISSION_FEE_2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"allowedNFTs","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_listingIds","type":"uint256[]"},{"internalType":"uint256","name":"totalTokenAmount","type":"uint256"}],"name":"bulkBuyWithAMBER","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_listingIds","type":"uint256[]"}],"name":"bulkBuyWithMATIC","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"listingId","type":"uint256"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"buyWithAMBER","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"listingId","type":"uint256"}],"name":"buyWithMATIC","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"listingId","type":"uint256"}],"name":"cancelListing","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"collectionsData","outputs":[{"internalType":"uint256","name":"totalListed","type":"uint256"},{"internalType":"uint256","name":"totalSold","type":"uint256"},{"internalType":"uint256","name":"floorPrice","type":"uint256"},{"internalType":"uint256","name":"bulkPurchaseLowestPrice","type":"uint256"},{"internalType":"uint256","name":"lowestSalePrice","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getActiveListings","outputs":[{"components":[{"internalType":"uint256","name":"listingId","type":"uint256"},{"internalType":"address","name":"seller","type":"address"},{"internalType":"address","name":"nftAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"address","name":"paymentToken","type":"address"},{"internalType":"uint8","name":"paymentType","type":"uint8"},{"internalType":"bool","name":"isForSale","type":"bool"}],"internalType":"struct MustachePlace.ListingInfo[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getCommissionFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getSpecialCollectionCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"nftAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"}],"name":"listForAMBER","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"nftAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"}],"name":"listForMATIC","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"listings","outputs":[{"internalType":"uint256","name":"listingId","type":"uint256"},{"internalType":"address","name":"seller","type":"address"},{"internalType":"address","name":"nftAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"address","name":"paymentToken","type":"address"},{"internalType":"enum MustachePlace.PaymentType","name":"paymentType","type":"uint8"},{"internalType":"bool","name":"isForSale","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"listingId","type":"uint256"},{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"updateAMBERPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newAssAddress","type":"address"}],"name":"updateASSaddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"listingId","type":"uint256"},{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"updateMATICPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"nftAddress","type":"address"},{"internalType":"bool","name":"isAllowed","type":"bool"}],"name":"updateNewCollection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_specialNFTCollection","type":"address"}],"name":"updateSpecialNFTcollection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawCommissionFees","outputs":[],"stateMutability":"nonpayable","type":"function"}];

export { CONTRACT_ADDRESS, CONTRACT_ABI, CONTRACT_ADDRESS_2, CONTRACT_ABI_2 };