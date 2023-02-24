// // Load the JSON data
// // Use the fetch method to download the JSON data
// fetch('data.json')
//   .then(response => response.json())
//   .then(data => {
//     // Create a map to group the data by date
//     const dateMap = new Map()
//     data.forEach(item => {
//       const date = item['Item date']
//       const count = dateMap.get(date) || 0
//       dateMap.set(date, count + 1)
//     })

//     // Sort the dates in ascending order
//     const dates = Array.from(dateMap.keys()).sort()

//     // Create an array of values for the y-axis
//     const values = dates.map(date => dateMap.get(date))

//     console.log(values);
//     // Create the chart using a library like Chart.js
//     const ctx = document.getElementById('myChart').getContext('2d')
//     const chart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: dates,
//         datasets: [{
//           label: 'Number of Scheduled Items',
//           data: values,
//           backgroundColor: 'rgba(54, 162, 235, 0.2)',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 1
//         }]
//       },
//       options: {
//         scales: {
//           yAxes: [{
//             ticks: {
//               beginAtZero: true
//             }
//           }]
//         }
//       }
//     })
//   })
//   .catch(error => {
//     console.error('Error loading data:', error)
//   })





















// fetch JSON data from API or local file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // convert date strings to Date objects
    data.forEach(item => {
      item.schedule_time = new Date(item.schedule_time);
      item.item_date = new Date(item.item_date);
    });

    // group data by item_date
    const groupedData = data.reduce((acc, item) => {
      const dateStr = item.item_date.toDateString();
      if (!acc[dateStr]) {
        acc[dateStr] = [];
      }
      acc[dateStr].push(item);
      return acc;
    }, {});

    // create labels for x-axis
    const labels = Object.keys(groupedData);

    // create datasets for y-axis
    const datasets = [{
      label: 'Number of scheduled items',
      data: labels.map(dateStr => groupedData[dateStr].length),
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }];

    // create chart using Chart.js
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
