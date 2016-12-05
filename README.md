[![build status](https://secure.travis-ci.org/bebraw/react-ellipsify.png)](http://travis-ci.org/bebraw/react-ellipsify)
# react-ellipsify - Ellipsify content

**Usage:**

```javascript
import Ellipsify from 'react-ellipsify';
```

**Minimal example:**

```jsx
<Ellipsify visibleItems={7} separator=' ' more='…' moreClass='more' atFront={false}>
    <p>Lorem ipsum dolor sit amet</p>
    <p>Pellentesque non sem rutrum</p>
    <p>Fusce id libero nisl</p>
</Ellipsify>
```

If **more** is clicked, whole content is displayed.

> If you want to learn more about React, read [SurviveJS - Webpack and React](http://survivejs.com/).

**Full example**

```jsx
class EllipsifyExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      visibleItems: 5,
      separator: ' ',
      more: '…',
      atFront: false,
      custom: 'Custom'
    };

    this.setVisible = this.setVisible.bind(this);
    this.reset = this.reset.bind(this);
  }
  render() {
    const { visible, separator, more, atFront, custom } = this.state;
    const visibleItems = parseInt(this.state.visibleItems, 10);

    return (
      <div>
        <section className="demonstration">
          <div className="description">
            <p>Tweak values below and see how Ellipsify behaves.</p>

            <form className="pure-form pure-form-stacked controls">
              <fieldset>
                <div className="pure-g">
                  <div className="pure-u-1-2 pure-u-md-1-2">
                    <label>Visible items</label>
                    <input
                      type="number"
                      className="pure-u-23-24"
                      value={visibleItems}
                      onChange={e => this.setState({
                        visibleItems: e.target.value
                      })}
                    />
                  </div>

                  <div className="pure-u-1-2 pure-u-md-1-2">
                    <label>Separator</label>
                    <input
                      type="text"
                      className="pure-u-23-24"
                      value={separator}
                      onChange={e => this.setState({
                        separator: e.target.value
                      })}
                    />
                  </div>

                  <div className="pure-u-1-2 pure-u-md-1-2">
                    <label>More</label>
                    <input
                      type="text"
                      className="pure-u-23-24"
                      value={more}
                      onChange={e => this.setState({
                        more: e.target.value
                      })}
                    />
                  </div>

                  <div className="pure-u-1-2 pure-u-md-1-2">
                    <label>At front</label>
                    <input
                      type="checkbox"
                      className="pure-u-23-24"
                      value={atFront}
                      onChange={() => this.setState({
                        atFront: !atFront
                      })}
                    />
                  </div>
                </div>

                <div className="pure-u-1-2 pure-u-md-1-2">
                  <label>Custom element content</label>
                  <input
                    type="text"
                    className="pure-u-23-24"
                    value={custom}
                    onChange={e => this.setState({
                      custom: e.target.value
                    })}
                  />
                </div>
              </fieldset>
              <fieldset>
                <div className="pure-g">
                  <div className="pure-u-1 pure-u-md-1">
                    <button
                      type="submit"
                      onClick={this.reset}
                      disabled={!visible}
                      className="pure-button pure-button-primary"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>

          <Ellipsify
            visible={visible}
            visibleItems={visibleItems}
            separator={separator}
            more={more}
            moreClass="more"
            atFront={atFront}
            onShow={this.setVisible}
          >
            <p>
              <b>Lorem ipsum</b> dolor sit amet, consectetur adipiscing elit.
              Proin consectetur enim ligula, a mollis est consequat sollicitudin.
              Pellentesque eleifend blandit metus, ac fermentum velit sagittis ut.
              Etiam malesuada dui id est venenatis dapibus.
            </p>

            <p>
              Pellentesque non sem rutrum, suscipit risus at, vulputate eros.
              Aliquam a lacinia eros. Nulla et imperdiet neque. Vivamus finibus
              urna nec laoreet consectetur. Ut eget consectetur nulla. Curabitur
              vitae mauris felis.
            </p>

            <p>
              Fusce id libero nisl. Sed malesuada aliquam lectus, nec
              ullamcorper lorem. Phasellus in sapien maximus, laoreet ipsum nec,
              vestibulum sapien. Nunc quis tincidunt magna, ac semper turpis.
              Praesent eget diam eu turpis sollicitudin pharetra eu eu ipsum.
              Nulla at lacus eu augue luctus maximus.
            </p>
          </Ellipsify>

          <hr />

          <Ellipsify
            visible={visible}
            visibleItems={visibleItems}
            separator={separator}
            more={<span>{custom}</span>}
            moreClass="more"
            atFront={atFront}
            onShow={this.setVisible}
          >
            <p>
              <b>Lorem ipsum</b> dolor sit amet, consectetur adipiscing elit.
              Proin consectetur enim ligula, a mollis est consequat sollicitudin.
              Pellentesque eleifend blandit metus, ac fermentum velit sagittis ut.
              Etiam malesuada dui id est venenatis dapibus.
            </p>

            <p>
              Pellentesque non sem rutrum, suscipit risus at, vulputate eros.
              Aliquam a lacinia eros. Nulla et imperdiet neque. Vivamus finibus
              urna nec laoreet consectetur. Ut eget consectetur nulla. Curabitur
              vitae mauris felis.
            </p>

            <p>
              Fusce id libero nisl. Sed malesuada aliquam lectus, nec ullamcorper
              lorem. Phasellus in sapien maximus, laoreet ipsum nec, vestibulum
              sapien. Nunc quis tincidunt magna, ac semper turpis. Praesent eget
              diam eu turpis sollicitudin pharetra eu eu ipsum. Nulla at lacus
              eu augue luctus maximus.
            </p>
          </Ellipsify>
        </section>
      </div>
    );
  }
  setVisible() {
    this.setState({
      visible: true
    });
  }
  reset(e) {
    e.preventDefault();

    this.setState({
      visible: false
    });
  }
}

<EllipsifyExample />
```

## Development

* Developing - **npm start** - This will run a server at *localhost:3000* and use Hot Module Reloading.
* Testing - **npm run test:watch** or **npm run test:all** (see `package.json` for details)

## Contributors

* [Craig Ambrose](https://github.com/craigambrose) - Bumped peer dependencies

## License

react-ellipsify is available under MIT. See LICENSE for more details.

