import * as mpl from "@metaplex-foundation/mpl-token-metadata";
import * as web3 from "@solana/web3.js";
import * as anchor from '@project-serum/anchor';



export async function getTransaction(pk : String, tokenAddress : String){
    
    const INITIALIZE = true;

    // tokenAddress = tokenAddress.replace(/\s/g, '');
 
        console.log("Token Address => ", tokenAddress )

        let publicKey  =  new web3.PublicKey(pk);
       
        const mint = new web3.PublicKey(tokenAddress);
        const seed1 = Buffer.from(anchor.utils.bytes.utf8.encode("metadata"));
        const seed2 = Buffer.from(mpl.PROGRAM_ID.toBytes());
        const seed3 = Buffer.from(mint.toBytes());
        const [metadataPDA, _bump] = web3.PublicKey.findProgramAddressSync([seed1, seed2, seed3], mpl.PROGRAM_ID);
        const accounts = {
            metadata: metadataPDA,
            mint,
            mintAuthority: publicKey,
            payer: publicKey,
            updateAuthority: publicKey,
        }
    
        
    const dataV2 = {
        name: "edeXa",
        symbol: "EDX",
        uri: "https://gateway.pinata.cloud/ipfs/QmP2fLduqwPvrLJXgpr73phPCBYVwdiDLKNzu1p9jjtmLa",
        collection: null,
        uses: null,
        sellerFeeBasisPoints: 0,
        creators: null,
    }
    publicKey
    let ix;
    if (INITIALIZE) {
        const args : mpl.CreateMetadataAccountV3InstructionArgs =  {
            createMetadataAccountArgsV3: {
                data: dataV2,
                isMutable: true,
                collectionDetails: null
            }
        };
        ix = mpl.createCreateMetadataAccountV3Instruction(accounts, args);
    } else {
        const args =  {
            updateMetadataAccountArgsV2: {
                data: dataV2,
                isMutable: true,
                updateAuthority: publicKey,
                primarySaleHappened: true
            }
        };
        ix = mpl.createUpdateMetadataAccountV2Instruction(accounts, args)
    }
    return ix;
}