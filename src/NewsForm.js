import React, { useState, useEffect } from 'react';
import { createNews, updateNews } from './api';
import './NewsForm.css';

function NewsForm({ news, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: 'Tecnología',
    tags: [],
    authorName: '',
    authorCompany: '',
    destinationUrl: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (news) {
      setFormData({
        ...news,
        tags: news.tags || [],
        destinationUrl: news.destinationUrl || ''
      });
    }
  }, [news]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(t => t.trim()).filter(t => t);
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (news) {
        await updateNews(news.id, formData);
      } else {
        await createNews(formData);
      }
      onSuccess();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="news-form-container">
      <h2>{news ? '✏️ Editar Noticia' : '➕ Nueva Noticia'}</h2>

      <form onSubmit={handleSubmit} className="news-form">
        <div className="form-group">
          <label>Título *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título impactante que capture la atención"
            required
          />
        </div>

        <div className="form-group">
          <label>Subtítulo</label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Subtítulo descriptivo"
          />
        </div>

        <div className="form-group">
          <label>Extracto (Resumen corto)</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows="2"
            placeholder="Resumen breve que aparece en la lista de noticias"
          />
        </div>

        <div className="form-group">
          <label>Contenido *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="12"
            placeholder="Contenido completo del artículo. Escribe al menos 800-1000 palabras para mejor engagement y SEO."
            required
          />
          <small style={{color: '#666'}}>
            💡 Tip: Artículos más largos = más tiempo en app = más AdMob revenue
          </small>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>URL de Imagen de Portada</label>
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://picsum.photos/800/400?random=1"
            />
          </div>

          <div className="form-group">
            <label>Categoría *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option>Tecnología</option>
              <option>Economía</option>
              <option>Negocios</option>
              <option>Marketing</option>
              <option>Deportes</option>
              <option>Entretenimiento</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Tags (separados por coma)</label>
          <input
            type="text"
            value={formData.tags.join(', ')}
            onChange={handleTagsChange}
            placeholder="IA, Tecnología, Innovación"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Autor</label>
            <input
              type="text"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              placeholder="Nombre del autor"
            />
          </div>

          <div className="form-group">
            <label>Empresa del Autor</label>
            <input
              type="text"
              name="authorCompany"
              value={formData.authorCompany}
              onChange={handleChange}
              placeholder="Nombre de la empresa"
            />
          </div>
        </div>

        <div className="form-group" style={{
          background: '#f0f9ff',
          padding: '20px',
          borderRadius: '8px',
          border: '2px solid #3b82f6',
          marginTop: '20px'
        }}>
          <label style={{color: '#1e40af', fontWeight: 'bold', fontSize: '16px'}}>
            🎯 URL de Destino (Landing/CTA)
          </label>
          <input
            type="url"
            name="destinationUrl"
            value={formData.destinationUrl}
            onChange={handleChange}
            placeholder="https://empresa.com/landing"
            style={{marginTop: '10px'}}
          />
          <small style={{
            color: '#1e40af',
            fontSize: '13px',
            display: 'block',
            marginTop: '10px',
            lineHeight: '1.6'
          }}>
            💡 Al agregar una URL aquí, se mostrará un botón <strong>"Visitar sitio web"</strong> al final del artículo en la app.
            <br/>
            ✨ Perfecto para generar tráfico a landings de clientes y aumentar conversiones.
          </small>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-cancel"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-save"
            disabled={loading}
          >
            {loading ? 'Guardando...' : news ? '💾 Actualizar' : '🚀 Publicar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewsForm;
