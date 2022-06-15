console.log("conexión con archivo js")

/* CARGAMOS LA LIBRERIA CDNJS */
/*j(document).ready(function() {*/
document.addEventListener("DOMContentLoaded", function(){
    var imported = document.createElement('script');
    imported.src = 'https://cdnjs.cloudflare.com/ajax/libs/svg.js/3.0.13/svg.min.js';
    document.head.appendChild(imported);

});
/* VARIABLES DE LA LIBRERIA*/
var svg_css = "";
var plots = [];
var svgDoc;

/*CARGAMOS EL JSON DEL SVG DE FORMA LOCAL*/
/* PASAMOS EL PARAMETRO plot_id CON LA FUNCIÓN loadPlots*/

function loadPlots(plot_id){

    j.ajax({
        url:"https://github.com/Jesus1197/Jesus1197/blob/1b47b647cb48d76bd4a2ffdb24428056911cd891/Aguamiel_SVG_WEB",
        dataType: 'JSON',
        cache: 'falso',
        seccess: function(response){
            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            j(svg).html(response.svg);
            j(svg).attr('id', 'mysvg');
            j("#svg-wrapper").html(response.svg);
            j(".plots").click(loadPlotInfo)
            plots = response.areas;
            var elemnt = SVG("#mysvg");
            svgDoc = elemnt;
            prepareAreas();
        },

        error: function(error){
            console.log("ERROR 450540")
            console.log(error);
        }
    });
}

function prepareAreas(){
    for (i in plots) {
        var _id = "#" + plots[i].svgid;
        if (plots[i].estatus == "reserved") {
            j(_id).addClass("reserved").unbind();
        }
        if (plots[i].estatus == "block") {
            j(_id).addClass("reserved").unbind();
        }
        if (plots[i].estatus == "sold") {
            j(_id).addClass("sold").unbind();
        }

    }
    j("#svg-wrapper").trigger("ready", [plots, svgDoc]);
}

function loadPlotInfo() {
    var _selectedPlot = getPlotBySVGID(j(this).attr('id'));
    j("#svg-wrapper").trigger("selected", [_selectedPlot, this]);

}

function getPlotBySVGID(svg_id) {
    for (i in plots) {
        if (plots[i].svgid == svg_id) {
            return plots[i];
        }
    }
    return false;
}

