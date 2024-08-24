const adaugaLocalStorage = document.querySelector("#adauga-local-storage");
const numeLocalStorage = document.querySelector("#nume-local-storage");
const notaStudent = document.querySelector("#nota-student-input");
const tabelStudenti = document.querySelector("#tabel-studenti");
let studentiSalvati = JSON.parse(localStorage.getItem("student"))
  ? JSON.parse(localStorage.getItem("student"))
  : [];
populateList(studentiSalvati, tabelStudenti);

adaugaLocalStorage.addEventListener("click", () => {
  const nota = parseInt(notaStudent.value);
  if (numeLocalStorage.value == "" || !Number.isInteger(nota)) {
    alert("Date invalide");
    return;
  }
  let pair = {
    nume: numeLocalStorage.value,
    nota: nota,
  };
  const row = createRow(pair);
  const tbody = tabelStudenti.getElementsByTagName("tbody")[0];
  tbody.appendChild(row);
  studentiSalvati.push(pair);
  localStorage.setItem("student", JSON.stringify(studentiSalvati));
  numeLocalStorage.value = "";
  notaStudent.value = "";
});
const numeCrescator = document.querySelector("#nume-crescator");
numeCrescator.addEventListener("click", () => {
  studentiSalvati.sort((a, b) => a.nume.localeCompare(b.nume));
  localStorage.setItem("student", JSON.stringify(studentiSalvati));
  populateList(studentiSalvati, tabelStudenti);
});
const numeDescrescator = document.querySelector("#nume-descrescator");
numeDescrescator.addEventListener("click", () => {
  studentiSalvati.sort((a, b) => a.nume.localeCompare(b.nume));
  studentiSalvati.reverse();
  localStorage.setItem("student", JSON.stringify(studentiSalvati));

  populateList(studentiSalvati, tabelStudenti);
});
const notaCrescator = document.querySelector("#nota-crescator");
notaCrescator.addEventListener("click", () => {
  studentiSalvati.sort((a, b) => a.nota - b.nota);
  localStorage.setItem("student", JSON.stringify(studentiSalvati));

  populateList(studentiSalvati, tabelStudenti);
});
const notaDescrescator = document.querySelector("#nota-descrescator");
notaDescrescator.addEventListener("click", () => {
  studentiSalvati.sort((a, b) => b.nota - a.nota);
  localStorage.setItem("student", JSON.stringify(studentiSalvati));

  populateList(studentiSalvati, tabelStudenti);
});
const deleteButon = document.querySelector("#delete");
deleteButon.addEventListener("click", () => {
  if (numeLocalStorage.value == "") {
    alert("Date invalide");
    return;
  }
  studentiSalvati = studentiSalvati.filter(
    (item) => item.nume !== numeLocalStorage.value
  );
  localStorage.setItem("student", JSON.stringify(studentiSalvati));
  populateList(studentiSalvati, tabelStudenti);
});

function populateList(studentiSalvati, tabelStudenti) {
  const tbody = tabelStudenti.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
  if (studentiSalvati.length > 0) {
    studentiSalvati.forEach((item) => {
      const row = createRow(item);

      tbody.appendChild(row);
    });
  }
}
function createRow(item) {
  let row = document.createElement("tr");
  let nameCell = document.createElement("td");
  nameCell.textContent = item.nume;
  row.appendChild(nameCell);
  let valueCell = document.createElement("td");
  valueCell.textContent = item.nota;
  row.appendChild(valueCell);
  return row;
}
