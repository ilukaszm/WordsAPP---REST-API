# WordsAPP - Rest API

<p align="center">
<img src="https://i.imgur.com/DOCBw0C.png">
</p>

## About project 📖

This project is simple rest api server with authentication for my **WordsAPP** project, which you can see [here](https://https://github.com/ilukaszm/wordsAPP).

### Technology stack

- TypeScript - javascript superset language
- ExpressJS - web framework for Node.js
- PassportJS - authentication for Node.js
- Bcrypt - library to hash password
- Express Validator - middleware to data validation
- Prisma - database toolkit
- Husky - Pre-commit tool
- Lint-staged - Pre-commit tool
- Eslint - javascript linter
- Prettier - code formatter

### Install 💾

To use project you must have **PostgreSQL** database. Add database URL to **prisma/.env**. Create file **.env** with your facebook and google api keys to authenticate. More info: [here](http://www.passportjs.org/packages/passport-google-oauth/)
and
[here](http://www.passportjs.org/packages/passport-facebook/).

Use commands:

> npm install

to install all dependencies

> npm run dev

to running development server

> npm run build

to build project

### License 📝

Under license (MIT, Apache etc)

MIT © [Łukasz Michalak](https://github.com/ilukaszm)
