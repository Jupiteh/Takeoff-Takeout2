import { Request, Response } from 'express';
import Restaurant from '../models/retaurant';
import fs from 'fs';
import path from 'path';

// export const createRestaurant = async (req: Request, res: Response) => {
//   try {
//     const newRestaurant = req.body;

//     if (req.file) {
//       newRestaurant.image = req.file.path;
//     }

//     const restaurant = new Restaurant(newRestaurant);
//     await restaurant.save();
//     res.status(201).json(restaurant);
//   } catch (error: any) {
//     res.status(400).json({ error: error.message });
//   }
// };

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const newRestaurant = req.body;

    if (req.file) {
      newRestaurant.image = req.file.path;
    }

    const coordinates = await getCoordinates(newRestaurant.adresse);
    newRestaurant.latitude = coordinates.latitude;
    newRestaurant.longitude = coordinates.longitude;

    const restaurant = new Restaurant(newRestaurant);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const getCoordinates = async (address: string) => {
  const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1`;
  const response = await fetch(geocodeUrl);
  const data = await response.json();

  if (data.length === 0) {
    throw new Error('Invalid address');
  }

  const { lat, lon } = data[0];
  return {
    latitude: parseFloat(lat),
    longitude: parseFloat(lon)
  };
};

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const query = search ? { nom_Restaurant: { $regex: search, $options: 'i' } } : {};
    const restaurants = await Restaurant.find(query);
    res.status(200).json(restaurants);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getRestaurantsByRestaurateur = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const restaurants = await Restaurant.find({ ID_Restaurateur: id });
    res.status(200).json(restaurants);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// export const updateRestaurant = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;
//     const restaurant = await Restaurant.findById(id);

//     if (!restaurant) {
//       return res.status(404).json({ error: 'Restaurant not found' });
//     }

//     if (req.file && restaurant.image) {
//       const oldImagePath = path.join(__dirname, '..', restaurant.image);
//       if (fs.existsSync(oldImagePath)) {
//         fs.unlinkSync(oldImagePath);
//       }
//       updates.image = req.file.path;
//     }

//     const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, updates, { new: true });
//     res.status(200).json(updatedRestaurant);
//   } catch (error: any) {
//     res.status(400).json({ error: error.message });
//   }
// };

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    if (req.file) {
      const oldImagePath = path.join(__dirname, '..', restaurant.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      updates.image = req.file.path;
    }

    if (updates.adresse && updates.adresse !== restaurant.adresse) {
      const coordinates = await getCoordinates(updates.adresse);
      updates.latitude = coordinates.latitude;
      updates.longitude = coordinates.longitude;
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedRestaurant);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findByIdAndDelete(id);

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    if (restaurant.image) {
      const imagePath = path.join(__dirname, '..', restaurant.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
