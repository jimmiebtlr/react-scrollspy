'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScrollSpy = function (_React$Component) {
  (0, _inherits3.default)(ScrollSpy, _React$Component);

  function ScrollSpy(props) {
    (0, _classCallCheck3.default)(this, ScrollSpy);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ScrollSpy).call(this, props));

    _this.state = { data: new Immutable.Map({}) };

    _this.navTo = function (route) {
      var $nav = $(ReactDOM.findDOMNode(_this.refs[_this.navRef]));
      $(ReactDOM.findDOMNode(_this.refs[route])).velocity('stop').velocity('scroll', {
        duration: 300,
        easing: 'easeInOut',
        container: _this._$,
        offset: -$nav.height()
      });
    };
    return _this;
  }

  (0, _createClass3.default)(ScrollSpy, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this._$ = this._jquery();
      this._$.on('scroll', function () {
        _this2._spy();
      });
    }
  }, {
    key: '_jquery',
    value: function _jquery() {
      return $(ReactDOM.findDOMNode(this));
    }
  }, {
    key: '_navHeight',
    value: function _navHeight() {
      var $nav = $(ReactDOM.findDOMNode(this.refs[this.navRef]));
      return $nav.height();
    }
  }, {
    key: '_spy',
    value: function _spy() {
      var self = this;
      var navHeight = this._navHeight();
      var active = undefined;
      var activeTop = undefined;
      _.each(this.refs, function (r, key) {
        var top = $(ReactDOM.findDOMNode(r)).position().top;
        if (top <= navHeight && key !== self.navType) {
          if (typeof activeTop === 'undefined') {
            active = key;
            activeTop = top;
          } else if (activeTop < top) {
            active = key;
            activeTop = top;
          }
        }
      });

      var newState = {
        data: this.state.data.set('active', active)
      };
      this.setState(newState);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var children = this.props.children;

      var active = this.state.data.get('active');

      return _react2.default.createElement(
        'div',
        { className: 'scrollspy-wrapper' },
        _react2.default.Children.map(children, function (c) {
          var newChild = undefined;
          var childType = c.props.navRoute;
          if (c.props.isNav) {
            newChild = _react2.default.cloneElement(c, { active: active, navTo: _this3.navTo, ref: _this3.navRef });
          } else {
            newChild = _react2.default.cloneElement(c, { ref: childType });
          }
          return newChild;
        })
      );
    }
  }]);
  return ScrollSpy;
}(_react2.default.Component);

exports.default = ScrollSpy;

ScrollSpy.navType = 'Nav';

ScrollSpy.propTypes = {
  children: _react2.default.PropTypes.node.isRequired
};