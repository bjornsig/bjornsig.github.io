var selected = {values: [], labels: []};
var chart = {
	initialize: function() {
		var linectx = document.getElementById("linegraph").getContext("2d");
		this.current = this.line = new Chart(linectx).Line(data, {
			animation: false,
			showTooltips: false,
			bezierCurve: false
		});
		var barctx = document.getElementById("bargraph").getContext("2d");
		this.bar = new Chart(barctx).Bar(data, {
			animation: false,
			showTooltips: false
		});
		var piectx = document.getElementById("piegraph").getContext("2d");
		this.pie = new Chart(piectx).Pie(data, {
			animation: false,
			showTooltips: false
		});
		var doughnutctx = document.getElementById("doughnutgraph").getContext("2d");
		this.doughnut = new Chart(doughnutctx).Doughnut(data, {
			animation: false,
			showTooltips: false
		});
	},
	clean: function() {
		paint(selected.values, 'white');
		paint(selected.labels, 'white');
		if (this.current == this.line) {
			while (this.line.datasets[0].points.length) {
				this.line.removeData();
			}
		} else if (this.current == this.bar) {
			while (this.bar.datasets[0].bars.length) {
				this.bar.removeData();
			}
		} else if (this.current == this.pie) {
			while (this.pie.segments.length) {
				this.pie.removeData();
			}
		} else if (this.current == this.doughnut) {
			while (this.doughnut.segments.length) {
				this.doughnut.removeData();
			}
		}
	},
	empty: function() {
		if (this.current == this.line) {
			this.line.addData([0], "0");
		} else if (this.current == this.bar) {
			this.bar.addData([0], "0");
		} else if (this.current == this.pie) {
			this.pie.addData({
				value: 1,
				label: "",
				color: "rgba(238,238,238,0.5)"
			});
		} else if (this.current == this.doughnut) {
			this.doughnut.addData({
				value: 1,
				label: "",
				color: "rgba(238,238,238,0.5)"
			});
		}
	},
	addData: function(value, label) {
		if (this.current == this.line) {
			this.line.addData([value], label);
		} else if (this.current == this.bar) {
			this.bar.addData([value], label);
		} else if (this.current == this.pie) {
			this.pie.addData({
				value: value,
				label: label,
			});
		} else if (this.current == this.doughnut) {
			this.doughnut.addData({
				value: value,
				label: label,
			});
		}
	},
	removeData: function() {
		if (this.current == this.line) {
			this.line.removeData();
		} else if (this.current == this.bar) {
			this.bar.removeData();
		} else if (this.current == this.pie) {
			this.pie.removeData();
		} else if (this.current == this.doughnut) {
			this.doughnut.removeData();
		}
	}
};

function backToSelection() {
	var ga = document.getElementsByClassName("grapharea");
	for (var i=0; i<ga.length; i++) {
		ga[i].style.display = "none";
	}
	document.getElementById("selection").style.display = "block";
	chart.clean();
	chart.empty();
}

function selectLineGraph() {
	chart.clean();
	chart.empty();
	chart.current = chart.line;
	document.getElementById("selection").style.display = "none";
	document.getElementById("linegrapharea").style.display = "block";
}

function selectBarGraph() {
	chart.clean();
	chart.empty();
	chart.current = chart.bar;
	document.getElementById("selection").style.display = "none";
	document.getElementById("bargrapharea").style.display = "block";
}

function selectPieGraph() {
	chart.clean();
	chart.empty();
	chart.current = chart.pie;
	chart.clean();
	chart.empty();
	document.getElementById("selection").style.display = "none";
	document.getElementById("piegrapharea").style.display = "block";
}

function selectDoughnutGraph() {
	chart.clean();
	chart.empty();
	chart.current = chart.doughnut;
	document.getElementById("selection").style.display = "none";
	document.getElementById("doughnutgrapharea").style.display = "block";
}

function initialdata() {
	var d = Handsontable.helper.createEmptySpreadsheetData(20,11);
	d[1][1] = "Mánudagur"; d[1][2] = 0;
	d[2][1] = "Þriðjudagur"; d[2][2] = 2;
	d[3][1] = "Miðvikudagur"; d[3][2] = 1;
	d[4][1] = "Fimmtudagur"; d[4][2] = 4;
	d[5][1] = "Föstudagur"; d[5][2] = 3;
	d[6][1] = "Laugardagur"; d[6][2] = 4;
	d[7][1] = "Sunnudagur"; d[7][2] = 2;
	return d;
}

function hexToRgba(hex,a) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? "rgba("+
		parseInt(result[1], 16)+","+
		parseInt(result[2], 16)+","+
		parseInt(result[3], 16)+","+
		a+")" : null;
}

function changeFillColor(colorer) {
	var rgba = hexToRgba("#"+colorer, 0.2);
	chart.current.datasets[0].fillColor = rgba;
	chart.current.update();
}

function changeStrokeColor(colorer) {
	var rgba = hexToRgba("#"+colorer, 1);
	chart.current.datasets[0].strokeColor = rgba;
	chart.current.update();
}

function changePointColor(colorer) {
	var rgba = hexToRgba("#"+colorer, 1);
	for (var i=0; i<chart.line.datasets[0].points.length; i++) {
		chart.line.datasets[0].points[i].fillColor = rgba;
		chart.line.datasets[0].points[i].strokeColor = rgba;
	}
	chart.line.datasets[0].pointColor = rgba;
	chart.line.datasets[0].pointStrokeColor = rgba;
	chart.line.update();
}

function changeBarFillColor(colorer) {
	var rgba = hexToRgba("#"+colorer, 0.2);
	for (var i=0; i<chart.bar.datasets[0].bars.length; i++) {
		chart.bar.datasets[0].bars[i].fillColor = rgba;
	}
	chart.bar.datasets[0].fillColor = rgba;
	chart.bar.update();
}

function changeBarStrokeColor(colorer) {
	var rgba = hexToRgba("#"+colorer, 1);
	for (var i=0; i<chart.bar.datasets[0].bars.length; i++) {
		chart.bar.datasets[0].bars[i].strokeColor = rgba;
	}
	chart.bar.datasets[0].strokeColor = rgba;
	chart.bar.update();
}

function vL(l) {
	return l !== null && l.length !== 0;
}

function vV(v) {
	return v !== null && v.length !== 0 && isFinite(v);
}

function valid(data, vF) {
	for (var i=0; i<data.length; i++) {
		if (!vF(data[i].textContent)) { return false; }
	}
	return true;
}

function paint(cs, color) {
	for (var i=0; i<cs.length; i++) {
		cs[i].style.backgroundColor = color;
	}
}

function distribute(a,b,vs,ls) {
	if (vV(a.textContent)) {
		vs.push(a);
	} else if (vL(a.textContent)) {
		ls.push(a);
	} else {
		return false;
	}
	if (vV(b.textContent)) {
		vs.push(b);
	} else if (vL(b.textContent)) {
		ls.push(b);
	} else {
		return false;
	}
	return true;
}

function select(ht,r,c,r2,c2) {
	var val = [];
	var lab = [];
	var empty = {values: [], labels: []};
	if (r === r2 && c === c2) {
		if (vV(ht.getCell(r,c).textContent)) {val.push(ht.getCell(r,c));}
		else {return empty;}
	} else if (r === r2 && (c2-c === 1 || c-c2 === 1)) {
		if (!distribute(ht.getCell(r,c), ht.getCell(r,c2), val, lab)) {return empty;}
	} else if (r === r2 && c > c2) {
		for (var i=c; i>=c2; i--) {
			if (vV(ht.getCell(r,i).textContent)) {val.push(ht.getCell(r,i));}
			else {return empty;}
		}
	} else if (r === r2 && c < c2) {
		for (var i=c; i<=c2; i++) {
			if (vV(ht.getCell(r,i).textContent)) {val.push(ht.getCell(r,i));}
			else {return empty;}
		}
	} else if ((r2-r === 1 || r-r2 === 1) && c < c2) {
		for (var i=c; i<=c2; i++) {
			if (!distribute(ht.getCell(r,i), ht.getCell(r2,i), val, lab)) {return empty;}
		}
	} else if ((r2-r === 1 || r-r2 === 1) && c > c2) {
		for (var i=c; i>=c2; i--) {
			if (!distribute(ht.getCell(r,i), ht.getCell(r2,i), val, lab)) {return empty;}
		}
	} else if (c === c2 && (r2-r === 1 || r-r2 === 1)) {
		if (!distribute(ht.getCell(r,c), ht.getCell(r2,c), val, lab)) {return empty;}
	}else if (c === c2 && r > r2) {
		for (var i=r; i>=r2; i--) {
			if (vV(ht.getCell(i,c).textContent)) {val.push(ht.getCell(i,c));}
			else {return empty;}
		}
	} else if (c === c2 && r < r2) {
		for (var i=r; i<=r2; i++) {
			if (vV(ht.getCell(i,c).textContent)) {val.push(ht.getCell(i,c));}
			else {return empty;}
		}
	} else if ((c2-c === 1 || c-c2 === 1) && r < r2) {
		for (var i=r; i<=r2; i++) {
			if (!distribute(ht.getCell(i,c), ht.getCell(i,c2), val, lab)) {return empty;}
		}
	} else if ((c2-c === 1 || c-c2 === 1) && r > r2) {
		for (var i=r; i>=r2; i--) {
			if (!distribute(ht.getCell(i,c), ht.getCell(i,c2), val, lab)) {return empty;}
		}
	}
	return {values: val, labels: lab};
}

var data = {
		labels: ["0"],
		datasets: [
			{
				label: "My First dataset",
				fillColor: "rgba(0,250,0,0.2)",
				strokeColor: "rgba(250,0,0,1)",
				pointColor: "rgba(0,0,250,1)",
				pointStrokeColor: "rgba(0,0,250,1)",
				data: [0]
			}
		]
	};

window.onload = function() {

	chart.initialize();

	var container = document.getElementById('example');
	var hot = new Handsontable(container, {
		data: initialdata(),
		rowHeaders: true,
		colHeaders: true,
		startRows: 20,
		startCols: 11,
		minSpareCols: 0,
		minSpareRows: 1,
		fillHandle: false,
		afterSelection: function(r,c,r2,c2) {
			paint(selected.values, 'white');
			paint(selected.labels, 'white');
			selected = select(hot,r,c,r2,c2);
			chart.clean();
			if (selected.values.length === 0) {
				chart.empty();
				return;
			}
			if (!valid(selected.values, vV)) { return; }
			if (!valid(selected.labels, vL)) { return; }
			if ((r === r2 || c === c2) && selected.labels.length === 0) {
				for (var i=0; i<selected.values.length; i++) {
					chart.addData(parseFloat(selected.values[i].textContent),i.toString());
					// chart.addData(parseFloat(selected.values[i].textContent),"");
				}
			} else if (selected.values.length === selected.labels.length) {
				for (var i=0; i<selected.values.length; i++) {
					chart.addData(parseFloat(selected.values[i].textContent),
												selected.labels[i].textContent);
				}
			}
		},
		afterDeselect: function(a) {
			if (selected.values.length !== selected.labels.length && selected.labels.length !== 0) {
				return;
			}
			if (!valid(selected.values, vV)) { return; }
			if (!valid(selected.labels, vL)) { return; }
			paint(selected.values, '#E6EFFF');
			paint(selected.labels, '#E6EFFF');
		}
	});
};
