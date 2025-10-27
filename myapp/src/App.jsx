import { Routes, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Employee Management System</h1>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <EmployeeList />
            </ErrorBoundary>
          }
        />
        <Route path="/add" element={<EmployeeForm />} />
        <Route path="/edit/:id" element={<EmployeeForm />} />
      </Routes>
    </div>
  );
}

export default App;