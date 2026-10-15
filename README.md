# QuickNotes

QuickNotes is a small browser-based notes app built with HTML, CSS and vanilla JavaScript. You can add short notes, sort them into categories, search through them and delete the ones you no longer need. Your notes are saved in your browser, so they are still there when you refresh the page.

## Features

- Add notes with a category (personal, work or study)
- Delete notes
- Live search that filters notes as you type
- Validation: notes must be 1-200 characters, with an error message if not
- Note count that handles zero, one and many notes
- Colour-coded cards for each category
- Notes saved with localStorage so they survive a refresh
- Responsive layout for phone screens

## How to run locally

1. Clone the repository:
git clone https://github.com/Dorcas-ui/quicknotes-app.git
2. Open the folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server** (or just open `index.html` in your browser).

## What I learned

- **Building the page safely with the DOM.** I learned to create elements with `createElement` and set their content with `textContent` instead of `innerHTML`. This stops user text from being treated as HTML, so a note containing code can't break or attack the page.
- **Saving data with localStorage.** localStorage can only store text, so I used `JSON.stringify` to save my array of notes and `JSON.parse` to load it back. This is why my notes are still there after a refresh.
- **Using a render() function.** Instead of editing the page piece by piece, I keep the notes in an array and rebuild the list from it every time something changes. Add, delete and search all work the same way: update the array, then call `render()`.
- **Validating user input.** I check that a note is not empty and not over 200 characters before adding it, and I show a clear error message in the page instead of failing silently.
- **Flexbox and media queries.** I used Flexbox to lay out the form and note cards, and a `@media (max-width: 600px)` rule to stack the form on small screens.
- **Working with Git in small steps.** I made separate commits for the structure, styling, add/delete, storage, search and README, which made my progress easy to follow.