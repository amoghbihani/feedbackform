function load() {
  getStudentAttendance();
  getResponses();
}

function getStudentAttendance() {
  httpRequestGet(mUrl + "/students", "", function(response) {
    var responseArray = JSON.parse(response);
    for (var i = 0; i < responseArray.length; ++i) {
      var tr = document.createElement("tr");
      
      var td2 = document.createElement("td");
      var div = document.createElement("div");
      div.innerHTML = " ";
      if (responseArray[i].responded == 1) {
        div.className = "circle yes";
      } else {
        div.className = "circle no";
      }
      td2.appendChild(div);
      tr.appendChild(td2);
      
      var td1 = document.createElement("td");
      td1.innerHTML = responseArray[i].pgpid;
      tr.appendChild(td1);

      document.getElementById("attendance-table").appendChild(tr);
    }
  });
}

function getResponses() {
  httpRequestGet(mUrl + "/response", "", function(response) {
    var responseArray = JSON.parse(response);
    for (var i = 0; i  < responseArray.length; ++i) {
      var poor = responseArray[i].poor;
      var fair = responseArray[i].fair;
      var good = responseArray[i].good;
      var verygood = responseArray[i].verygood;
      var excellent = responseArray[i].excellent;
      var total = poor + fair + good + verygood + excellent;

      var quesDiv = document.createElement("div");
      quesDiv.innerHTML = mQuestions[responseArray[i].qno];
      quesDiv.className = "question";
      console.log(mQuestions[responseArray[i].qno]);
      document.getElementById("response-charts").appendChild(quesDiv);

      var table = document.createElement("table");
      table.className = "response-table";
      var tr1 = document.createElement("tr");
      var td11 = document.createElement("td");
      td11.innerHTML = "Poor";
      var td12 = document.createElement("td");
      td12.innerHTML = poor;
      var td13 = document.createElement("td");
      td13.style.background = "linear-gradient(to right, #388e3c 0%,"
          + " #388e3c " + poor / total * 100 + "%,"
          + " white " + poor / total * 100 + "%,"
          + " white 100%";
      td13.className = "response-slider";
      tr1.appendChild(td11);
      tr1.appendChild(td13);
      tr1.appendChild(td12);
      table.appendChild(tr1);

      var tr2 = document.createElement("tr");
      var td21 = document.createElement("td");
      td21.innerHTML = "Fair";
      var td22 = document.createElement("td");
      td22.innerHTML = fair;
      var td23 = document.createElement("td");
      td23.style.background = "linear-gradient(to right, #388e3c 0%,"
          + " #388e3c " + fair / total * 100 + "%,"
          + " white " + fair / total * 100 + "%,"
          + " white 100%";
      td23.className = "response-slider";
      tr2.appendChild(td21);
      tr2.appendChild(td23);
      tr2.appendChild(td22);
      table.appendChild(tr2);

      var tr3 = document.createElement("tr");
      var td31 = document.createElement("td");
      td31.innerHTML = "Good";
      var td32 = document.createElement("td");
      td32.innerHTML = good;
      var td33 = document.createElement("td");
      td33.style.background = "linear-gradient(to right, #388e3c 0%,"
          + " #388e3c " + good / total * 100 + "%,"
          + " white " + good / total * 100 + "%,"
          + " white 100%";
      td33.className = "response-slider";
      tr3.appendChild(td31);
      tr3.appendChild(td33);
      tr3.appendChild(td32);
      table.appendChild(tr3);

      var tr4 = document.createElement("tr");
      var td41 = document.createElement("td");
      td41.innerHTML = "Very Good";
      var td42 = document.createElement("td");
      td42.innerHTML = verygood;
      var td43 = document.createElement("td");
      td43.style.background = "linear-gradient(to right, #388e3c 0%,"
          + " #388e3c " + verygood / total * 100 + "%,"
          + " white " + verygood / total * 100 + "%,"
          + " white 100%";
      td43.className = "response-slider";
      tr4.appendChild(td41);
      tr4.appendChild(td43);
      tr4.appendChild(td42);
      table.appendChild(tr4);

      var tr5 = document.createElement("tr");
      var td51 = document.createElement("td");
      td51.innerHTML = "Excellent";
      var td52 = document.createElement("td");
      td52.innerHTML = excellent;
      var td53 = document.createElement("td");
      td53.style.background = "linear-gradient(to right, #388e3c 0%,"
          + " #388e3c " + excellent / total * 100 + "%,"
          + " white " + excellent / total * 100 + "%,"
          + " white 100%";
      td53.className = "response-slider";
      tr5.appendChild(td51);
      tr5.appendChild(td53);
      tr5.appendChild(td52);
      table.appendChild(tr5);

      document.getElementById("response-charts").appendChild(table);
    }
  });
}
