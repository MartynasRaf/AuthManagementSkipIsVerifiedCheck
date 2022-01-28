var url = new URL(window.location.href);
var token = url.searchParams.get("token");
var obj = {
  action: "resetPwdLong",
  value: { token, password: "123" },
};
console.log(JSON.stringify(obj));
console.log(obj);
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 201) {
    // Typical action to be performed when the document is ready:
    document.getElementById("info").innerHTML =
      "Reset Successful for action <b>" +
      obj.action +
      "</b> and token <b>" +
      obj.value +
      "</b>";
  } else {
    document.getElementById("info").innerHTML = xhttp.response;
  }
};
xhttp.open("POST", "http://localhost:3030/authmanagement", true);
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.send(JSON.stringify(obj));
