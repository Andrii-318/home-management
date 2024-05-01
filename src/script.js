class Person {
  constructor(name, gender) {
    this.name = name;
    this.gender = gender;
  }
}

class Apartment {
  constructor(id) {
    this.id = id;
    this.residents = [];
  }

  addResident(person) {
    if (person instanceof Person) {
      this.residents.push(person);
    } else {
      console.error("Тільки екземпляри класу Person можуть бути жителями.");
    }
  }
}

class Building {
  constructor(maxApartments) {
    this.apartments = [];
    this.maxApartments = maxApartments;
  }

  addApartment(apartment) {
    if (this.apartments.length < this.maxApartments) {
      this.apartments.push(apartment);
      updateApartmentSelect();
    } else {
      console.error("Досягнуто максимальної кількості квартир.");
    }
  }
}

let building = new Building(10);

function addPerson() {
  const name = document.getElementById("name").value;
  const gender = document.getElementById("gender").value;
  const selectedApartmentId = document.getElementById("apartmentSelect").value;
  const selectedApartment = building.apartments.find(
    (ap) => ap.id.toString() === selectedApartmentId
  );
  const person = new Person(name, gender);
  selectedApartment.addResident(person);
  updateResidentsList(selectedApartmentId);
}

function updateApartmentSelect() {
  const select = document.getElementById("apartmentSelect");
  select.innerHTML = building.apartments
    .map((ap) => `<option value="${ap.id}">Квартира ${ap.id}</option>`)
    .join("");
  select.onchange = () => updateResidentsList(select.value);
}

function updateResidentsList(apartmentId) {
  const selectedApartment = building.apartments.find(
    (ap) => ap.id.toString() === apartmentId
  );
  const residentsList = document.getElementById("residentsList");
  residentsList.innerHTML =
    `<h3>Жителі квартири ${apartmentId}:</h3>` +
    selectedApartment.residents
      .map((resident) => `<div>${resident.name} (${resident.gender})</div>`)
      .join("");
}

function addApartment() {
  const newApartment = new Apartment(building.apartments.length + 1);
  building.addApartment(newApartment);
}

function createBuilding() {
  building = new Building(5);
  console.log("Новий будинок створено з максимальною кількістю квартир: 5");
  updateApartmentSelect();
}
