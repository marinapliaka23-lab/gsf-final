import { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function Admin() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const ADMIN_PASSWORD = "gsf2024"; // Simple password protection

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      fetchContacts();
    } else {
      setError("Неверный пароль");
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API}/contacts`);
      setContacts(response.data.sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      ));
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="admin-login-box">
          <h2>Админ-панель</h2>
          <p>Введите пароль для доступа</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              autoFocus
            />
            <button type="submit">Войти</button>
          </form>
          {error && <div className="admin-error">{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Заявки с сайта</h1>
        <div className="admin-stats">
          <span>Всего заявок: <strong>{contacts.length}</strong></span>
          <button onClick={() => { setIsAuthenticated(false); setPassword(""); }}>
            Выйти
          </button>
        </div>
      </header>

      <main className="admin-content">
        {loading ? (
          <div className="admin-loading">Загрузка...</div>
        ) : contacts.length === 0 ? (
          <div className="admin-empty">
            <p>Пока нет заявок</p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Имя</th>
                  <th>Email</th>
                  <th>Сообщение</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td className="admin-date">{formatDate(contact.timestamp)}</td>
                    <td className="admin-name">{contact.name}</td>
                    <td className="admin-email">
                      <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </td>
                    <td className="admin-message">{contact.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default Admin;
