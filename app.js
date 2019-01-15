document.querySelector('#calculateForm').addEventListener('submit', e => {
    e.preventDefault()
    document.querySelector('#calculation').innerHTML = ''
    amount = document.querySelector('#amount')
    interest = document.querySelector('#interest')
    years = document.querySelector('#years')

    // Calculation

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        document.querySelector('#calculation').innerHTML = `
        <table class="striped">
            <tr>
                <td>Monthly Payment</td>
                <td>${monthly.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Total Payment</td>
                <td>${(monthly * calculatedPayments).toFixed(2)}</td>
            </tr>
            <tr>
                <td>Total Interest</td>
                <td>${((monthly * calculatedPayments) - principal).toFixed(2)}</td>
            </tr>
        </table>
        `
    } else {
        document.querySelector('#error').style.display = 'block'
        document.querySelector('#error').innerText = 'Invalid Numbers'
    }
})