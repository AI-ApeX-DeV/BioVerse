import { Server, TransactionBuilder, Networks, Operation, Asset, Memo } from 'stellar-sdk';
import * as freighter from '@stellar/freighter-api';

const server = new Server('https://horizon-testnet.stellar.org');  // Use the testnet for development
import React, { useState } from 'react';
import * as freighter from '@stellar/freighter-api';
import { Server } from 'stellar-sdk';

const WalletConnector = () => {
  const [publicKey, setPublicKey] = useState(null);
  const server = new Server('https://horizon-testnet.stellar.org');

  const connectWallet = async () => {
    if (await freighter.isConnected()) {
      const pk = await freighter.getPublicKey();
      setPublicKey(pk);
    } else {
      console.error('Freighter is not installed or connected.');
    }
  };

  const checkBalance = async () => {
    if (publicKey) {
      const account = await server.loadAccount(publicKey);
      console.log('Balances for account: ' + publicKey);
      account.balances.forEach((balance) => {
        console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
      });
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        {publicKey ? 'Wallet Connected' : 'Connect Wallet'}
      </button>
      {publicKey && (
        <div>
          <p>Public Key: {publicKey}</p>
          <button onClick={checkBalance}>Check Balance</button>
        </div>
      )}
    </div>
  );
};


const createPost = async (postObj, spin, showSuccessPopup, setIsAlertInfo) => {
  try {
    setIsAlertInfo(true);

    // Get the current account's public key
    const publicKey = await freighter.getPublicKey();
    
    // Load the account from the Stellar network
    const account = await server.loadAccount(publicKey);

    // Build the transaction
    const transaction = new TransactionBuilder(account, {
      fee: (await server.fetchBaseFee()).toString(),
      networkPassphrase: Networks.TESTNET,  // Use TESTNET for development
    })
    .addOperation(Operation.payment({
      destination: 'GCHXBVWYZZAOSY6TZGOFCNMYECRC6LWPPBYTISUUCR4Q5TWRBLPQSFIA',  // Dummy recipient address
      asset: Asset.native(),
      amount: '0.00001',  // Minimal amount for demonstration
    }))
    .addMemo(Memo.text(JSON.stringify(postObj)))  // Store the post details in the memo
    .setTimeout(30)
    .build();

    // Sign the transaction using Freighter
    const signedTransaction = await freighter.signTransaction(transaction.toXDR(), Networks.TESTNET);

    // Submit the transaction to the network
    const result = await server.submitTransaction(signedTransaction);

    // Transaction was successful
    spin(false);
    showSuccessPopup('Post created successfully!');
    setIsAlertInfo(false);

    console.log('Transaction successful:', result);
  } catch (error) {
    spin(false);
    setIsAlertInfo(false);
    console.error('Transaction failed:', error);
  }
};
const Context = createContext();

const ContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);

  const checkIfWalletIsConnected = async () => {
    if (await freighter.isConnected()) {
      const publicKey = await freighter.getPublicKey();
      setCurrentAccount(publicKey);
    }
  };

  const connectWallet = async () => {
    if (!await freighter.isConnected()) {
      await freighter.connect();
      await checkIfWalletIsConnected();
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <Context.Provider value={{ currentAccount, connectWallet, createPost, createPrivatePost }}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider,createPost, WalletConnector };
