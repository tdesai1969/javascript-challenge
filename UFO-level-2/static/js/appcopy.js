// from data.js
var tableData = data;

// YOUR CODE HERE!
var tbody = d3.select("tbody");
function getData(data){
    tbody.html("");
    data.forEach((sightInstance) => {
        var row = tbody.append("tr");
        Object.entries(sightInstance).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
        });
    });
}
getData(tableData);
console.log(tableData);

var totalFilters = {};

function filterDate(){
    var date = d3.select("#datetime").property("value");
    console.log(date);
    let filterData = tableData;
    console.log(filterData);
    if (date) {filterData = filterData.filter(row => row.datetime === date);
    }
    getData(filterData);
    console.log(filterData);
}

function allFilters() {
    var filterInput = d3.select(this).select("input");
    var filterValue = filterInput.property("value");
    var filterID = filterInput.attr("id");
    if (filterValue) {totalFilters[filterID]=filterValue;
    }
    else { delete totalFilters[filterID];
    }
    getFilter();
}

function getFilter(){ 
    let filterData = tableData;
    Object.entries(totalFilters).forEach(([key, value])=>{
        filterData = filterData.filter(row => row[key] === value);
    });
    getData(filterData);
}

d3.selectAll(".filter").on("change",allFilters);