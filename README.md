# AGC Website

## Setup
For Dev:
1) `git clone git@github.com:aspengrovecollective/agcwebsite.git`
2) `npm i`
3) Run `npm run start-frontend` and let that keep running. 
4) In a new terminal run `npm run start-backend`,
   or if you want to debug on the backend, run `npm run debug` in your debugger 
5) Open http://localhost:3000/ in your browser, where you can view and debug the frontend of the site.
   If you'd prefer to debug in your IDE, you need to set up a Javascript debugger in your IDE
   and set the URL to `http://localhost:3000/`


Look through package.json for other commands.
Look through the examples that came with the template, in the `src/` folder, to get a feel for code style and project structure.

## Server Notes
- Ensure to save the private folder with the agc-website-key.json file in the server directory.