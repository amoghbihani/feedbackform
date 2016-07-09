var mUserName;

function createQuestions() {
  for (var i = 0; i < mQuestions.length; ++i) {
    var feedbackQuestion = document.createElement("div");
    feedbackQuestion.className = "feedback-question";

    var question = document.createElement("div");
    question.className = "question";
    question.innerHTML = mQuestions[i];
    feedbackQuestion.appendChild(question);

    var options = document.createElement("div");
    options.className = "options";

    var label1 = document.createElement("label");
    var input1 = document.createElement("input");
    input1.type = "radio";
    input1.name = "rating" + i;
    input1.id = "qa" + i;
    input1.value = "poor";
    label1.appendChild(input1);
    label1.appendChild(document.createTextNode(" Poor"));
    label1.appendChild(document.createElement("br"));
    options.appendChild(label1);

    var label2 = document.createElement("label");
    var input2 = document.createElement("input");
    input2.type = "radio";
    input2.name = "rating" + i;
    input2.id = "qb" + i;
    input2.value = "fair";
    label2.appendChild(input2);
    label2.appendChild(document.createTextNode(" Fair"));
    label2.appendChild(document.createElement("br"));
    options.appendChild(label2);

    var label3 = document.createElement("label");
    var input3 = document.createElement("input");
    input3.type = "radio";
    input3.name = "rating" + i;
    input3.id = "qc" + i;
    input3.value = "good";
    input3.checked = "true";
    label3.appendChild(input3);
    label3.appendChild(document.createTextNode(" Good"));
    label3.appendChild(document.createElement("br"));
    options.appendChild(label3);

    var label4 = document.createElement("label");
    var input4 = document.createElement("input");
    input4.type = "radio";
    input4.name = "rating" + i;
    input4.id = "qd" + i;
    input4.value = "very-good";
    label4.appendChild(input4);
    label4.appendChild(document.createTextNode(" Very Good"));
    label4.appendChild(document.createElement("br"));
    options.appendChild(label4);

    var label5 = document.createElement("label");
    var input5 = document.createElement("input");
    input5.type = "radio";
    input5.name = "rating" + i;
    input5.id = "qe" + i;
    input5.value = "excellent";
    label5.appendChild(input5);
    label5.appendChild(document.createTextNode(" Excellent"));
    label5.appendChild(document.createElement("br"));
    options.appendChild(label5);

    feedbackQuestion.appendChild(options);
    document.getElementById("questions-block").appendChild(feedbackQuestion);
  }

  var submitButton = document.createElement("button");
  submitButton.innerHTML = "Submit";
  submitButton.addEventListener("click", submit);
  document.getElementById("questions-block").appendChild(submitButton);
}

function login() {
  mUserName = document.getElementById("user-name").value;
  document.getElementById("user-image").style = "display:block";
  document.getElementById("welcome-user").innerHTML = "Welcome " + mUserName;
  document.getElementById("login-form").style = "display:none";
  document.getElementById("questions-block").style = "";
  createQuestions();
}

function submit() {
  result = "id=" + mUserName;
  for (var i = 0; i < mQuestions.length; ++i) {
    var value = "";
    if (document.getElementById("qa" + i).checked) {
      value = document.getElementById("qa" + i).value;
    } else if (document.getElementById("qb" + i).checked) {
      value = document.getElementById("qb" + i).value;
    } else if (document.getElementById("qc" + i).checked) {
      value = document.getElementById("qc" + i).value;
    } else if (document.getElementById("qd" + i).checked) {
      value = document.getElementById("qd" + i).value;
    } else if (document.getElementById("qe" + i).checked) {
      value = document.getElementById("qe" + i).value;
    }
    result += "&" + i + "=" + value;
  }
  console.log(result);
  var header = [
    {
      type: "Content-type",
      value: "application/x-www-form-urlencoded",
    }
  ];

  httpRequestPost(mUrl + "/data", header, result, function() {
    document.getElementById("questions-block").style = "display:none";
    document.getElementById("last-page").style = "";
  });
}
