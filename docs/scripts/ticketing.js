/* ---------------------------- Global Variables ---------------------------- */

let isParkingCovered = true;

/* ----------------------------- Table Generator ---------------------------- */
function generateTable(json) {
    // create Tabulator on DOM element with id "example-table"
    const table = new Tabulator('#example-table', {
        data: [json], // assign data to table
        layout: 'fitColumns',
        columns: [
            // Define Table Columns
            { title: 'VIN', field: 'VIN' },
            { title: 'check_in_date', field: 'check_in_date' },
            { title: 'check_in_time', field: 'check_in_time' },
            { title: 'lot_id', field: 'lot_id' },
            { title: 'rate_code', field: 'rate_code' },
        ],
    });
}

/* ---------------------------- JQuery Click Handlers ---------------------------- */

$(document).ready(function() {
    $('#print').click(() => {
        const VIN = $('#vin').val();
        if (VIN) {
            fetch('/handleTicket', {
                method: 'POST',
                body: JSON.stringify({
                    parkingType: isParkingCovered ? 'covered' : 'uncovered',
                    VIN,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(json => {
                    $('#HomeDisplay').hide();
                    $('#DataDisplay').show();
                    console.log(json);
                    generateTable(json);
                });
        }
    });

    $('#covered-parking').click(() => {
        $('#covered-parking').toggleClass('active');
        $('#uncovered-parking').toggleClass('active');
        isParkingCovered = true;
    });
    $('#uncovered-parking').click(() => {
        $('#uncovered-parking').toggleClass('active');
        $('#covered-parking').toggleClass('active');
        isParkingCovered = false;
    });
});
