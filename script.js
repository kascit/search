document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const queryInput = document.getElementById('query');
    const historyDiv = document.getElementById('History');
    const clearButton = document.getElementById('clear');

    const loadHistory = () => {
        const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        historyDiv.innerHTML = history.map((item, index) => `
            <div class="history-item">
                <p>${item}</p>
                <button id="cross" onclick="deleteHistory(${index})">❌</button>
            </div>
        `).join('');
    };

    const saveHistory = (query) => {
        const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        history.push(query);
        localStorage.setItem('searchHistory', JSON.stringify(history));
        loadHistory();
    };

    window.deleteHistory = (index) => {
        const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        history.splice(index, 1);
        localStorage.setItem('searchHistory', JSON.stringify(history));
        loadHistory();
    };

    clearButton.addEventListener('click', () => {
        localStorage.removeItem('searchHistory');
        loadHistory();
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = queryInput.value.trim();
        if (query) {
            saveHistory(query);
            queryInput.value = '';
        }
    });

    loadHistory();
});
