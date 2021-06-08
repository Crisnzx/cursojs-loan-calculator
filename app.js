const form = document.querySelector('form');
const inputs = document.querySelectorAll('.input-group input');
const table = document.querySelector('table');

form.addEventListener('submit', runApp);

function runApp(e) {

    const [loan, interest, years] = getValues(inputs);

    
    if(loan === 0 || interest === 0 || years === 0) {
        alert('Enter the data');
    } else {
        document.querySelector('div#results').style.display = 'block';
        
    
        const totalPay = loan*Math.pow((1 + interest/100), years).toFixed(2);
        const monthPay = (totalPay/years*12).toFixed(2);
        const totalInterest = (totalPay - loan).toFixed(2);
    
        insertHTML(totalPay, monthPay, totalInterest);

    }

    e.preventDefault();
}


function getValues(inputs) {
    let array = [];
    
    inputs.forEach(function(input) {
        array.push(Number(input.value));
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