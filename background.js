const addBtn = document.querySelector('#addbtn');
addBtn.addEventListener('click', function() {
  const btnToColor = document.querySelector('#addbtn');
  btnToColor.classList.remove('btn-original-color');
  btnToColor.classList.add('color-change-btn');
  const apiURL = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=';
  const inputElement = document.querySelector('#input-name');
  const inputValue = inputElement.value;
  const symbols = inputValue.split(' ');
  const symbols1 = symbols[0];
  const symbols2 = symbols[1];
  const symbols3 = symbols[2];
  const symbols4 = symbols[3];
  const url = apiURL + symbols1 + '%2C' + symbols2 + '%2C' + symbols3 + '%2C' + symbols4
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '3076d80c6cmshdb5e14ce97b7984p17eab9jsn2276491617ff',
      'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
    }
  };

  fetch(url, options)
    .then(res => res.json())
    .then(data => {
      for (let i = 0; i < 4; i++) {
        try {  
          const containerIndex = i + 1;
          const stockCode = document.querySelector(`#sc${containerIndex}`);
          const stockName = document.querySelector(`#sn${containerIndex}`);
          const stockPriceChangeInPercentage = document.querySelector(`#pcip${containerIndex}`);
          const stockPriceChangeInValue = document.querySelector(`#pciv${containerIndex}`);
          const stockPrice = document.querySelector(`#p${containerIndex}`);
  
          stockCode.textContent = null;
          stockName.textContent = null;
          stockPriceChangeInPercentage.textContent = null;
          stockPriceChangeInValue.textContent = null;
          stockPrice.textContent = null;
  
          stockCode.textContent = data.quoteResponse.result[i].symbol;
          stockName.textContent = data.quoteResponse.result[i].shortName;
          stockPriceChangeInPercentage.textContent = data.quoteResponse.result[i].regularMarketChangePercent.toFixed(2) + "%";
          stockPriceChangeInValue.textContent = data.quoteResponse.result[i].regularMarketChange.toFixed(2);
          stockPrice.textContent = "$" + data.quoteResponse.result[i].regularMarketPrice.toFixed(2);
  
          if (data.quoteResponse.result[i].regularMarketChange > 0) {
            stockPriceChangeInPercentage.classList.add('color-change-positive')
            stockPriceChangeInValue.classList.add('color-change-positive')
            stockPrice.classList.add('color-change-positive')
          } else if (data.quoteResponse.result[i].regularMarketChange < 0) {
            stockPriceChangeInPercentage.classList.add('color-change-negative')
            stockPriceChangeInValue.classList.add('color-change-negative')
            stockPrice.classList.add('color-change-negative')
          } else {
            stockPriceChangeInPercentage.classList.add('color-change-neutral')
            stockPriceChangeInValue.classList.add('color-change-neutral')
          }
        } catch (err2) {}
      }
    })
    .catch(err => console.log(err))
    .finally(
      () => {
        btnToColor.classList.remove('color-change-btn');
        btnToColor.classList.add('btn-original-color');
      }
    )
})
