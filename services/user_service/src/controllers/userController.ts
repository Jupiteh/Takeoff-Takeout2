import { Request, Response } from 'express';
import User from '../models/userModel';  // Assurez-vous que ce chemin est correct

// Créer un utilisateur
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, phoneNumber } = req.body;
  try {
    const newUser = await User.create({ name, email, password, phoneNumber });
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer tous les utilisateurs
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer un utilisateur par ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Mettre à jour un utilisateur par ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, email, password, phoneNumber } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password, phoneNumber },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer un utilisateur par ID
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
