const form = document.querySelector('form');
const inputs = document.querySelectorAll('.input-group input');
const table = document.querySelector('table');

form.addEventListener('submit', runApp);

function runApp(e) {

    const [loan, interest, years] = getValues(inputs);
    const loading = document.querySelector('div#loading img');
    const results = document.querySelector('div#results');

    if (isNaN(loan) || isNaN(interest) || isNaN(years)) {


        loading.style.display = 'block';
        results.style.display = 'none';

        setTimeout(function () {
            loading.style.display = 'none';
            results.style.display = 'none';
            showError('Enter the data');
        }, 2000);

        
    } else {

        const calculatedInterest = interest / 100 / 12;
        const calculatedPayments = years * 12;

        const x = Math.pow(1 + calculatedInterest, calculatedPayments);

        const monthPay = (loan * x * calculatedInterest) / (x - 1);
        const totalPay = (monthPay * calculatedPayments);
        const totalInterest = (totalPay - loan);

        insertHTML(totalPay.toFixed(2), monthPay.toFixed(2), totalInterest.toFixed(2));

        // loading and results



        loading.style.display = 'block';
        results.style.display = 'none';

        setTimeout(function () {
            loading.style.display = 'none';
            results.style.display = 'block';
        }, 2000);

    }

    e.preventDefault();
}


function getValues(inputs) {
    let array = [];

    inputs.forEach(function (input) {
        array.push(parseFloat(input.value));
        input.value = '';
    });
    return array;
}

function insertHTML(totalPay, monthPay, totalInterest) {


    table.lastElementChild.children[0].children[1].textContent = `$ ${monthPay}`;
    table.lastElementChild.children[1].children[1].textContent = `$ ${totalPay}`;
    table.lastElementChild.children[2].children[1].textContent = `$ ${totalInterest}`;
    // table.lastChild.childNodes[0].appendChild(td1);
    // table.lastChild.childNodes[1].appendChild(td2);
    // table.lastChild.childNodes[2].appendChild(td3);
}

function showError(message) {

    const errorDiv = document.createElement('div');
    const msg = document.createElement('p');

    msg.textContent = message;
    msg.style.textAlign = 'center';

    errorDiv.appendChild(msg);

    errorDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.4)';
    errorDiv.style.color = 'black';
    errorDiv.style.border = '2px solid rgba(255, 0, 0, 0.1)';
    errorDiv.style.borderRadius = '5px';
    errorDiv.style.padding = '1rem';
    errorDiv.style.marginBottom = '1rem';

    const card = document.querySelector('.card');
    const calculator = document.querySelector('.card #calculator');

    card.insertBefore(errorDiv, calculator);

    // clear error
    window.setTimeout(clearError, 3000);
}



function clearError() {

    document.querySelector('.card div:first-child').remove();
}