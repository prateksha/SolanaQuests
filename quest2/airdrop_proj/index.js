// const solanaWeb3 = require('@solana/web3.js');
// console.log(solanaWeb3);
const {
    Connection, //This class has getBalance method
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
   } = require("@solana/web3.js");

// const Connection = require("@solana/web3.js").Connection;

// The Keypair class that we just imported allows us to create a new wallet
const newPair = new Keypair(); // Wallet objet of type Keypair. This newPair instance holds the public key and the private key
console.log(newPair);

const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
// console.log(publicKey);
const secretKey = newPair._keypair.secretKey

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(secretKey);

        const walletBalance = await connection.getBalance(new PublicKey(myWallet.publicKey)); // why not directly pass publicKey?
        console.log(myWallet);
        console.log(`=> For wallet address ${publicKey}`);
        console.log(`   Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
        // console.log(`Wallet balance: ${walletBalance}`);
    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletKeyPair = await Keypair.fromSecretKey(secretKey);

        console.log(`-- Airdropping 2 SOL --`)
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
        
    } catch (err) {
        console.log(err);
    }
}

const driverFunction = async() => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

driverFunction();


