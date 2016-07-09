function httpRequestGet(url, header, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  httpRequest(xhr, header, "", callback);
}

function httpRequestPost(url, header, body, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  httpRequest(xhr, header, body, callback);
}

function httpRequestPut(url, header, body, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', url, true);
  httpRequest(xhr, header, body, callback);
}

function httpRequestDelete(url, header, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('DELETE', url, true);
  httpRequest(xhr, header, "", callback);
}

function httpRequest(xhr, header, body, callback) {
  showLoadingSpinner(true);
  for (var i = 0; i < header.length; ++i) {
    xhr.setRequestHeader(header[i].type, header[i].value);
  }
  xhr.onload = function() {
    showLoadingSpinner(false);
    if (parseInt(xhr.status / 10) == 20) {
      console.log("http request successful");
      callback(xhr.response);
    } else {
      console.log("error receiving response" + xhr.response);
    }
  }
  xhr.send(body);
}

var mLoadingSpinner;
function showLoadingSpinner(show) {
  return; // disabling spinner temporarily.
  if (mLoadingSpinner == undefined) {
    createLoadingSpinner();
  }
  try {
    if (show) {
      document.body.appendChild(mLoadingSpinner);
    } else {
      document.body.removeChild(mLoadingSpinner);
    }
  } catch (error) {
    console.log(error);
  }
}

function createLoadingSpinner() {
  var loadingImage = document.createElement("img");
  loadingImage.src = "res/loading.gif";
  loadingImage.style.width = "100%";

  mLoadingSpinner = document.createElement("div");
  mLoadingSpinner.style.background = "#d32f2f";
  mLoadingSpinner.style.borderRadius = "4px";
  mLoadingSpinner.style.width = "10%";
  mLoadingSpinner.style.padding = "3%";
  mLoadingSpinner.style.position = "fixed";
  mLoadingSpinner.style.top = "42%";
  mLoadingSpinner.style.left = "42%";
  mLoadingSpinner.appendChild(loadingImage);
}
