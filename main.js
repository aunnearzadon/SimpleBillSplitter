const members = []
const expenses = []

document.getElementById('add-member').addEventListener('click', () => {
  addMember()
})

document.getElementById('add-expense').addEventListener('click', () => {
  addExpense()
})

const addMember = () => {
  const newMember = document.getElementById('new-member')
  const membersCount = document.getElementById('members-count')
  const member = newMember.value
  if(member) {
    members.push(member)
    membersCount.innerHTML = members.length
    newMember.value = ''
    addMembersToList()
    processExpenses()
  }
}

const addMembersToList = () => {
  const membersSelect = document.getElementById('members');
  const membersList = document.getElementById('members-list');
  membersSelect.innerHTML = '';
  membersList.innerHTML = '';

  members.forEach((member, index) => {
    const option = document.createElement("option");
    const p = document.createElement("p")
    option.value = index;
    option.text = member;
    p.innerHTML = member
    membersSelect.appendChild(option)
    membersList.appendChild(p)
  })
}

const addExpense = () => {
  const membersSelect = document.getElementById('members');
  const amount = document.getElementById('amount');
  const description = document.getElementById('description');

  if(membersSelect.value && amount.value && description.value){
    const expenseObj = {
      member: membersSelect.value,
      description: description.value,
      amount: parseFloat(amount.value)
    }
    expenses.push(expenseObj)
  }
  processExpenses()
  console.log(expenses)
}

const processExpenses = () => {
  const expensesList = document.getElementById('expenses-list')
  const totalExpenses = document.getElementById('total-expenses')
  const costPerPerson = document.getElementById('cost-per-person')
  expensesList.innerHTML = ''
  let total = 0
  let perPerson = 0
  expenses.forEach((expense) => {
    addExpensesToList(expensesList, expense)
    total += expense.amount
  })
  perPerson = parseFloat(total / parseFloat(members.length))
  processBreakdown(perPerson)
  totalExpenses.innerHTML = total
  costPerPerson.innerHTML = perPerson
}

const addExpensesToList = (expensesList, expense) => {
  const text = `${members[expense.member]} paid ${expense.amount} for ${expense.description}`
  const p = document.createElement("p")
  p.innerHTML = text
  expensesList.appendChild(p)
}

const processBreakdown = (perPerson) => {
  const expensesBreakdown = document.getElementById('expenses-breakdown')
  expensesBreakdown.innerHTML = ''
  members.forEach((member, index) => {
    let memberTotalExpense = 0
    expenses.forEach(expense => {
      if(expense.member == index) {
        memberTotalExpense += expense.amount
      }
    })
    const memberPays = perPerson - memberTotalExpense
    addMemberBreakdownToList(expensesBreakdown, member, memberPays)
  })
}

const addMemberBreakdownToList = (expensesBreakdown, member, amount) => {
  const text = `${member} ${amount >= 0 ? 'pays' : 'receives'} ${amount < 0 ? amount * -1 : amount}`
  const p = document.createElement("p")
  p.innerHTML = text
  expensesBreakdown.appendChild(p)
}