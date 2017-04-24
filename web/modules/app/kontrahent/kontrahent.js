// ----------------------- WIDOK -----------------------------

var kontrahentTableData = [];

function createKontrahentTable() {
    $(document).ready(function() {
        $('#kontrahent-table').DataTable( {
            data: convertKontrahentDataForTable(kontrahentTableData),
            columns: [
                { title: "Id" },
                { title: "Nazwa" },
                { title: "Adres" },
                { title: "NIP" }
            ]
        } );
    });
}

function createKontrahentTableEvents() {
    $('#kontrahent-table').on('click', 'tbody tr', function(){
        var table =  $('#kontrahent-table').dataTable();
        var row = table.fnGetData(this);
        var response = getKontrahentDataForForm(row[0]);
        kontrahentObjectToForm(response);
    })
}

function reinitializeKontrahentTable() {
    $('#kontrahent-table').DataTable().destroy();
    createKontrahentTable();
}

function clearKontrahentForm() {
    document.getElementById('kontrahent-id').value = null;
    document.getElementById('kontrahent-nazwa').value = null;
    document.getElementById('kontrahent-adres').value = null;
    document.getElementById('kontrahent-nip').value = null;
}

function kontrahentFormToObject() {
    return {
        id: document.getElementById('kontrahent-id').value,
        nazwa: document.getElementById('kontrahent-nazwa').value,
        adres: document.getElementById('kontrahent-adres').value,
        nip: document.getElementById('kontrahent-nip').value
    }
}

function kontrahentObjectToForm(data) {
    document.getElementById('kontrahent-id').value = data.id;
    document.getElementById('kontrahent-nazwa').value = data.nazwa;
    document.getElementById('kontrahent-adres').value = data.adres;
    document.getElementById('kontrahent-nip').value = data.nip;
}

function convertKontrahentDataForTable(objectList) {
    var arrayList = [];
    for (var i = 0; i < objectList.length; i++) {
        var record = [
            objectList[i].id,
            objectList[i].nazwa,
            objectList[i].adres,
            objectList[i].nip
        ];
        arrayList[i] = record;
    }
    return arrayList;
}

// ----------------------- KOMUNIKACJA -----------------------------

function getKontrahentDataForForm(id) {
    var url = HOST + '/api/kontrahent/findOne';
    var params = '?id=' + id;
    var response = httpGet(url + params);
    return JSON.parse(response);
}

function getKontrahentDataForTable() {
    var url = HOST + '/api/kontrahent/findAll';
    var response = httpGet(url);
    kontrahentTableData = JSON.parse(response);
    reinitializeKontrahentTable();
}

function saveKontrahentForm() {
    var formData = kontrahentFormToObject();
    var url = HOST + '/api/kontrahent/save';
    var response = httpPost(url, formData);
    var responseObject = JSON.parse(response);
    document.getElementById('kontrahent-id').value = responseObject.id;
    getKontrahentDataForTable();
}

function deleteSelectedKontrahent() {
    var id = document.getElementById('kontrahent-id').value;
    var url = HOST + '/api/kontrahent/deleteOne';
    var params = '?id=' + document.getElementById('kontrahent-id').value;
    httpGet(url + params);
    clearKontrahentForm();
    getKontrahentDataForTable();
}