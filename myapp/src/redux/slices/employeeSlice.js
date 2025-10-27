import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL;

// Async thunks for API calls
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await axios.get(`${API_URL}/employees`);
  return response.data;
});

export const fetchEmployeeById = createAsyncThunk('employees/fetchEmployeeById', async (id) => {
  const response = await axios.get(`${API_URL}/employees/${id}`);
  return response.data;
});

export const createEmployee = createAsyncThunk('employees/createEmployee', async (employeeData) => {
  const response = await axios.post(`${API_URL}/employees`, employeeData);
  return response.data;
});

export const updateEmployee = createAsyncThunk('employees/updateEmployee', async ({ id, employeeData }) => {
  const response = await axios.put(`${API_URL}/employees/${id}`, employeeData);
  return response.data.employee;
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id) => {
  await axios.delete(`${API_URL}/employees/${id}`);
  return id;
});

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    selectedEmployee: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all employees
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch employee by ID
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.selectedEmployee = action.payload;
      })
      // Create employee
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      // Update employee
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex((emp) => emp._id === action.payload._id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
        state.selectedEmployee = null;
      })
      // Delete employee
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter((emp) => emp._id !== action.payload);
      });
  },
});

export const { clearSelectedEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;