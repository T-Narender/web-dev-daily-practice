let transactions = JSON.parse(localStorage.getItem("transactions")) || []

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions))
}


function addTransaction() {
  const desc = document.getElementById("desc").value.trim()
  const amount = parseFloat(document.getElementById("amount").value)
  const type = document.getElementById("type").value

  if (!desc || isNaN(amount) || amount <= 0) {
    alert("Please enter valid description and amount.")
    return
  }


  const transaction = {
    id: Date.now(),
    desc: desc,
    amount: amount,
    type: type
  }

  // push to transactions, save, clear inputs, re-render
  transactions.push(transaction);
  saveTransactions();

  document.getElementById("desc").value = ""
  document.getElementById("amount").value = ""

  renderTransactions()

}

function deleteTransaction(id) {
  // filter out transaction with matching id
  transactions = transactions.filter(t => t.id !== id)
  // save + re-render
  saveTransactions()
  renderTransactions()

}

function updateSummary() {
  // use reduce() to calculate totalIncome
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  // same for totalExpense
  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  // balance = totalIncome - totalExpense
  const balance = totalIncome - totalExpense

  document.getElementById("totalIncome").textContent = `₹${totalIncome.toFixed(2)}`
  document.getElementById("totalExpense").textContent = `₹${totalExpense.toFixed(2)}`
  document.getElementById("balance").textContent = `₹${balance.toFixed(2)}`

  // turn balance red if negative
  document.getElementById("balance").style.color = balance < 0 ? "red" : "green"
}

function renderTransactions() {
  updateSummary()
  const list = document.getElementById("transactionList")

  if (transactions.length === 0) {
    list.innerHTML = "<p>No transactions yet.</p>"
    return
  }

  list.innerHTML = transactions.map(t => `
        <div class="transaction ${t.type}">
          <span>${t.desc}</span>
          <span>${t.type === "income" ? "+" : "-"}₹${t.amount.toFixed(2)}</span>
          <button onclick="deleteTransaction(${t.id})">✕</button>
        </div>
      `).join("")
}

// Init
renderTransactions()