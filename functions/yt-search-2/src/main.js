import { Client } from 'node-appwrite';
import * as search from 'youtube-search-api';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const { query } = JSON.parse(req.body);

  log(`${query}`);
  log('Hello, Logs! \n');

  const searchData = await search.GetListByKeyword(`${query}`);
  log(searchData);

  return res.json(searchData);
};
