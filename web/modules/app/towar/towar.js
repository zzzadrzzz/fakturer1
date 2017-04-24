// ----------------------- WIDOK -----------------------------

var towarTableData = [];
var towarJednostkiMiaryList = [];

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
    document.getElementById('towar-pkwiu').value = null;
    document.getElementById('towar-jednostka-miary-select').selectedIndex = "0";
    document.getElementById('towar-vat').value = null;
    document.getElementById('towar-cena-netto').value = null;
}

function towarFormToObject() {
    return {
        id: document.getElementById('towar-id').value,
        nazwa: document.getElementById('towar-nazwa').value,
        pkwiu: document.getElementById('towar-pkwiu').value,
        jednostkaMiary: list.options[document.getElementById("towar-jednostka-miary-select").selectedIndex].value,
        vat: document.getElementById('towar-vat').value,
        cenaNetto: document.getElementById('towar-cena-netto').value
    }
}

function towarObjectToForm(data) {
    document.getElementById('towar-id').value = data.id;
    document.getElementById('towar-nazwa').value = data.nazwa;
    document.getElementById('towar-pkwiu').value = data.pkwiu;
    document.getElementById('towar-jednostka-miary-select').selectedIndex = getIndexForSelect(towarJednostkiMiaryList, data.jednostkaMiary);
    document.getElementById('towar-vat').value = data.vat;
    document.getElementById('towar-cena-netto').value = data.cenaNetto;
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

function towarChangeJednostkaMiary() {
    var list = document.getElementById("towar-jednostka-miary-select");
    var selected = list.options[list.selectedIndex].value;
}

// ----------------------- KOMUNIKACJA -----------------------------

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