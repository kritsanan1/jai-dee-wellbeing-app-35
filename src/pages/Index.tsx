
import { Navigate } from 'react-router-dom';

// Redirect to Home page for the main app experience
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
