# Ontogarment

> Final Year Project for BSc Computer Science

## Introduction

- This project is based on the use of ontological models in an e-commerce web application.
- The web application represents a garments store named Ontogarment.
- The purpose of this project is to make searching for certain clothing products much more efficient and relevant by invoking reasoning.

## Technology

- The primary programming language used for this project is Javascript.
- To create the ontology where we hold the knowledge of garments, we used [Protege](https://protege.stanford.edu/); an open-source ontology development and editing platform.
- Data is stored in a graph database called [Blazegraph](https://blazegraph.com/).
- Tomcat server was used to host Blazegraph.
- The project uses [REACT](https://react.dev/) as its frontend framework.
- ExpressJS and NodeJS were used for the server-side scripting.

## Installation

- Install NodeJS; version should be 16 or above. You can run `node --version` to check if it has been installed and if you have the correct version.
- To install packages and dependencies you would also need npm, which should be available to use on the terminal after installing NodeJS. You can check by running `npm --version` on the terminal.
- [Tomcat](https://tomcat.apache.org/download-90.cgi) must also be installed for hosting the Blazegraph server. (Version 9 is recommended)
- In order to view the ontology model generated for this application, you would have to install [Protege](https://protege.stanford.edu/). Using default settings for the installation should suffice.
- You would also need to create a namespace on Blazegrpah. Instructions for that are provided later.