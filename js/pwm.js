pwm = (function () {
    var vis;
    var WIDTH = 1000;
    var HEIGHT = 400;
    var NUM_PULSES = 5;
    var data = new Array(4 * NUM_PULSES);
    var margin = {top: 20, right:50, bottom:20, left:50};
    var xScale = d3.scale.linear()
        .range([margin.left, WIDTH - margin.right])
        .domain([0, NUM_PULSES * 100]);
    var yScale = d3.scale.linear()
        .range([HEIGHT - margin.top, margin.bottom])
        .domain([0, 100]);
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .ticks(0);
// .ticks(NUM_PULSES);
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(0);

    function updateGraph(dutyCycle) {
        document.querySelector('#dutyCycle').value = dutyCycle;
        initData(dutyCycle);
        render();
    }

    function initData(dutyCycle) {
        for (var i = 0; i < NUM_PULSES; i++) {
            data[(i*4)+0] = { time: (i * 100),                     y: 0 }
            data[(i*4)+1] = { time: (i * 100),                     y: 100 }
            data[(i*4)+2] = { time: (i * 100) + Number(dutyCycle), y: 100 }
            data[(i*4)+3] = { time: (i * 100) + Number(dutyCycle), y: 0 }
        };
    }

    function initChart(dutyCycle) {
        vis = d3.select("#pwm-visualisation")
            .attr("height", HEIGHT)
            .attr("width", WIDTH);

        //console.log("initChart with dutyCycle", dutyCycle);
        initData(dutyCycle);

        vis.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (HEIGHT - margin.bottom + 3) + ")")
            .attr('stroke', 'LightSteelBlue')
            .attr('stroke-width', 6)
            .call(xAxis);
        vis.append("svg:g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (margin.left - 3) + ",0)")
            .attr('stroke', 'LightSteelBlue')
            .attr('stroke-width', 6)
            .call(yAxis);
        render();
    }

    function render() {

        vis.selectAll(".line").remove();

        var lineGen = d3.svg.line()
            .x(function(d) { return xScale(d.time); })
            .y(function(d) { return yScale(d.y);    })
            .interpolate("linear");

        vis.append('svg:path')
            .attr("class", "line")
            .attr('d', lineGen(data))
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .attr('fill', 'blue');
    }

    return {
        initChart: initChart,
        updateGraph: updateGraph
    };
})();
