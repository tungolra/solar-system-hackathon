# Cosmic Classroom

A single page application for exploring the various planets and moons that are in our solar system. You can click on any of the planets or discover planets and moons in the directory pages (links in app navbar).

The frontend page of our Solar System application created as a part of the #DearJuniorDev Quackathon.

## Live Demo: [Click me!](https://cosmicclassroom.vercel.app/)

## Other Links

[Link to Frontend Repo](https://github.com/tungolra/solar-system-hackathon) | [View Backend API](https://solar-system-hackathon-backend.herokuapp.com/) | [Link to Backend Repo](https://github.com/matthewcsimpson/Solar-System-Hackathon-Backend)


> Special shoutout to [The Solar System OpenData](https://api.le-systeme-solaire.net/en/) for providing source api


## Contributors

- Ralph Tungol | [GitHub](https://github.com/tungolra) | [LinkedIn](https://github.com/tungolra)
- Matthew Simpson | [GitHub](https://github.com/matthewcsimpson) | [LinkedIn](https://www.linkedin.com/in/matthewcsimpson)
- Nikhil Koganti | [GitHub](https://github.com/Nikhil-Koganti) | [LinkedIn](https://www.linkedin.com/in/nikhil-koganti)


## Tech Stack

#### Frontend:

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

#### Backend:

 - Node.js
 - Express.js
 - MySQL
 - [Knex.js](https://knexjs.org/)
 - JSON


## Run app locally

To run it, do:

```javascript
$> git clone https://github.com/tungolra/solar-system-hackathon.git
$> cd nextapp
$> npm install
$> npm run dev
```

That’s it! The project is now running on [http://localhost:3000](http://localhost:3000) in your browser. No need of adding api keys to your code as the calls to the backend API are automatically handled in the code.

## Quackathon Requirements

-- The website must be a SPA application &#9745;
> We have satisfied the requirement by using a react router to dynamically load page on the client using javascript without a full reload.


Planets:

-- Each planet of the solar system must have its own profile page &#9745;

-- Each page must include at a minimum (Name of the planet, size, distance from the Sun, three identifying facts, solid or gas core, and a visual representation of the planet) 
> We have included all of the above for each planet page along with gravity, inclination, mass, sideral orbit and sideral rotation

-- NOTE: No images, assets, emojis, or SVGs are permitted. The visual representation of each planet must be made ENTIRELY out of CSS &#9745;
> We have created all our planets using tailwind CSS

-- If the planet has a moon, you must display the following information for every moon (Name, history behind name, and size) &#9745;
> We are displaying the required information along with Aphelion, Perihelion, inclination, mass, sideral orbit and sideral rotation

-- Planet pages must include at least two different components that are NOT used on your homepage &#9745;
> We are showing the properties of the planet, name, and planet type for each planet that are NOT used on the homepage

-- If a planet has more than one moon, the moon information must be displayed in repeating elements &#9745;

-- All planet and moon content MUST be stored in a database &#9745;
> We are storing all the content in seed data in the backend api and is accessed by the nextapp in the frontend


Backend:

-- You must use foreign keys &#9745;

-- Planets and Moons must be stored separate from one another &#9745;

-- You must incorporate one ENUM for the planet data &#9745;
> We used this for the planet type (Dwarf, Gas giant, Terrestrial)

Homepage:

-- The homepage should be an overview of the solar system &#9745;
-- The data included will be up to each team
> We just included the planet names along with an overview text that shows what the app is

-- The homepage must include at least two components that are NOT used on any planet page &#9745;
> We have the image of the galaxy in the background with the planets in the front rendered in CSS

-- Homepage content does not need to be stored in a database and can be coded into your components &#9745;

## Screenshots
