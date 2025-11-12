import React, { useState, useEffect } from 'react';
import { getNews, deleteNews } from './api';
import './NewsList.css';

function NewsList({ onEdit, refreshTrigger }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, [refreshTrigger]);

  const loadNews = async () => {
    try {
      const response = await getNews();
      setNews(response.data.data.news);
    } catch (err) {
      console.error('Error loading news:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta noticia?')) return;

    try {
      await deleteNews(id);
      setNews(news.filter(n => n.id !== id));
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="news-list">
      <h2>📋 Noticias Publicadas ({news.length})</h2>

      {news.length === 0 ? (
        <div className="empty-state">
          <p>📭 No hay noticias publicadas</p>
          <p>Crea tu primera noticia usando el botón "Nueva Noticia"</p>
        </div>
      ) : (
        <div className="news-grid">
          {news.map((article) => (
            <div key={article.id} className="news-card">
              {article.coverImage && (
                <img src={article.coverImage} alt={article.title} />
              )}
              <div className="news-card-content">
                <span className="category">{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.subtitle || article.excerpt}</p>
                <div className="news-stats">
                  <span>👁️ {article.viewCount}</span>
                  <span>🔗 {article.clickCount}</span>
                  <span>📤 {article.shareCount}</span>
                </div>
                <div className="news-actions">
                  <button
                    className="btn-edit"
                    onClick={() => onEdit(article)}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(article.id)}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsList;