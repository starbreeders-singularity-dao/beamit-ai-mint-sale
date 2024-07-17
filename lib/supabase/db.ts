// utils/db.ts
import { supabase } from "./supabase";

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
      reciepientAddress,
      paymentHash,
      isWhitelistedAddress,
      nftAddress2,
      nftAddress3,
    } = objData;

    const updateData: any = {
      source_holder_wallet: holderAddress,
      eth_dest_wallet: reciepientAddress,
      source_nft: nftAddress,
      payment01_hash: paymentHash,
      mint_id: getRandomInt(),
    };

    if (nftAddress2) {
      updateData.source_nft2 = nftAddress2;
    }

    if (nftAddress3) {
      updateData.source_nft3 = nftAddress3;
    }

    const { data, error } = await supabase
      .from('alphamint')
      .update(updateData)
      .eq('whitelist_wallet', isWhitelistedAddress);

    if (error) {
      console.error("Error registering user:", error.message);
      return false;
    } else {
      console.log("User registered successfully:", data);
      return true;
    }
  } catch (error: any) {
    console.error("Error registering user:", error.message);
    return false; // Handle any unexpected errors and return false
  }
}

export async function fetchLatestMintId(walletAddress: string) {
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
}

export const checkWalletAddress = async (address: string): Promise<boolean> => {
  try {
    const data: any = await supabase
      .from('alphamint')
      .select('source_holder_wallet')
      .eq('whitelist_wallet', address);

    const source = data.data[0]?.source_holder_wallet;

    if (source) {
      return true;
    }

    return false;
  } catch (error: any) {
    return false;
  }
};
