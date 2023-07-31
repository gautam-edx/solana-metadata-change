import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import {getTransaction} from "../../middleware/script";
import * as web3 from "@solana/web3.js";

export default function Home() {

  const [tokenAddress, settokenAddress] = useState();

  async function connectPhantom(){
    try{
    // @ts-ignore
    const provider = window.phantom.solana;
    const resp = await provider.request({ method: "connect" });
    console.log("your address => " , resp.publicKey.toString());
        // @ts-ignore
    let ix = await getTransaction(resp.publicKey.toString(),tokenAddress);
    const tx = new web3.Transaction();
    const connection = new web3.Connection("https://docs-demo.solana-mainnet.quiknode.pro/");
    let blockhash = (await connection.getLatestBlockhash()).blockhash;
    tx.add(ix);
    tx.recentBlockhash = blockhash;
    tx.feePayer = new web3.PublicKey(resp.publicKey.toString());
    await provider.signAndSendTransaction(tx);
    alert("Success");
    }catch(e){
    alert("failed");
    }
    
  }
// @ts-ignore
  function onAddressChange(e){
    settokenAddress(e.target.value)
  }

  return (
      <div>
            <input type="text" placeholder='Put your token address here' onChange={(e) => onAddressChange(e)}/>
            <button onClick={connectPhantom} > 
              Change Metadata
            </button>
      </div>
    )
  }

