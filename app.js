// PWA Configuration

if ('serviceWorker' in navigator) {
    try {
        navigator.serviceWorker.register('serviceWorker.js');
    } catch (error) {
        console.log("Service Worker Registration Failed");
    }
}


// class form
class Loan {
    constructor(amount, interest, years) {
        this.amount = parseFloat(amount)
        this.interest = parseFloat(interest) / 100 / 12;
        this.years = parseFloat(years) * 12;
    }

    calculate() {
        var x = Math.pow(1 + this.interest, this.years);
        var monthly = (this.amount * x * this.interest) / (x - 1);
        var results = {
            monthlyPayment: monthly.toFixed(2),
            totalPrincaple: this.amount,
            totalInterest: ((monthly * this.years) - this.amount).toFixed(2)
        }
        return results;
    }
}

// get data from form
document.querySelector('#calculateForm').addEventListener('submit', e => {
    e.preventDefault()
    document.querySelector('#calculation').innerHTML = ''
    var amount = document.querySelector('#amount')
    var interest = document.querySelector('#interest')
    var years = document.querySelector('#years')

    form = new Loan(amount.value, interest.value, years.value);
    results = form.calculate()

    //display result
    if (isFinite(results.monthlyPayment)) {
        document.querySelector('.result').style.display = "flex";
        document.querySelector('#error').style.display = 'none'
        document.querySelector('#calculation').innerHTML = `
        <table>
            <tr>
                <td>Monthly Payments</td>
                <td>${results.monthlyPayment}</td>
            </tr>
            <tr>
                <td>Total Principal Paid</td>
                <td>${results.monthlyPayment}</td>
            </tr>
            <tr>
                <td>Total Interest Paid</td>
                <td>${results.totalInterest}</td>
            </tr>
        </table>
        <button onClick="window.location.reload();">Calculate Again</button>
        `
    } else {
        document.querySelector('#error').style.display = 'block'
        document.querySelector('#error').innerText = 'Invalid Numbers'
    }


    //reset the form
    document.getElementById("calculateForm").reset();
})
