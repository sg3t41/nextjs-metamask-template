"use client"; // Next.jsのクライアントコンポーネントの場合

import React, { useState } from "react";
import { ethers } from "ethers";

const ConnectWalletButton: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // アカウントの接続を要求
        const accounts: string[] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        // 接続されたアカウントをセット
        setAccount(accounts[0]);
        setError(null); // エラーをリセット

        // Ethers.jsのプロバイダーを作成
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();

        // 必要に応じてスマートコントラクトを操作するコードを書く
      } catch (err) {
        console.error("Error connecting to MetaMask:", err);
        setError("MetaMask接続中にエラーが発生しました。");
      }
    } else {
      setError("MetaMaskがインストールされていません。");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {error && <p className="text-red-500">{error}</p>}
      {account ? (
        <div className="flex flex-col items-center">
          <p>接続済みアカウント: {account}</p>
          <button
            onClick={() => setAccount(null)} // 接続解除のための簡易ボタン
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
