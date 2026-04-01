const user = JSON.parse(localStorage.getItem("user"));

if(user){
  const status = new Date(user.expiryDate) > new Date() ? "Active ✅" : "Expired ❌";
  document.getElementById("status").innerText = status;
}