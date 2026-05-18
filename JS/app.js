// =========================
// FILE : js/app.js
// =========================

// =========================
// STATE
// =========================
let currentPage = 1;
const rowsPerPage = 5;

let editMode = false;
let oldNim = null;

// =========================
// ELEMENT
// =========================
const form = document.getElementById("studentForm");

const tableBody =
document.getElementById("studentTableBody");

const searchInput =
document.getElementById("searchInput");

const filterGender =
document.getElementById("filterGender");

const submitBtn =
document.getElementById("submitBtn");

const cancelBtn =
document.getElementById("cancelBtn");

const themeBtn =
document.getElementById("themeToggleBtn");

// =========================
// RENDER TABLE
// =========================
function renderTable(){

    tableBody.innerHTML = "";

    // filter
    let filteredData = filterStudents(
        searchInput.value,
        filterGender.value
    );

    // pagination
    let totalPages =
    Math.ceil(filteredData.length / rowsPerPage);

    if(totalPages === 0){
        totalPages = 1;
    }

    let start =
    (currentPage - 1) * rowsPerPage;

    let end =
    start + rowsPerPage;

    let data =
    filteredData.slice(start, end);

    // empty data
    if(data.length === 0){

        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center">
                    Data mahasiswa belum tersedia
                </td>
            </tr>
        `;

        renderPagination(totalPages);

        return;
    }

    // tampilkan data
    data.forEach((student, index) => {

        tableBody.innerHTML += `
            <tr>

                <td>${start + index + 1}</td>

                <td>${student.nim}</td>

                <td>${student.nama}</td>

                <td>${student.gender}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editStudent('${student.nim}')"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteStudent('${student.nim}')"
                    >
                        Hapus
                    </button>

                </td>

            </tr>
        `;
    });

    renderPagination(totalPages);

}

// =========================
// PAGINATION
// =========================
function renderPagination(totalPages){

    const container =
    document.getElementById(
        "paginationContainer"
    );

    container.innerHTML = "";

    for(let i = 1; i <= totalPages; i++){

        const btn =
        document.createElement("button");

        btn.innerText = i;

        if(i === currentPage){
            btn.classList.add("active");
        }

        btn.addEventListener("click", () => {

            currentPage = i;

            renderTable();

        });

        container.appendChild(btn);

    }

}

// =========================
// SUBMIT FORM
// =========================
form.addEventListener("submit", function(e){

    e.preventDefault();

    // ambil data form
    const student = {

        nim :
        document.getElementById("nim").value,

        nama :
        document.getElementById("nama").value,

        alamat :
        document.getElementById("alamat").value,

        gender :
        document.querySelector(
            "input[name='gender']:checked"
        ).value,

        password :
        document.getElementById("password").value

    };

    // validasi password
    if(student.password.length < 6){

        alert("Password minimal 6 karakter");

        return;
    }

    // tambah data
    if(!editMode){

        if(isDuplicate(student.nim)){

            alert("NIM sudah digunakan");

            return;

        }

        students.push(student);

        alert("Data berhasil ditambahkan");

    }else{

        // update data
        students = students.map(item => {

            if(item.nim === oldNim){

                return student;

            }

            return item;

        });

        editMode = false;
        oldNim = null;

        submitBtn.innerText =
        "Simpan Data";

        cancelBtn.classList.add("hidden");

        alert("Data berhasil diperbarui");

    }

    saveData();

    form.reset();

    renderTable();

});

// =========================
// EDIT DATA
// =========================
function editStudent(nim){

    const student =
    students.find(item => item.nim === nim);

    // isi form
    document.getElementById("nim").value =
    student.nim;

    document.getElementById("nama").value =
    student.nama;

    document.getElementById("alamat").value =
    student.alamat;

    document.getElementById("password").value =
    student.password;

    document.querySelector(
        `input[value="${student.gender}"]`
    ).checked = true;

    editMode = true;

    oldNim = nim;

    submitBtn.innerText =
    "Update Data";

    cancelBtn.classList.remove("hidden");

}

// =========================
// DELETE DATA
// =========================
function deleteStudent(nim){

    const confirmDelete =
    confirm("Yakin ingin menghapus data?");

    if(confirmDelete){

        students =
        students.filter(
            student => student.nim !== nim
        );

        saveData();

        renderTable();

        alert("Data berhasil dihapus");

    }

}

// =========================
// CANCEL EDIT
// =========================
cancelBtn.addEventListener("click", () => {

    editMode = false;

    oldNim = null;

    form.reset();

    submitBtn.innerText =
    "Simpan Data";

    cancelBtn.classList.add("hidden");

});

// =========================
// SEARCH
// =========================
searchInput.addEventListener("input", () => {

    currentPage = 1;

    renderTable();

});

// =========================
// FILTER
// =========================
filterGender.addEventListener("change", () => {

    currentPage = 1;

    renderTable();

});

// =========================
// DARK MODE
// =========================
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeBtn.innerText =
        "☀️ Light Mode";

    }else{

        themeBtn.innerText =
        "🌙 Dark Mode";

    }

});

// =========================
// START
// =========================
renderTable();
