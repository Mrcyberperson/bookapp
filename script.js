document.getElementById('searchButton').addEventListener('click', searchBooks);

async function searchBooks() {
    const searchInput = document.getElementById('searchInput').value;
    const resultsContainer = document.getElementById('results');
    const progressBar = document.getElementById('progressBar');

    // Show progress bar
    progressBar.style.display = 'block';

    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${searchInput}`);
        const data = await response.json();

        const books = data.docs;
        resultsContainer.innerHTML = ''; // Clear previous results

        books.forEach(book => {
            const title = book.title;
            const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `<strong>${title}</strong> by ${author}`;
            
            const openLibraryLink = document.createElement('a');
            openLibraryLink.href = `https://openlibrary.org${book.key}`;
            openLibraryLink.target = '_blank';
            openLibraryLink.innerText = 'View on Open Library';

            resultItem.appendChild(openLibraryLink);
            resultsContainer.appendChild(resultItem);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        // Hide progress bar after fetching results
        progressBar.style.display = 'none';
    }
}
