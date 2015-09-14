Solid job, happy you got the app functioning to the point where a user can create and read pictures. You can find my annotated comments throughout your application where you can see `it:...`

##Creativity

* Good idea for you first project. It is more complicated than a todo list, but not overly ambition.

##Planning

* A link to your user stories in your readme is necessary. Writting a following user stories is an essential step in planning how you will execute your project.
* It looks like your models have been well thought-out. It would be nice to see more attribute in the Pictre model, such as a title, created time stamp, etc.
* Good use of a `console.js` file. That certainly is helpful in building and testing your models.

##Execution

* Great use of templating
* Nice use of defining functions first and only calling them when the document is ready in `app.js`.
* Seed file looks great! Consider adding a `process.exit()` once it's done so that it doesn't hang.
* Minor errors include the application crashing when a non authenticated user trying to login. Definitely consider adding logic to handle errors in the serverside `index.js` file.

##Next Steps

To meet requirements:
* Deploy to heroku
* Update readme with project link, userstories, technologies used, and install instruction

Highly recommended updates:
* Fix errors that crash the application; particularly when a user enters in an incorrect email/password combo.

Nice to have:
* Try to add EJS partials to the project to refactor the `<head>` tags being used repetatively throughout the multiple views; it will DRY up the code.
