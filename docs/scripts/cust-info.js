/* ------------------------------ Form Handler ------------------------------ */

$(document).ready(function() {
    $('#print').click(() => {
        const cust_name = $('#name').val();
        const email = $('#email').val();
        const check_out_date = $('#return-date').val();
        const phone = $('#phone').val();
        const flight_number = $('#depart-flight').val();
        const return_flight_number = $('#return-flight').val();
        const pilot_licence_number = $('#pLicence').val();
        const aircraft_registration_number = $('#ARNumber').val();
        const VIN = $('#vin').val();
        const model = $('#model').val();
        const make = $('#make').val();
        const plate_number = $('#plate').val();

        fetch('/customerInfo', {
            method: 'POST',
            body: JSON.stringify({
                cust_name,
                email,
                check_out_date,
                phone,
                flight_number,
                return_flight_number,
                pilot_licence_number,
                aircraft_registration_number,
                model,
                make,
                plate_number,
                VIN,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                alert('Information Saved');
            });
    });
});
