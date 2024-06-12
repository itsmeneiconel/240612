"use client";
import { ethers } from 'ethers';
import { useState } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

function Home() {
  const [balance, setBalance] = useState<string>('');

  async function connectWallet() {
    if (typeof window.ethereum!== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        setBalance(ethers.formatEther(balance));
      } catch (error) {
        console.error('User rejected request', error);
      }
    } else {
      alert('MetaMask is not installed!');
    }
  }
  
  return (
    <div>
      <button onClick={connectWallet}>Connect with MetaMask</button>
      {balance && <p>Your Balance: {balance} ETH</p>}
    </div>
  );
}

export default Home;