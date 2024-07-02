import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { createRestaurant, getRestaurants, getRestaurantByID, updateRestaurant, deleteRestaurant, getRestaurantsByRestaurateur, getRestaurantsByLocation, 
  getRestaurantsBySearchAndLocation, getRestaurantsBySearchLocationAndCategory } from '../controllers/restaurantController';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/restaurant/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/restaurants', upload.single('image'), createRestaurant);
router.get('/restaurants', getRestaurants);
router.get('/restaurants/:id', getRestaurantByID);
router.get('/restaurants/location', getRestaurantsByLocation);
router.get('/restaurants/nameLocation', getRestaurantsBySearchAndLocation);
router.get('/restaurants/nameLocationCategory', getRestaurantsBySearchLocationAndCategory);
router.get('/restaurants/restaurateur/:id', getRestaurantsByRestaurateur);
router.put('/restaurants/:id', upload.single('image'), updateRestaurant);
router.delete('/restaurants/:id', deleteRestaurant);

export default router;
