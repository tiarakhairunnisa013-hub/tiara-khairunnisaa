// =========================
// FILE : js/utils.js
// =========================

// filter data
function filterStudents(keyword, gender){

    return students.filter(student => {

        const matchName =
            student.nama
            .toLowerCase()
            .includes(keyword.toLowerCase());

        const matchNim =
            student.nim.includes(keyword);

        const matchGender =
            gender === "all" ||
            student.gender === gender;

        return (matchName || matchNim) && matchGender;

    });

}
