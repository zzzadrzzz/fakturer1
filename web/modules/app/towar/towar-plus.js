// ----------------------- WIDOK -----------------------------

var towarTableData = [];
var towarJednostkiMiaryList = [];
var pkwiuListA = [];
var pkwiuListB = [];
var pkwiuListC = [];

function createTowarTable() {
    $(document).ready(function() {
        $('#towar-table').DataTable( {
            data: convertTowarDataForTable(towarTableData),
            columns: [
                { title: "Id" },
                { title: "Nazwa" },
                { title: "PKWiU" },
                { title: "Jednostka miary" },
                { title: "VAT [%]" },
                { title: "Cena netto za jednostkę [zł]" }
            ]
        } );
    });
}

function createTowarTableEvents() {
    $('#towar-table').on('click', 'tbody tr', function(){
        var table =  $('#towar-table').dataTable();
        var row = table.fnGetData(this);
        var response = getTowarDataForForm(row[0]);
        towarObjectToForm(response);
    })
}

function reinitializeTowarTable() {
    $('#towar-table').DataTable().destroy();
    createTowarTable();
}

function clearTowarForm() {
    document.getElementById('towar-id').value = null;
    document.getElementById('towar-nazwa').value = null;
    selectPKWiU('a');
    document.getElementById('towar-jednostka-miary-select').selectedIndex = "0";
    document.getElementById('towar-vat').value = null;
    document.getElementById('towar-cena-netto').value = null;
}

function towarFormToObject() {
    return {
        id: document.getElementById('towar-id').value,
        nazwa: document.getElementById('towar-nazwa').value,
        pkwiu: getSelectedPKWiU(),
        jednostkaMiary: list.options[document.getElementById("towar-jednostka-miary-select").selectedIndex].value,
        vat: document.getElementById('towar-vat').value,
        cenaNetto: document.getElementById('towar-cena-netto').value
    }
}

function towarObjectToForm(data) {
    document.getElementById('towar-id').value = data.id;
    document.getElementById('towar-nazwa').value = data.nazwa;
    document.getElementById('towar-pkwiu').innerHTML = data.pkwiu;
    selectPKWiU('a');
    if (data.pkwiu && data.pkwiu.length >= 2) {
        document.getElementById('towar-pkwiu-a').selectedIndex = getIndexForPKWiUSelect(pkwiuListA, data.pkwiu.substr(0, 2));
        selectPKWiU('b');
    }
    if (data.pkwiu && data.pkwiu.length >= 5) {
        document.getElementById('towar-pkwiu-b').selectedIndex = getIndexForPKWiUSelect(pkwiuListB, data.pkwiu.substr(0, 5));
        selectPKWiU('c');
    }
    if (data.pkwiu && data.pkwiu.length >= 8) {
        document.getElementById('towar-pkwiu-c').selectedIndex = getIndexForPKWiUSelect(pkwiuListC, data.pkwiu.substr(0, 8));
        selectPKWiU('d');
    }
    document.getElementById('towar-jednostka-miary-select').selectedIndex = getIndexForSelect(towarJednostkiMiaryList, data.jednostkaMiary);
    document.getElementById('towar-vat').value = data.vat;
    document.getElementById('towar-cena-netto').value = data.cenaNetto;
}

function getIndexForPKWiUSelect(dataArray, dataValue) {
    for (var i = 0; i < dataArray.length; i++) {
        if (dataArray[i].symbol == dataValue) {
            return (i+1) + "";
        }
    }
    return "0";
}

function convertTowarDataForTable(objectList) {
    var arrayList = [];
    for (var i = 0; i < objectList.length; i++) {
        var record = [
            objectList[i].id,
            objectList[i].nazwa,
            objectList[i].pkwiu,
            objectList[i].jednostkaMiary,
            objectList[i].vat,
            objectList[i].cenaNetto
        ];
        arrayList[i] = record;
    }
    return arrayList;
}

function populateJednostkaMiarySelect() {
    towarJednostkiMiaryList = getJednostkiMiary();
    var modelList = document.getElementById("towar-jednostka-miary-select");
    while (modelList.options.length) {
        modelList.remove(0);
    }
    if (towarJednostkiMiaryList) {
        for (var i = 0; i < towarJednostkiMiaryList.length; i++) {
            var option = new Option(towarJednostkiMiaryList[i], i);
            modelList.options.add(option);
        }
    }
}

function selectPKWiU(mode) {
    var symbol = null;
    if (mode == 'b') {
        var list = document.getElementById("towar-pkwiu-a");
        var selected = list.options[list.selectedIndex];
        symbol = selected.value;
    } else if (mode == 'c') {
        var list = document.getElementById("towar-pkwiu-b");
        var selected = list.options[list.selectedIndex];
        symbol = selected.value;
    }
    var result = null;
    if (symbol != '-1' && mode != 'd') {
        result = findPKWiU(symbol);
    }
    if (mode == 'a') {
        var modelList = null;
        pkwiuListA = result;
        modelList = document.getElementById("towar-pkwiu-b");
        while (modelList.options.length) {
            modelList.remove(0);
        }
        option = new Option(null, 0);
        option.value = '-1';
        option.text = '-BRAK-';
        modelList.options.add(option);
        modelList = document.getElementById("towar-pkwiu-c");
        while (modelList.options.length) {
            modelList.remove(0);
        }
        option = new Option(null, 0);
        option.value = '-1';
        option.text = '-BRAK-';
        modelList.options.add(option);
        modelList = document.getElementById("towar-pkwiu-a");
        while (modelList.options.length) {
            modelList.remove(0);
        }
        option = new Option(null, 0);
        option.value = '-1';
        option.text = '-BRAK-';
        modelList.options.add(option);
        if (pkwiuListA) {
            for (var i = 0; i < pkwiuListA.length; i++) {
                var option = new Option(pkwiuListA[i], i);
                option.value = pkwiuListA[i].symbol;
                option.text = pkwiuListA[i].nazwa;
                modelList.options.add(option);
            }
        }
    } else if (mode == 'b') {
        var modelList = null;
        if (symbol != '-1') {
            pkwiuListB = result;
        } else {
            pkwiuListB = [];
        }
        modelList = document.getElementById("towar-pkwiu-c");
        while (modelList.options.length) {
            modelList.remove(0);
        }
        option = new Option(null, 0);
        option.value = '-1';
        option.text = '-BRAK-';
        modelList.options.add(option);
        modelList = document.getElementById("towar-pkwiu-b");
        while (modelList.options.length) {
            modelList.remove(0);
        }
        option = new Option(null, 0);
        option.value = '-1';
        option.text = '-BRAK-';
        modelList.options.add(option);
        if (pkwiuListB) {
            for (var i = 0; i < pkwiuListB.length; i++) {
                var option = new Option(pkwiuListB[i], i);
                option.value = pkwiuListB[i].symbol;
                option.text = pkwiuListB[i].nazwa;
                modelList.options.add(option);
            }
        }
    } else if (mode == 'c') {
        var modelList = null;
        if (symbol != '-1') {
            pkwiuListC = result;
        } else {
            pkwiuListC = [];
        }
        modelList = document.getElementById("towar-pkwiu-c");
        while (modelList.options.length) {
            modelList.remove(0);
        }
        var option = new Option(null, 0);
        option.value = '-1';
        option.text = '-BRAK-';
        modelList.options.add(option);
        if (pkwiuListC) {
            for (var i = 0; i < pkwiuListC.length; i++) {
                var option = new Option(pkwiuListC[i], i);
                option.value = pkwiuListC[i].symbol;
                option.text = pkwiuListC[i].nazwa;
                modelList.options.add(option);
            }
        }
    }
    document.getElementById("towar-pkwiu").innerHTML = getSelectedPKWiU();
}

function getSelectedPKWiU() {
    var i = document.getElementById("towar-pkwiu-c").selectedIndex-1;
    if (i >= 0) {
        return pkwiuListC[i].symbol;
    }
    i = document.getElementById("towar-pkwiu-b").selectedIndex-1;
    if (i >= 0) {
        return pkwiuListB[i].symbol;
    }
    i = document.getElementById("towar-pkwiu-a").selectedIndex-1;
    if (i >= 0) {
        return pkwiuListA[i].symbol;
    }
    return '';
}

// ----------------------- KOMUNIKACJA -----------------------------

function findPKWiU(symbol) {
    var url = HOST + '/api/towar/findPKWiU';
    var params = symbol != null ? ('?symbol=' + symbol) : '';
    var response = httpGet(url + params);
    return JSON.parse(response);
}

function getTowarDataForForm(id) {
    var url = HOST + '/api/towar/findOne';
    var params = '?id=' + id;
    var response = httpGet(url + params);
    return JSON.parse(response);
}

function getJednostkiMiary() {
    var url = HOST + '/api/towar/getJednostkiMiary';
    var response = httpGet(url);
    return JSON.parse(response);
}

function getTowarDataForTable() {
    var url = HOST + '/api/towar/findAll';
    var response = httpGet(url);
    towarTableData = JSON.parse(response);
    reinitializeTowarTable();
}

function saveTowarForm() {
    var formData = towarFormToObject();
    var url = HOST + '/api/towar/save';
    var response = httpPost(url, formData);
    var responseObject = JSON.parse(response);
    document.getElementById('towar-id').value = responseObject.id;
    getTowarDataForTable();
}

function deleteSelectedTowar() {
    var id = document.getElementById('towar-id').value;
    var url = HOST + '/api/towar/deleteOne';
    var params = '?id=' + document.getElementById('towar-id').value;
    httpGet(url + params);
    clearTowarForm();
    getTowarDataForTable();
}