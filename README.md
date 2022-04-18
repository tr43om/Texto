# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Screenshots

![](./reg-texto.png)
![](./texto.png)

### Links

<!-- - Solution URL: [Add solution URL here](https://your-solution-url.com) -->

- Live Site URL: [Add live site URL here](https://interactive-comment-sect-a2a31.web.app/register)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- [React](https://reactjs.org/) - JS library
- [Framer Motion](https://www.framer.com/motion/) - Framer is a tool built for interactive design. This library made possible to create animation when components mounts/unmounts on the page. With this tool I made transitions between pages, animation when comment or reply is added or deleted.
- [Firebase](https://firebase.google.com/) - Firebase is a Backend-as-a-Service (Baas). It provides developers with a variety of tools and services. I used firebase for storing comments, replies and users in database and retrieve them as needed. Also, with authentication service I've implemented sign in / sign up feature

### What I learned

This is my first personal React project I've built. Throughout building process I learned many things such as:

#### Firebase

I've never worked with database before and I always thought that it is something really complicated for me. However, firebase has really good documentation and there are many tutorials out there how to implement many cool things with Firebase. I learned how to create, update, read, delete data with Firestore Database and also how to authenticate users with authentication tools they provides. I really enjoyed implementing firestore to my project :)

#### Power of custom hooks

This project consist of hundreds and even thousands lines of code and it would be a real mess without custom hook I used. I made 10 custom hooks:

- **useAuthContext** I used context in many places and each time import same things is pretty bad practice. So this hook make my code cleaner and easier to maintain my context
- **useCollection** This hook was really helpful. The hook takes 3 arguments: collection name, which documents I want to get (query) and in which order I want to see them.
- **useCurrentUser** It contains data of loged in user
- **useFirestore** All functions I need for delete, add and update my data from Firestore database are there
- **useGoogleLogin, useLogout, useLogin, useSignup** These hooks deal with firebase authentications. By the titles of the hooks you can guess what they used for :)
- **useTimePassed** This is just reusable code for finding out how many time have passed since the user posted comment/reply
- **useVote** There is functionality for voting up/down comments and replies

#### Reducer and context

The context is designed for storing information about authentication status. Context answers questions like: user logged in or not? is authentication ready?

I used reducer to handle cases connected with authentication. Like log in, sign up, sign out. I passed dispatch function into context and then when I needed I used it to update authentication status of the webpage

#### Animation in React with Framer Motion

I'm really glad that there are libraries that helps create animation when components mounts or unmounts. Before I found such libraries, I puzzled through a lot how could I implement animations without libraries and decided not to use animation in project at all, because it would be really hard to implement animations without Framer Motion.

With this tool I made transitions between pages and animation when comment or reply is added or deleted.

It was super easy to deal with. All I need was to import 2 components and define how element should look like initially (initial), how it should look like when it appeared on the screen (animate) and how should it disappear from the page (exit).

Let's bring comments, as an example:

```jsx
import { AnimatePresence, motion } from "framer-motion";

<AnimatePresence>
  {comments.map((comment) => (
    <motion.div
      key={comment.id}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4, ease: [0.25, 0.75, 0.5, 1.25] }}
    >
      <Comment id={comment.id} comment={comment} />
    </motion.div>
  ))}
</AnimatePresence>;
```

### Continued development

In future projects I want to learn more Firebase and toold they provide. There is also many concepts and techniques in React i need to refine and perfect.

Also I realised that it would be super helpful to use github commits to revert to previous changes, as I experimented a lot.

### Useful resources

- [UI Avatars](https://ui-avatars.com/) - This helped me to generate avatars for users who don't have profile picture. This tool generates avatar based on user's initials.
- [Font Awesome. How to add icons in React](https://fontawesome.com/v6/docs/web/use-with/react/add-icons) - This is an amazing article which helped me finally understand how to use font awesome icons in react
- [Net Ninja](https://www.youtube.com/c/TheNetNinja) - This guy helped me understand many concepts in React and Firebase. His tutorials are super useful and easy understand
