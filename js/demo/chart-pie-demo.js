// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

fetch('http://localhost:3000/api/flights_per_airline')
    .then(response => response.json())
    .then(data => {
      const airlines = data.map(item => item.Airline);
      const numOfFlights = data.map(item => item.NumberOfFlights);

      var ctx = document.getElementById("myPieChart");
      var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: airlines,
          datasets: [{
            data: numOfFlights,
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#1f6f8b', '#f08a5d', '#b83b5e', '#6a2c70', '#4ea1d3', '#2a9d8f', '#264653', '#e9c46a'],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#f6c23e', '#e74a3b', '#1f6f8b', '#f08a5d', '#b83b5e', '#6a2c70', '#4ea1d3', '#2a9d8f', '#264653', '#e9c46a'],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
          }],
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
          },
          legend: {
            display: false
          },
          cutoutPercentage: 80,
        },
      });
    })
    .catch(error => console.log(error));