// utils/db.ts
import { supabase } from "./supabase";

export async function addWalletAddress(walletAddress: string) {
  try {
    // console.log("Adding wallet address:", walletAddress);

    const { data, error } = await supabase
      .from("whitelists")
      .insert([{ wallet_address: walletAddress }]);

    if (error) {
      // console.error("Error adding wallet address:", error.message);
      throw error;
    }

    // console.log("Wallet address added successfully:", data);
    return data;
  } catch (error: any) {
    // console.error("Error adding wallet address:", error.message);
    return error.message;
  }
}

// async function createWalletsTable() {
//   try {
//     const { data, error } = await supabase.rpc('create_table', {
//       schema: 'public',
//       table: 'wallets',
//       columns: {
//         id: 'uuid',
//         wallet_address: 'text'
//       }
//     });

//     if (error) {
//       console.error('Error creating table:', error.message);
//       throw error;
//     }

//     console.log('Table created successfully:', data);
//   } catch (error:any) {
//     console.error('Error creating table:', error.message);
//     throw error;
//   }
// }

export const isAddressWhitelisted = async (address: string) => {
  try {
    // console.log("Checking address:", address);
    const trimmedAddress = address.trim()

    const { data, error } = await supabase
      .from("alphamint")
      .select("id")
      .eq("whitelist_wallet", trimmedAddress);
      if (error) {
        false
      }
    // console.log("wallet_address:", trimmedAddress, data, error);
    if (data && data.length > 0) {
      // console.log("Address is whitelisted:", trimmedAddress);
      return true;
    } else {
      // console.log("Address is not whitelisted:", trimmedAddress);
      return false;
    }
  } catch (error: any) {
    // console.error("Error checking whitelist:", error.message);
    return false;
  }
};

// export const addHolders = async (address: string) => {
//   console.log("isAddressWhitelisted", address);
//   const { data, error } = await supabase
//     .from("whitelists")
//     .select("id")
//     .eq("wallet_address", address.toLowerCase());

//   if (error) {
//     console.error("Error checking walletAddress:", error.message);
//     return false;
//   }

//   return data?.length > 0;
// };

function getRandomInt() {
  const min = Math.ceil(10);
  const max = Math.floor( 100000);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function register(objData: any): Promise<boolean> {
  try {
      const {
          nftAddress,
          holderAddress,
          reciepientAddress,
          paymentHash,
          isWhitelistedAddress,
          // selectedSource
      } = objData;

        
      const { data, error } = await supabase
      .from('alphamint')
      .update({
        source_holder_wallet: holderAddress,
        eth_dest_wallet: reciepientAddress,
        source_nft: nftAddress,
        payment01_hash: paymentHash,
        mint_id: getRandomInt()
      })
      .eq('whitelist_wallet', isWhitelistedAddress); 

      if (data) true

      if (error) {
          // console.error("Error registering user:", error.message);
          return false;
      } else {
          // data will be defined if there are no errors
          return true;
      }
  } catch (error:any) {
      // console.error("Error registering user:", error.message);
      return false; // Handle any unexpected errors and return false
  }
}


export async function fetchLatestMintId(walletAddress: string) {
  const { data, error } = await supabase
      .from('alphamint')
      .select('mint_id')
      .eq('whitelist_wallet', walletAddress)
      .order('mint_id', { ascending: false }) // Ensure 'created_at' is a timestamp column
      .limit(1);


  if (error) {
      // console.error('Error fetching latest mint_id:', error.message);
      return null;
  }
  if (data && data.length > 0) {
      return data[0].mint_id;
  } else {
      // console.log('No mint_id found for the given wallet address.');
      return null;
  }
}

// const createWalletsTableIfNotExists = async () => {
//   try {
//     const { error } = await supabase.from("wallets").create({
//       nft_address: { type: "text" },
//       holder_address: { type: "text" },
//       recipient_address: { type: "text" },
//       payment_hash: { type: "text" },
//       wallet_address: { type: "text" }
//       // Define other columns as needed
//     });

//     if (error) {
//       console.error("Error creating 'wallets' table:", error.message);
//     } else {
//       console.log("'wallets' table created successfully.");
//     }
//   } catch (error) {
//     console.error("Error creating 'wallets' table:", error.message);
//   }
// };

export const checkWalletAddress = async (address: string): Promise<boolean> => {
  try {

 
    const data:any = await supabase
      .from('alphamint')
      .select('source_holder_wallet')
      .eq('whitelist_wallet', address);

      const  source = data.data[0].source_holder_wallet

      if (source){

        return true 
      }

      return false 

   
  } catch (error: any) {
    // console.error("Unexpected error checking wallet address:", error.message);
    return false;
  }
};
