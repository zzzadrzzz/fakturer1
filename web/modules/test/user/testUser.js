// ----------------------- WIDOK -----------------------------

// miejsce na liste danych
var testUserTableData = [];

// tworzenie jquery datatable
function createTestUserTable() {
    $(document).ready(function() {
        $('#test-user-table').DataTable( {
            data: convertTestUserDataForTable(testUserTableData),
            columns: [
                { title: "Id" },
                { title: "Imię" },
                { title: "Nazwisko" },
                { title: "Login" },
                { title: "Data utworzenia" }
            ]
        } );
    });
}

// ustawianie reakcji na klikniecie: pobranie danych dla wskazanego wiersza (po ID) i uzupelnienie formularza pobranymi danymi
function createTestUserTableEvents() {
    $('#test-user-table').on('click', 'tbody tr', function(){
        var table =  $('#test-user-table').dataTable();
        var row = table.fnGetData(this);
        var response = getTestUserDataForForm(row[0]); // jezeli wszystko poszlo dobrze, w kolumnie 0 powinien znajdowac sie ID
        testUserObjectToForm(response);
    })
}

// odswiezenie tabeli
function reinitializeTestUserTable() {
    $('#test-user-table').DataTable().destroy();
    createTestUserTable();
}

// czyszczenie formularza
function clearTestUserForm() {
    document.getElementById('test-user-id').value = null;
    document.getElementById('test-user-name').value = null;
    document.getElementById('test-user-lastname').value = null;
    document.getElementById('test-user-login').value = null;
    document.getElementById('test-user-password').value = null;
    document.getElementById('test-user-email').value = null;
}

// przepisanie formularza do obiektu
function testUserFormToObject() {
    return {
        id: document.getElementById('test-user-id').value,
        name: document.getElementById('test-user-name').value,
        lastname: document.getElementById('test-user-lastname').value,
        login: document.getElementById('test-user-login').value,
        password: document.getElementById('test-user-password').value,
        email: document.getElementById('test-user-email').value
    }
}

// przepisanie obiektu do formularza
function testUserObjectToForm(user) {
    document.getElementById('test-user-id').value = user.id;
    document.getElementById('test-user-name').value = user.name;
    document.getElementById('test-user-lastname').value = user.lastname;
    document.getElementById('test-user-login').value = user.login;
    document.getElementById('test-user-password').value = user.password;
    document.getElementById('test-user-email').value = user.email;
}

// konwersja listy obiektow do listy tablic (wymagane przez datatables)
function convertTestUserDataForTable(objectList) {
    var arrayList = [];
    for (var i = 0; i < objectList.length; i++) {
        var record = [objectList[i].id, objectList[i].name, objectList[i].lastname, objectList[i].login, timestampToStringDate(objectList[i].creationDate)];
        arrayList[i] = record;
    }
    return arrayList;
}

// ----------------------- KOMUNIKACJA -----------------------------

// pobranie pojedynczego rekordu po id z serwera
function getTestUserDataForForm(id) {
    var url = HOST + '/api/user/findOne';
    var params = '?id=' + id;
    var response = httpGet(url + params);
    return JSON.parse(response);
}

// pobranie wszystkich rekordow z serwera i odswiezenie tabeli
function getTestUserDataForTable() {
    var url = HOST + '/api/user/findAll';
    var response = httpGet(url);
    testUserTableData = JSON.parse(response);
    reinitializeTestUserTable();
}

// zapis danych z formularza na serwerze, operacja zapisu na serwerze zwraca swiezo zapisany obiekt,
// z ktorego ID jest przepisywane do formularza, nastepuje tez odswiezenie tabeli
function saveTestUserForm() {
    var formData = testUserFormToObject();
    var url = HOST + '/api/user/save';
    var response = httpPost(url, formData);
    var responseObject = JSON.parse(response);
    document.getElementById('test-user-id').value = responseObject.id;
    getTestUserDataForTable();
}

// usuniecie z serwera rekordu obecnie wybranego w formularzu (po ID) i odswiezenie tabeli
function deleteSelectedTestUser() {
    var id = document.getElementById('test-user-id').value;
    var url = HOST + '/api/user/deleteOne';
    var params = '?id=' + document.getElementById('test-user-id').value;
    httpGet(url + params);
    clearTestUserForm();
    getTestUserDataForTable();
}