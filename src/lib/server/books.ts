// src/lib/server/bookCover.js
//import { error } from '@sveltejs/kit';

export async function getBookCoverId(isbn) {
    if (!isbn) {
        return null;
    }

    //const apiUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

    const apiUrl = `https://covers.openlibrary.org/b/isbn/9780385472579-S.jpg`;

    try {
        const response = await fetch(apiUrl, { method: 'HEAD' });

        if (response.ok) {
            const coverUrl = response.url;
            const coverId = extractCoverId(coverUrl);

            return coverId || null;
        } else {
            console.warn(`No cover found for ISBN: ${isbn}`);
            return null;
        }
    } catch (e) {
        console.error('Error fetching book cover:', e);
        return null;
    }
}

function extractCoverId(url) {
    const match = url.match(/\/b\/id\/(\d+)-M\.jpg/);
    return match ? match[1] : null;
}