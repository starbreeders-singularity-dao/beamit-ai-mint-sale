// utils/db.ts
import { supabase } from "./supabase";

interface AlphamintData {
  id?: string;
  whitelist_wallet?: string;
  source_holder_wallet?: string;
  eth_dest_wallet?: string;
  source_nft?: string;
  source_nft2?: string;
  source_nft3?: string;
  payment01_hash?: string;
  mint_id?: number;
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
      .from<AlphamintData>("alphamint")
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

export async function register(objData: AlphamintData): Promise<boolean> {
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
      .eq('whitelist_wallet', isWhitelistedAddress);

    if (error) {
      console.error("Error registering user:", error.message);
      return false;
    }

    if (!data || data.length === 0) {
      console.log("No rows updated.");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error registering user:", error.message);
    return false;
  }
}

export async function fetchLatestMintId(walletAddress: string) {
  try {
    const { data, error } = await supabase
      .from<AlphamintData>('alphamint')
      .select('mint_id')
      .eq('whitelist_wallet', walletAddress)
      .order('mint_id', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error fetching latest mint_id:', error.message);
      return null;
    }
    if (data && data.length > 0) {
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

export const checkWalletAddress = async (address: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from<AlphamintData>('alphamint')
      .select('source_holder_wallet')
      .eq('whitelist_wallet', address);

    if (error) {
      console.error("Error checking wallet address:", error.message);
      return false;
    }

    if (data && data.length > 0 && data[0].source_holder_wallet) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Unexpected error checking wallet address:", error.message);
    return false;
  }
};
