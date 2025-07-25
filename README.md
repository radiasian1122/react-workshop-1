# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

Project Specs

You will be creating an application that will display a list of cocktails made with a searched ingredient. Your application should do the following at a bare minimum:

Render a default list of cocktails
Add cocktails to a favorites list
Remove cocktails from a favorites list
Search for new cocktails by ingredient
Apply styling to the page
Your application should consist of multiple modular React components. Use what you have learned (React component lifecycles, when/how to send HTTP requests, passing props, prop drilling, lifting state, and handling events) to complete this project. Below is a list of API endpoints you can use to retrieve data from the server:

GET http://localhost:3001/ returns an object with property drinks that is an array of drink objects
GET http://localhost:3001/search/{Your ingredient search query here} returns an object with property drinks that is an array of drink objects that match the search query.
Stretch Goals
Create an "Add a Drink" function that adds a drink to your list. This drink should be stored "in-memory", so changes should not be posted to the API.
Refactor code to utilize React Hooks
Implement testing using the React Testing Library
