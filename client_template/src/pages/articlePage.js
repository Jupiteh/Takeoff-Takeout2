import React, { useState, useEffect } from 'react';
import { restaurantApi } from '../api/api';

function ArticlePage() {
  const [articles, setArticles] = useState([]);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [editedArticle, setEditedArticle] = useState({ article_Name: '', image: null, price: '', ID_Restaurant: '' });
  const [newArticle, setNewArticle] = useState({ article_Name: '', image: null, price: '', ID_Restaurant: '' });
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await restaurantApi.get('/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    const fetchRestaurants = async () => {
      try {
        const response = await restaurantApi.get('/restaurants?ID_Restaurateur=1');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchArticles();
    fetchRestaurants();
  }, []);

  const handleInputChange = (event, setArticle) => {
    const { name, value } = event.target;
    setArticle(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (event, setArticle) => {
    setArticle(prevState => ({ ...prevState, image: event.target.files[0] }));
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('article_Name', newArticle.article_Name);
    formData.append('price', newArticle.price);
    formData.append('ID_Restaurant', newArticle.ID_Restaurant);
    if (newArticle.image) {
      formData.append('image', newArticle.image);
    }

    try {
      const response = await restaurantApi.post('/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setArticles([...articles, response.data]);
      setNewArticle({ article_Name: '', image: null, price: '', ID_Restaurant: '' });
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  const handleEditClick = (article) => {
    setEditingArticleId(article._id);
    setEditedArticle({ ...article });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('article_Name', editedArticle.article_Name);
    formData.append('price', editedArticle.price);
    formData.append('ID_Restaurant', editedArticle.ID_Restaurant);
    if (editedArticle.image) {
      formData.append('image', editedArticle.image);
    }

    try {
      const response = await restaurantApi.put(`/articles/${editedArticle._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setArticles(articles.map(a => a._id === editedArticle._id ? response.data : a));
      setEditingArticleId(null);
      setEditedArticle({ article_Name: '', image: null, price: '', ID_Restaurant: '' });
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await restaurantApi.delete(`/articles/${id}`);
      setArticles(articles.filter(a => a._id !== id));
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <p>ID Article: {article.ID_Article}</p>
            <p>Article Name: {article.article_Name}</p>
            <p>Price: {article.price}</p>
            <p>Restaurant ID: {article.ID_Restaurant}</p>
            {article.image && <img src={`http://localhost:3001/${article.image}`} alt={article.article_Name} className="article-image" />}
            <button onClick={() => handleEditClick(article)}>Edit</button>
            <button onClick={() => handleDelete(article._id)}>Delete</button>
            {editingArticleId === article._id && (
              <form onSubmit={handleUpdate}>
                <div>
                  <label>
                    Article Name:
                    <input
                      type="text"
                      name="article_Name"
                      value={editedArticle.article_Name}
                      onChange={(e) => handleInputChange(e, setEditedArticle)}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Price:
                    <input
                      type="number"
                      name="price"
                      value={editedArticle.price}
                      onChange={(e) => handleInputChange(e, setEditedArticle)}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Restaurant:
                    <select
                      name="ID_Restaurant"
                      value={editedArticle.ID_Restaurant}
                      onChange={(e) => handleInputChange(e, setEditedArticle)}
                    >
                      <option value="">Select a restaurant</option>
                      {restaurants.map((restaurant) => (
                        <option key={restaurant.ID_Restaurant} value={restaurant.ID_Restaurant}>
                          {restaurant.nom_Restaurant}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div>
                  <label>
                    Image:
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setEditedArticle)}
                    />
                  </label>
                </div>
                <button type="submit">Save</button>
              </form>
            )}
          </li>
        ))}
      </ul>

      <h2>Add a New Article</h2>
      <form onSubmit={handleCreateSubmit}>
        <div>
          <label>
            Article Name:
            <input
              type="text"
              name="article_Name"
              value={newArticle.article_Name}
              onChange={(e) => handleInputChange(e, setNewArticle)}
            />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={newArticle.price}
              onChange={(e) => handleInputChange(e, setNewArticle)}
            />
          </label>
        </div>
        <div>
          <label>
            Restaurant:
            <select
              name="ID_Restaurant"
              value={newArticle.ID_Restaurant}
              onChange={(e) => handleInputChange(e, setNewArticle)}
            >
              <option value="">Select a restaurant</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant.ID_Restaurant} value={restaurant.ID_Restaurant}>
                  {restaurant.nom_Restaurant}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setNewArticle)}
            />
          </label>
        </div>
        <button type="submit">Add Article</button>
      </form>
    </div>
  );
}

export default ArticlePage;
