import { Request, Response } from 'express';
import Seller from '../models/sellerModel'; // Adjust the path as needed

export const getAllSeller = async (req: Request, res: Response) => {
  try {
    const sellers = await Seller.find().select('-__v'); // Exclude version key if not needed

    if (sellers.length === 0) {
      return res.status(404).json({ message: 'No sellers found' });
    }

    res.status(200).json(sellers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


