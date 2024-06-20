import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantApi } from '../api/api';

function RestaurantPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [editingRestaurantId, setEditingRestaurantId] = useState(null);
  const [editedRestaurant, setEditedRestaurant] = useState({ ID_Restaurateur: '', nom_Restaurant: '', adresse: '', image: null });
  const [newRestaurant, setNewRestaurant] = useState({ ID_Restaurateur: '', nom_Restaurant: '', adresse: '', image: null });

  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await restaurantApi.get('/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleInputChange = (event, setRestaurant) => {
    const { name, value } = event.target;
    setRestaurant(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (event, setRestaurant) => {
    setRestaurant(prevState => ({ ...prevState, image: event.target.files[0] }));
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('ID_Restaurateur', newRestaurant.ID_Restaurateur);
    formData.append('nom_Restaurant', newRestaurant.nom_Restaurant);
    formData.append('adresse', newRestaurant.adresse);
    if (newRestaurant.image) {
      formData.append('image', newRestaurant.image);
    }

    try {
      const response = await restaurantApi.post('/restaurants', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setRestaurants([...restaurants, response.data]);
      setNewRestaurant({ ID_Restaurateur: '', nom_Restaurant: '', adresse: '', image: null });
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  };

  const handleEditClick = (restaurant) => {
    setEditingRestaurantId(restaurant._id);
    setEditedRestaurant({ ...restaurant });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('ID_Restaurateur', editedRestaurant.ID_Restaurateur);
    formData.append('nom_Restaurant', editedRestaurant.nom_Restaurant);
    formData.append('adresse', editedRestaurant.adresse);
    if (editedRestaurant.image) {
      formData.append('image', editedRestaurant.image);
    }

    try {
      const response = await restaurantApi.put(`/restaurants/${editedRestaurant._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setRestaurants(restaurants.map(r => r._id === editedRestaurant._id ? response.data : r));
      setEditingRestaurantId(null);
      setEditedRestaurant({ ID_Restaurateur: '', nom_Restaurant: '', adresse: '', image: null });
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await restaurantApi.delete(`/restaurants/${id}`);
      setRestaurants(restaurants.filter(r => r._id !== id));
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const handleMenuClick = (restaurantId) => {
    navigate(`/menu/${restaurantId}`);
  };

  const handleArticlesClick = () => {
    navigate(`/articles`);
  };

  return (
    <div>
      <h1>Restaurants</h1>
      <button onClick={fetchRestaurants}>Get Restaurants</button>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant._id}>
            <p>ID Restaurant: {restaurant.ID_Restaurant}</p>
            <p>ID Restaurateur: {restaurant.ID_Restaurateur}</p>
            <p>Nom Restaurant: {restaurant.nom_Restaurant}</p>
            <p>Adresse: {restaurant.adresse}</p>
            {restaurant.image && <img src={`http://localhost:3001/${restaurant.image}`} alt={restaurant.nom_Restaurant} className="restaurant-image" />}
            <button onClick={() => handleEditClick(restaurant)}>Edit</button>
            <button onClick={() => handleDelete(restaurant._id)}>Delete</button>
            <button onClick={() => handleMenuClick(restaurant.ID_Restaurant)}>Menu</button>
            {editingRestaurantId === restaurant._id && (
              <form onSubmit={handleUpdate}>
                <div>
                  <label>
                    ID Restaurateur:
                    <input
                      type="text"
                      name="ID_Restaurateur"
                      value={editedRestaurant.ID_Restaurateur}
                      onChange={(e) => handleInputChange(e, setEditedRestaurant)}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Nom Restaurant:
                    <input
                      type="text"
                      name="nom_Restaurant"
                      value={editedRestaurant.nom_Restaurant}
                      onChange={(e) => handleInputChange(e, setEditedRestaurant)}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Adresse:
                    <input
                      type="text"
                      name="adresse"
                      value={editedRestaurant.adresse}
                      onChange={(e) => handleInputChange(e, setEditedRestaurant)}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Image:
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setEditedRestaurant)}
                    />
                  </label>
                </div>
                <button type="submit">Save</button>
              </form>
            )}
          </li>
        ))}
      </ul>

      <button onClick={handleArticlesClick}>Articles</button>

      <h2>Add a New Restaurant</h2>
      <form onSubmit={handleCreateSubmit}>
        <div>
          <label>
            ID Restaurateur:
            <input
              type="text"
              name="ID_Restaurateur"
              value={newRestaurant.ID_Restaurateur}
              onChange={(e) => handleInputChange(e, setNewRestaurant)}
            />
          </label>
        </div>
        <div>
          <label>
            Nom Restaurant:
            <input
              type="text"
              name="nom_Restaurant"
              value={newRestaurant.nom_Restaurant}
              onChange={(e) => handleInputChange(e, setNewRestaurant)}
            />
          </label>
        </div>
        <div>
          <label>
            Adresse:
            <input
              type="text"
              name="adresse"
              value={newRestaurant.adresse}
              onChange={(e) => handleInputChange(e, setNewRestaurant)}
            />
          </label>
        </div>
        <div>
          <label>
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setNewRestaurant)}
            />
          </label>
        </div>
        <button type="submit">Add Restaurant</button>
      </form>
    </div>
  );
}

export default RestaurantPage;
