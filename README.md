[![build status](https://secure.travis-ci.org/bebraw/react-ellipsify.png)](http://travis-ci.org/bebraw/react-ellipsify)
# react-ellipsify - Ellipsify content

Usage:

```javascript
import Ellipsify from 'react-ellipsify';
```

```html
<Ellipsify visibleItems={5} separator=' ' more='…' moreClass='more' atFront={true}>
    <p>Lorem ipsum dolor sit amet...</p>
    <p>Pellentesque non sem rutrum...</p>
    <p>Fusce id libero nisl...</p>
</Ellipsify>
```

would yield

```html
<p>Lorem ipsum dolor sit amet<span className='more'>…</span></p>
```

If **more** is clicked, whole content is displayed.

See */demo* for a complete example.

> If you want to learn more about React, read [SurviveJS - Webpack and React](http://survivejs.com/).

## Development

* Linting - **npm run lint**
* Testing - **npm test** - This will lint too.
* Developing - **npm start** - This will run a server at *localhost:3000* and use Hot Module Reloading.
* Demo deployment - **npm run gh-pages** and **npm run deploy-gh-pages** - Demo will contain *README.md* by default and comes with simple styling based on Pure.

## Contributors

* [Craig Ambrose](https://github.com/craigambrose) - Bumped peer dependencies

## License

react-ellipsify is available under MIT. See LICENSE for more details.

