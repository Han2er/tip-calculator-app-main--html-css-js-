const bill = document.getElementById("bill");
const customTip = document.getElementById("custom-tip");
const numberOfPeople = document.getElementById("number-of-people");
const tips = document.getElementById("tip");
const tipAmount = document.getElementById("tip-amount");
const total = document.getElementById("total");
const zeroError = document.getElementById("zero");
const reset = document.getElementById("reset");

const showTip = document.getElementById("show-tip");

zeroError.classList.add("invisible");

resetCalc();

// bill.value = 100;
// customTip.value = 20;
// numberOfPeople.value = 7;

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
  if (val > 0) {
    // localStorage.setItem("tip_", val);
    console.log(val);
  } else {
    val = e.target.innerText.split("");
    val.pop();
    val = val.join("");
  }
  localStorage.setItem("tip_", val);
  update();
});

bill.addEventListener("change", function (e) {
  localStorage.setItem("bill_", e.target.value);
  update();
});

const update = () => {
  let val1, val2;
  let bill_ = parseInt(localStorage.getItem("bill_"));
  let tip_ = parseInt(localStorage.getItem("tip_"));
  let nPeople_ = parseInt(localStorage.getItem("nPeople_"));
  val1 = (bill_ * tip_) / 100 + bill_;
  val2 = val1 / nPeople_;

  showTip.innerHTML = `Tip: ${tip_}%`;
  if (bill_ <= 0 || nPeople_ <= 0) {
    total.innerHTML = "$0.00";
    tipAmount.innerHTML = "$0.00";
    return;
  }

  total.innerHTML = `$${val1.toFixed(2)}`;
  tipAmount.innerHTML = `$${val2.toFixed(2)}`;
};

reset.addEventListener("click", resetCalc);

function resetCalc() {
  localStorage.setItem("bill_", 0);
  localStorage.setItem("tip_", 0);
  localStorage.setItem("nPeople_", 0);
}
