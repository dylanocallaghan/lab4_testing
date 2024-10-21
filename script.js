function fetchDataSynchronous() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "data/reference.json", false); // Synchronous
    xhr.send();

    if (xhr.status === 200) {
        const reference = JSON.parse(xhr.responseText);
        fetchData(reference.data_location, processSynchronousData);
    }
}

function fetchDataAsync() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "data/reference.json", true); // Asynchronous
    xhr.onload = function () {
        if (xhr.status === 200) {
            const reference = JSON.parse(xhr.responseText);
            fetchData(reference.data_location, processAsyncData);
        }
    };
    xhr.send();
}

function fetchDataWithFetch() {
    fetch("data/reference.json")
        .then(response => response.json())
        .then(reference => fetch(reference.data_location))
        .then(response => response.json())
        .then(data => processFetchData(data))
        .catch(error => console.error('Error fetching data:', error));
}

function fetchData(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `data/${url}`, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            callback(data.data);
        }
    };
    xhr.send();
}

function processSynchronousData(data) {
    displayData(data);
}

function processAsyncData(data) {
    displayData(data);
}

function processFetchData(data) {
    displayData(data);
}

function displayData(data) {
    const table = document.getElementById("dataTable");
    table.innerHTML = ""; // Clear existing data

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
