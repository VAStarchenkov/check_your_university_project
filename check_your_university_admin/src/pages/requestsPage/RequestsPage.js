import React, { useEffect, useState } from 'react';
import api from '../../api';
import './RequestsPage.css';

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [filterBuilding, setFilterBuilding] = useState('');
  const [appliedBuildingFilter, setAppliedBuildingFilter] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [buildingActionMessage, setBuildingActionMessage] = useState('');

  // загрузка всех заявок
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin_actions/');
      setRequests(response.data);
      setFetchError(null);
    } catch (err) {
      setFetchError('Ошибка при загрузке заявок');
    } finally {
      setLoading(false);
    }
  };

  // обновление статуса заявки
  const handleUpdateRequest = async (requestId, newStatus) => {
    try {
      await api.post('/admin_actions/update/', {
        request_id: requestId,
        status: newStatus
      });
      await fetchRequests();
    } catch (err) {
      console.error('Ошибка обновления статуса:', err);
    }
  };

  // фильтрация по корпусу
  const handleFilter = async () => {
    if (!filterBuilding.trim()) return;
    setLoading(true);
    try {
      const response = await api.get('/request/filter-by-building', {
        params: { building_name: filterBuilding.trim() }
      });
      setRequests(response.data);
      setAppliedBuildingFilter(filterBuilding.trim());
      setFetchError(null);
    } catch (err) {
      setFetchError('Такого корпуса нет. Попробуйте другой.');
    } finally {
      setLoading(false);
    }
  };

  // сброс фильтра
  const handleClearFilter = async () => {
    setFilterBuilding('');
    setAppliedBuildingFilter('');
    await fetchRequests();
  };

  // добавление корпуса
  const handleAddBuilding = async () => {
    if (!buildingName.trim()) return;
    try {
      await api.post('/admin_actions/create-building', null, {
        params: { name: buildingName.trim() },
        headers: {
          'X-Auth-Token': localStorage.getItem('token')
        }
      });
      setBuildingActionMessage(`Корпус "${buildingName}" добавлен.`);
      setBuildingName('');
    } catch (err) {
      setBuildingActionMessage('Ошибка при добавлении корпуса.');
      console.error(err);
    }
  };

  // удаление корпуса
  const handleDeleteBuilding = async () => {
    if (!buildingName.trim()) return;
    try {
      await api.post('/admin_actions/delete-building', null, {
        params: { name: buildingName.trim() },
        headers: {
          'X-Auth-Token': localStorage.getItem('token')
        }
      });
      setBuildingActionMessage(`Корпус "${buildingName}" удалён.`);
      setBuildingName('');
    } catch (err) {
      setBuildingActionMessage('Ошибка при удалении корпуса.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="TableWrapper">
      <h2>Таблица с заявками</h2>

      {/* блок фильтрации */}
      <div className="filter-controls">
        <input
          type="text"
          placeholder="Введите корпус для фильтрации"
          value={filterBuilding}
          onChange={(e) => setFilterBuilding(e.target.value)}
        />
        <button onClick={handleFilter}>Фильтровать</button>
        <button onClick={handleClearFilter}>Сбросить</button>
      </div>

      {/* блок управления корпусами */}
      <h3>Управление корпусами</h3>
      <div className="building-controls-combined">
        <input
          type="text"
          placeholder="Название корпуса"
          value={buildingName}
          onChange={(e) => setBuildingName(e.target.value)}
        />
        <button onClick={handleAddBuilding}>Добавить</button>
        <button onClick={handleDeleteBuilding}>Удалить</button>
      </div>

      {buildingActionMessage && <p>{buildingActionMessage}</p>}

      {loading && <p>Загрузка...</p>}
      {fetchError && <p className="error-text">{fetchError}</p>}

      {!loading && requests.length > 0 && (
        <div className="table-scroll-container-full">
          <table className="Table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Building</th>
                <th>Category</th>
                <th>Room</th>
                <th>Description</th>
                <th>Photo</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.user_id}</td>
                  <td>{req.building_name || appliedBuildingFilter}</td>
                  <td>{req.category}</td>
                  <td>{req.room}</td>
                  <td>{req.text}</td>
                  <td>
                    {req.photo_url ? (
                      <>
                        <img
                          src={req.photo_url}
                          alt="Request photo"
                          className="photo-preview"
                        />
                        <br />
                        <a
                          href={req.photo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ссылка
                        </a>
                      </>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>{req.status}</td>
                  <td>
                    <button onClick={() => handleUpdateRequest(req.id, 'done')}>
                      Завершить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequestsPage;
