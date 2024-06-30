# Memory

A school project that implements a spaced repetition learning PWA.

## Project Setup

On main branch.

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

## Implemented functionality

### Basic working 

Currently, the app displays themes registered in the system on default view.
The user can click on a theme to start to review it. When reviewing a theme,
the levels to review are displayed and the user have to start with the higher
one and then the others levels in descending order. Each level display the 
cards it contains.

Each card displays a question with a button to show the answer. When the answer
is displayed the user have the choice to confirm that his answer (in his mind) 
matches to the card answer or not. If the user had the correct answer, then the card
moves to the next level. If not, the card is reset to the first level.

The user can add a new theme by clicking on the corresponding button on top of the pages.
It will open a modal with a form to allow the user to initialize a new theme data and submit the new theme.
The modal is separated by two steps. The first one concerns the theme data. The second concerns the cards
that the theme will contain.

The user can install the app on his device.

### Not yet implemented

1. CSS
2. CRUD management
   - themes (cannot add/delete cards after the theme is created or 
   changing the number of cards to add at the end of a review session)
   - cards (cannot update cards properties)
3. End of review sessions management
   - Add new cards to the theme first level at the end a review session
4. Other things I have forgotten while writing that README

## Project structure

````
src/
├── components/
│   ├── LevelComponent.vue
│   ├── ThemeComponent.vue
│   ├── CardComponent.vue
│   ├── CardListComponent.vue
│   └── AddThemeModal.vue
├── models/
│   ├── Card.ts
│   ├── Level.ts
│   └── Theme.ts
├── router/
│   ├── index.ts
├── stores/
│   ├── memoryStore.ts
├── views/
│   ├── HomeView.vue
│   ├── ThemeView.vue
├── App.vue
├── main.ts

````

### Components

#### Theme

The `Theme` component is defined by:
- A name
- A list of levels

It displays the levels available to review

#### Level

The `Level` component is defined by:
- An index representing the number of the level in the theme
- A list of cards

It displays the cards contained in its list

#### CardList

The `CardList` is nothing more tha a list of cards.

#### Card

The `Card` component is defined by:
- A question that the user will have to answer
- An answer to that question

It displays the question and let the user check the answer by clicking a button.
The answer let the user confirm or not the answer. If the answer is correct, then 
the card moves to the next level and is marked as reviewed in the system.
If not, the card is reset to the first level and is marked as reviewed in the system.

Note, if the card reaches the higher level of the theme, it will be removed from the system.

#### AddThemeModal

This component is used to add a new theme to the system. It will display a 
form in order to let the user put the new theme data.

The form validation is handled by vee-validate library:
- All the fields are required
- Text fields cannot be filled with white space
- Number fields cannot be negative

### Views

#### HomeView

The home displays the list of themes available in the app.
When a theme is clicked, it will display the theme view of this theme.

#### ThemeView

This view displays a theme.

### Stores

The app uses the pinia store in order to manage the data. It will contain all
the methode that involve data management. It stores the data in the local storage too.

## Testing data

The testing data are charged at the app launch. I couldn't manage to create a executable script
to add to the package.json.