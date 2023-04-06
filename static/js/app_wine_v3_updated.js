

// Fetch the JSON data and console log it
//result = json.dumps(alpha)
//let wine_data = 
d3.json('/api/chart_alpha').then(function(wine_results) {
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
    // d3.json(typeData).then((newTypeData) => {
        var wineTypes = ["White", "Red", "Sparkling", "Rosé"];
        wineTypes.forEach((typeChoice) => {
            dropdownType.append("option").text(typeChoice).property("value", typeChoice);
        })

        var firstSample = wineTypes[0];
        buildTopTenBar(firstSample);
        buildTopFiftyBar(firstSample);
    // })
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
    d3.json('/api/chart_alpha').then(function(newData) {
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
                text: revTop10.map(d => d.points), // Set the value for points to be displayed inside the bars
                textposition: 'inside', // Set textposition to inside to display text inside the bars
                hovertemplate: '<b>%{text}</b><br>' + // Set the hover text to include title, points, price, province, and country
                    'Title: %{customdata[0]}<br>' +
                    'Points: %{x}<br>' +
                    'Price: %{customdata[1]}<br>' +
                    'Province: %{customdata[2]}<br>' +
                    'Country: %{customdata[3]}',
                customdata: revTop10.map(d => [d.title, d.price, d.province, d.country]) // Set customdata to include the necessary information for the hover text
            }];

            var chartLayout = {
                // title: `Top Rated ${selectedType}: Wines`,
                title: `Top Rated <span style="text-transform: uppercase; font-weight: bold">${selectedType}</span> Wines`,
                xaxis: {
                    title: 'Points',
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
    d3.json('/api/chart_alpha').then(function(data) {
        console.log(data)
            // Filter the data to only include red wines and sort by value per point descending
            var filteredData = data.filter(function(d) { return d.type === type; })
            .sort(function(a, b) { return (b.points / b.price) - (a.points / a.price); });

        var top25Data = filteredData.slice(0, 25);
        var bottom25Data = filteredData.slice(-25);

        var top25PointsPerDollar = top25Data.map(function(d) { return d.points / d.price; });
        var bottom25PointsPerDollar = bottom25Data.map(function(d) { return d.points / d.price; });

        var indices = Array.from({ length: 50 }, (_, i) => i + 1);

        var traceTop25 = {
            x: indices.slice(0, 25),
            y: top25PointsPerDollar,
            text: top25PointsPerDollar.map(value => value.toFixed(2)),
            textposition: 'auto',
            hovertemplate: top25Data.map((d, i) => `#${i + 1}<br>Title: ${d.title}<br>Price: ${d.price}<br>Points: ${d.points}<br>Points per 1 Dollar: ${(d.points / d.price).toFixed(2)}`),
            hoverinfo: "text",
            type: "bar",
            orientation: "v",
            marker: {
                color: "#7C3D85"
            },
            name: "Top 25"
        };

        var scalingFactor = 10;

        // Calculate the maximum tick value rounded up to the nearest 0.1
        var maxTickValue = Math.ceil(Math.max(...bottom25PointsPerDollar) * 10) / 10;

        // Generate the tick values and tick texts based on the maximum tick value
        var tickVals = Array.from({ length: maxTickValue * 10 + 1 }, (_, i) => i);
        var tickTexts = tickVals.map(value => (value / 10).toFixed(1));

        var traceBottom25 = {
            x: indices.slice(-25),
            y: bottom25PointsPerDollar.map(value => value * scalingFactor),
            text: bottom25PointsPerDollar.map(value => value.toFixed(2)),
            textposition: 'auto',
            hovertemplate: bottom25Data.map((d, i) => `#${25 - i}<br>Title: ${d.title}<br>Price: ${d.price}<br>Points: ${d.points}<br>Points per 1 Dollar: ${(d.points / d.price).toFixed(2)}`),
            hoverinfo: "text",
            type: "bar",
            orientation: "v",
            marker: {
                color: "#BF7BB1"
            },
            name: "Bottom 25",
            yaxis: 'y2'
        };

        var layout = {
            title: `Top 25 and Bottom 25 <span style="text-transform: uppercase; font-weight: bold">${type}</span> Wines by Points per 1 Dollar`,
            xaxis: {
                title: ""
            },
            yaxis: {
                title: "Points per 1 Dollar (Top 25)"
            },
            yaxis2: {
                title: "Points per 1 Dollar (Bottom 25)",
                overlaying: 'y',
                side: 'right',
                range: [0, maxTickValue * scalingFactor],
                scaleratio: 10,
                tickvals: tickVals,
                ticktext: tickTexts
            },
            legend: {
                x: 1.05, // Move the legend to the right by changing this value
                y: 1
            },
            annotations: [{
                    xref: 'x',
                    yref: 'paper',
                    x: 12.5, // Set the position for Top 25 title
                    y: -0.15,
                    text: 'Top 25 Wines',
                    showarrow: false,
                    font: {
                        size: 14
                    }
                },
                {
                    xref: 'x',
                    yref: 'paper',
                    x: 37.5, // Set the position for Bottom 25 title
                    y: -0.15,
                    text: 'Bottom 25 Wines',
                    showarrow: false,
                    font: {
                        size: 14
                    }
                }
            ]

        };

        Plotly.newPlot("50-bar-chart", [traceTop25, traceBottom25], layout);
    })
};