let displayData = [];
let GDPData = [];
let GDPDates = [];
const container = document.querySelector('.container');
let width = 800, height = 500, barWidth = width / 275;
let padding = 30;
// container.style.backgroundColor = 'red';

axios.get('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(data => {
        displayData = data.data.data;
        GDPData = displayData.map(function (data) { return data[1] })
        GDPDates = displayData.map(function (data) { return data[0] })
        console.log(displayData);
        const svg = d3.select('section')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background-color', 'blue')

        d3.select('svg')
            .selectAll('rect')
            .data(displayData)
            .enter()
            .append('rect')
            .attr('width', barWidth)
            .attr('height', (d) => d[0] * 3)
            .attr('x', (d) => xScale(d[0]))
            .attr('y', (d) => yScale(d[1]))
            .attr('fill', 'black')

        const xScale = d3.scaleLinear()
            .domain([0, d3.max(displayData, (d) => d[0])])
            .range([padding, width - padding])
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(displayData, (d) => d[1])])
            .range([height - padding, padding])
        const xAxis = d3.axisBottom(xScale)
    })
    .catch(e => console.log(e));

// let GDPData = displayData.map(function (data) { return data[1] })
// let GDPDates = displayData.map(function (data) { return data[0] })

