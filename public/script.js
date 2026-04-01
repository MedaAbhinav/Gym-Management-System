// ================= API =================
const API = "http://localhost:5000/api";

// ================= CURRENT USER =================
const currentUser = JSON.parse(localStorage.getItem("user"));


// ================= LOGIN =================
function login(){
  const role = document.getElementById("role")?.value;
  const username = document.getElementById("username")?.value;

  if(!username){
    alert("Enter username");
    return;
  }

  // ADMIN LOGIN
  if(role === "admin"){
    if(username === "admin"){
      window.location.href = "dashboard.html";
    } else {
      alert("Wrong admin login");
    }
  }

  // MEMBER LOGIN
  else {
    fetch(API + "/member/" + username)
      .then(res => res.json())
      .then(data => {
        if(data){
          localStorage.setItem("user", JSON.stringify(data));
          window.location.href = "member.html";
        } else {
          alert("Member not found");
        }
      })
      .catch(() => alert("Server error"));
  }
}


// ================= ADD MEMBER (ADMIN) =================
function add(){
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const plan = document.getElementById("plan").value;

  if(!name || !age){
    alert("Fill all fields");
    return;
  }

  fetch(API + "/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, age, plan })
  })
  .then(() => {
    alert("Member Added ✅");
    load();
  });
}


// ================= LOAD MEMBERS =================
function load(){
  fetch(API + "/all")
    .then(res => res.json())
    .then(data => {

      const list = document.getElementById("list");
      if(!list) return;

      list.innerHTML = "";

      data.forEach(m => {
        list.innerHTML += `
          <tr>
            <td>${m.name}</td>
            <td>${m.plan}</td>
          </tr>
        `;
      });

      // Dashboard count
      const totalEl = document.getElementById("total");
      if(totalEl) totalEl.innerText = data.length;
    });
}


// ================= SELECT EXERCISE =================
function selectExercise(name){
  localStorage.setItem("exercise", name);
  window.location = "exercise-details.html";
}


// ================= CALORIES =================
function calcCalories(sets){
  return sets * 5;
}


// ================= SAVE DAILY (USER BASED) =================
function saveDay(){
  if(!currentUser){
    alert("Login first");
    return;
  }

  const ex1 = document.getElementById("ex1").value;
  const set1 = document.getElementById("set1").value;

  const ex2 = document.getElementById("ex2").value;
  const set2 = document.getElementById("set2").value;

  if(!set1 || !set2){
    alert("Enter both sets");
    return;
  }

  const cal1 = calcCalories(set1);
  const cal2 = calcCalories(set2);
  const total = cal1 + cal2;

  // show calories instantly
  const calEl = document.getElementById("cal");
  if(calEl) calEl.innerText = total;

  const data = {
    ex1, set1,
    ex2, set2,
    total,
    date: new Date().toLocaleDateString()
  };

  // 🔥 USER BASED STORAGE
  const key = "progress_" + currentUser.name;

  let history = JSON.parse(localStorage.getItem(key)) || [];
  history.push(data);

  localStorage.setItem(key, JSON.stringify(history));

  alert("Saved successfully ✅");

  loadDashboard(); // update instantly
}


// ================= DASHBOARD (USER BASED) =================
function loadDashboard(){
  if(!currentUser) return;

  const key = "progress_" + currentUser.name;

  let history = JSON.parse(localStorage.getItem(key)) || [];

  let totalCal = 0;
  let totalSets = 0;

  history.forEach(h => {
    totalCal += h.total || 0;
    totalSets += Number(h.set1 || 0) + Number(h.set2 || 0);
  });

  const calEl = document.getElementById("totalCal");
  const setEl = document.getElementById("totalSets");

  if(calEl) calEl.innerText = totalCal;
  if(setEl) setEl.innerText = totalSets;
}


// ================= SHOW USER NAME =================
if(currentUser && document.getElementById("welcome")){
  document.getElementById("welcome").innerText =
    "Welcome " + currentUser.name + " 👋";
}


// ================= LOGOUT =================
function logout(){
  localStorage.removeItem("user"); // clear session
  window.location.href = "login.html"; // redirect
}


// ================= AUTO LOAD =================
load();
loadDashboard();