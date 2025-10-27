const Employee = require('../models/employee');

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const employee = new Employee({ name, email, phone, address });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address },
      { new: true, runValidators: true }
    );
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee updated successfully', employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};