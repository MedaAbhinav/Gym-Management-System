function register(){
  fetch(API + "/add", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      plan: "Pending",
      status: "Inactive"
    })
  }).then(()=>alert("Registered! Wait for admin approval"));
}