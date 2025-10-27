import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, updateEmployee, fetchEmployeeById, clearSelectedEmployee } from '../redux/slices/employeeSlice';

function EmployeeForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedEmployee } = useSelector((state) => state.employees);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployeeById(id));
    } else {
      dispatch(clearSelectedEmployee());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        phone: selectedEmployee.phone || '',
        address: selectedEmployee.address || '',
      });
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateEmployee({ id, employeeData: formData }))
        .then(() => navigate('/'));
    } else {
      dispatch(createEmployee(formData))
        .then(() => navigate('/'));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {id ? 'Update' : 'Create'} Employee
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
        >
          Cancel
        </button>
       butto
      </form>
    </div>
  );
}

export default EmployeeForm;