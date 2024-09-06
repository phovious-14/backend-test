import axios from 'axios';
import * as cheerio from 'cheerio';
import { beckettCardDataType } from './types';

export async function beckett(serialNumber: string, gradingType: string): Promise<beckettCardDataType | { error: string }> {
  
  // fetch data from url : https://www.beckett.com/grading/card-lookup?item_type=BGS&item_id=0&submit=Submit

  const url = `https://www.beckett.com/grading/card-lookup`;
  const params = { item_type: gradingType, item_id: serialNumber, submit: 'Submit' };

  try {
    const response = await axios.get(url, { params });

    // Load the HTML content into Cheerio

    const $ = cheerio.load(response.data);

    const cardData: beckettCardDataType = {};

    // Select the table and iterate over its rows
    $('.cardDetail tr').each((index, element) => {
      const $tds = $(element).find('td');
      if ($tds.length === 3) {
        const key = $tds.eq(0).text().trim().replace(/[:\s]+/g, '');
        const value = $tds.eq(2).text().trim();
        cardData[key] = value;
      }
    });

    return cardData;

  } catch (error) {
    console.error('Error scraping Beckett:', error);
    return { error: 'An error occurred while scraping' };
  }
}