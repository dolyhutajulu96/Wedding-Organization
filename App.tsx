import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Packages } from './pages/Packages';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/packages" element={<Layout><Packages /></Layout>} />
        <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/about" element={<Layout><div className="pt-32 text-center">About Page Content</div></Layout>} />
        <Route path="/legal" element={<Layout><div className="pt-32 text-center">Legal Page Content</div></Layout>} />

        {/* Admin Routes without main Layout */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;