// utils/db.ts
import { supabase } from "./supabase";

interface AlphamintData {
  nftAddress: string;
  holderAddress: string;
  recipientAddress: string;
  paymentHash: string;
  isWhitelistedAddress: string;
  nftAddress2?: string;
  nftAddress3?: string;
}

export async function addWalletAddress(walletAddress: string) {
  try {
    const { data, error } = await supabase
      .from("whitelists")
      .insert([{ wallet_address: walletAddress }]);

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    return error.message;
  }
}

export const isAddressWhitelisted = async (address: string) => {
  try {
    const trimmedAddress = address.trim();
    const { data, error } = await supabase
      .from("alphamint")
      .select("id")
      .eq("whitelist_wallet", trimmedAddress);

    if (error) {
      return false;
    }

    if (data && data.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    return false;
  }
};

function getRandomInt() {
  const min = Math.ceil(10);
  const max = Math.floor(100000);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export async function register(objData: any): Promise<boolean> {
  try {
    const {
      nftAddress,
      holderAddress,
      recipientAddress,
      paymentHash,
      isWhitelistedAddress,
      nftAddress2,
      nftAddress3
    } = objData;

    const { data, error } = await supabase
      .from('alphamint')
      .update({
        source_holder_wallet: holderAddress,
        eth_dest_wallet: recipientAddress,
        source_nft: nftAddress,
        payment01_hash: paymentHash,
        source_nft2: nftAddress2 || null,
        source_nft3: nftAddress3 || null,
        mint_id: getRandomInt()
      })
      .eq('whitelist_wallet', isWhitelistedAddress)
      .select();

    if (error) {
      console.error("Error registering user:", error.message);
      return false;
    }

    if (!data || data.length === 0) {
      console.log("No rows updated.");
      return false;
    }

    console.log("Data updated successfully:", data);
    return true;
  } catch (error) {
    console.error("Error registering user:", error.message);
    return false;
  }
}

export async function fetchLatestMintId(walletAddress: string) {
  try {
    const { data, error } = await supabase
      .from('alphamint')
      .select('mint_id')
      .eq('whitelist_wallet', walletAddress)
      .order('mint_id', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error fetching latest mint_id:', error.message);
      return null;
    }
    if (data && data.length > 0) {
      console.log('Mint ID fetched successfully:', data[0].mint_id);
      return data[0].mint_id;
    } else {
      console.log('No mint_id found for the given wallet address.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching latest mint_id:', error.message);
    return null;
  }
}


export async function fetchLatestMintId(walletAddress: string) {
  try {
    const { data, error } = await supabase
      .from('alphamint')
      .select('mint_id')
      .eq('whitelist_wallet', walletAddress)
      .order('mint_id', { ascending: false })
      .limit(1);

    if (error) {
      return null;
    }
    if (data && data.length > 0) {
      return data[0].mint_id;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const checkWalletAddress = async (address: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('alphamint')
      .select('source_holder_wallet')
      .eq('whitelist_wallet', address);

    if (error) {
      return false;
    }

    if (data && data.length > 0 && data[0].source_holder_wallet) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};
