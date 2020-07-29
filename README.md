# Fruit Matrix

An interactive recreation of the XKCD fruit comic that stores aggregates users' ratings for fun.

## Fruit To Include

- Bananas
- Blackberries
- Blueberries
- Cherries
- Grapefruits
- Green Apples
- Kiwi
- Lemons
- Melon
- Nectarine
- Oranges
- Papaya
- Peaches
- Pears
- Pineapples
- Plums
- Pomegranates
- Red Apples
- Seeded Grapes
- Seedless Grapes
- Strawberries
- Tomatoes
- Watermelons

## Road Map

Plan for building out features

1. ~~Responsive axis~~
2. Can click and drag elements around the screen
3. The elements have store state of their location
4. Location state is null if not on matrix, scaled to 100 if on matrix
5. Elements snap to container and state set to null if lifted off grid (also need to hint at this some way in the UI, maybe they turn grayscale if dragged outside the axis)
6. API for submitting user data to postgres DB
7. Interval function that caches averages for each fruit and other stats
8. API for getting average user data from DB
9. UI for displaying public results
10. Protections from people gaming the system with ranking the fruit over and over
11. Help button that displays an overlay of how to use the page
