"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _util = require("util");

var _util2 = _interopRequireDefault(_util);

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

var _passportOauth = require("passport-oauth2");

var _passportOauth2 = _interopRequireDefault(_passportOauth);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

/**
 * `Strategy` constructor.
 *
 * The Figma authentication strategy authenticates requests by delegating to
 * Figma using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Figma application's Client ID
 *   - `clientSecret`  your Figma application's Client Secret
 *   - `callbackURL`   URL to which Figma will redirect the user after granting authorization
 *   - `scope`         array of permission scopes to request. At the time of writing there is
 *                     only 1 valid scope: 'file_read'
 *                     (see https://www.figma.com/developers/docs#auth-oauth for more info)
 *   - `state`        State needs to be enabled (true) for the Figma authentication flow to work
 *
 * Examples:
 *
 *     passport.use(new FigmaStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret',
 *         callbackURL: 'https://www.example.net/auth/figma/callback',
 *         state: true
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         console.log(accessToken, refreshToken);
 *         done(null, {});
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
var FigmaStrategy = (function(_OAuth2Strategy) {
  _inherits(FigmaStrategy, _OAuth2Strategy);

  function FigmaStrategy(opts, verify) {
    _classCallCheck(this, FigmaStrategy);

    var options = opts || {};
    options.authorizationURL =
      options.authorizationURL || "https://www.figma.com/oauth";
    options.tokenURL =
      options.tokenURL || "https://www.figma.com/api/oauth/token";
    options.scope = options.scope || ["file_read"];
    options.scopeSeparator = options.scopeSeparator || ",";
    options.customHeaders = options.customHeaders || {};

    var _this = _possibleConstructorReturn(
      this,
      (FigmaStrategy.__proto__ || Object.getPrototypeOf(FigmaStrategy)).call(
        this,
        options,
        verify
      )
    );

    _this.name = "figma";
    _this._oauth2.useAuthorizationHeaderforGET(true);
    return _this;
  }

  /**
   * Usually you would fetch the authenticated user's profile here
   * but Figma has no profile at this point so we are just
   * letting it pass
   *
   * @param {String} accessToken
   * @param {Function} done
   */

  _createClass(FigmaStrategy, [
    {
      key: "userProfile",
      value: function userProfile(accessToken, done) {
        done(null, {});
      }
    }
  ]);

  return FigmaStrategy;
})(_passportOauth2.default);

exports.default = FigmaStrategy;
module.exports = exports["default"];
