$(document).ready(function () {
    loadEmployees();
});

function loadEmployees() {
    $.get("http://localhost/EmployeeApp/api/get_employees.php", function (data) {
        let employees = JSON.parse(data);
        let rows = "";
        
        employees.forEach(emp => {
            rows += `<tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.department_name}</td>
                <td>${emp.position_name}</td>
                <td>
                    <button onclick="editEmployee(${emp.id}, '${emp.name}', ${emp.department_id}, ${emp.position_id})">Edit</button>
                    <button onclick="deleteEmployee(${emp.id})">Delete</button>
                </td>
            </tr>`;
        });

        $("#employeeTable tbody").html(rows);
    });
}

function openForm() {
    $("#emp_id").val("");
    $("#emp_name").val("");
    $("#emp_department").val("1");
    $("#emp_position").val("1");

    $("#employeeForm").css("display", "block");
}

function closeForm() {
    $("#employeeForm").css("display", "none");
}

function saveEmployee() {
    let employee = {
        id: $("#emp_id").val(),
        name: $("#emp_name").val(),
        department_id: $("#emp_department").val(),
        position_id: $("#emp_position").val()
    };

    let url = employee.id ? "update_employee.php" : "add_employee.php";

    $.ajax({
        url: `http://localhost/EmployeeApp/api/${url}`,
        type: "POST",
        data: JSON.stringify(employee),
        contentType: "application/json",
        success: function (response) {
            console.log("Response:", response);
            alert("Employee saved successfully!");
            closeForm();
            loadEmployees();
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
            alert("Failed to save employee.");
        }
    });
}

function editEmployee(id, name, department_id, position_id) {
    $("#emp_id").val(id);
    $("#emp_name").val(name);
    $("#emp_department").val(department_id);
    $("#emp_position").val(position_id);

    $("#employeeForm").css("display", "block");
}

function deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
        $.get(`http://localhost/EmployeeApp/api/delete_employee.php?id=${id}`, function () {
            alert("Employee deleted!");
            loadEmployees();
        });
    }
}

function searchEmployee() {
    let searchText = $("#searchEmployee").val().toLowerCase();

    $("#employeeTable tbody tr").filter(function () {
        let rowText = $(this).text().toLowerCase();
        $(this).toggle(rowText.indexOf(searchText) > -1);
    });
}

//PAGINATION

let employees = [];  // Store all employees here
let currentPage = 1;
const rowsPerPage = 5;

// Load Employees from API
function loadEmployees() {
    $.get("http://localhost/EmployeeApp/api/get_employees.php", function (data) {
        employees = JSON.parse(data);
        displayEmployees();
    });
}

// Display Employees with Pagination
function displayEmployees() {
    let tableBody = $("#employeeTable tbody");
    tableBody.empty();

    let start = (currentPage - 1) * rowsPerPage;
    let paginatedEmployees = employees.slice(start, start + rowsPerPage);

    paginatedEmployees.forEach(emp => {
        let row = `<tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.department_name}</td>
            <td>${emp.position_name}</td>
            <td>
                <button onclick="editEmployee(${emp.id}, '${emp.name}', ${emp.department_id}, ${emp.position_id})">Edit</button>
                <button onclick="deleteEmployee(${emp.id})">Delete</button>
            </td>
        </tr>`;
        tableBody.append(row);
    });

    document.getElementById("pageNumber").textContent = currentPage;
}

// Next Page Function
function nextPage() {
    if (currentPage * rowsPerPage < employees.length) {
        currentPage++;
        displayEmployees();
    }
}

// Previous Page Function
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayEmployees();
    }
}

// Call function when page loads
$(document).ready(function () {
    loadEmployees();
});
