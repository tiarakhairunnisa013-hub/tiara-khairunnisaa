// =========================
// FILE : js/storage.js
// =========================

// mengambil data dari localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];

// menyimpan data
function saveData(){

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}

// cek nim duplicate
function isDuplicate(nim){

    return students.some(student => student.nim === nim);

}
