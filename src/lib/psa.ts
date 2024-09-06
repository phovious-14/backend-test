import axios from 'axios';
import { psaCardDataType } from './types';

export async function psa(serialNumber: string): Promise<psaCardDataType | { error: string }> {

  //here we are not using cheerio cause IP gets block, so found API of PSA, i have generated bearer token already

  try {
    const response = await axios({
      method: 'GET',
      url: `https://api.psacard.com/publicapi/cert/GetByCertNumber/${serialNumber}`,
      headers: {
        'Authorization': `Bearer ${process.env.PSA_ACCESS_TOKEN}`
      }
    });

    if(response.status == 400) return {error: "No data found"}

    return response.data.PSACert;

  } catch (error) {
    return {error: "No data found"}
  }
}