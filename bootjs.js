document.getElementById('taxForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Reset error indicators
    resetErrorIndicators();
    
    // Fetch input values
    const grossIncome = parseFloat(document.getElementById('grossIncome').value);
    const extraIncome = parseFloat(document.getElementById('extraIncome').value);
    const deductions = parseFloat(document.getElementById('deductions').value);
    const age = document.getElementById('age').value;
    
    // Validate inputs
    if (isNaN(grossIncome) || isNaN(extraIncome) || isNaN(deductions) || age === 'select_age') {
        if (isNaN(grossIncome)) {
            showErrorIcon('grossIncome');
        } else {
            hideErrorIcon('grossIncome');
        }
        if (isNaN(extraIncome)) {
            showErrorIcon('extraIncome');
        } else {
            hideErrorIcon('extraIncome');
        }
        if (isNaN(deductions)) {
            showErrorIcon('deductions');
        } else {
            hideErrorIcon('deductions');
        }
        
    // Validate age, age cannot be  empty or a number outside allowed range
  if(age === 'select_age'){
    showErrorIcon('age');
    
  }else{
   hideErrorIcon('age');
  }
  // Stop form submission if there are invalid inputs
  return;
    }



    // Calculate tax
    if(age !== 'select_age'){
    let tax = 0;
    if (grossIncome + extraIncome - deductions > 8000000) {
        if (age === '<40') {
            tax = 0.3 * (grossIncome + extraIncome - deductions - 8000000);
        } else if (age === '>=40 & <60') {
            tax = 0.4 * (grossIncome + extraIncome - deductions - 8000000);
        } else if (age === '>=60') {
            tax = 0.1 * (grossIncome + extraIncome - deductions - 8000000);
        }
    } else {
        tax = 0; // No tax if income is below 8000000
    }
    
    // Display tax result

    document.getElementById('result').innerText = `Your overall income will be: ${tax} after tax deductions `;
    $('#myModal').modal('show');
}
});


function resetErrorIndicators() {
    const errorIcons = document.querySelectorAll('.error-icon');
    errorIcons.forEach(icon => icon.style.display = 'none');
    
}

function showErrorIcon(fieldId) {
    document.getElementById(fieldId +'Error').style.display = 'inline';
}
function hideErrorIcon(fieldId) {
    document.getElementById(fieldId + 'Error').style.display = 'none';
}
  

document.querySelector('.close').addEventListener('click', function() {
   /* document.getElementById('myModal').style.display = 'none';*/
   $('#myModal').modal('hide');
});
