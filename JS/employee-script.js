let employees = JSON.parse(localStorage.getItem("employees")) || [];
let editingIndex = -1; // <-- Declare editingIndex globally

// ========== Popup Controls ==========
function addEmployee() {
  document.getElementById("popupForm").style.display = "flex";
  document.getElementById("popupForm").querySelector('h3').textContent = "Add Employee";
  document.getElementById("saveButton").textContent = "Save";
  editingIndex = -1;  // Reset when adding a new employee
}

function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

// ========== Render Employees ==========
function renderEmployees() {
  const table = document.getElementById("employeeTable");

  // Clear old rows except header
  table.querySelectorAll("tr:not(:first-child)").forEach(row => row.remove());

  employees.forEach((emp, index) => {
    const row = table.insertRow(-1);
    row.insertCell(0).textContent = index + 1;
    row.insertCell(1).textContent = emp.fullName;
    row.insertCell(2).textContent = emp.position;
    row.insertCell(3).textContent = emp.email;
    row.insertCell(4).textContent = emp.biometricsId;
    row.insertCell(5).textContent = emp.status;
    row.insertCell(6).innerHTML = `
      <button class="btn" onclick="deleteEmployee(${index})">Delete</button>
      <button class="btn" onclick="editEmployee(${index})">Edit</button>
    `;
  });
}

// ========== Save Employee (Add or Update) ==========
function saveEmployee() {
  const fullName = document.getElementById("fullName").value;
  const position = document.getElementById("position").value;
  const email = document.getElementById("email").value;
  const biometricsId = document.getElementById("biometricsId").value;
  const status = document.getElementById("status").value;

  if (!fullName || !position || !email || !biometricsId || !status) {
    alert("Please fill all fields!");
    return;
  }

  const employee = { fullName, position, email, biometricsId, status };

  if (editingIndex === -1) {
    // Adding a new employee
    employees.push(employee);
  } else {
    // Updating an existing employee
    employees[editingIndex] = employee;
  }

  localStorage.setItem("employees", JSON.stringify(employees));
  renderEmployees();
  closeForm();

  // Clear inputs
  document.querySelectorAll("#popupForm input").forEach(input => input.value = "");
}

// ========== Delete Employee ==========
function deleteEmployee(index) {
  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  renderEmployees();
}

// ========== Edit Employee ==========
function editEmployee(index) {
  const emp = employees[index];
  document.getElementById("fullName").value = emp.fullName;
  document.getElementById("position").value = emp.position;
  document.getElementById("email").value = emp.email;
  document.getElementById("biometricsId").value = emp.biometricsId;
  document.getElementById("status").value = emp.status;

  // Change popup to "Edit Employee"
  document.getElementById("popupForm").querySelector('h3').textContent = "Edit Employee";
  document.getElementById("saveButton").textContent = "Update";  // Change Save button text to "Update"
  
  editingIndex = index;  // Store the index of the employee being edited
  document.getElementById("popupForm").style.display = "flex";  // Show the popup form
}

// ========== Run on Page Load ==========
window.onload = renderEmployees;
