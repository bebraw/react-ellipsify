const React = require('react');
const Fork = require('react-ghfork');

const readme = require('../README.md');
const pkgInfo = require('../package.json');

const Ellipsify = require('../lib');

module.exports = React.createClass({ // eslint-disable-line react/prefer-es6-class
  displayName: 'App',

  getInitialState() {
    return {
      visible: false,
      visibleItems: 5,
      separator: ' ',
      more: '…',
      atFront: false
    };
  },

  render() {
    const visible = this.state.visible;
    const visibleItems = parseInt(this.state.visibleItems, 10);
    const separator = this.state.separator;
    const more = this.state.more;
    const atFront = this.state.atFront;

    return (
      <div className="pure-g">
        <Fork className="right" project={`${pkgInfo.user}/${pkgInfo.name}`} />
        <header className="pure-u-1">
          <h1>{pkgInfo.name}</h1>

          <div className="description">{pkgInfo.description}</div>
        </header>
        <article className="pure-u-1">
          <section className="demonstration">
            <div className="description">
              <h2>Demonstration</h2>

              <p>Tweak values below and see how Ellipsify behaves.</p>

              <form className="pure-form pure-form-stacked controls">
                <fieldset>
                  <div className="pure-g">
                    <div className="pure-u-1-2 pure-u-md-1-2">
                      <label>Visible items</label>
                      <input
                        type="number"
                        className="pure-u-23-24"
                        value={this.state.visibleItems}
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
                        value={this.state.separator}
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
                        value={this.state.more}
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
                        value={this.state.atFront}
                        onChange={() => this.setState({
                          atFront: !this.state.atFront
                        })}
                      />
                    </div>
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
              more={<span>Custom element</span>}
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
          <section className="documentation">
            <h2>README</h2>

            <div dangerouslySetInnerHTML={{ __html: readme }}></div>
          </section>
        </article>
      </div>
    );
  },

  setVisible() {
    this.setState({
      visible: true
    });
  },

  reset(e) {
    e.preventDefault();

    this.setState({
      visible: false
    });
  }
});
