import React, { useState } from 'react';
import NewsList from './NewsList';
import NewsForm from './NewsForm';
import './Dashboard.css';

function Dashboard({ onLogout }) {
  const [currentView, setCurrentView] = useState('list');
  const [editingNews, setEditingNews] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreateNew = () => {
    setEditingNews(null);
    setCurrentView('form');
  };

  const handleEdit = (news) => {
    setEditingNews(news);
    setCurrentView('form');
  };

  const handleSaveSuccess = () => {
    setCurrentView('list');
    setEditingNews(null);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleCancel = () => {
    setCurrentView('list');
    setEditingNews(null);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>📰 TrafficBoost Dashboard</h1>
        <div className="header-actions">
          {currentView === 'list' && (
            <button className="btn-primary" onClick={handleCreateNew}>
              ➕ Nueva Noticia
            </button>
          )}
          <button className="btn-secondary" onClick={onLogout}>
            🚪 Salir
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        {currentView === 'list' ? (
          <NewsList
            onEdit={handleEdit}
            refreshTrigger={refreshTrigger}
          />
        ) : (
          <NewsForm
            news={editingNews}
            onSuccess={handleSaveSuccess}
            onCancel={handleCancel}
          />
        )}
      </main>
    </div>
  );
}

export default Dashboard;