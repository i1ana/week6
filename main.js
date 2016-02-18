var fs = require('fs')
var express = require('express')
/*name,age,city
Rene,35,Vancouver
Thomas,29,Portland
Lexi,28,Seattle*/


var csvFileName = process.argv[2];
var jsonFileName = process.argv[3];

var csvFileContents = fs.readFileSync(csvFileName, 'utf-8');

var rows = csvFileContents.split('\n');

var labels = rows.splice(0, 1)[0].split(',');

var results = rows
    
    .filter(function(row){
        return row !== '';
    })
   
    .map(function(row){
       
        var columns = row.split(',');
        
        var obj = {};
        
        for (var i = 0; i < columns.length; i++) {
            var thisKey = labels[i];
            var thisValue = columns[i];
            obj[thisKey] = thisValue;
        }
        return obj;
    });

var resultsJson = JSON.stringify(results);

console.log(resultsJson);


fs.writeFileSync(jsonFileName, resultsJson);