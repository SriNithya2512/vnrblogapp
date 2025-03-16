import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ArticlesByCategory() {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await axios.get(`http://localhost:3000/user-api/articles/${category}`);
        setArticles(res.data.payload);
      } catch (err) {
        setError('Failed to fetch articles');
      }
    }
    fetchArticles();
  }, [category]);

  return (
    <div className="container">
      <h2 className="my-4">Articles in {category}</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="row">
        {articles.map(article => (
          <div key={article._id} className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticlesByCategory;