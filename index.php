<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Equador | Production</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
    <style>
        #container,.ui-container, #myChart {
            height: 60vh;
            min-width: 310px;
            max-width: 800px;
            margin: 0 auto;
        }
        .loading {
            margin-top: 10em;
            text-align: center;
            color: gray;
        }
        canvas{
            height: 60vh!important;
        }
    </style>
</head>

<body style="overflow-x:unset">
    <div class="col-lg-12">
        <div class="row">
            <div class="col-lg-6" >
                <div class="ui-container  py-5" style="height:auto;">
                    <div class="d-flex justify-content-center">
                        <label class="d-block pr-5 m-0" style="line-height:35px" for="sel1">Select list:</label>
                        <select class="form-control category-select" style="width: 50% !important;" id="sel1">
                        </select>
                    </div>            
                </div>
                <div id="container"></div>
            </div>
            <div class="col-lg-6">
                <div class="ui-container  py-5" style="height:auto;">
                    <div class="d-flex justify-content-center">
                        <label class="d-block pr-5 m-0" style="line-height:35px" for="sel1">Select Province:</label>
                        <select class="form-control province-select" style="width: 50% !important;" id="sel1">
                        </select>
                    </div>            
                </div>
                <div class="chart-container"  ></div>               
            </div>
        </div>
    </div>

    <script src="./assets/js/jquery.min.js"></script>
    <script src="https://code.highcharts.com/maps/highmaps.js"></script>
    <script src="https://code.highcharts.com/maps/modules/exporting.js"></script>
    <script src="./assets/js/index.js"></script>
</body>

</html>