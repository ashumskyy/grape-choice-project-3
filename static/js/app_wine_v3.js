// Fetch the JSON data and console log it
let wine_data = "../data/new_final_wine_data.json";
d3.json(wine_data).then(function(wine_results) {
    console.log(wine_results)
});

const typeData = "../data/type_data.json";
d3.json(typeData).then(function(typeResults) {
    console.log(typeResults)
});



//---------------------------------------------------------//
//---------------------------------------------------------//
//                     Function INIT
//---------------------------------------------------------//
//---------------------------------------------------------//

// Use the first item from the list to build the initial plots
// Get new data each time a new item is selected in the "Type" dropdown and "Price" slider
// Initializes the page with a default plot


function init() {
    let dropdownType = d3.select("#dropdownType");
    d3.json(typeData).then((newTypeData) => {
        var wineTypes = ["White", "Red", "Sparkling", "Rosé"];
        wineTypes.forEach((typeChoice) => {
            dropdownType.append("option").text(typeChoice).property("value", typeChoice);
        })

        var firstSample = wineTypes[0];
        buildTopTenBar(firstSample);
        buildTopFiftyBar(firstSample);
    })
};

init();

function optionChanged(newSelection) {
    buildTopTenBar(newSelection);
    buildTopFiftyBar(newSelection);

};

//--------------------------------------------------------------------------//
//--------------------------------------------------------------------------//
//                 Build a TOP 10 BAR CHART - Wines Ranked by Points
//                                            or Value (Cost/Points)
//-------------------------------------------------------------------------// 
//-------------------------------------------------------------------------// 


function buildTopTenBar(firstSample) {
    // Fetch the JSON data
    d3.json(wine_data).then(function(newData) {
        // Define the dropdown element and options
        const dropdown = document.getElementById('dropdownType');
        const options = ['White', 'Red', 'Sparkling', 'Rosé'];

        // Define the initial type selection
        let selectedType = dropdown.value === 'White' ? 'White' : dropdown.value;


        // Update the chart when the dropdown selection changes
        dropdown.addEventListener('change', () => {
            selectedType = dropdown.value;
            updateChart(newData); // pass newData to updateChart function
        });


        
        // Define the updateChart function
        function updateChart(newData) {
            // Filter the wine data based on the selected type
            var filteredData = newData.filter(d => d.type === selectedType);

            // // Calculate the price score for each wine
            // filteredData.forEach(d => {
            //     d.price_score = d.price;
            // });

            // // Filter out wines with duplicate prices
            // var prices = filteredData.map(d => d.price_score);
            // var uniquePrices = prices.filter((value, index, self) => {
            //     return self.indexOf(value) === index;
            // });
            // filteredData = filteredData.filter(d => uniquePrices.includes(d.price_score));

            // Sort the wine data based on price score in ascending order
            filteredData.sort((a, b) => b.points - a.points);

            // Select the top 10 wines based on price score
            var top10 = filteredData.slice(0, 10);
            var revTop10 = top10.reverse();

            // Define the horizontal bar chart data and layout
            var chartData = [{
                x: revTop10.map(d => d.points),
                y: revTop10.map(d => d.name),
                type: 'bar',
                orientation: 'h',
                marker: {
                    color: ['#7C3D85', '#7C3D85', '#7C3D85', '#7C3D85', '#7C3D85', '#7C3D85', '#7C3D85', '#7C3D85', '#7C3D85', '#7C3D85']
                },
                text: top10.map(d => `Title: ${d.title}<br>` +
                    `Points: ${d.points}  ` +
                    `Price: ${d.price}  ` +
                    `Province: ${d.province}  ` +
                    `Country: ${d.country}`
                )
            }];

            var chartLayout = {
                // title: `Top Rated ${selectedType}: Wines`,
                title: `Top Rated <span style="text-transform: uppercase; font-weight: bold">${selectedType}</span> Wines`,
                xaxis: {
                    title: 'Price',
                    range: [0, Math.max(...top10.map(d => d.points)) * 1.1]
                },
                tickfont: { size: 7, family: 'Arial' },
                hovermode: 'y', // Set hovermode to 'y' for horizontal bars
                margin: { l: 200 }, // adjust left margin value
                width: 600, // set width of bars
                barmode: 'group', // set barmode to group to align bars
                bargap: 0.1, // set the gap between bars
                orientation: 'h' // flip the chart horizontally to reverse the order of the bars
            };

            // Create the horizontal bar chart using Plotly
            Plotly.newPlot('top-10-bar-chart', chartData, chartLayout);
        }

        // Call the updateChart function to create the initial chart
        updateChart(newData);

    });
}




// // //---------------------------------------------------------//
// // //---------------------------------------------------------//
// // //                 Build a STREAM GRAPH
// // //---------------------------------------------------------// 
// // //---------------------------------------------------------// 

var colors = Highcharts.getOptions().colors;
document.addEventListener('DOMContentLoaded', () => {
    Highcharts.chart('stream-chart', {

        chart: {
            type: 'streamgraph',
            marginBottom: 30,
            marginTop: 20,
            zoomType: 'x',
            width: 700,
        },
        colors: [
            '#7C3D85',
            '#A05D9B',
            '#BF7BB1',
            '#D89BD0',
            '#F1C1ED',
            '#F3D9F1',
            '#F6EEF8'
          ],


        title: {
            floating: true,
            align: 'center',
            text: '<span>The number of Wines per Country by Points<br><br></span>',
        },

        xAxis: {
            maxPadding: 0,
            type: 'category',
            crosshair: true,
            categories: [
                '82',
                '84',
                '86',
                '88',
                '90',
                '92',
                '94',
                '96',
                '98',
                '100'
            ],
            labels: {
                style: {
                    fontSize: '16px'
                },
                align: 'left',
                reserveSpace: false,
                rotation: 0

            },
            lineWidth: 0,
            margin: 20,
            tickWidth: 0
        },

        yAxis: {
            visible: false,
            startOnTick: false,
            endOnTick: false
        },

        legend: {
            enabled: false
        },

        plotOptions: {
            series: {
                label: {
                    minFontSize: 7,
                    maxFontSize: 15,
                    // style: {
                    //     colors: ['#51087E', '#6C0BA9', '#880ED4', '#A020F0', 'B24BF3', '#C576F6', '#D7A1F9'],
              
                    // }
                },
                accessibility: {
                    exposeAsGroupOnly: true
                }
            }
        },

        // Data parsed
        series: [{
            name: 'U.S.',
            data: [
                1394, 4770, 10894, 18163, 17922, 16424, 9250, 2612, 309, 36
            ]
        }, {
            name: 'Spain',
            data: [
                356, 985, 1803, 2340, 1858, 1219, 547, 98, 13, 0
            ]
        }, {
            name: 'Italy',
            data: [
                59, 591, 2850, 6977, 6545, 4214, 2225, 657, 93, 11
            ]
        }, {
            name: 'France',
            data: [
                117, 1245, 4113, 6041, 5859, 4783, 2924, 978, 110, 8
            ]
        }, {
            name: 'Argentina',
            data: [
                299, 803, 1210, 1244, 924, 624, 302, 53, 3, 0
            ]
        }, {
            name: 'Australia',
            data: [
                35, 189, 437, 708, 816, 734, 314, 72, 11, 2
            ]
        }, {
            name: 'Canada',
            data: [
                2, 9, 22, 73, 104, 121, 52, 3, 0, 0
            ]
        }],

        exporting: {
            sourceWidth: 800,
            sourceHeight: 600
        }

    });
})


// // //---------------------------------------------------------//
// // //---------------------------------------------------------//
// // //             Build a TOP 50 by Price Bar Chart
// // //---------------------------------------------------------//  
// // //---------------------------------------------------------//

function buildTopFiftyBar(type) {
    d3.csv("../data/new_final_wine_data.csv").then(function(data) {
        console.log(data)
            // Filter the data to only include red wines and sort by value per point descending
        var filteredData = data.filter(function(d) { return d.type === type; })
            .sort(function(a, b) { return (a.price / a.points) - (b.price / b.points); }) // Sort in descending order
            .slice(0, 50); // Take the top 50 wines

        // Extract the necessary data for the bar chart
        var titles = filteredData.map(function(d) { return d.title; });
        var values = filteredData.map(function(d) { return d.price / d.points; });
        var indices = Array.from({ length: 50 }, (_, i) => i + 1); // Create an array of indices [1, 2, ..., 50]

        // Create the bar chart trace
        var trace = {
            x: indices,
            y: values,
            text: titles,
            hoverinfo: "text",
            type: "bar",
            orientation: "v",
            marker: {
                color: "#7C3D85"
            }
        };

        // Create the bar chart layout
        var layout = {
            // title: "Top 50 " + type + " Wines by Value per Point",
            title: `Top 50 <span style="text-transform: uppercase; font-weight: bold">${type}</span> Wines by Price per Rating Point<br>(Price/Points)`,

            xaxis: {
                title: "Top 50 Wines",

            },
            yaxis: { title: "Price per Rating Point<br>(Price/Points)" }
        };

        // Create the bar chart
        Plotly.newPlot("50-bar-chart", [trace], layout);
    })
};