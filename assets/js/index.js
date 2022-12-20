var global_data, categories, category_name, province_name, colors;
const chagneName = (name) => {
    let short_name;
    let num;
    name = name.toLowerCase()
    switch (name) {
        case 'guayas':
            short_name = "ec-gu";
            num = 0;
            break;
        case 'esmeraldas':
            short_name = "ec-es";
            num = 1;
            break;
        case 'carchi':
            short_name = "ec-cr";
            num = 2;
            break;
        case 'imbabura':
            short_name = "ec-im";
            num = 3;
            break;
        case 'sucumbios':
            short_name = "ec-su";
            num = 4;
            break;
        case 'santa elena':
            short_name = "ec-se";
            num = 5;
            break;
        case 'santo domingo de los tsachilas':
            short_name = "ec-sd";
            num = 6;
            break;
        case 'azuay':
            short_name = "ec-az";
            num = 7;
            break;
        case 'el oro':
            short_name = "ec-eo";
            num = 8;
            break;
        case 'loja':
            short_name = "ec-lj";
            num = 9;
            break;
        case 'zamora chinchipe' || 'zamora':
            short_name = "ec-zc";
            num = 10;
            break;
        case 'canar':
            short_name = "ec-cn";
            num = 11;
            break;
        case 'bolivar':
            short_name = "ec-bo";
            num = 12;
            break;
        case 'cotopaxi':
            short_name = "ec-ct";
            num = 13;
            break;
        case 'los rios':
            short_name = "ec-lr";
            num = 14;
            break;
        case 'manabi':
            short_name = "ec-mn";
            num = 15;
            break;
        case 'chimborazo':
            short_name = "ec-cb";
            num = 16;
            break;
        case 'morona santiago':
            short_name = "ec-ms";
            num = 17;
            break;
        case 'pichincha':
            short_name = "ec-pi";
            num = 18;
            break;
        case 'pastaza':
            short_name = "ec-pa";
            num = 19;
            break;
        case 'napo':
            short_name = "ec-1076";
            num = 20;
            break;
        case 'orellana':
            short_name = "ec-na";
            num = 21;
            break;
        case 'tungurahua':
            short_name = "ec-tu";
            num = 22;
            break;
        case 'galapagos':
            short_name = "ec-ga";
            num = 23;
            break;
        default:
            short_name = "noname";
            num = -1;
            break;
    }
    return num;
}
const draw_graphics = async(info, category_name) => {
    const topology = await fetch(
        "https://code.highcharts.com/mapdata/countries/ec/ec-all.topo.json"
    ).then((response) => response.json());

    // Prepare demo data. The data is joined to map using value of 'hc-key'
    // property by default. See API docs for 'joinBy' for more info on linking
    // data and map.
    let data = [
        ["ec-gu", 0],
        ["ec-es", 0],
        ["ec-cr", 0],
        ["ec-im", 0],
        ["ec-su", 0],
        ["ec-se", 0],
        ["ec-sd", 0],
        ["ec-az", 0],
        ["ec-eo", 0],
        ["ec-lj", 0],
        ["ec-zc", 0],
        ["ec-cn", 0],
        ["ec-bo", 20],
        ["ec-ct", 0],
        ["ec-lr", 0],
        ["ec-mn", 0],
        ["ec-cb", 0],
        ["ec-ms", 0],
        ["ec-pi", 0],
        ["ec-pa", 0],
        ["ec-1076", 0],
        ["ec-na", 0],
        ["ec-tu", 0],
        ["ec-ga", 0],
    ];
    info.forEach(city_info => {
        const city_num = chagneName(city_info.name);
        if (city_num == -1) {
            console.log(city_info.name);
        } else {
            data[city_num][1] = city_info[category_name] != undefined ? city_info[category_name] : 0;
        }
    });
    // Create the chart
    Highcharts.mapChart("container", {
        chart: {
            map: topology,
        },

        title: {
            text: "Agriculture in Ecuador",
        },

        // subtitle: {
        //     text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/ec/ec-all.topo.json">Ecuador</a>',
        // },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: "bottom",
            },
        },
        colorAxis: {
            min: 0,
            // minColor: '#fff',
            // maxColor: '#ffff00'
        },
        series: [{
            data: data,
            name: category_name,
            states: {
                hover: {
                    color: "#900037",
                },
            },
            dataLabels: {
                enabled: true,
                format: "{point.name}",
            },
        }, ],
    });

    $(".highcharts-credits").hide();
};
const draw_charts = (chart_datas, province_name, colors) => {
    $(".chart-container").html("<canvas id=\"myChart\"></canvas>");
    let chart_data = chart_datas.filter(item => item.name === province_name)[0];
    chart_data = Object.keys(chart_data).filter(key =>
        key !== 'name').reduce((obj, key) => {
        obj[key] = chart_data[key];
        return obj;
    }, {});

    var xValues = [];
    var yValues = [];

    Object.keys(chart_data).forEach(key => {
        xValues.push(key);
        yValues.push(chart_data[key]);
    });
    var barColors = colors;
    new Chart("myChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: "Ecuador Production 2022"
            }
        }
    });
}
$(document).ready(function() {
    $.ajax({
        url: "controller/ajax.php",
        type: "POST",
        dataType: "json",
        success: function(res) {
            categories = Object.values(res.category);
            global_data = res.info;
            colors = res.colors;
            //add options and graph for map
            var categories_str = "";
            categories.forEach(category => {
                categories_str += "<option>" + category + "</option>";
            });
            $(".category-select").html(categories_str);
            category_name = $(".category-select").val();
            draw_graphics(global_data, category_name);
            // add options adn graph for chart
            var provinces_str = "";
            res.provinces.forEach(province => {
                provinces_str += "<option>" + province + "</option>";
            });
            $(".province-select").html(provinces_str);
            province_name = $(".province-select").val();
            draw_charts(global_data, province_name, colors);
        }
    });

    $(".category-select").change(function() {
        category_name = $(this).val();
        draw_graphics(global_data, category_name);
    });
    $(".province-select").change(function() {
        province_name = $(this).val();
        draw_charts(global_data, province_name, colors);
    });


});