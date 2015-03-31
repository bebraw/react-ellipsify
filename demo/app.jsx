'use strict';

var React = require('react');
var Fork = require('react-ghfork');

var readme = require('../README.md');
var pkgInfo = require('../package.json');

var Ellipsify = require('../lib');


module.exports = React.createClass({
    displayName: 'App',

    mixins: [React.addons.LinkedStateMixin],

    getInitialState() {
        return {
            visibleItems: 5,
            separator: ' ',
            more: '…',
            atFront: true,
        };
    },

    render() {
        var visibleItems = parseInt(this.state.visibleItems, 10);
        var separator = this.state.separator;
        var more = this.state.more;
        var atFront = this.state.atFront;

        return (
            <div className='pure-g'>
                <Fork className='right' project={pkgInfo.user + '/' + pkgInfo.name} />
                <header className='pure-u-1'>
                    <h1>{pkgInfo.name}</h1>

                    <div className='description'>{pkgInfo.description}</div>
                </header>
                <article className='pure-u-1'>
                    <section className='demonstration'>
                        <div className='description'>
                            <h2>Demonstration</h2>

                            <p>Tweak values below and see how Ellipsify behaves.</p>

                            <form className='pure-form pure-form-stacked controls'>
                                <fieldset>
                                    <div className='pure-g'>
                                        <div className='pure-u-1-2 pure-u-md-1-2'>
                                            <label>Visible items</label>
                                            <input type='number' className='pure-u-23-24' valueLink={this.linkState('visibleItems')} />
                                        </div>

                                        <div className='pure-u-1-2 pure-u-md-1-2'>
                                            <label>Separator</label>
                                            <input type='text' className='pure-u-23-24' valueLink={this.linkState('separator')} />
                                        </div>

                                        <div className='pure-u-1-2 pure-u-md-1-2'>
                                            <label>More</label>
                                            <input type='text' className='pure-u-23-24' valueLink={this.linkState('more')} />
                                        </div>

                                        <div className='pure-u-1-2 pure-u-md-1-2'>
                                            <label>At Front</label>
                                            <input type='checkbox' className='pure-u-23-24' valueLink={this.linkState('more')} />
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>

                        <Ellipsify visibleItems={visibleItems} separator={separator} more={more} moreClass='more' atFront={atFront}>
                            <p><b>Lorem ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin consectetur enim ligula, a mollis est consequat sollicitudin. Pellentesque eleifend blandit metus, ac fermentum velit sagittis ut. Etiam malesuada dui id est venenatis dapibus.</p>

                            <p>Pellentesque non sem rutrum, suscipit risus at, vulputate eros. Aliquam a lacinia eros. Nulla et imperdiet neque. Vivamus finibus urna nec laoreet consectetur. Ut eget consectetur nulla. Curabitur vitae mauris felis.</p>

                            <p>Fusce id libero nisl. Sed malesuada aliquam lectus, nec ullamcorper lorem. Phasellus in sapien maximus, laoreet ipsum nec, vestibulum sapien. Nunc quis tincidunt magna, ac semper turpis. Praesent eget diam eu turpis sollicitudin pharetra eu eu ipsum. Nulla at lacus eu augue luctus maximus.</p>
                        </Ellipsify>
                    </section>
                    <section className='documentation'>
                        <h2>README</h2>

                        <div dangerouslySetInnerHTML={{__html: readme}}></div>
                    </section>
                </article>
            </div>
        );
    },
});
