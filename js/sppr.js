//Таблиця альтернатив параметрів
//parameters
var parameterNames = [
    "Тип конфлікту",
    "Тип використовуваної зброї",
    "Що призвело до конфлікту",
    "Сектори враження",
    "Тривалість конфлікту",
    "Умови проживання",
    "Переважний характер жертв",
    "Сторона-супротивник",
    "Причини виникнення конфлікту"
];

var alternativeNames = [
    [
        "Внутрішній конфлікт",
        "Регіональний конфлікт",
        "Воєнний конфлікт між двома тер. розп. державами",
        "Тероризм",
        "Вітчизняна війна",
        "'Холодна війна'",
        "Світова війна"
    ],
    [
        "Стрілецька зброя/гранати",
        "Вибухівка/міни",
        "Хімічна/біологічна зброя",
        "Ядерна зброя",
        "Бронетехніка",
        "Авіація",
        "Артилерія/ракетна зброя",
        "Запалювальна зброя"

    ],
    [
        "Напруженість у стосунках між державами",
        "Замах/загроза/усунення керівної особи",
        "Порушення територіальних кордонів"
    ],
    [
        "Сільське господарство",
        "Інфраструктура",
        "Області проживання населення",
        "Виробництво",
        "Видобування ресурсів та вироб. енергії"
    ],
    [
        "Короткий ( до 0.5 року)",
        "Середній ( 1 - 2 роки)",
        "Тривалий (до 5 років)",
        "Постійний (до 10 років)"
    ],
    [
        "Проживання в умовах забруднення",
        "Проживання в умовах ведення військових дій",
        "Проживання на територіях, з руйнуваннями",
        "В умовах недостатнього постач. води/їжі"
    ],
    [
        "Загиблі",
        "Вогнепальні поранення",
        "Опіки/враження зору/дихання"

    ],
    [
        "Розвинена з великими тер. та люд. рес.",
        "Країна, що розвивається",
        "Країна 'третього світу'",
        "Коаліція країн"
    ],
    [
        "Ресурси",
        "Політика",
        "Етичні, релігійні, культурні суперечки",
        "Незадоволеність населення внутр. устроєм",
        "Боротьба за незалежність",
        "Боротьба за владу і захопл. територій"
    ]
];
var alternativeValues = [
    [
        0.5, 0.8, 0.3, 0.5, 0.7, 0.4, 0.1
    ],
    [
        0.8, 0.5, 0.1, 0.05, 0.7, 0.3, 0.7, 0.2
    ],
    [
        0.7, 0.6, 0.7
    ],
    [
        0.5, 0.8, 0.6, 0.3, 0.3//in a conflict 4.6 and 4.7 mustn't be stopped
    ],
    [
        0.5, 0.7, 0.6, 0.4
    ],
    [
        0.1, 0.4, 0.8, 0.7
    ],
    [
        0.65, 0.4, 0.1
    ],
    [
        0.65, 0.4, 0.1, 0.8
    ],
    [
        0.4, 0.8, 0.3, 0.5, 0.4, 0.6
    ]
];

var table = document.getElementById("table");
var tableData = document.getElementById("table_data");
var tableNormalized = document.getElementById("table_normalized");

var width = Number(((document.documentElement.clientWidth - 70) / parameterNames.length).toFixed(0));

/*console.log(Object.keys(parameters[0]).length);
 console.log(parameters[0][1]);*/

/*Base table with names of parameters and alternatives*/
function buildBaseTable() {
    for (var i = 0; i < alternativeNames.length; i++) {
        var column = document.createElement("div");
        column.className = "column";
        column.style.width = width + "px";
        table.appendChild(column);

        var header = document.createElement("div");
        header.className = "header";
        header.innerHTML = parameterNames[i];
        column.appendChild(header);

        for (var j = 0; j < alternativeNames[i].length; j++) {
            var line = document.createElement("div");
            line.className = "line";
            line.innerHTML = alternativeNames[i][j];
            line.style.padding = "5px";
            column.appendChild(line);
        }
    }
}

/*Table with names of parameters and values of alternatives*/
function buildAlternetivesTable() {
    for (var i = 0; i < alternativeValues.length; i++) {
        var column = document.createElement("div");
        column.className = "column";
        column.style.width = width + "px";
        tableData.appendChild(column);
        
        var header = document.createElement("div");
        header.className = "header";
        header.innerHTML = parameterNames[i];
        column.appendChild(header);
        
        for (var j = 0; j < alternativeValues[i].length; j++) {
            var line = document.createElement("div");
            line.className = "line";
            line.style.height = "50px";
            line.style.lineHeight = "30px";
            line.style.verticalAlign = "middle";
            line.innerHTML = alternativeValues[i][j];
            column.appendChild(line);
        }
    }
}
/*Table with normalized values of alternatives*/
function buildNormalizedTable() {
    for (var i = 0; i < alternativeValues.length; i++) {
        var column = document.createElement("div");
        column.className = "column";
        column.style.width = width + "px";
        tableNormalized.appendChild(column);
        
        var header = document.createElement("div");
        header.className = "header";
        header.innerHTML = parameterNames[i];
        column.appendChild(header);
        
        var sum = alternativeValues[i].reduce(function (previousValue, currentValue, index, array) {
            return previousValue + currentValue;
        });
        for (var j = 0; j < alternativeValues[i].length; j++) {
            var line = document.createElement("div");
            line.className = "line";
            line.style.height = "70px";
            line.style.lineHeight = "50px";
            line.style.verticalAlign = "middle";
            line.innerHTML = Number((alternativeValues[i][j] / sum).toFixed(5));
            column.appendChild(line);
        }
    }
}

buildBaseTable();/*can be added to some buttons to display optionally*/
buildAlternetivesTable();
buildNormalizedTable();


$(document).ready(function () {
    $("#solveOwn").click(function () {
        $("#table").fadeOut("slow");
        $("#table_data").fadeOut("slow");
        $("#table_normalized").fadeOut("slow");
    });
});
/*onclick to this button build another table after moving previous table, use setTimeout(functionBuildNew, 1000)*/
