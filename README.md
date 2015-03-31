[![build status](https://secure.travis-ci.org/bebraw/react-ellipsify.png)](http://travis-ci.org/bebraw/react-ellipsify)
# react-ellipsify - Ellipsify content

Usage:

```html
<Ellipsify visibleItems={5} separator=' ' more='…' moreClass='more' atFront=true>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur enim ligula, a mollis est consequat sollicitudin. Pellentesque eleifend blandit metus, ac fermentum velit sagittis ut. Etiam malesuada dui id est venenatis dapibus.</p>

    <p>Pellentesque non sem rutrum, suscipit risus at, vulputate eros. Aliquam a lacinia eros. Nulla et imperdiet neque. Vivamus finibus urna nec laoreet consectetur. Ut eget consectetur nulla. Curabitur vitae mauris felis.</p>

    <p>Fusce id libero nisl. Sed malesuada aliquam lectus, nec ullamcorper lorem. Phasellus in sapien maximus, laoreet ipsum nec, vestibulum sapien. Nunc quis tincidunt magna, ac semper turpis. Praesent eget diam eu turpis sollicitudin pharetra eu eu ipsum. Nulla at lacus eu augue luctus maximus.</p>
</Ellipsify>
```

would yield

```html
<p>Lorem ipsum dolor sit amet<span className='more'>…</span></p>
```

If `more` is clicked, whole content is displayed.

## Development

* Linting - **npm run lint**
* Testing - **npm test** - This will lint too.
* Developing - **npm start** - This will run a server at *localhost:3000* and use Hot Module Reloading.
* Demo deployment - **npm run gh-pages** and **npm run deploy-gh-pages** - Demo will contain *README.md* by default and comes with simple styling based on Pure.

## License

react-ellipsify is available under MIT. See LICENSE for more details.

