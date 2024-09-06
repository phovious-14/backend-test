import axios from 'axios';
import * as cheerio from 'cheerio';
import { cgcCardDataType, error } from './types';

export async function CGC(serialNumber: string): Promise<cgcCardDataType | error> {

  // fetch data from url : https://www.cgccards.com/certlookup/123

  try {
    const url = `https://www.cgccards.com/certlookup/${serialNumber}/`;// Fetch the HTML content of the page
    const { data } = await axios.get(url);
    
    // Load the HTML content into Cheerio
    const $ = cheerio.load(data);

    // Extract the card data
    const cardData: cgcCardDataType = {
      serialNumber: $('dl dt:contains("Cert #") + dd').text().trim(),
      cardName: $('dl dt:contains("Card Name") + dd').text().trim(),
      game: $('.related-info dl dt:contains("Game") + dd').text().trim(),
      year: $('.related-info dl dt:contains("Year") + dd').text().trim(),
      language: $('.related-info dl dt:contains("Language") + dd').text().trim(),
      cardSet: $('.related-info dl dt:contains("Card Set") + dd').text().trim(),
      cardNumber: $('.related-info dl dt:contains("Card Number") + dd').text().trim(),
      variant1: $('.related-info dl dt:contains("Variant 1") + dd').text().trim(),
      grade: $('.related-info.grades dl dt:contains("Grade") + dd').text().trim(),
      graderNotes: $('.related-info dl dt:contains("Grader Notes") + dd').text().trim()
    };

    if(cardData.serialNumber === "") return {}

    return cardData;

  } catch (error) {
    return { error: 'An error occurred while scraping' };
  }
}