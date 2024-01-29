import { BASE_URL } from './const';
import { Metric } from './types';
import axios, { HttpStatusCode as StatusCodes } from 'axios';

export const publishMetrics = async (token: string, body: Metric) => {
  const res = await axios.post(BASE_URL + '/metrics', body, {
    headers: {
      Authorization: token,
    },
  });

  return res;
};

export const HttpStatusCodes = StatusCodes;
