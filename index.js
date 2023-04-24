let exams = JSON.parse(localStorage.getItem("Exam Data")) || [];

const submitExam = document.getElementById("submitExamSection");

console.log(exams, "Exam Data");
submitExam.addEventListener("click", () => {
    let examData = {
        name: document.getElementById("exam-Name").value,
        description: document.getElementById("description").value,
        time: document.getElementById("time").value,
    };
    examCreateData(examData);
});
function examCreateData(examData) {
    let name, description, time;
    if (examData) {
        if (examData.name === "") {
            document.getElementById("exam-Name").style.border = "3px solid red";
            document.getElementById("error-exam-Name").innerHTML =
                "Please Enter Exam Name";
            document.getElementById("error-exam-Name").style.color = "red";
        } else {
            name = 1;
        }
        if (examData.description === "") {
            document.getElementById("description").style.border = "3px solid red";
            document.getElementById("error-exam-description").innerHTML =
                "Please Enter Exam Description";
            document.getElementById("error-exam-description").style.color = "red";
        } else {
            description = 1;
        }
        if (examData.time == 0) {
            document.getElementById("time").style.border = "3px solid red";
            document.getElementById("error-exam-time").innerHTML =
                "Please Enter Exam Time";
            document.getElementById("error-exam-time").style.color = "red";
        } else {
            time = 1;
        }
        if (name && description && time === 1) {
            exams.push(examData);
            localStorage.setItem("Exam Data", JSON.stringify(exams));
            closeModal();
        }
    }
}

let tbody = document.querySelector("tbody");
exams.map((item) => {
    if (item) {
        tbody.innerHTML += `
          <tr>
          <td>${item.name}</td>
          <td>${item.description}</td>
          <td>${item.time}</td>
          <td>
          <button class="button" onclick="startExamButton('${item.name}','${item.description}','${item.time}')">Start Now</button>
          </td>
          </tr>
          `;
    }
});

function startExamButton(name, description, time) {
    let username = exams.find((item) => item.name === name);
    console.log(username);
    Swal.fire({
        title: "Are you sure?",
        text: `You Want To Start This Exam `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Start It!",
    }).then((result) => {
        if (result.isConfirmed) {
            var uname = username.name;
            var url = "exam.html";
            url += "?userName=" + encodeURIComponent(uname);
            window.location.href = url;
        }
    });
}

var closeModal = function () {
    document.getElementById("form").reset();
    document.getElementById("description").style.border = "none";
    document.getElementById("error-exam-description").style.display ="none";
    document.getElementById("exam-Name").style.border = "none";
    document.getElementById("error-exam-Name").style.display ="none";
    document.getElementById("time").style.border = "none";
    document.getElementById("error-exam-time").style.display ="none";
    $("#exampleModal").modal("hide");
};
