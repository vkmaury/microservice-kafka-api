import { Request, Response } from 'express';
import User from '../models/User'; // Adjust the path as needed

export const unblockSeller = async (req: Request, res: Response) => {
  const userId = req.query.userId as string; // Get the user ID from the query parameters

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user role is 'seller'
    if (user.role !== 'seller') {
      return res.status(403).json({ message: 'User is not a seller' });
    }

    // Block the user by updating the isActive field
    user.isActive = true;
    await user.save();

    res.status(200).json({ message: 'Seller unblocked successfully', user });
  } catch (error) {
    console.error('Error blocking user:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
