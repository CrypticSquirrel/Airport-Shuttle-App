$(document).ready(function() {
    fetch('/activeRecord')
        .then(response => response.json())
        .then(json => {
            console.log(json);
            const table = new Tabulator('#example-table', {
                data: json, // assign data to table
                layout: 'fitColumns',
                columns: [
                    // Define Table Columns
                    { title: 'Customer_Number', field: 'Customer_Number', sorter: 'number' },
                    { title: 'Claim_Tag_Number', field: 'Claim_Tag_Number' },
                    { title: 'Date_Brought_In', field: 'Date_Brought_In' },
                    { title: 'Parking_Location', field: 'Parking_Location' },
                    {
                        title: 'Expected_Return_Date',
                        field: 'Expected_Return_Date',
                    },
                    { title: 'Paid', field: 'Paid' },
                ],
            });
        });

    fetch('/claimedRecord')
        .then(response => response.json())
        .then(json => {
            console.log(json);
            const table = new Tabulator('#example-table-2', {
                data: json, // assign data to table
                layout: 'fitColumns',
                columns: [
                    // Define Table Columns
                    { title: 'Customer_Number', field: 'Customer_Number', sorter: 'number' },
                    { title: 'Vehicle_Registration_Number', field: 'Vehicle_Registration_Number' },
                    { title: 'Date_Brought_In', field: 'Date_Brought_In' },
                    { title: 'Parking_Location', field: 'Parking_Location' },
                    { title: 'Date_Claimed', field: 'Date_Claimed' },
                    { title: 'Paid', field: 'Paid' },
                ],
            });
        });

    fetch('/daily')
        .then(response => response.json())
        .then(json => {
            console.log(json);
            const table = new Tabulator('#example-table-3', {
                data: json, // assign data to table
                layout: 'fitColumns',
                columns: [
                    // Define Table Columns
                    { title: 'check_in_date', field: 'check_in_date' },
                    { title: 'rate_code', field: 'rate_code' },
                    { title: 'VIN', field: 'VIN' },
                    { title: 'model', field: 'model' },
                    { title: 'make', field: 'make' },
                    { title: 'plate_number', field: 'plate_number' },
                ],
            });
        });

    fetch('/tomorrow')
        .then(response => response.json())
        .then(json => {
            console.log(json);
            const table = new Tabulator('#example-table-4', {
                data: json, // assign data to table
                layout: 'fitColumns',
                columns: [
                    // Define Table Columns
                    { title: 'check_in_date', field: 'check_in_date' },
                    { title: 'rate_code', field: 'rate_code' },
                    { title: 'VIN', field: 'VIN' },
                    { title: 'model', field: 'model' },
                    { title: 'make', field: 'make' },
                    { title: 'plate_number', field: 'plate_number' },
                ],
            });
        });
});
