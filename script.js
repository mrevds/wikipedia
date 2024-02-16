document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.search-box');
    const input = form.querySelector('input[type="search"]');
    const resultsContainer = document.querySelector('.results');
    const resultsCounter = document.querySelector('header p');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchTerm = input.value;
        if (searchTerm) {
            searchWikipedia(searchTerm);
        }
    });

    function searchWikipedia(searchTerm) {
        const url = `https://ru.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${encodeURIComponent(searchTerm)}`;

        fetch(url).then(response => response.json()).then(data => {
            displayResults(data.query.search);
        }).catch(error => alert('Error : ' + error));
    }

    function displayResults(results) {
        resultsContainer.innerHTML = '';
        resultsCounter.textContent = `Количество совпадений : ${results.length}`;
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'result';
            resultElement.innerHTML = `

            <h3>${result.title}</h3>
            <p>${result.snippet}</p>
            <a href="https://ru.wikipedia.org/?curid=${result.pageid}" target="_blank">Прочитать</a>
            `;
            resultsContainer.appendChild(resultElement);
        });
    }
});