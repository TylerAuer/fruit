# Fruit Matrix

An interactive recreation of the XKCD fruit comic that stores aggregates users' ratings for fun.

## Road Map

Plan for building out features

1. ~~Responsive axis~~
2. ~~Can click and drag elements around the screen~~
3. ~~The elements have store state of their location~~
4. ~~Location state is null if not on matrix, scaled to 100 if on matrix~~
5. ~~Show unplaced fruit above graph~~
6. ~~Unplaced fruit can be dragged onto graph~~
7. ~~Elements snap to container and state set to null if lifted off grid (also need to hint at this some way in the UI, maybe they turn grayscale if dragged outside the axis)~~
8. API for submitting user data to postgres DB
9. Interval function that caches averages for each fruit and other stats
10. API for getting average user data from DB
11. UI for displaying public results
12. Protections from people gaming the system with ranking the fruit over and over
13. Help button that displays an overlay of how to use the page

## Backend Thinking

- Are there Node libraries for in memory cacheing?
- To protect teens from submitting over-and-over --> Can use a password-less auth system. Users get a token when they arrive. It's included in the request. (HTTP SESSIONS <-- Read more about this)
- Think about storage Vs speed trade offs in DB structure
- Also look at common ways of storing coordinates
