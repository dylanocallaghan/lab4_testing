// Fetch data synchronously
function fetchDataSynchronous() {
    // Clear the table before starting
    clearTable();

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "data/reference.json", false); // Synchronous
    xhr.send();

    if (xhr.status === 200) {
        const reference = JSON.parse(xhr.responseText);
        fetchDataSync(reference.data_location);
    }
}

function fetchDataSync(file) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `data/${file}`, false); // Synchronous
    xhr.send();

    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        displayData(data.data);
    }
}

// Fetch data asynchronously with callbacks
function fetchDataAsync() {
    clearTable();

    // Fetch reference.json first
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "data/reference.json", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const reference = JSON.parse(xhr.responseText);
            
            // Fetch data1.json
            fetchData(reference.data_location, function(data1) {
                displayData(data1.data);

                // Fetch data2.json
                fetchData(data1.data_location, function(data2) {
                    displayData(data2.data);

                    // Fetch data3.json
                    fetchData(data2.data_location, function(data3) {
                        displayData(data3.data);
                    });
                });
            });
        }
    };
    xhr.send();
}

function fetchData(file, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `data/${file}`, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            callback(data); // Call the function to handle data
        }
    };
    xhr.send();
}

// Fetch data using fetch()
function fetchDataWithFetch() {
    // Clear the table before starting
    clearTable();

    fetch("data/reference.json")
        .then(response => response.json())
        .then(reference => fetch(`data/${reference.data_location}`))
        .then(response => response.json())
        .then(data1 => {
            displayData(data1.data);

            return fetch(`data/${data1.data_location}`);
        })
        .then(response => response.json())
        .then(data2 => {
            displayData(data2.data);

            return fetch(`data/${data2.data_location}`);
        })
        .then(response => response.json())
        .then(data3 => {
            displayData(data3.data);
        })
        .catch(error => console.log('Fetch error:', error));
}

// Function to clear the table
function clearTable() {
    const table = document.getElementById("dataTable");
    table.innerHTML = ""; // Clear all existing rows
}

// Function to display data
function displayData(data) {
    const table = document.getElementById("dataTable");

    // Add each row of data to the table
    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.id}</td>
            <td>${item.address}</td>
        `;
        table.appendChild(row);
    });
}
