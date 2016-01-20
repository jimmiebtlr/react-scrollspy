export default class ScrollSpy extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: new Immutable.Map({}) };

    this.navTo = (route) => {
      const $nav = $(ReactDOM.findDOMNode(this.refs[this.navRef]));
      $(ReactDOM.findDOMNode(this.refs[route]))
        .velocity('stop')
        .velocity('scroll', {
          duration: 300,
          easing: 'easeInOut',
          container: this._$,
          offset: -$nav.height(),
        });
    };
  }

  componentDidMount() {
    this._$ = this._jquery();
    this._$.on('scroll', () => {
      this._spy();
    });
  }

  _jquery() {
    return $(ReactDOM.findDOMNode(this));
  }

  _navHeight() {
    const $nav = $(ReactDOM.findDOMNode(this.refs[this.navRef]));
    return $nav.height();
  }

  _spy() {
    const self = this;
    const navHeight = this._navHeight();
    let active;
    let activeTop;
    _.each(this.refs, (r, key) => {
      const top = $(ReactDOM.findDOMNode(r)).position().top;
      if (top <= navHeight && key !== self.navType) {
        if (typeof(activeTop) === 'undefined') {
          active = key;
          activeTop = top;
        } else if (activeTop < top) {
          active = key;
          activeTop = top;
        }
      }
    });

    const newState = {
      data: this.state.data.set('active', active),
    };
    this.setState(newState);
  }

  render() {
    const { children } = this.props;
    const active = this.state.data.get('active');

    return (<div className="scrollspy-wrapper">
      {React.Children.map(children, (c) => {
        let newChild;
        const childType = c.props.navRoute;
        if (c.props.isNav) {
          newChild = React.cloneElement(c, { active, navTo: this.navTo, ref: this.navRef });
        } else {
          newChild = React.cloneElement(c, { ref: childType });
        }
        return newChild;
      })}
    </div>);
  }
}

ScrollSpy.navType = 'Nav';

ScrollSpy.propTypes = {
  children: React.PropTypes.node.isRequired,
};
