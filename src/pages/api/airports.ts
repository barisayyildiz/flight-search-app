// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { BaseResponseType } from '@/types/api';
import { Airport } from '@/types/airport';
import { airports } from '@/constants';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BaseResponseType<Airport[]>>
) {
  if(req.method !== 'GET') {
    return res.status(405).json({
      isSucceed: false,
      message: 'Method not allowed',
      data: null
    })
  }
  return res.status(200).json({
    data: airports,
    isSucceed: true,
    message: null,
  })
}
