import { ethers } from 'ethers';

export const shortenAddress = address => {
  if (!!address && address.length > 4) {
    return `${address.slice(0, 6)}...${address.substr(address.length - 4)}`;
  }
  return address;
};

export const isValidAddress = address => {
  try {
    ethers.utils.getAddress(address);
  } catch (e) {
    return false;
  }
  return true;
};
