// ----------------------- WIDOK -----------------------------

// miejsce na liste danych
var testAnimalTableData = [];

// tworzenie jquery datatable
function createTestAnimalTable() {
    $(document).ready(function() {
        $('#test-animal-table').DataTable( {
            data: convertTestAnimalDataForTable(testAnimalTableData),
            columns: [
                { title: "Id" },
                { title: "Gatunek" },
                { title: "Rasa" },
                { title: "Imię" },
                { title: "Wiek" }
            ]
        } );
    });
}

// ustawianie reakcji na klikniecie: pobranie danych dla wskazanego wiersza (po ID) i uzupelnienie formularza pobranymi danymi
function createTestAnimalTableEvents() {
    $('#test-animal-table').on('click', 'tbody tr', function(){
        var table =  $('#test-animal-table').dataTable();
        var row = table.fnGetData(this);
        var response = getTestAnimalDataForForm(row[0]); // jezeli wszystko poszlo dobrze, w kolumnie 0 powinien znajdowac sie ID
        testAnimalObjectToForm(response);
    })
}

// odswiezenie tabeli
function reinitializeTestAnimalTable() {
    $('#test-animal-table').DataTable().destroy();
    createTestAnimalTable();
}

// czyszczenie formularza
function clearTestAnimalForm() {
    document.getElementById('test-animal-id').value = null;
    document.getElementById('test-animal-name').value = null;
    document.getElementById('test-animal-lastname').value = null;
    document.getElementById('test-animal-login').value = null;
    document.getElementById('test-animal-password').value = null;
    document.getElementById('test-animal-email').value = null;
}

// przepisanie formularza do obiektu
function testAnimalFormToObject() {
    return {
        id: document.getElementById('test-animal-id').value,
        name: document.getElementById('test-animal-name').value,
        lastname: document.getElementById('test-animal-lastname').value,
        login: document.getElementById('test-animal-login').value,
        password: document.getElementById('test-animal-password').value,
        email: document.getElementById('test-animal-email').value
    }
}

// przepisanie obiektu do formularza
function testAnimalObjectToForm(animal) {
    document.getElementById('test-animal-id').value = animal.id;
    document.getElementById('test-animal-name').value = animal.name;
    document.getElementById('test-animal-lastname').value = animal.lastname;
    document.getElementById('test-animal-login').value = animal.login;
    document.getElementById('test-animal-password').value = animal.password;
    document.getElementById('test-animal-email').value = animal.email;
}

// konwersja listy obiektow do listy tablic (wymagane przez datatables)
function convertTestAnimalDataForTable(objectList) {
    var arrayList = [];
    for (var i = 0; i < objectList.length; i++) {
        var record = [objectList[i].id, objectList[i].name, objectList[i].lastname, objectList[i].login, timestampToStringDate(objectList[i].creationDate)];
        arrayList[i] = record;
    }
    return arrayList;
}

// ----------------------- KOMUNIKACJA -----------------------------

// pobranie pojedynczego rekordu po id z serwera
function getTestAnimalDataForForm(id) {
    // TODO
    return JSON.parse(response);
}

// pobranie wszystkich rekordow z serwera i odswiezenie tabeli
function getTestAnimalDataForTable() {
    // TODO
    reinitializeTestAnimalTable();
}

// zapis danych z formularza na serwerze, operacja zapisu na serwerze zwraca swiezo zapisany obiekt,
// z ktorego ID jest przepisywane do formularza, nastepuje tez odswiezenie tabeli
function saveTestAnimalForm() {
    // TODO
    getTestAnimalDataForTable();
}

// usuniecie z serwera rekordu obecnie wybranego w formularzu (po ID) i odswiezenie tabeli
function deleteSelectedTestAnimal() {
    // TODO
    clearTestAnimalForm();
    getTestAnimalDataForTable();
}