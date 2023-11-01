# Project Title
#### Future Signals and Trends (https://signals.data.undp.org/). One would need UNDP id to access the site.

## Table of Contents
* [Link for the application](#section-01)
* [Deployment](#deployment)
* [API used](#section-02)
* [Global CSS Files and Repo](#section-05)
* [Build With](#section-06)
* [Installation](#section-07)
* [Local Deployment](#section-08)
* [Available Scripts](#section-09)
* [Tooling Setup](#section-10)

## Link for the application<a name="section-01"></a>
[https://signals.data.undp.org/](https://signals.data.undp.org/)

## Deployment<a name="deployment"></a>
The Production site deployed using Azure Static Web App and work flow can be found [here](https://github.com/UNDP-Data/dv-signal_and_trends-fe/blob/production/.github/workflows/azure-static-web-apps-thankful-forest-05a90a303.yml)

## API Used<a name="section-02"></a>
__API Documentation__: [https://signals-and-trends-api.azurewebsites.net/docs](https://signals-and-trends-api.azurewebsites.net/docs)
Different user roles, authentication, and all endpoint are documented [here](https://signals-and-trends-api.azurewebsites.net/docs)

## Global CSS for UI and Graphs<a name="section-05"></a>
__Git Repo__: https://github.com/UNDP-Data/stylesheets-for-viz

__Link for stylesheets__
* https://undp-data.github.io/stylesheets-for-viz/style/mainStyleSheet.css
* https://undp-data.github.io/stylesheets-for-viz/style/StyleForGraphingInterface.css
* https://undp-data.github.io/stylesheets-for-viz/style/StyleForGraph.css

## Build with<a name="section-06"></a>
* __React__: Used as MVC framework.
* __styled-components__: Utilizes tagged template literals and the power of CSS, allows to write actual CSS code to style the components in JS/TS.
* __Various D3 Libraries__: Used for visualizations, adding interaction and reading the csv data file.
* __AntD__: For UI elements like dropdown, buttons, checkbox, and slider.
* __dom-to-image__: Used to allow users to download images of various visualization views they create.
* __lodash__: Used for manipulating and iterating arrays and objects.
* __axios__: Used for API calls.
* __@azure/msal-browser and @azure/msal-react__: Used for Azure SSO.
* __@react-pdf/renderer__: Used for generating PDFs.


## Installation<a name="section-07"></a>
This project uses `npm`. For installation you will need to install `node` and `npm`, if you don't already have it. `node` and `npm` can be installed from [here](https://nodejs.org/en/download/).

To install the project, simply clone the the repo and them run `npm install` in the project folder. You can use terminal on Mac and Command Prompt on Windows.

This project is bootstrapped with [`Vite`](https://vitejs.dev/) and was created using `npm create vite@latest` command.

Run the terminal or command prompt and then run the following

```
git clone https://github.com/UNDP-Data/dv-signals_and_trends-fe.git
cd dv-signals_and_trends-fe
npm install
```

## Local Development<a name="section-08"></a>
To start the project locally, you can run `npm run dev` in the project folder in terminal or command prompt.

This is run the app in development mode. Open [http://localhost:5173/](http://localhost:5173/) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

To deploy locally successfully you will need to make some changes to the `Constants.tsx`

you will need to replace 
`export const WEB_ADDRESS = 'https://signals.data.undp.org/';` to `export const WEB_ADDRESS = './';`
`export const API_ACCESS_TOKEN = process.env.INPUT_ACCESS_TOKEN_FOR_API';` to `export const API_ACCESS_TOKEN = import.meta.env.VITE_ACCESS_CODE`
`export const REDIRECT_URL = process.env.INPUT_REDIRECT_URI_FOR_MSAL;` to `export const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL;`

These changes are only required for local deployment. For production you will need to keep the value same.

Also you will need a `.env.local` file in the root folder. the `env` file would require the following variable and values
* VITE_API_LINK=https://signals-and-trends-api.azurewebsites.net/v1/
* VITE_ACCESS_CODE={{contact the team for API secret}}
* VITE_REDIRECT_URL=http://localhost:5173/

## Available Scripts<a name="section-09"></a>
* `npm run dev`: Executes `vite` and start the local server for local deployment.
* `npm run build`: Executes `tsc && vite build` and builds the app for production and deployment.

## Tooling Setup<a name="section-10"></a>
This project uses ESLint integrated with prettier, which verifies and formats your code so you don't have to do it manually. You should have your editor set up to display lint errors and automatically fix those which it is possible to fix. See [http://eslint.org/docs/user-guide/integrations](http://eslint.org/docs/user-guide/integrations).

This project is build in Visual Studio Code, therefore the project is already set up to work with. Install it from [here](https://code.visualstudio.com/) and then install this [eslint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and you should be good to go.