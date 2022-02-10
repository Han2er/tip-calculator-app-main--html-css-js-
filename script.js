// all elements
const bill = document.getElementById("bill");
const customTip = document.getElementById("custom-tip");
const numberOfPeople = document.getElementById("number-of-people");
const tips = document.getElementById("tip");
const tipAmount = document.getElementById("tip-amount");
const total = document.getElementById("total");
const zeroError = document.getElementById("zero");
const reset = document.getElementById("reset");
// all elements

zeroError.classList.add("invisible"); //set warn zero

resetCalc(); //reset everything at the begining

//add event listeners
numberOfPeople.addEventListener("change", function (e) {
  if (e.target.value <= 0) {
    e.target.classList.add("red-border");
    zeroError.classList.remove("invisible");
  } else {
    e.target.classList.remove("red-border");
    zeroError.classList.add("invisible");
  }
  localStorage.setItem("nPeople_", e.target.value);
  update();
});

tips.addEventListener("click", function (e) {
  let val = e.target.value;

  if (!val) {
    val = e.target.innerText.split("");
    val.pop();
    val = val.join("");
  }
  localStorage.setItem("tip_", val);
  update();

  for (let i = 0; i < tips.childElementCount - 1; i++) {
    tips.children[i].removeAttribute("style");
  }
  tips.children[5].children[0].removeAttribute("style");
  e.target.style.backgroundColor = "#26c0ab";
});

bill.addEventListener("change", function (e) {
  localStorage.setItem("bill_", e.target.value);
  update();
});

reset.addEventListener("click", resetCalc);

//update function
const update = () => {
  let val1, val2;
  let bill_ = parseFloat(localStorage.getItem("bill_"));
  let tip_ = parseFloat(localStorage.getItem("tip_"));
  let nPeople_ = parseFloat(localStorage.getItem("nPeople_"));
  val1 = ((bill_ * tip_) / 100 + bill_) / nPeople_;
  val2 = (bill_ * tip_) / 100 / nPeople_;

  if (bill_ <= 0 || nPeople_ <= 0) {
    total.innerHTML = "$0.00";
    tipAmount.innerHTML = "$0.00";
    return;
  }

  total.innerHTML = `$${val1.toFixed(2)}`;
  tipAmount.innerHTML = `$${val2.toFixed(2)}`;
};

//reset function
function resetCalc() {
  localStorage.setItem("bill_", 0);
  localStorage.setItem("tip_", 0);
  localStorage.setItem("nPeople_", 0);
}
