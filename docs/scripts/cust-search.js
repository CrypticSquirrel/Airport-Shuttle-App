/* ---------------------------- Global Variables ---------------------------- */

const fieldEl = document.getElementById('filter-field');
const typeEl = document.getElementById('filter-type');
const valueEl = document.getElementById('filter-value');

/* ----------------------------- Table Generator ---------------------------- */
function generateTable(json) {
    // create Tabulator on DOM element with id "example-table"
    const table = new Tabulator('#example-table', {
        data: json, // assign data to table
        layout: 'fitColumns',
        columns: [
            // Define Table Columns
            { title: 'Customer ID', field: 'customer_id', sorter: 'number' },
            { title: 'Customer Name', field: 'cust_name' },
            { title: 'Email', field: 'email' },
            { title: 'Phone', field: 'phone' },
            { title: 'Flight Number', field: 'flight_number', sorter: 'number' },
            { title: 'Return Flight Number', field: 'return_flight_number', sorter: 'number' },
            { title: 'Pilot Licence Number', field: 'pilot_licence_number', sorter: 'number' },
            {
                title: 'Aircraft Registration Number',
                field: 'aircraft_registration_number',
                sorter: 'number',
            },
        ],
    });

    const customFilter = data => data.car && data.rating < 3;

    // Trigger setFilter function with correct parameters
    const updateFilter = () => {
        const filterVal = fieldEl.options[fieldEl.selectedIndex].value;
        const typeVal = typeEl.options[typeEl.selectedIndex].value;

        const filter = filterVal == 'function' ? customFilter : filterVal;

        if (filterVal == 'function') {
            typeEl.disabled = true;
            valueEl.disabled = true;
        } else {
            typeEl.disabled = false;
            valueEl.disabled = false;
        }

        if (filterVal) {
            table.setFilter(filter, typeVal, valueEl.value);
        }
    };

    document.getElementById('download-csv').addEventListener('click', function() {
        table.download('csv', 'data.csv');
    });

    // Update filters on value change
    document.getElementById('filter-field').addEventListener('change', updateFilter);
    document.getElementById('filter-type').addEventListener('change', updateFilter);
    document.getElementById('filter-value').addEventListener('keyup', updateFilter);
}

/* ---------------------------- JQuery Click Handlers ---------------------------- */

$(document).ready(function() {
    fetch('/customer')
        .then(response => response.json())
        .then(json => {
            console.log(json);
            generateTable(json);
        });
});
