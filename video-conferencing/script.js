function openCallPopup() {
document.getElementById("callPopup").style.display = "block";
}

function closePopup() {
document.getElementById("callPopup").style.display = "none";
document.getElementById("scheduleFields").style.display = "none";
document.getElementById("scheduleTime").value = "";
}

function callImmediately() {
alert("Starting your call...");
closePopup();
}

function showScheduler() {
document.getElementById("scheduleFields").style.display = "block";
}

function confirmScheduledCall() {
const date = document.getElementById("scheduleTime").value;
if (!date) {
  alert("Please select a date and time.");
  return;
}
alert("Call scheduled for: " + new Date(date).toLocaleString());
closePopup();
}
