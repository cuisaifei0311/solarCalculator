// App.jsx
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import 'antd/dist/reset.css';
import Header from './components/Header';
import SolarCalculator from './containers/solarCalculator';

const { Content, Footer } = Layout;

// Custom CSS for responsiveness and tag display
const styles = `
  .app-header {
    padding: 0 20px;
  }
  .app-content {
    padding: 20px;
  }
  .item-card {
    width: 100%;
    margin-bottom: 20px;
  }
  .item-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  .modal-image {
    width: 100%;
    max-height: 400px;
    object-fit: contain;
  }
  .tag-container {
    margin-top: 8px;
  }
  .item-tag {
    margin-right: 4px;
    margin-bottom: 4px;
  }
  @media (max-width: 768px) {
    .app-header {
      padding: 0 10px;
    }
    .app-content {
      padding: 10px;
    }
    .item-image {
      height: 150px;
    }
    .modal-image {
      max-height: 300px;
    }
  }
`;

// Main App Component
function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <Layout className="layout">
        <Header user={null} />
        <Content className="app-content">
       
          <Routes>
            <Route path="/" element={<Navigate to="/SolarCalculator"/>} />
            <Route path="/SolarCalculator" element={<SolarCalculator setLoading={setLoading} loading={loading}/>} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>SunWise Building Future Cities ©2024</Footer>
      </Layout>
    </Router>
  );
}

export default App;