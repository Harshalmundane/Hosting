import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '../redux/slices/employeeSlice';
import { Link } from 'react-router-dom';

function EmployeeList() {
  const dispatch = useDispatch();
  const { employees, status, error } = useSelector((state) => state.employees);

  // Debug: Log state to inspect data
  console.log('Employees:', employees, 'Status:', status, 'Error:', error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [dispatch, status]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      dispatch(deleteEmployee(id));
    }
  };

  // Handle loading state
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (status === 'failed') {
    return <div>Error: {error || 'Failed to fetch employees'}</div>;
  }

  // Check if employees is an array
  if (!Array.isArray(employees)) {
    return <div>No employees found or invalid data format.</div>;
  }

  return (
    <div>
      <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Add Employee
      </Link>
      {employees.length === 0 ? (
        <div>No employees available.</div>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id || Math.random()}>
                <td className="border p-2">{employee.name || 'N/A'}</td>
                <td className="border p-2">{employee.email || 'N/A'}</td>
                <td className="border p-2">{employee.phone || 'N/A'}</td>
                <td className="border p-2">{employee.address || 'N/A'}</td>
                <td className="border p-2">
                  <Link
                    to={`/edit/${employee._id}`}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeList;