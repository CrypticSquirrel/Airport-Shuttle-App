$(document).ready(function() {
    $('#pickup').click(() => {
        const check_out_date = $('#pickup-date').val();
        fetch('/pickupDate', {
            method: 'POST',
            body: JSON.stringify({
                check_out_date,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                alert(`The answer is ${json[0].cnt}`);
            });
    });
    $('#checkIn').click(() => {
        fetch('/checkToday')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                alert(`The answer is ${json[0].cnt}`);
            });
    });
    $('#checkOut').click(() => {
        fetch('/checkOut')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                alert(`The answer is ${json[0].cnt}`);
            });
    });
    $('#avgStay').click(() => {
        fetch('/avgStayTime')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                alert(`The answer is ${json[0].cnt}`);
            });
    });
    $('#covered').click(() => {
        fetch('/covered')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                alert(`The answer is ${json[0].cnt}`);
            });
    });
    $('#uncovered').click(() => {
        fetch('/uncovered')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                alert(`The answer is ${json[0].cnt}`);
            });
    });
});
