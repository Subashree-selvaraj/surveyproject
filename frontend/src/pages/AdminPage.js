import React, { useState } from 'react';
import AddQuestion from '../components/Admin/AddQuestion';
import QuestionList from '../components/Admin/QuestionList';
import './AdminPage.css';

const AdminPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleQuestionAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage survey questions and view results</p>
      </div>
      
      <div className="admin-content">
        <AddQuestion onQuestionAdded={handleQuestionAdded} />
        <QuestionList key={refreshTrigger} />
      </div>
    </div>
  );
};

export default AdminPage;