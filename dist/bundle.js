!(function (t) {
	var e = {};
	function n(r) {
		if (e[r]) return e[r].exports;
		var i = (e[r] = { i: r, l: !1, exports: {} });
		return t[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
	}
	(n.m = t),
		(n.c = e),
		(n.d = function (t, e, r) {
			n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
		}),
		(n.r = function (t) {
			"undefined" != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
				Object.defineProperty(t, "__esModule", { value: !0 });
		}),
		(n.t = function (t, e) {
			if ((1 & e && (t = n(t)), 8 & e)) return t;
			if (4 & e && "object" == typeof t && t && t.__esModule) return t;
			var r = Object.create(null);
			if (
				(n.r(r),
				Object.defineProperty(r, "default", { enumerable: !0, value: t }),
				2 & e && "string" != typeof t)
			)
				for (var i in t)
					n.d(
						r,
						i,
						function (e) {
							return t[e];
						}.bind(null, i)
					);
			return r;
		}),
		(n.n = function (t) {
			var e =
				t && t.__esModule
					? function () {
							return t.default;
					  }
					: function () {
							return t;
					  };
			return n.d(e, "a", e), e;
		}),
		(n.o = function (t, e) {
			return Object.prototype.hasOwnProperty.call(t, e);
		}),
		(n.p = ""),
		n((n.s = 1));
})([
	,
	function (t, e, n) {
		"use strict";
		n.r(e),
			n.d(e, "init", function () {
				return kt;
			}),
			n.d(e, "gameOver", function () {
				return Ct;
			}),
			n.d(e, "score", function () {
				return Ot;
			});
		class r {
			constructor(t, e, n, r, i, o) {
				(this._live = 1),
					(this._sheet = new Image()),
					(this._tileFrameX = 0),
					(this._tileFrameY = 2),
					(this._tileWidth = 9),
					(this._tileHeight = 9),
					(this._spriteChangeCounter = 0),
					(this.grid = 900),
					(this._context = t),
					(this._x = i),
					(this._y = o),
					(this._speedX = 5),
					(this._speedY = 35),
					(this._zoom = r),
					(this._zoomedWidth = this._tileWidth * this._zoom),
					(this._zoomedHeight = this._tileHeight * this._zoom),
					(this._shoots = e),
					(this._handler = n),
					(this._canvasCollision = {
						right: this._context.canvas.width - this._zoomedWidth,
						left: 0,
						top: 0,
						bottom: this._context.canvas.width - 9 * this._zoomedHeight,
					}),
					(this._sheet.src = "../img/ji-sheet.png");
			}
			_translate(t, e) {
				this._context.clearRect(
					this._x,
					this._y,
					this._zoomedWidth,
					this._zoomedHeight
				),
					(this._x += t),
					(this._y += e),
					this._renderEnemy();
			}
			_renderEnemy() {
				this._context.drawImage(
					this._sheet,
					this._tileWidth * this._tileFrameX,
					this._tileWidth * this._tileFrameY,
					this._tileWidth,
					this._tileWidth,
					this._x,
					this._y,
					this._zoomedWidth,
					this._zoomedHeight
				);
			}
			moveEnemy() {
				this._hit(),
					this._spriteAnimation(),
					((this._speedX > 0 && this._x <= this._canvasCollision.right) ||
						(this._speedX < 0 && this._x >= this._canvasCollision.left)) &&
						this._translate(this._speedX, 0),
					((this._speedX > 0 && this._x >= this._canvasCollision.right) ||
						(this._speedX < 0 && this._x <= this._canvasCollision.left)) &&
						((this._speedX = -this._speedX), this._translate(0, this._speedY)),
					this._dead(),
					this._gameOver();
			}
			_spriteAnimation() {
				this._spriteChangeCounter >= 50
					? ((this._spriteChangeCounter = 0),
					  this._tileFrameX < 1 ? this._tileFrameX++ : (this._tileFrameX = 0))
					: this._spriteChangeCounter++;
			}
			_hit() {
				for (let t = 0; t < this._shoots.length; t++) {
					let e = this._shoots[t].getX,
						n = this._shoots[t].getY;
					n > this._y &&
						n <= this._y + this._zoomedHeight &&
						e >= this._x &&
						e <= this._x + this._zoomedWidth &&
						(console.log("HIT"), this._shoots[t].hit(), this._live--, Ot()),
						this._shoots[t].getX;
				}
			}
			_dead() {
				if (this._live <= 0) {
					this._handler.removeEnemy(this),
						this._context.clearRect(
							this._x,
							this._y,
							this._zoomedWidth,
							this._zoomedHeight
						);
					const t =
						9 * Math.floor(Math.random() * (this._context.canvas.width / 9));
					let e = Math.floor(
						Math.random() * (this._canvasCollision.bottom / 9) * 9
					);
					for (
						;
						this._handler.getEnemiesY.find((t) => {
							e >= t && this._zoomedHeight;
						});

					)
						e =
							9 * Math.floor(Math.random() * (this._context.canvas.height / 9));
					setTimeout(() => {
						this._handler.addEnemy(
							new r(
								this._context,
								this._shoots,
								this._handler,
								this._zoom,
								t,
								e
							)
						);
					}, 1e4);
				}
			}
			_gameOver() {
				this._y > this._canvasCollision.bottom && console.log("finish");
			}
			get zoom() {
				return this._zoom;
			}
			get tileWidth() {
				return this._tileWidth;
			}
			get tileHeight() {
				return this._tileHeight;
			}
			get y() {
				return this._y;
			}
		}
		/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var i =
			function (t, e) {
				return (i =
					Object.setPrototypeOf ||
					({ __proto__: [] } instanceof Array &&
						function (t, e) {
							t.__proto__ = e;
						}) ||
					function (t, e) {
						for (var n in e)
							Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
					})(t, e);
			};
		function o(t, e) {
			if ("function" != typeof e && null !== e)
				throw new TypeError(
					"Class extends value " + String(e) + " is not a constructor or null"
				);
			function n() {
				this.constructor = t;
			}
			i(t, e),
				(t.prototype =
					null === e
						? Object.create(e)
						: ((n.prototype = e.prototype), new n()));
		}
		function s(t, e, n, r) {
			return new (n || (n = Promise))(function (i, o) {
				function s(t) {
					try {
						c(r.next(t));
					} catch (t) {
						o(t);
					}
				}
				function u(t) {
					try {
						c(r.throw(t));
					} catch (t) {
						o(t);
					}
				}
				function c(t) {
					var e;
					t.done
						? i(t.value)
						: ((e = t.value),
						  e instanceof n
								? e
								: new n(function (t) {
										t(e);
								  })).then(s, u);
				}
				c((r = r.apply(t, e || [])).next());
			});
		}
		function u(t, e) {
			var n,
				r,
				i,
				o,
				s = {
					label: 0,
					sent: function () {
						if (1 & i[0]) throw i[1];
						return i[1];
					},
					trys: [],
					ops: [],
				};
			return (
				(o = { next: u(0), throw: u(1), return: u(2) }),
				"function" == typeof Symbol &&
					(o[Symbol.iterator] = function () {
						return this;
					}),
				o
			);
			function u(o) {
				return function (u) {
					return (function (o) {
						if (n) throw new TypeError("Generator is already executing.");
						for (; s; )
							try {
								if (
									((n = 1),
									r &&
										(i =
											2 & o[0]
												? r.return
												: o[0]
												? r.throw || ((i = r.return) && i.call(r), 0)
												: r.next) &&
										!(i = i.call(r, o[1])).done)
								)
									return i;
								switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
									case 0:
									case 1:
										i = o;
										break;
									case 4:
										return s.label++, { value: o[1], done: !1 };
									case 5:
										s.label++, (r = o[1]), (o = [0]);
										continue;
									case 7:
										(o = s.ops.pop()), s.trys.pop();
										continue;
									default:
										if (
											!((i = s.trys),
											(i = i.length > 0 && i[i.length - 1]) ||
												(6 !== o[0] && 2 !== o[0]))
										) {
											s = 0;
											continue;
										}
										if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
											s.label = o[1];
											break;
										}
										if (6 === o[0] && s.label < i[1]) {
											(s.label = i[1]), (i = o);
											break;
										}
										if (i && s.label < i[2]) {
											(s.label = i[2]), s.ops.push(o);
											break;
										}
										i[2] && s.ops.pop(), s.trys.pop();
										continue;
								}
								o = e.call(t, s);
							} catch (t) {
								(o = [6, t]), (r = 0);
							} finally {
								n = i = 0;
							}
						if (5 & o[0]) throw o[1];
						return { value: o[0] ? o[1] : void 0, done: !0 };
					})([o, u]);
				};
			}
		}
		Object.create;
		function c(t) {
			var e = "function" == typeof Symbol && Symbol.iterator,
				n = e && t[e],
				r = 0;
			if (n) return n.call(t);
			if (t && "number" == typeof t.length)
				return {
					next: function () {
						return (
							t && r >= t.length && (t = void 0),
							{ value: t && t[r++], done: !t }
						);
					},
				};
			throw new TypeError(
				e ? "Object is not iterable." : "Symbol.iterator is not defined."
			);
		}
		function h(t, e) {
			var n = "function" == typeof Symbol && t[Symbol.iterator];
			if (!n) return t;
			var r,
				i,
				o = n.call(t),
				s = [];
			try {
				for (; (void 0 === e || e-- > 0) && !(r = o.next()).done; )
					s.push(r.value);
			} catch (t) {
				i = { error: t };
			} finally {
				try {
					r && !r.done && (n = o.return) && n.call(o);
				} finally {
					if (i) throw i.error;
				}
			}
			return s;
		}
		function a(t, e) {
			for (var n = 0, r = e.length, i = t.length; n < r; n++, i++) t[i] = e[n];
			return t;
		}
		function l(t) {
			return this instanceof l ? ((this.v = t), this) : new l(t);
		}
		function f(t, e, n) {
			if (!Symbol.asyncIterator)
				throw new TypeError("Symbol.asyncIterator is not defined.");
			var r,
				i = n.apply(t, e || []),
				o = [];
			return (
				(r = {}),
				s("next"),
				s("throw"),
				s("return"),
				(r[Symbol.asyncIterator] = function () {
					return this;
				}),
				r
			);
			function s(t) {
				i[t] &&
					(r[t] = function (e) {
						return new Promise(function (n, r) {
							o.push([t, e, n, r]) > 1 || u(t, e);
						});
					});
			}
			function u(t, e) {
				try {
					(n = i[t](e)).value instanceof l
						? Promise.resolve(n.value.v).then(c, h)
						: a(o[0][2], n);
				} catch (t) {
					a(o[0][3], t);
				}
				var n;
			}
			function c(t) {
				u("next", t);
			}
			function h(t) {
				u("throw", t);
			}
			function a(t, e) {
				t(e), o.shift(), o.length && u(o[0][0], o[0][1]);
			}
		}
		function d(t) {
			if (!Symbol.asyncIterator)
				throw new TypeError("Symbol.asyncIterator is not defined.");
			var e,
				n = t[Symbol.asyncIterator];
			return n
				? n.call(t)
				: ((t = c(t)),
				  (e = {}),
				  r("next"),
				  r("throw"),
				  r("return"),
				  (e[Symbol.asyncIterator] = function () {
						return this;
				  }),
				  e);
			function r(n) {
				e[n] =
					t[n] &&
					function (e) {
						return new Promise(function (r, i) {
							(function (t, e, n, r) {
								Promise.resolve(r).then(function (e) {
									t({ value: e, done: n });
								}, e);
							})(r, i, (e = t[n](e)).done, e.value);
						});
					};
			}
		}
		Object.create;
		function p(t) {
			return "function" == typeof t;
		}
		function _(t) {
			var e = t(function (t) {
				Error.call(t), (t.stack = new Error().stack);
			});
			return (
				(e.prototype = Object.create(Error.prototype)),
				(e.prototype.constructor = e),
				e
			);
		}
		var y = _(function (t) {
			return function (e) {
				t(this),
					(this.message = e
						? e.length +
						  " errors occurred during unsubscription:\n" +
						  e
								.map(function (t, e) {
									return e + 1 + ") " + t.toString();
								})
								.join("\n  ")
						: ""),
					(this.name = "UnsubscriptionError"),
					(this.errors = e);
			};
		});
		function v(t, e) {
			if (t) {
				var n = t.indexOf(e);
				0 <= n && t.splice(n, 1);
			}
		}
		var b = (function () {
				function t(t) {
					(this.initialTeardown = t),
						(this.closed = !1),
						(this._parentage = null),
						(this._teardowns = null);
				}
				var e;
				return (
					(t.prototype.unsubscribe = function () {
						var t, e, n, r, i;
						if (!this.closed) {
							this.closed = !0;
							var o = this._parentage;
							if (Array.isArray(o))
								try {
									for (var s = c(o), u = s.next(); !u.done; u = s.next()) {
										u.value.remove(this);
									}
								} catch (e) {
									t = { error: e };
								} finally {
									try {
										u && !u.done && (e = s.return) && e.call(s);
									} finally {
										if (t) throw t.error;
									}
								}
							else null == o || o.remove(this);
							var l = this.initialTeardown;
							if (p(l))
								try {
									l();
								} catch (t) {
									i = t instanceof y ? t.errors : [t];
								}
							var f = this._teardowns;
							if (f) {
								this._teardowns = null;
								try {
									for (var d = c(f), _ = d.next(); !_.done; _ = d.next()) {
										var v = _.value;
										try {
											w(v);
										} catch (t) {
											(i = null != i ? i : []),
												t instanceof y
													? (i = a(a([], h(i)), h(t.errors)))
													: i.push(t);
										}
									}
								} catch (t) {
									n = { error: t };
								} finally {
									try {
										_ && !_.done && (r = d.return) && r.call(d);
									} finally {
										if (n) throw n.error;
									}
								}
							}
							if (i) throw new y(i);
						}
					}),
					(t.prototype.add = function (e) {
						var n;
						if (e && e !== this)
							if (this.closed) w(e);
							else {
								if (e instanceof t) {
									if (e.closed || e._hasParent(this)) return;
									e._addParent(this);
								}
								(this._teardowns =
									null !== (n = this._teardowns) && void 0 !== n ? n : []).push(
									e
								);
							}
					}),
					(t.prototype._hasParent = function (t) {
						var e = this._parentage;
						return e === t || (Array.isArray(e) && e.includes(t));
					}),
					(t.prototype._addParent = function (t) {
						var e = this._parentage;
						this._parentage = Array.isArray(e)
							? (e.push(t), e)
							: e
							? [e, t]
							: t;
					}),
					(t.prototype._removeParent = function (t) {
						var e = this._parentage;
						e === t ? (this._parentage = null) : Array.isArray(e) && v(e, t);
					}),
					(t.prototype.remove = function (e) {
						var n = this._teardowns;
						n && v(n, e), e instanceof t && e._removeParent(this);
					}),
					(t.EMPTY = (((e = new t()).closed = !0), e)),
					t
				);
			})(),
			m = b.EMPTY;
		function g(t) {
			return (
				t instanceof b ||
				(t && "closed" in t && p(t.remove) && p(t.add) && p(t.unsubscribe))
			);
		}
		function w(t) {
			p(t) ? t() : t.unsubscribe();
		}
		var x = {
				onUnhandledError: null,
				onStoppedNotification: null,
				Promise: void 0,
				useDeprecatedSynchronousErrorHandling: !1,
				useDeprecatedNextContext: !1,
			},
			S = {
				setTimeout: function () {
					for (var t = [], e = 0; e < arguments.length; e++)
						t[e] = arguments[e];
					var n = S.delegate;
					return ((null == n ? void 0 : n.setTimeout) || setTimeout).apply(
						void 0,
						a([], h(t))
					);
				},
				clearTimeout: function (t) {
					var e = S.delegate;
					return ((null == e ? void 0 : e.clearTimeout) || clearTimeout)(t);
				},
				delegate: void 0,
			};
		function z(t) {
			S.setTimeout(function () {
				var e = x.onUnhandledError;
				if (!e) throw t;
				e(t);
			});
		}
		function E() {}
		var k = C("C", void 0, void 0);
		function C(t, e, n) {
			return { kind: t, value: e, error: n };
		}
		var I = (function (t) {
				function e(e) {
					var n = t.call(this) || this;
					return (
						(n.isStopped = !1),
						e ? ((n.destination = e), g(e) && e.add(n)) : (n.destination = H),
						n
					);
				}
				return (
					o(e, t),
					(e.create = function (t, e, n) {
						return new O(t, e, n);
					}),
					(e.prototype.next = function (t) {
						this.isStopped
							? j(
									(function (t) {
										return C("N", t, void 0);
									})(t),
									this
							  )
							: this._next(t);
					}),
					(e.prototype.error = function (t) {
						this.isStopped
							? j(C("E", void 0, t), this)
							: ((this.isStopped = !0), this._error(t));
					}),
					(e.prototype.complete = function () {
						this.isStopped
							? j(k, this)
							: ((this.isStopped = !0), this._complete());
					}),
					(e.prototype.unsubscribe = function () {
						this.closed ||
							((this.isStopped = !0),
							t.prototype.unsubscribe.call(this),
							(this.destination = null));
					}),
					(e.prototype._next = function (t) {
						this.destination.next(t);
					}),
					(e.prototype._error = function (t) {
						try {
							this.destination.error(t);
						} finally {
							this.unsubscribe();
						}
					}),
					(e.prototype._complete = function () {
						try {
							this.destination.complete();
						} finally {
							this.unsubscribe();
						}
					}),
					e
				);
			})(b),
			O = (function (t) {
				function e(e, n, r) {
					var i,
						o = t.call(this) || this;
					if (p(e)) i = e;
					else if (e) {
						var s;
						(i = e.next),
							(n = e.error),
							(r = e.complete),
							o && x.useDeprecatedNextContext
								? ((s = Object.create(e)).unsubscribe = function () {
										return o.unsubscribe();
								  })
								: (s = e),
							(i = null == i ? void 0 : i.bind(s)),
							(n = null == n ? void 0 : n.bind(s)),
							(r = null == r ? void 0 : r.bind(s));
					}
					return (
						(o.destination = {
							next: i ? P(i, o) : E,
							error: P(null != n ? n : T, o),
							complete: r ? P(r, o) : E,
						}),
						o
					);
				}
				return o(e, t), e;
			})(I);
		function P(t, e) {
			return function () {
				for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
				try {
					t.apply(void 0, a([], h(n)));
				} catch (t) {
					if (x.useDeprecatedSynchronousErrorHandling) {
						if (!e._syncErrorHack_isSubscribing) throw t;
						e.__syncError = t;
					} else z(t);
				}
			};
		}
		function T(t) {
			throw t;
		}
		function j(t, e) {
			var n = x.onStoppedNotification;
			n &&
				S.setTimeout(function () {
					return n(t, e);
				});
		}
		var H = { closed: !0, next: E, error: T, complete: E },
			A = ("function" == typeof Symbol && Symbol.observable) || "@@observable";
		function W(t) {
			return t;
		}
		function X(t) {
			return 0 === t.length
				? W
				: 1 === t.length
				? t[0]
				: function (e) {
						return t.reduce(function (t, e) {
							return e(t);
						}, e);
				  };
		}
		var L = (function () {
			function t(t) {
				t && (this._subscribe = t);
			}
			return (
				(t.prototype.lift = function (e) {
					var n = new t();
					return (n.source = this), (n.operator = e), n;
				}),
				(t.prototype.subscribe = function (t, e, n) {
					var r,
						i =
							((r = t) && r instanceof I) ||
							((function (t) {
								return t && p(t.next) && p(t.error) && p(t.complete);
							})(r) &&
								g(r))
								? t
								: new O(t, e, n);
					if (x.useDeprecatedSynchronousErrorHandling)
						this._deprecatedSyncErrorSubscribe(i);
					else {
						var o = this.operator,
							s = this.source;
						i.add(
							o ? o.call(i, s) : s ? this._subscribe(i) : this._trySubscribe(i)
						);
					}
					return i;
				}),
				(t.prototype._deprecatedSyncErrorSubscribe = function (t) {
					var e = t;
					e._syncErrorHack_isSubscribing = !0;
					var n = this.operator;
					if (n) t.add(n.call(t, this.source));
					else
						try {
							this._subscribe(t);
						} catch (t) {
							e.__syncError = t;
						}
					for (var r = e; r; ) {
						if ("__syncError" in r)
							try {
								throw r.__syncError;
							} finally {
								t.unsubscribe();
							}
						r = r.destination;
					}
					e._syncErrorHack_isSubscribing = !1;
				}),
				(t.prototype._trySubscribe = function (t) {
					try {
						return this._subscribe(t);
					} catch (e) {
						t.error(e);
					}
				}),
				(t.prototype.forEach = function (t, e) {
					var n = this;
					return new (e = F(e))(function (e, r) {
						var i;
						i = n.subscribe(
							function (e) {
								try {
									t(e);
								} catch (t) {
									r(t), null == i || i.unsubscribe();
								}
							},
							r,
							e
						);
					});
				}),
				(t.prototype._subscribe = function (t) {
					var e;
					return null === (e = this.source) || void 0 === e
						? void 0
						: e.subscribe(t);
				}),
				(t.prototype[A] = function () {
					return this;
				}),
				(t.prototype.pipe = function () {
					for (var t = [], e = 0; e < arguments.length; e++)
						t[e] = arguments[e];
					return t.length ? X(t)(this) : this;
				}),
				(t.prototype.toPromise = function (t) {
					var e = this;
					return new (t = F(t))(function (t, n) {
						var r;
						e.subscribe(
							function (t) {
								return (r = t);
							},
							function (t) {
								return n(t);
							},
							function () {
								return t(r);
							}
						);
					});
				}),
				(t.create = function (e) {
					return new t(e);
				}),
				t
			);
		})();
		function F(t) {
			var e;
			return null !== (e = null != t ? t : x.Promise) && void 0 !== e
				? e
				: Promise;
		}
		function M(t) {
			return function (e) {
				if (
					(function (t) {
						return p(null == t ? void 0 : t.lift);
					})(e)
				)
					return e.lift(function (e) {
						try {
							return t(e, this);
						} catch (t) {
							this.error(t);
						}
					});
				throw new TypeError("Unable to lift unknown Observable type");
			};
		}
		var Y = (function (t) {
			function e(e, n, r, i, o) {
				var s = t.call(this, e) || this;
				return (
					(s.onFinalize = o),
					(s._next = n
						? function (t) {
								try {
									n(t);
								} catch (t) {
									e.error(t);
								}
						  }
						: t.prototype._next),
					(s._error = i
						? function (t) {
								try {
									i(t);
								} catch (t) {
									e.error(t);
								} finally {
									this.unsubscribe();
								}
						  }
						: t.prototype._error),
					(s._complete = r
						? function () {
								try {
									r();
								} catch (t) {
									e.error(t);
								} finally {
									this.unsubscribe();
								}
						  }
						: t.prototype._complete),
					s
				);
			}
			return (
				o(e, t),
				(e.prototype.unsubscribe = function () {
					var e,
						n = this.closed;
					t.prototype.unsubscribe.call(this),
						!n &&
							(null === (e = this.onFinalize) || void 0 === e || e.call(this));
				}),
				e
			);
		})(I);
		function R(t, e) {
			return M(function (n, r) {
				var i = 0;
				n.subscribe(
					new Y(r, function (n) {
						r.next(t.call(e, n, i++));
					})
				);
			});
		}
		var D = function (t) {
			return t && "number" == typeof t.length && "function" != typeof t;
		};
		function N(t) {
			return p(null == t ? void 0 : t.then);
		}
		function U(t, e) {
			return new L(function (n) {
				var r = 0;
				return e.schedule(function () {
					r === t.length
						? n.complete()
						: (n.next(t[r++]), n.closed || this.schedule());
				});
			});
		}
		var $ =
			"function" == typeof Symbol && Symbol.iterator
				? Symbol.iterator
				: "@@iterator";
		function B(t) {
			return p(t[A]);
		}
		function V(t) {
			return p(null == t ? void 0 : t[$]);
		}
		function q(t) {
			return (
				Symbol.asyncIterator && p(null == t ? void 0 : t[Symbol.asyncIterator])
			);
		}
		function G(t) {
			return new TypeError(
				"You provided " +
					(null !== t && "object" == typeof t
						? "an invalid object"
						: "'" + t + "'") +
					" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable."
			);
		}
		function J(t) {
			return f(this, arguments, function () {
				var e, n, r;
				return u(this, function (i) {
					switch (i.label) {
						case 0:
							(e = t.getReader()), (i.label = 1);
						case 1:
							i.trys.push([1, , 9, 10]), (i.label = 2);
						case 2:
							return [4, l(e.read())];
						case 3:
							return (
								(n = i.sent()), (r = n.value), n.done ? [4, l(void 0)] : [3, 5]
							);
						case 4:
							return [2, i.sent()];
						case 5:
							return [4, l(r)];
						case 6:
							return [4, i.sent()];
						case 7:
							return i.sent(), [3, 2];
						case 8:
							return [3, 10];
						case 9:
							return e.releaseLock(), [7];
						case 10:
							return [2];
					}
				});
			});
		}
		function K(t) {
			return p(null == t ? void 0 : t.getReader);
		}
		function Q(t) {
			if (t instanceof L) return t;
			if (null != t) {
				if (B(t))
					return (
						(r = t),
						new L(function (t) {
							var e = r[A]();
							if (p(e.subscribe)) return e.subscribe(t);
							throw new TypeError(
								"Provided object does not correctly implement Symbol.observable"
							);
						})
					);
				if (D(t)) return Z(t);
				if (N(t))
					return (
						(n = t),
						new L(function (t) {
							n.then(
								function (e) {
									t.closed || (t.next(e), t.complete());
								},
								function (e) {
									return t.error(e);
								}
							).then(null, z);
						})
					);
				if (q(t)) return tt(t);
				if (V(t))
					return (
						(e = t),
						new L(function (t) {
							var n, r;
							try {
								for (var i = c(e), o = i.next(); !o.done; o = i.next()) {
									var s = o.value;
									if ((t.next(s), t.closed)) return;
								}
							} catch (t) {
								n = { error: t };
							} finally {
								try {
									o && !o.done && (r = i.return) && r.call(i);
								} finally {
									if (n) throw n.error;
								}
							}
							t.complete();
						})
					);
				if (K(t)) return tt(J(t));
			}
			var e, n, r;
			throw G(t);
		}
		function Z(t) {
			return new L(function (e) {
				for (var n = 0; n < t.length && !e.closed; n++) e.next(t[n]);
				e.complete();
			});
		}
		function tt(t) {
			return new L(function (e) {
				(function (t, e) {
					var n, r, i, o;
					return s(this, void 0, void 0, function () {
						var s, c;
						return u(this, function (u) {
							switch (u.label) {
								case 0:
									u.trys.push([0, 5, 6, 11]), (n = d(t)), (u.label = 1);
								case 1:
									return [4, n.next()];
								case 2:
									if ((r = u.sent()).done) return [3, 4];
									if (((s = r.value), e.next(s), e.closed)) return [2];
									u.label = 3;
								case 3:
									return [3, 1];
								case 4:
									return [3, 11];
								case 5:
									return (c = u.sent()), (i = { error: c }), [3, 11];
								case 6:
									return (
										u.trys.push([6, , 9, 10]),
										r && !r.done && (o = n.return) ? [4, o.call(n)] : [3, 8]
									);
								case 7:
									u.sent(), (u.label = 8);
								case 8:
									return [3, 10];
								case 9:
									if (i) throw i.error;
									return [7];
								case 10:
									return [7];
								case 11:
									return e.complete(), [2];
							}
						});
					});
				})(t, e).catch(function (t) {
					return e.error(t);
				});
			});
		}
		function et(t, e, n) {
			return (
				void 0 === n && (n = 1 / 0),
				p(e)
					? et(function (n, r) {
							return R(function (t, i) {
								return e(n, t, r, i);
							})(Q(t(n, r)));
					  }, n)
					: ("number" == typeof e && (n = e),
					  M(function (e, r) {
							return (function (t, e, n, r, i, o, s, u) {
								var c = [],
									h = 0,
									a = 0,
									l = !1,
									f = function () {
										!l || c.length || h || e.complete();
									},
									d = function (t) {
										return h < r ? p(t) : c.push(t);
									},
									p = function (t) {
										o && e.next(t), h++;
										var u = !1;
										Q(n(t, a++)).subscribe(
											new Y(
												e,
												function (t) {
													null == i || i(t), o ? d(t) : e.next(t);
												},
												function () {
													u = !0;
												},
												void 0,
												function () {
													if (u)
														try {
															h--;
															for (
																var t = function () {
																	var t = c.shift();
																	s
																		? e.add(
																				s.schedule(function () {
																					return p(t);
																				})
																		  )
																		: p(t);
																};
																c.length && h < r;

															)
																t();
															f();
														} catch (t) {
															e.error(t);
														}
												}
											)
										);
									};
								return (
									t.subscribe(
										new Y(e, d, function () {
											(l = !0), f();
										})
									),
									function () {
										null == u || u();
									}
								);
							})(e, r, t, n);
					  }))
			);
		}
		var nt = Array.isArray;
		function rt(t) {
			return R(function (e) {
				return (function (t, e) {
					return nt(e) ? t.apply(void 0, a([], h(e))) : t(e);
				})(t, e);
			});
		}
		var it = ["addListener", "removeListener"],
			ot = ["addEventListener", "removeEventListener"],
			st = ["on", "off"];
		function ut(t, e, n, r) {
			if ((p(n) && ((r = n), (n = void 0)), r)) return ut(t, e, n).pipe(rt(r));
			var i,
				o,
				s = h(
					(function (t) {
						return p(t.addEventListener) && p(t.removeEventListener);
					})(t)
						? ot.map(function (r) {
								return function (i) {
									return t[r](e, i, n);
								};
						  })
						: (function (t) {
								return p(t.addListener) && p(t.removeListener);
						  })(t)
						? it.map(ct(t, e))
						: (function (t) {
								return p(t.on) && p(t.off);
						  })(t)
						? st.map(ct(t, e))
						: [],
					2
				),
				u = s[0],
				c = s[1];
			if (!u && D(t))
				return et(function (t) {
					return ut(t, e, n);
				})(((i = t), o ? U(i, o) : Z(i)));
			if (!u) throw new TypeError("Invalid event target");
			return new L(function (t) {
				var e = function () {
					for (var e = [], n = 0; n < arguments.length; n++)
						e[n] = arguments[n];
					return t.next(1 < e.length ? e : e[0]);
				};
				return (
					u(e),
					function () {
						return c(e);
					}
				);
			});
		}
		function ct(t, e) {
			return function (n) {
				return function (r) {
					return t[n](e, r);
				};
			};
		}
		class ht {
			constructor(t, e, n, r, i, o) {
				(this._sheet = new Image()),
					(this._velocity = 4),
					(this.pressed_keys = []),
					(this._keydown = ut(document, "keydown")),
					(this._keydown$ = this._keydown.pipe(
						R((t) => {
							this.pressed_keys.push(t.key);
						})
					)),
					(this._keyup = ut(document, "keyup")),
					(this._keyup$ = this._keyup.pipe(
						R((t) => {
							this.pressed_keys = this.pressed_keys.filter((e) => e !== t.key);
						})
					)),
					(this.keydownSubscription = this._keydown$.subscribe()),
					(this.keyupSubscription = this._keyup$.subscribe()),
					(this._tileSize = 9),
					(this._context = t),
					(this._shot = e),
					(this._left = n),
					(this._right = r),
					(this._fire = i),
					(this._zoomedSize = o * this._tileSize),
					(this._y = t.canvas.height - this._zoomedSize),
					(this._x = (t.canvas.width - this._zoomedSize) / 2),
					(this._sheet.src = "../img/ji-sheet.png"),
					this._render(!0);
			}
			handleInput() {
				this.pressed_keys.includes(this._left) && this._moveLeft(),
					this.pressed_keys.includes(this._right) && this._moveRight(),
					this.pressed_keys.includes(this._fire) && this._fireShot(),
					this._clear(),
					this._render();
			}
			_moveLeft() {
				this._x = this._x - this._velocity >= 0 ? this._x - this._velocity : 0;
			}
			_moveRight() {
				this._x =
					this._x + this._zoomedSize <= this._context.canvas.width
						? this._x + this._velocity
						: this._x;
			}
			_fireShot() {
				this._shot.shoot(this._x + this._zoomedSize / 2, this._y);
			}
			_clear() {
				this._context.clearRect(
					this._x - this._velocity,
					this._y,
					this._context.canvas.width,
					this._context.canvas.height
				);
			}
			_render(t) {
				if (t) {
					const t = this;
					this._sheet.onload = function () {
						t._context.drawImage(
							t._sheet,
							0,
							0,
							9,
							9,
							t._x,
							t._y,
							t._zoomedSize,
							t._zoomedSize
						);
					};
				} else
					this._context.drawImage(
						this._sheet,
						0,
						0,
						9,
						9,
						this._x,
						this._y,
						this._zoomedSize,
						this._zoomedSize
					);
			}
		}
		class at {
			constructor(t) {
				(this._velocity = 20),
					(this._length = 10),
					(this._thickness = 5),
					(this._context = t),
					(this._x = 0),
					(this._y = 0);
			}
			shoot(t, e) {
				this._y <= 0 && (this._clear(), (this._x = t), (this._y = e));
			}
			hit() {
				this._clear(), (this._y = 0);
			}
			shootAnimation() {
				this._y <= 0 && this._clear(),
					this._clear(),
					(this._y -= this._velocity),
					this._render();
			}
			_clear() {
				this._context.clearRect(
					this._x - this._thickness / 2,
					this._y - this._length,
					this._thickness + 0.5,
					this._length + 0.1
				);
			}
			_render() {
				(this._context.fillStyle = "red"),
					this._context.fillRect(
						this._x - this._thickness / 2,
						this._y - this._length,
						this._thickness,
						this._length
					);
			}
			get getX() {
				return this._x;
			}
			get getY() {
				return this._y;
			}
		}
		var lt = _(function (t) {
				return function () {
					t(this),
						(this.name = "ObjectUnsubscribedError"),
						(this.message = "object unsubscribed");
				};
			}),
			ft = (function (t) {
				function e() {
					var e = t.call(this) || this;
					return (
						(e.closed = !1),
						(e.observers = []),
						(e.isStopped = !1),
						(e.hasError = !1),
						(e.thrownError = null),
						e
					);
				}
				return (
					o(e, t),
					(e.prototype.lift = function (t) {
						var e = new dt(this, this);
						return (e.operator = t), e;
					}),
					(e.prototype._throwIfClosed = function () {
						if (this.closed) throw new lt();
					}),
					(e.prototype.next = function (t) {
						var e, n;
						if ((this._throwIfClosed(), !this.isStopped)) {
							var r = this.observers.slice();
							try {
								for (var i = c(r), o = i.next(); !o.done; o = i.next()) {
									o.value.next(t);
								}
							} catch (t) {
								e = { error: t };
							} finally {
								try {
									o && !o.done && (n = i.return) && n.call(i);
								} finally {
									if (e) throw e.error;
								}
							}
						}
					}),
					(e.prototype.error = function (t) {
						if ((this._throwIfClosed(), !this.isStopped)) {
							(this.hasError = this.isStopped = !0), (this.thrownError = t);
							for (var e = this.observers; e.length; ) e.shift().error(t);
						}
					}),
					(e.prototype.complete = function () {
						if ((this._throwIfClosed(), !this.isStopped)) {
							this.isStopped = !0;
							for (var t = this.observers; t.length; ) t.shift().complete();
						}
					}),
					(e.prototype.unsubscribe = function () {
						(this.isStopped = this.closed = !0), (this.observers = null);
					}),
					(e.prototype._trySubscribe = function (e) {
						return (
							this._throwIfClosed(), t.prototype._trySubscribe.call(this, e)
						);
					}),
					(e.prototype._subscribe = function (t) {
						return (
							this._throwIfClosed(),
							this._checkFinalizedStatuses(t),
							this._innerSubscribe(t)
						);
					}),
					(e.prototype._innerSubscribe = function (t) {
						var e = this.hasError,
							n = this.isStopped,
							r = this.observers;
						return e || n
							? m
							: (r.push(t),
							  new b(function () {
									return v(r, t);
							  }));
					}),
					(e.prototype._checkFinalizedStatuses = function (t) {
						var e = this.hasError,
							n = this.thrownError,
							r = this.isStopped;
						e ? t.error(n) : r && t.complete();
					}),
					(e.prototype.asObservable = function () {
						var t = new L();
						return (t.source = this), t;
					}),
					(e.create = function (t, e) {
						return new dt(t, e);
					}),
					e
				);
			})(L),
			dt = (function (t) {
				function e(e, n) {
					var r = t.call(this) || this;
					return (r.destination = e), (r.source = n), r;
				}
				return (
					o(e, t),
					(e.prototype.next = function (t) {
						var e, n;
						null ===
							(n =
								null === (e = this.destination) || void 0 === e
									? void 0
									: e.next) ||
							void 0 === n ||
							n.call(e, t);
					}),
					(e.prototype.error = function (t) {
						var e, n;
						null ===
							(n =
								null === (e = this.destination) || void 0 === e
									? void 0
									: e.error) ||
							void 0 === n ||
							n.call(e, t);
					}),
					(e.prototype.complete = function () {
						var t, e;
						null ===
							(e =
								null === (t = this.destination) || void 0 === t
									? void 0
									: t.complete) ||
							void 0 === e ||
							e.call(t);
					}),
					(e.prototype._subscribe = function (t) {
						var e, n;
						return null !==
							(n =
								null === (e = this.source) || void 0 === e
									? void 0
									: e.subscribe(t)) && void 0 !== n
							? n
							: m;
					}),
					e
				);
			})(ft);
		const pt = new ((function (t) {
				function e(e) {
					var n = t.call(this) || this;
					return (n._value = e), n;
				}
				return (
					o(e, t),
					Object.defineProperty(e.prototype, "value", {
						get: function () {
							return this.getValue();
						},
						enumerable: !1,
						configurable: !0,
					}),
					(e.prototype._subscribe = function (e) {
						var n = t.prototype._subscribe.call(this, e);
						return !n.closed && e.next(this._value), n;
					}),
					(e.prototype.getValue = function () {
						var t = this.hasError,
							e = this.thrownError,
							n = this._value;
						if (t) throw e;
						return this._throwIfClosed(), n;
					}),
					(e.prototype.next = function (e) {
						t.prototype.next.call(this, (this._value = e));
					}),
					e
				);
			})(ft))(23),
			_t = document.getElementById("jkonsInvader"),
			yt = _t.getContext("2d"),
			vt = new (class {
				constructor() {
					this.enemies = [];
				}
				addEnemy(t) {
					this.enemies.push(t);
				}
				addEnemies(t) {
					this.enemies.concat(t);
				}
				removeEnemy(t) {
					this.enemies.splice(this.enemies.indexOf(t), 1);
				}
				moveEnemies() {
					for (let t = 0; t < this.enemies.length; t++)
						this.enemies[t].moveEnemy();
				}
				get getEnemiesY() {
					const t = [];
					for (let e = 0; e < this.enemies.length; e++)
						t.push(this.enemies[e].y);
					return t;
				}
			})(),
			bt = new (class {
				constructor(t) {
					(this._zoom = 1),
						(this.size = 0),
						(this._canvas = t),
						this.resizeCanvas(),
						window.addEventListener("resize", () => {
							this.resizeCanvas();
						});
				}
				resizeCanvas() {
					innerHeight <= 450
						? (this.zoom = 1)
						: innerHeight <= 690 || innerWidth <= 675
						? (this.zoom = 2)
						: innerHeight <= 915 || innerWidth <= 900
						? (this.zoom = 3)
						: (this.zoom = 4),
						(this.size = 225 * this.zoom),
						(this._canvas.width = this.size),
						(this._canvas.height = this.size);
				}
				set zoom(t) {
					this._zoom = t;
				}
				get zoom() {
					return this._zoom;
				}
			})(_t);
		(yt.imageSmoothingEnabled = !1), pt.subscribe(console.log);
		let mt,
			gt = new Array(),
			wt = new Array(),
			xt = !1;
		document.getElementById("score");
		const St = (function (t, e, n) {
				const r = new at(yt),
					i = new ht(yt, r, t, e, n, bt.zoom);
				return gt.push(r), wt.push(i), i;
			})("a", "d", " "),
			zt = new r(yt, gt, vt, 1, 0, 0),
			Et = bt.zoom * zt.tileWidth;
		function kt() {
			document.addEventListener("keyup", (t) => {
				switch (t.key) {
					case "r":
						!1 === xt ? ((xt = !0), It()) : kt();
						break;
					default:
						xt = !1;
				}
			});
		}
		for (let t = 0; t < 20; t++)
			vt.addEnemy(new r(yt, gt, vt, bt.zoom, t * Et, 0));
		function Ct() {}
		function It() {
			setTimeout(() => {
				St.handleInput(), vt.moveEnemies();
				for (let t = 0; t < gt.length; t++) gt[t].shootAnimation();
				mt = requestAnimationFrame(It);
			}, 1 / 60);
		}
		function Ot() {
			0;
		}
		kt();
	},
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VuZW15LnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvaXNGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9jcmVhdGVFcnJvckNsYXNzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvYXJyUmVtb3ZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9TdWJzY3JpcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL3RpbWVvdXRQcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9yZXBvcnRVbmhhbmRsZWRFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9ub29wLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9Ob3RpZmljYXRpb25GYWN0b3JpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL1N1YnNjcmliZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3N5bWJvbC9vYnNlcnZhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2lkZW50aXR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL3BpcGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL09ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvbGlmdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL09wZXJhdG9yU3Vic2NyaWJlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9pc0FycmF5TGlrZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9pc1Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZUFycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvaXNJbnRlcm9wT2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9pc0l0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2lzQXN5bmNJdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC90aHJvd1Vub2JzZXJ2YWJsZUVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2lzUmVhZGFibGVTdHJlYW1MaWtlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29wZXJhdG9ycy9tZXJnZU1hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL21lcmdlSW50ZXJuYWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL21hcE9uZU9yTWFueUFyZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29ic2VydmFibGUvZnJvbUV2ZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb21BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGxheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zaG90LnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL09iamVjdFVuc3Vic2NyaWJlZEVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9TdWJqZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWluLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9CZWhhdmlvclN1YmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VuZW15SGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS1zZXR0aW5ncy50cyJdLCJuYW1lcyI6WyJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiZXhwb3J0cyIsIm1vZHVsZSIsImkiLCJsIiwibW9kdWxlcyIsImNhbGwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInZhbHVlIiwidCIsIm1vZGUiLCJfX2VzTW9kdWxlIiwibnMiLCJjcmVhdGUiLCJrZXkiLCJiaW5kIiwibiIsIm9iamVjdCIsInByb3BlcnR5IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwIiwicyIsImNvbnRleHQiLCJzaG9vdHMiLCJoYW5kbGVyIiwiem9vbSIsIngiLCJ5IiwiX2xpdmUiLCJfc2hlZXQiLCJJbWFnZSIsIl90aWxlRnJhbWVYIiwiX3RpbGVGcmFtZVkiLCJfdGlsZVdpZHRoIiwiX3RpbGVIZWlnaHQiLCJfc3ByaXRlQ2hhbmdlQ291bnRlciIsImdyaWQiLCJ0aGlzIiwiX2NvbnRleHQiLCJfeCIsIl95IiwiX3NwZWVkWCIsIl9zcGVlZFkiLCJfem9vbSIsIl96b29tZWRXaWR0aCIsIl96b29tZWRIZWlnaHQiLCJfc2hvb3RzIiwiX2hhbmRsZXIiLCJfY2FudmFzQ29sbGlzaW9uIiwicmlnaHQiLCJjYW52YXMiLCJ3aWR0aCIsImxlZnQiLCJ0b3AiLCJib3R0b20iLCJzcmMiLCJjbGVhclJlY3QiLCJfcmVuZGVyRW5lbXkiLCJkcmF3SW1hZ2UiLCJfaGl0IiwiX3Nwcml0ZUFuaW1hdGlvbiIsIl90cmFuc2xhdGUiLCJfZGVhZCIsIl9nYW1lT3ZlciIsImoiLCJsZW5ndGgiLCJzaG9vdFgiLCJnZXRYIiwic2hvb3RZIiwiZ2V0WSIsImNvbnNvbGUiLCJsb2ciLCJoaXQiLCJzY29yZSIsInJlbW92ZUVuZW15IiwicmFuZG9tWCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbVkiLCJnZXRFbmVtaWVzWSIsImZpbmQiLCJoZWlnaHQiLCJzZXRUaW1lb3V0IiwiYWRkRW5lbXkiLCJleHRlbmRTdGF0aWNzIiwiYiIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiQXJyYXkiLCJfX2V4dGVuZHMiLCJUeXBlRXJyb3IiLCJTdHJpbmciLCJfXyIsImNvbnN0cnVjdG9yIiwiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJzdGVwIiwibmV4dCIsImUiLCJyZWplY3RlZCIsInJlc3VsdCIsImRvbmUiLCJ0aGVuIiwiYXBwbHkiLCJfX2dlbmVyYXRvciIsImJvZHkiLCJmIiwiZyIsIl8iLCJsYWJlbCIsInNlbnQiLCJ0cnlzIiwib3BzIiwidmVyYiIsIml0ZXJhdG9yIiwidiIsIm9wIiwicG9wIiwicHVzaCIsIl9fdmFsdWVzIiwiX19yZWFkIiwiYXIiLCJlcnJvciIsIl9fc3ByZWFkQXJyYXkiLCJ0byIsImZyb20iLCJpbCIsIl9fYXdhaXQiLCJfX2FzeW5jR2VuZXJhdG9yIiwiYXN5bmNJdGVyYXRvciIsInEiLCJhIiwicmVzdW1lIiwiZnVsZmlsbCIsInNldHRsZSIsInNoaWZ0IiwiX19hc3luY1ZhbHVlcyIsImlzRnVuY3Rpb24iLCJjcmVhdGVFcnJvckNsYXNzIiwiY3JlYXRlSW1wbCIsImN0b3JGdW5jIiwiaW5zdGFuY2UiLCJFcnJvciIsInN0YWNrIiwiVW5zdWJzY3JpcHRpb25FcnJvciIsIl9zdXBlciIsImVycm9ycyIsIm1lc3NhZ2UiLCJtYXAiLCJlcnIiLCJ0b1N0cmluZyIsImpvaW4iLCJhcnJSZW1vdmUiLCJhcnIiLCJpdGVtIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiU3Vic2NyaXB0aW9uIiwiaW5pdGlhbFRlYXJkb3duIiwiY2xvc2VkIiwiX3BhcmVudGFnZSIsIl90ZWFyZG93bnMiLCJlbXB0eSIsInVuc3Vic2NyaWJlIiwiZV8xIiwiX2EiLCJlXzIiLCJfYiIsImlzQXJyYXkiLCJfcGFyZW50YWdlXzEiLCJfcGFyZW50YWdlXzFfMSIsInJlbW92ZSIsImVfMV8xIiwicmV0dXJuIiwiX3RlYXJkb3duc18xIiwiX3RlYXJkb3duc18xXzEiLCJ0ZWFyZG93bl8xIiwiZXhlY1RlYXJkb3duIiwiZV8yXzEiLCJhZGQiLCJ0ZWFyZG93biIsIl9oYXNQYXJlbnQiLCJfYWRkUGFyZW50IiwicGFyZW50IiwiaW5jbHVkZXMiLCJfcmVtb3ZlUGFyZW50IiwiRU1QVFkiLCJFTVBUWV9TVUJTQ1JJUFRJT04iLCJpc1N1YnNjcmlwdGlvbiIsImNvbmZpZyIsIm9uVW5oYW5kbGVkRXJyb3IiLCJvblN0b3BwZWROb3RpZmljYXRpb24iLCJ1bmRlZmluZWQiLCJ1c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nIiwidXNlRGVwcmVjYXRlZE5leHRDb250ZXh0IiwidGltZW91dFByb3ZpZGVyIiwiYXJncyIsIl9pIiwiYXJndW1lbnRzIiwiZGVsZWdhdGUiLCJjbGVhclRpbWVvdXQiLCJoYW5kbGUiLCJyZXBvcnRVbmhhbmRsZWRFcnJvciIsIm5vb3AiLCJDT01QTEVURV9OT1RJRklDQVRJT04iLCJjcmVhdGVOb3RpZmljYXRpb24iLCJraW5kIiwiU3Vic2NyaWJlciIsImRlc3RpbmF0aW9uIiwiX3RoaXMiLCJpc1N0b3BwZWQiLCJFTVBUWV9PQlNFUlZFUiIsImNvbXBsZXRlIiwiaGFuZGxlU3RvcHBlZE5vdGlmaWNhdGlvbiIsIm5leHROb3RpZmljYXRpb24iLCJfbmV4dCIsIl9lcnJvciIsIl9jb21wbGV0ZSIsIlNhZmVTdWJzY3JpYmVyIiwib2JzZXJ2ZXJPck5leHQiLCJjb250ZXh0XzEiLCJ3cmFwRm9yRXJyb3JIYW5kbGluZyIsImRlZmF1bHRFcnJvckhhbmRsZXIiLCJfc3luY0Vycm9ySGFja19pc1N1YnNjcmliaW5nIiwiX19zeW5jRXJyb3IiLCJub3RpZmljYXRpb24iLCJzdWJzY3JpYmVyIiwib2JzZXJ2YWJsZSIsImlkZW50aXR5IiwicGlwZUZyb21BcnJheSIsImZucyIsImlucHV0IiwicmVkdWNlIiwicHJldiIsImZuIiwiT2JzZXJ2YWJsZSIsInN1YnNjcmliZSIsIl9zdWJzY3JpYmUiLCJsaWZ0Iiwib3BlcmF0b3IiLCJzb3VyY2UiLCJpc09ic2VydmVyIiwiX2RlcHJlY2F0ZWRTeW5jRXJyb3JTdWJzY3JpYmUiLCJfdHJ5U3Vic2NyaWJlIiwibG9jYWxTdWJzY3JpYmVyIiwiZGVzdCIsInNpbmsiLCJmb3JFYWNoIiwicHJvbWlzZUN0b3IiLCJnZXRQcm9taXNlQ3RvciIsInN1YnNjcmlwdGlvbiIsInBpcGUiLCJvcGVyYXRpb25zIiwidG9Qcm9taXNlIiwib3BlcmF0ZSIsImluaXQiLCJoYXNMaWZ0IiwibGlmdGVkU291cmNlIiwiT3BlcmF0b3JTdWJzY3JpYmVyIiwib25OZXh0Iiwib25Db21wbGV0ZSIsIm9uRXJyb3IiLCJvbkZpbmFsaXplIiwicHJvamVjdCIsImlzQXJyYXlMaWtlIiwiaXNQcm9taXNlIiwic2NoZWR1bGVBcnJheSIsInNjaGVkdWxlciIsInNjaGVkdWxlIiwiaXNJbnRlcm9wT2JzZXJ2YWJsZSIsImlzSXRlcmFibGUiLCJpc0FzeW5jSXRlcmFibGUiLCJvYmoiLCJjcmVhdGVJbnZhbGlkT2JzZXJ2YWJsZVR5cGVFcnJvciIsInJlYWRhYmxlU3RyZWFtTGlrZVRvQXN5bmNHZW5lcmF0b3IiLCJyZWFkYWJsZVN0cmVhbSIsInJlYWRlciIsImdldFJlYWRlciIsInJlYWQiLCJyZWxlYXNlTG9jayIsImlzUmVhZGFibGVTdHJlYW1MaWtlIiwiaW5uZXJGcm9tIiwib2JzIiwiZnJvbUFycmF5TGlrZSIsInByb21pc2UiLCJmcm9tQXN5bmNJdGVyYWJsZSIsIml0ZXJhYmxlIiwiaXRlcmFibGVfMSIsIml0ZXJhYmxlXzFfMSIsImFycmF5IiwiYXN5bmNJdGVyYWJsZSIsImFzeW5jSXRlcmFibGVfMSIsImFzeW5jSXRlcmFibGVfMV8xIiwicHJvY2VzcyIsImNhdGNoIiwibWVyZ2VNYXAiLCJyZXN1bHRTZWxlY3RvciIsImNvbmN1cnJlbnQiLCJJbmZpbml0eSIsImlpIiwib25CZWZvcmVOZXh0IiwiZXhwYW5kIiwiaW5uZXJTdWJTY2hlZHVsZXIiLCJhZGRpdGlvbmFsVGVhcmRvd24iLCJidWZmZXIiLCJhY3RpdmUiLCJpc0NvbXBsZXRlIiwiY2hlY2tDb21wbGV0ZSIsIm91dGVyTmV4dCIsImRvSW5uZXJTdWIiLCJpbm5lckNvbXBsZXRlIiwiaW5uZXJWYWx1ZSIsIl9sb29wXzEiLCJidWZmZXJlZFZhbHVlIiwibWVyZ2VJbnRlcm5hbHMiLCJtYXBPbmVPck1hbnlBcmdzIiwiY2FsbE9yQXBwbHkiLCJub2RlRXZlbnRFbWl0dGVyTWV0aG9kcyIsImV2ZW50VGFyZ2V0TWV0aG9kcyIsImpxdWVyeU1ldGhvZHMiLCJmcm9tRXZlbnQiLCJ0YXJnZXQiLCJldmVudE5hbWUiLCJvcHRpb25zIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJpc0V2ZW50VGFyZ2V0IiwibWV0aG9kTmFtZSIsImFkZExpc3RlbmVyIiwicmVtb3ZlTGlzdGVuZXIiLCJpc05vZGVTdHlsZUV2ZW50RW1pdHRlciIsInRvQ29tbW9uSGFuZGxlclJlZ2lzdHJ5Iiwib24iLCJvZmYiLCJpc0pRdWVyeVN0eWxlRXZlbnRFbWl0dGVyIiwic3ViVGFyZ2V0Iiwic2hvdCIsImZpcmUiLCJfdmVsb2NpdHkiLCJwcmVzc2VkX2tleXMiLCJfa2V5ZG93biIsImRvY3VtZW50IiwiX2tleWRvd24kIiwiZXZlbnQiLCJfa2V5dXAiLCJfa2V5dXAkIiwiZmlsdGVyIiwiayIsImtleWRvd25TdWJzY3JpcHRpb24iLCJrZXl1cFN1YnNjcmlwdGlvbiIsIl90aWxlU2l6ZSIsIl9zaG90IiwiX2xlZnQiLCJfcmlnaHQiLCJfZmlyZSIsIl96b29tZWRTaXplIiwiX3JlbmRlciIsIl9tb3ZlTGVmdCIsIl9tb3ZlUmlnaHQiLCJfZmlyZVNob3QiLCJfY2xlYXIiLCJzaG9vdCIsIm9ubG9hZCIsInRoYXQiLCJTaG90IiwiX2xlbmd0aCIsIl90aGlja25lc3MiLCJwb3NpdGlvblgiLCJwb3NpdGlvblkiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsIk9iamVjdFVuc3Vic2NyaWJlZEVycm9yIiwiU3ViamVjdCIsIm9ic2VydmVycyIsImhhc0Vycm9yIiwidGhyb3duRXJyb3IiLCJzdWJqZWN0IiwiX3Rocm93SWZDbG9zZWQiLCJjb3B5Iiwic2xpY2UiLCJjb3B5XzEiLCJjb3B5XzFfMSIsIl9jaGVja0ZpbmFsaXplZFN0YXR1c2VzIiwiX2lubmVyU3Vic2NyaWJlIiwiYXNPYnNlcnZhYmxlIiwiQW5vbnltb3VzU3ViamVjdCIsIkJlaGF2aW9yU3ViamVjdCIsIl92YWx1ZSIsImdldFZhbHVlIiwiY29uZmlndXJhYmxlIiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRDb250ZXh0IiwiZW5lbXlIYW5kbGVyIiwiZW5lbWllcyIsImVuZW15IiwiY29uY2F0IiwibW92ZUVuZW15IiwieUxpc3QiLCJzZXR0aW5ncyIsInNpemUiLCJfY2FudmFzIiwicmVzaXplQ2FudmFzIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJpbm5lcldpZHRoIiwiaW1hZ2VTbW9vdGhpbmdFbmFibGVkIiwiYW5pbWF0aW9uIiwic2hvdHMiLCJwbGF5ZXJzIiwiZ2FtZVN0YXJ0ZWQiLCJwbGF5ZXIiLCJuZXdQbGF5ZXIiLCJzcGFjZUJldHdlZW4iLCJ0aWxlV2lkdGgiLCJrZXlib2FyZCIsImFuaW1hdGUiLCJnYW1lT3ZlciIsImhhbmRsZUlucHV0IiwibW92ZUVuZW1pZXMiLCJzaG9vdEFuaW1hdGlvbiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImFjdHVhbFNjb3JlIl0sIm1hcHBpbmdzIjoiYUFDRSxJQUFJQSxFQUFtQixHQUd2QixTQUFTQyxFQUFvQkMsR0FHNUIsR0FBR0YsRUFBaUJFLEdBQ25CLE9BQU9GLEVBQWlCRSxHQUFVQyxRQUduQyxJQUFJQyxFQUFTSixFQUFpQkUsR0FBWSxDQUN6Q0csRUFBR0gsRUFDSEksR0FBRyxFQUNISCxRQUFTLElBVVYsT0FOQUksRUFBUUwsR0FBVU0sS0FBS0osRUFBT0QsUUFBU0MsRUFBUUEsRUFBT0QsUUFBU0YsR0FHL0RHLEVBQU9FLEdBQUksRUFHSkYsRUFBT0QsUUFLZkYsRUFBb0JRLEVBQUlGLEVBR3hCTixFQUFvQlMsRUFBSVYsRUFHeEJDLEVBQW9CVSxFQUFJLFNBQVNSLEVBQVNTLEVBQU1DLEdBQzNDWixFQUFvQmEsRUFBRVgsRUFBU1MsSUFDbENHLE9BQU9DLGVBQWViLEVBQVNTLEVBQU0sQ0FBRUssWUFBWSxFQUFNQyxJQUFLTCxLQUtoRVosRUFBb0JrQixFQUFJLFNBQVNoQixHQUNYLG9CQUFYaUIsUUFBMEJBLE9BQU9DLGFBQzFDTixPQUFPQyxlQUFlYixFQUFTaUIsT0FBT0MsWUFBYSxDQUFFQyxNQUFPLFdBRTdEUCxPQUFPQyxlQUFlYixFQUFTLGFBQWMsQ0FBRW1CLE9BQU8sS0FRdkRyQixFQUFvQnNCLEVBQUksU0FBU0QsRUFBT0UsR0FFdkMsR0FEVSxFQUFQQSxJQUFVRixFQUFRckIsRUFBb0JxQixJQUMvQixFQUFQRSxFQUFVLE9BQU9GLEVBQ3BCLEdBQVcsRUFBUEUsR0FBOEIsaUJBQVZGLEdBQXNCQSxHQUFTQSxFQUFNRyxXQUFZLE9BQU9ILEVBQ2hGLElBQUlJLEVBQUtYLE9BQU9ZLE9BQU8sTUFHdkIsR0FGQTFCLEVBQW9Ca0IsRUFBRU8sR0FDdEJYLE9BQU9DLGVBQWVVLEVBQUksVUFBVyxDQUFFVCxZQUFZLEVBQU1LLE1BQU9BLElBQ3RELEVBQVBFLEdBQTRCLGlCQUFU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QUM3RG9CLEdBQWVkLEdBQVM5WCxLQUFPMFgsR0FBTW1CLFVBQ3BDLFNBQVM5SixLQUNmc0YsU0FBU2pCLGlCQUFpQixRQUFVMEYsSUFDbkMsT0FBUUEsRUFBUzFaLEtBQ2hCLElBQUssS0FDZ0IsSUFBaEJxWixJQUNIQSxJQUFjLEVBQ2RNLE1BRUFoSyxLQUVELE1BRUQsUUFDQzBKLElBQWMsS0FLbEIsSUFBSyxJQUFJNWEsRUFBSSxFQUFHQSxFQUFJLEdBQUlBLElBQ3ZCMlosR0FBYTdULFNBQ1osSUFBSSxFQUFNLEdBQVM0VSxHQUFPZixHQUFjTSxHQUFTOVgsS0FBTW5DLEVBQUkrYSxHQUFjLElBSXBFLFNBQVNJLE1BRWhCLFNBQVNELEtBQ1JyVixXQUFXLEtBQ1YsR0FBT3VWLGNBQ1B6QixHQUFhMEIsY0FDYixJQUFLLElBQUkzVyxFQUFJLEVBQUdBLEVBQUlnVyxHQUFNL1YsT0FBUUQsSUFDakNnVyxHQUFNaFcsR0FBRzRXLGlCQUVWYixHQUFZYyxzQkFBc0JMLEtBdkNQLEVBQUksSUEyQzFCLFNBQVMvVixLQUNmcVcsRUEyQkR0SyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG4iLCJpbXBvcnQgeyBFbmVteUhhbmRsZXIgfSBmcm9tIFwiLi9lbmVteUhhbmRsZXJcIjtcbmltcG9ydCB7IHNjb3JlIH0gZnJvbSBcIi4vbWFpblwiO1xuaW1wb3J0IHsgU2hvdCB9IGZyb20gXCIuL3Nob3RcIjtcblxuZXhwb3J0IGNsYXNzIEVuZW15IHtcblx0cHJpdmF0ZSBfY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXHRwcml2YXRlIF9saXZlOiBudW1iZXIgPSAxO1xuXHRwcml2YXRlIF9zaG9vdHM6IEFycmF5PFNob3Q+O1xuXHRwcml2YXRlIF9oYW5kbGVyOiBFbmVteUhhbmRsZXI7XG5cblx0Ly8gVE9ETyBtYXliZSBhIHRpbGUgc2VydmljZVxuXHRwcml2YXRlIF9zaGVldCA9IG5ldyBJbWFnZSgpO1xuXHRwcml2YXRlIF90aWxlRnJhbWVYID0gMDtcblx0cHJpdmF0ZSBfdGlsZUZyYW1lWSA9IDI7XG5cdC8vIFRPRE8gZ2V0IHRpbGUgZnJvbSB0aWxlIGNvbmZpZ1xuXHRwcml2YXRlIF90aWxlV2lkdGg6IG51bWJlciA9IDk7XG5cdHByaXZhdGUgX3RpbGVIZWlnaHQ6IG51bWJlciA9IDk7XG5cdHByaXZhdGUgX3Nwcml0ZUNoYW5nZUNvdW50ZXIgPSAwO1xuXHRwcml2YXRlIF96b29tOiBudW1iZXI7XG5cdHByaXZhdGUgX3pvb21lZFdpZHRoOiBudW1iZXI7XG5cdHByaXZhdGUgX3pvb21lZEhlaWdodDogbnVtYmVyO1xuXG5cdHByaXZhdGUgX3g6IG51bWJlcjtcblx0cHJpdmF0ZSBfeTogbnVtYmVyO1xuXHRwcml2YXRlIF9zcGVlZFg6IG51bWJlcjtcblx0cHJpdmF0ZSBfc3BlZWRZOiBudW1iZXI7XG5cblx0cHJpdmF0ZSBfY2FudmFzQ29sbGlzaW9uOiB7XG5cdFx0cmlnaHQ6IG51bWJlcjtcblx0XHRsZWZ0OiBudW1iZXI7XG5cdFx0dG9wOiBudW1iZXI7XG5cdFx0Ym90dG9tOiBudW1iZXI7XG5cdH07XG5cblx0Z3JpZCA9IDkwMDtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXG5cdFx0c2hvb3RzOiBBcnJheTxTaG90Pixcblx0XHRoYW5kbGVyOiBFbmVteUhhbmRsZXIsXG5cdFx0em9vbTogbnVtYmVyLFxuXHRcdHg6IG51bWJlcixcblx0XHR5OiBudW1iZXJcblx0KSB7XG5cdFx0dGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG5cblx0XHR0aGlzLl94ID0geDtcblx0XHR0aGlzLl95ID0geTtcblx0XHR0aGlzLl9zcGVlZFggPSA1O1xuXHRcdHRoaXMuX3NwZWVkWSA9IDM1O1xuXHRcdHRoaXMuX3pvb20gPSB6b29tO1xuXHRcdHRoaXMuX3pvb21lZFdpZHRoID0gdGhpcy5fdGlsZVdpZHRoICogdGhpcy5fem9vbTtcblx0XHR0aGlzLl96b29tZWRIZWlnaHQgPSB0aGlzLl90aWxlSGVpZ2h0ICogdGhpcy5fem9vbTtcblx0XHR0aGlzLl9zaG9vdHMgPSBzaG9vdHM7XG5cdFx0dGhpcy5faGFuZGxlciA9IGhhbmRsZXI7XG5cblx0XHR0aGlzLl9jYW52YXNDb2xsaXNpb24gPSB7XG5cdFx0XHRyaWdodDogdGhpcy5fY29udGV4dC5jYW52YXMud2lkdGggLSB0aGlzLl96b29tZWRXaWR0aCxcblx0XHRcdGxlZnQ6IDAsXG5cdFx0XHR0b3A6IDAsXG5cdFx0XHRib3R0b206IHRoaXMuX2NvbnRleHQuY2FudmFzLndpZHRoIC0gdGhpcy5fem9vbWVkSGVpZ2h0ICogOSxcblx0XHR9O1xuXHRcdHRoaXMuX3NoZWV0LnNyYyA9IFwiLi4vaW1nL2ppLXNoZWV0LnBuZ1wiO1xuXHR9XG5cblx0cHJpdmF0ZSBfdHJhbnNsYXRlKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG5cdFx0dGhpcy5fY29udGV4dC5jbGVhclJlY3QoXG5cdFx0XHR0aGlzLl94LFxuXHRcdFx0dGhpcy5feSxcblx0XHRcdHRoaXMuX3pvb21lZFdpZHRoLFxuXHRcdFx0dGhpcy5fem9vbWVkSGVpZ2h0XG5cdFx0KTtcblx0XHR0aGlzLl94ICs9IHg7XG5cdFx0dGhpcy5feSArPSB5O1xuXHRcdHRoaXMuX3JlbmRlckVuZW15KCk7XG5cdH1cblx0Ly8gUmVuZGVyIGVuZW15XG5cdHByaXZhdGUgX3JlbmRlckVuZW15KCk6IHZvaWQge1xuXHRcdHRoaXMuX2NvbnRleHQuZHJhd0ltYWdlKFxuXHRcdFx0dGhpcy5fc2hlZXQsXG5cdFx0XHR0aGlzLl90aWxlV2lkdGggKiB0aGlzLl90aWxlRnJhbWVYLFxuXHRcdFx0dGhpcy5fdGlsZVdpZHRoICogdGhpcy5fdGlsZUZyYW1lWSxcblx0XHRcdHRoaXMuX3RpbGVXaWR0aCxcblx0XHRcdHRoaXMuX3RpbGVXaWR0aCxcblx0XHRcdHRoaXMuX3gsXG5cdFx0XHR0aGlzLl95LFxuXHRcdFx0dGhpcy5fem9vbWVkV2lkdGgsXG5cdFx0XHR0aGlzLl96b29tZWRIZWlnaHRcblx0XHQpO1xuXHR9XG5cblx0cHVibGljIG1vdmVFbmVteSgpIHtcblx0XHQvLyBjaGVjayBoaXQgZnVuY3Rpb25cblx0XHR0aGlzLl9oaXQoKTtcblx0XHR0aGlzLl9zcHJpdGVBbmltYXRpb24oKTtcblx0XHRpZiAoXG5cdFx0XHQodGhpcy5fc3BlZWRYID4gMCAmJiB0aGlzLl94IDw9IHRoaXMuX2NhbnZhc0NvbGxpc2lvbi5yaWdodCkgfHxcblx0XHRcdCh0aGlzLl9zcGVlZFggPCAwICYmIHRoaXMuX3ggPj0gdGhpcy5fY2FudmFzQ29sbGlzaW9uLmxlZnQpXG5cdFx0KSB7XG5cdFx0XHR0aGlzLl90cmFuc2xhdGUodGhpcy5fc3BlZWRYLCAwKTtcblx0XHR9XG5cdFx0aWYgKFxuXHRcdFx0KHRoaXMuX3NwZWVkWCA+IDAgJiYgdGhpcy5feCA+PSB0aGlzLl9jYW52YXNDb2xsaXNpb24ucmlnaHQpIHx8XG5cdFx0XHQodGhpcy5fc3BlZWRYIDwgMCAmJiB0aGlzLl94IDw9IHRoaXMuX2NhbnZhc0NvbGxpc2lvbi5sZWZ0KVxuXHRcdCkge1xuXHRcdFx0dGhpcy5fc3BlZWRYID0gLXRoaXMuX3NwZWVkWDtcblx0XHRcdHRoaXMuX3RyYW5zbGF0ZSgwLCB0aGlzLl9zcGVlZFkpO1xuXHRcdH1cblx0XHR0aGlzLl9kZWFkKCk7XG5cdFx0dGhpcy5fZ2FtZU92ZXIoKTtcblx0fVxuXG5cdHByaXZhdGUgX3Nwcml0ZUFuaW1hdGlvbigpIHtcblx0XHQvLyBjb3VudCdzIHVwIHRpbGwgYSBzcGVjaWZpZWQgbnVtYmVyLCB0aGVuIHJlc2V0XG5cdFx0aWYgKHRoaXMuX3Nwcml0ZUNoYW5nZUNvdW50ZXIgPj0gNTApIHtcblx0XHRcdHRoaXMuX3Nwcml0ZUNoYW5nZUNvdW50ZXIgPSAwO1xuXHRcdFx0Ly8gY2hhbmdlIGN1cnJlbnQgZnJhbWVcblx0XHRcdGlmICh0aGlzLl90aWxlRnJhbWVYIDwgMSkgdGhpcy5fdGlsZUZyYW1lWCsrO1xuXHRcdFx0ZWxzZSB0aGlzLl90aWxlRnJhbWVYID0gMDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fc3ByaXRlQ2hhbmdlQ291bnRlcisrO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgX2hpdCgpIHtcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX3Nob290cy5sZW5ndGg7IGorKykge1xuXHRcdFx0bGV0IHNob290WCA9IHRoaXMuX3Nob290c1tqXS5nZXRYO1xuXHRcdFx0bGV0IHNob290WSA9IHRoaXMuX3Nob290c1tqXS5nZXRZO1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRzaG9vdFkgPiB0aGlzLl95ICYmXG5cdFx0XHRcdHNob290WSA8PSB0aGlzLl95ICsgdGhpcy5fem9vbWVkSGVpZ2h0ICYmXG5cdFx0XHRcdHNob290WCA+PSB0aGlzLl94ICYmXG5cdFx0XHRcdHNob290WCA8PSB0aGlzLl94ICsgdGhpcy5fem9vbWVkV2lkdGhcblx0XHRcdCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIkhJVFwiKTtcblx0XHRcdFx0dGhpcy5fc2hvb3RzW2pdLmhpdCgpO1xuXHRcdFx0XHR0aGlzLl9saXZlLS07XG5cdFx0XHRcdHNjb3JlKCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9zaG9vdHNbal0uZ2V0WDtcblx0XHR9XG5cdH1cblx0cHJpdmF0ZSBfZGVhZCgpIHtcblx0XHRpZiAodGhpcy5fbGl2ZSA8PSAwKSB7XG5cdFx0XHR0aGlzLl9oYW5kbGVyLnJlbW92ZUVuZW15KHRoaXMpO1xuXHRcdFx0dGhpcy5fY29udGV4dC5jbGVhclJlY3QoXG5cdFx0XHRcdHRoaXMuX3gsXG5cdFx0XHRcdHRoaXMuX3ksXG5cdFx0XHRcdHRoaXMuX3pvb21lZFdpZHRoLFxuXHRcdFx0XHR0aGlzLl96b29tZWRIZWlnaHRcblx0XHRcdCk7XG5cdFx0XHRjb25zdCByYW5kb21YID1cblx0XHRcdFx0TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHRoaXMuX2NvbnRleHQuY2FudmFzLndpZHRoIC8gOSkpICogOTtcblx0XHRcdGxldCByYW5kb21ZID0gTWF0aC5mbG9vcihcblx0XHRcdFx0TWF0aC5yYW5kb20oKSAqICh0aGlzLl9jYW52YXNDb2xsaXNpb24uYm90dG9tIC8gOSkgKiA5XG5cdFx0XHQpO1xuXHRcdFx0d2hpbGUgKFxuXHRcdFx0XHR0aGlzLl9oYW5kbGVyLmdldEVuZW1pZXNZLmZpbmQoKHkpID0+IHtcblx0XHRcdFx0XHRyYW5kb21ZID49IHkgJiYgcmFuZG9tWSA8PSByYW5kb21ZICsgdGhpcy5fem9vbWVkSGVpZ2h0O1xuXHRcdFx0XHR9KVxuXHRcdFx0KSB7XG5cdFx0XHRcdHJhbmRvbVkgPVxuXHRcdFx0XHRcdE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0aGlzLl9jb250ZXh0LmNhbnZhcy5oZWlnaHQgLyA5KSkgKiA5O1xuXHRcdFx0fVxuXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0dGhpcy5faGFuZGxlci5hZGRFbmVteShcblx0XHRcdFx0XHRuZXcgRW5lbXkoXG5cdFx0XHRcdFx0XHR0aGlzLl9jb250ZXh0LFxuXHRcdFx0XHRcdFx0dGhpcy5fc2hvb3RzLFxuXHRcdFx0XHRcdFx0dGhpcy5faGFuZGxlcixcblx0XHRcdFx0XHRcdHRoaXMuX3pvb20sXG5cdFx0XHRcdFx0XHRyYW5kb21YLFxuXHRcdFx0XHRcdFx0cmFuZG9tWVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KTtcblx0XHRcdH0sIDEwMDAwKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9nYW1lT3ZlcigpIHtcblx0XHRpZiAodGhpcy5feSA+IHRoaXMuX2NhbnZhc0NvbGxpc2lvbi5ib3R0b20pIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiZmluaXNoXCIpO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBnZXQgem9vbSgpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLl96b29tO1xuXHR9XG5cblx0cHVibGljIGdldCB0aWxlV2lkdGgoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy5fdGlsZVdpZHRoO1xuXHR9XG5cblx0cHVibGljIGdldCB0aWxlSGVpZ2h0KCk6IG51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMuX3RpbGVIZWlnaHQ7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHkoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy5feTtcblx0fVxufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20pIHtcclxuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxyXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcclxuICAgIHJldHVybiB0bztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNGdW5jdGlvbi5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlRXJyb3JDbGFzcyhjcmVhdGVJbXBsKSB7XG4gICAgdmFyIF9zdXBlciA9IGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICBFcnJvci5jYWxsKGluc3RhbmNlKTtcbiAgICAgICAgaW5zdGFuY2Uuc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjaztcbiAgICB9O1xuICAgIHZhciBjdG9yRnVuYyA9IGNyZWF0ZUltcGwoX3N1cGVyKTtcbiAgICBjdG9yRnVuYy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG4gICAgY3RvckZ1bmMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvckZ1bmM7XG4gICAgcmV0dXJuIGN0b3JGdW5jO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3JlYXRlRXJyb3JDbGFzcy5qcy5tYXAiLCJpbXBvcnQgeyBjcmVhdGVFcnJvckNsYXNzIH0gZnJvbSAnLi9jcmVhdGVFcnJvckNsYXNzJztcbmV4cG9ydCB2YXIgVW5zdWJzY3JpcHRpb25FcnJvciA9IGNyZWF0ZUVycm9yQ2xhc3MoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiBVbnN1YnNjcmlwdGlvbkVycm9ySW1wbChlcnJvcnMpIHtcbiAgICAgICAgX3N1cGVyKHRoaXMpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBlcnJvcnNcbiAgICAgICAgICAgID8gZXJyb3JzLmxlbmd0aCArIFwiIGVycm9ycyBvY2N1cnJlZCBkdXJpbmcgdW5zdWJzY3JpcHRpb246XFxuXCIgKyBlcnJvcnMubWFwKGZ1bmN0aW9uIChlcnIsIGkpIHsgcmV0dXJuIGkgKyAxICsgXCIpIFwiICsgZXJyLnRvU3RyaW5nKCk7IH0pLmpvaW4oJ1xcbiAgJylcbiAgICAgICAgICAgIDogJyc7XG4gICAgICAgIHRoaXMubmFtZSA9ICdVbnN1YnNjcmlwdGlvbkVycm9yJztcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XG4gICAgfTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VW5zdWJzY3JpcHRpb25FcnJvci5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gYXJyUmVtb3ZlKGFyciwgaXRlbSkge1xuICAgIGlmIChhcnIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gYXJyLmluZGV4T2YoaXRlbSk7XG4gICAgICAgIDAgPD0gaW5kZXggJiYgYXJyLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyUmVtb3ZlLmpzLm1hcCIsImltcG9ydCB7IF9fcmVhZCwgX19zcHJlYWRBcnJheSwgX192YWx1ZXMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBVbnN1YnNjcmlwdGlvbkVycm9yIH0gZnJvbSAnLi91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3InO1xuaW1wb3J0IHsgYXJyUmVtb3ZlIH0gZnJvbSAnLi91dGlsL2FyclJlbW92ZSc7XG52YXIgU3Vic2NyaXB0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTdWJzY3JpcHRpb24oaW5pdGlhbFRlYXJkb3duKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbFRlYXJkb3duID0gaW5pdGlhbFRlYXJkb3duO1xuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wYXJlbnRhZ2UgPSBudWxsO1xuICAgICAgICB0aGlzLl90ZWFyZG93bnMgPSBudWxsO1xuICAgIH1cbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZV8xLCBfYSwgZV8yLCBfYjtcbiAgICAgICAgdmFyIGVycm9ycztcbiAgICAgICAgaWYgKCF0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIF9wYXJlbnRhZ2UgPSB0aGlzLl9wYXJlbnRhZ2U7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShfcGFyZW50YWdlKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9wYXJlbnRhZ2VfMSA9IF9fdmFsdWVzKF9wYXJlbnRhZ2UpLCBfcGFyZW50YWdlXzFfMSA9IF9wYXJlbnRhZ2VfMS5uZXh0KCk7ICFfcGFyZW50YWdlXzFfMS5kb25lOyBfcGFyZW50YWdlXzFfMSA9IF9wYXJlbnRhZ2VfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRfMSA9IF9wYXJlbnRhZ2VfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50XzEucmVtb3ZlKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3BhcmVudGFnZV8xXzEgJiYgIV9wYXJlbnRhZ2VfMV8xLmRvbmUgJiYgKF9hID0gX3BhcmVudGFnZV8xLnJldHVybikpIF9hLmNhbGwoX3BhcmVudGFnZV8xKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgX3BhcmVudGFnZSA9PT0gbnVsbCB8fCBfcGFyZW50YWdlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfcGFyZW50YWdlLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBpbml0aWFsVGVhcmRvd24gPSB0aGlzLmluaXRpYWxUZWFyZG93bjtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGluaXRpYWxUZWFyZG93bikpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVGVhcmRvd24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gZSBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3IgPyBlLmVycm9ycyA6IFtlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgX3RlYXJkb3ducyA9IHRoaXMuX3RlYXJkb3ducztcbiAgICAgICAgICAgIGlmIChfdGVhcmRvd25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGVhcmRvd25zID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfdGVhcmRvd25zXzEgPSBfX3ZhbHVlcyhfdGVhcmRvd25zKSwgX3RlYXJkb3duc18xXzEgPSBfdGVhcmRvd25zXzEubmV4dCgpOyAhX3RlYXJkb3duc18xXzEuZG9uZTsgX3RlYXJkb3duc18xXzEgPSBfdGVhcmRvd25zXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVhcmRvd25fMSA9IF90ZWFyZG93bnNfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGVjVGVhcmRvd24odGVhcmRvd25fMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzICE9PSBudWxsICYmIGVycm9ycyAhPT0gdm9pZCAwID8gZXJyb3JzIDogW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQoZXJyb3JzKSksIF9fcmVhZChlcnIuZXJyb3JzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90ZWFyZG93bnNfMV8xICYmICFfdGVhcmRvd25zXzFfMS5kb25lICYmIChfYiA9IF90ZWFyZG93bnNfMS5yZXR1cm4pKSBfYi5jYWxsKF90ZWFyZG93bnNfMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVW5zdWJzY3JpcHRpb25FcnJvcihlcnJvcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh0ZWFyZG93bikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh0ZWFyZG93biAmJiB0ZWFyZG93biAhPT0gdGhpcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgZXhlY1RlYXJkb3duKHRlYXJkb3duKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0ZWFyZG93biBpbnN0YW5jZW9mIFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGVhcmRvd24uY2xvc2VkIHx8IHRlYXJkb3duLl9oYXNQYXJlbnQodGhpcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0ZWFyZG93bi5fYWRkUGFyZW50KHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAodGhpcy5fdGVhcmRvd25zID0gKF9hID0gdGhpcy5fdGVhcmRvd25zKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXSkucHVzaCh0ZWFyZG93bik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuX2hhc1BhcmVudCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdmFyIF9wYXJlbnRhZ2UgPSB0aGlzLl9wYXJlbnRhZ2U7XG4gICAgICAgIHJldHVybiBfcGFyZW50YWdlID09PSBwYXJlbnQgfHwgKEFycmF5LmlzQXJyYXkoX3BhcmVudGFnZSkgJiYgX3BhcmVudGFnZS5pbmNsdWRlcyhwYXJlbnQpKTtcbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuX2FkZFBhcmVudCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdmFyIF9wYXJlbnRhZ2UgPSB0aGlzLl9wYXJlbnRhZ2U7XG4gICAgICAgIHRoaXMuX3BhcmVudGFnZSA9IEFycmF5LmlzQXJyYXkoX3BhcmVudGFnZSkgPyAoX3BhcmVudGFnZS5wdXNoKHBhcmVudCksIF9wYXJlbnRhZ2UpIDogX3BhcmVudGFnZSA/IFtfcGFyZW50YWdlLCBwYXJlbnRdIDogcGFyZW50O1xuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5fcmVtb3ZlUGFyZW50ID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICB2YXIgX3BhcmVudGFnZSA9IHRoaXMuX3BhcmVudGFnZTtcbiAgICAgICAgaWYgKF9wYXJlbnRhZ2UgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50YWdlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KF9wYXJlbnRhZ2UpKSB7XG4gICAgICAgICAgICBhcnJSZW1vdmUoX3BhcmVudGFnZSwgcGFyZW50KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAodGVhcmRvd24pIHtcbiAgICAgICAgdmFyIF90ZWFyZG93bnMgPSB0aGlzLl90ZWFyZG93bnM7XG4gICAgICAgIF90ZWFyZG93bnMgJiYgYXJyUmVtb3ZlKF90ZWFyZG93bnMsIHRlYXJkb3duKTtcbiAgICAgICAgaWYgKHRlYXJkb3duIGluc3RhbmNlb2YgU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0ZWFyZG93bi5fcmVtb3ZlUGFyZW50KHRoaXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24uRU1QVFkgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZW1wdHkgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgICAgIGVtcHR5LmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBlbXB0eTtcbiAgICB9KSgpO1xuICAgIHJldHVybiBTdWJzY3JpcHRpb247XG59KCkpO1xuZXhwb3J0IHsgU3Vic2NyaXB0aW9uIH07XG5leHBvcnQgdmFyIEVNUFRZX1NVQlNDUklQVElPTiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbmV4cG9ydCBmdW5jdGlvbiBpc1N1YnNjcmlwdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiAodmFsdWUgaW5zdGFuY2VvZiBTdWJzY3JpcHRpb24gfHxcbiAgICAgICAgKHZhbHVlICYmICdjbG9zZWQnIGluIHZhbHVlICYmIGlzRnVuY3Rpb24odmFsdWUucmVtb3ZlKSAmJiBpc0Z1bmN0aW9uKHZhbHVlLmFkZCkgJiYgaXNGdW5jdGlvbih2YWx1ZS51bnN1YnNjcmliZSkpKTtcbn1cbmZ1bmN0aW9uIGV4ZWNUZWFyZG93bih0ZWFyZG93bikge1xuICAgIGlmIChpc0Z1bmN0aW9uKHRlYXJkb3duKSkge1xuICAgICAgICB0ZWFyZG93bigpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGVhcmRvd24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJzY3JpcHRpb24uanMubWFwIiwiZXhwb3J0IHZhciBjb25maWcgPSB7XG4gICAgb25VbmhhbmRsZWRFcnJvcjogbnVsbCxcbiAgICBvblN0b3BwZWROb3RpZmljYXRpb246IG51bGwsXG4gICAgUHJvbWlzZTogdW5kZWZpbmVkLFxuICAgIHVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmc6IGZhbHNlLFxuICAgIHVzZURlcHJlY2F0ZWROZXh0Q29udGV4dDogZmFsc2UsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uZmlnLmpzLm1hcCIsImltcG9ydCB7IF9fcmVhZCwgX19zcHJlYWRBcnJheSB9IGZyb20gXCJ0c2xpYlwiO1xuZXhwb3J0IHZhciB0aW1lb3V0UHJvdmlkZXIgPSB7XG4gICAgc2V0VGltZW91dDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IHRpbWVvdXRQcm92aWRlci5kZWxlZ2F0ZTtcbiAgICAgICAgcmV0dXJuICgoZGVsZWdhdGUgPT09IG51bGwgfHwgZGVsZWdhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlbGVnYXRlLnNldFRpbWVvdXQpIHx8IHNldFRpbWVvdXQpLmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKGFyZ3MpKSk7XG4gICAgfSxcbiAgICBjbGVhclRpbWVvdXQ6IGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gdGltZW91dFByb3ZpZGVyLmRlbGVnYXRlO1xuICAgICAgICByZXR1cm4gKChkZWxlZ2F0ZSA9PT0gbnVsbCB8fCBkZWxlZ2F0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVsZWdhdGUuY2xlYXJUaW1lb3V0KSB8fCBjbGVhclRpbWVvdXQpKGhhbmRsZSk7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZTogdW5kZWZpbmVkLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWVvdXRQcm92aWRlci5qcy5tYXAiLCJpbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHsgdGltZW91dFByb3ZpZGVyIH0gZnJvbSAnLi4vc2NoZWR1bGVyL3RpbWVvdXRQcm92aWRlcic7XG5leHBvcnQgZnVuY3Rpb24gcmVwb3J0VW5oYW5kbGVkRXJyb3IoZXJyKSB7XG4gICAgdGltZW91dFByb3ZpZGVyLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb25VbmhhbmRsZWRFcnJvciA9IGNvbmZpZy5vblVuaGFuZGxlZEVycm9yO1xuICAgICAgICBpZiAob25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICAgICAgb25VbmhhbmRsZWRFcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXBvcnRVbmhhbmRsZWRFcnJvci5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gbm9vcCgpIHsgfVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm9vcC5qcy5tYXAiLCJleHBvcnQgdmFyIENPTVBMRVRFX05PVElGSUNBVElPTiA9IChmdW5jdGlvbiAoKSB7IHJldHVybiBjcmVhdGVOb3RpZmljYXRpb24oJ0MnLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7IH0pKCk7XG5leHBvcnQgZnVuY3Rpb24gZXJyb3JOb3RpZmljYXRpb24oZXJyb3IpIHtcbiAgICByZXR1cm4gY3JlYXRlTm90aWZpY2F0aW9uKCdFJywgdW5kZWZpbmVkLCBlcnJvcik7XG59XG5leHBvcnQgZnVuY3Rpb24gbmV4dE5vdGlmaWNhdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBjcmVhdGVOb3RpZmljYXRpb24oJ04nLCB2YWx1ZSwgdW5kZWZpbmVkKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOb3RpZmljYXRpb24oa2luZCwgdmFsdWUsIGVycm9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAga2luZDoga2luZCxcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBlcnJvcjogZXJyb3IsXG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU5vdGlmaWNhdGlvbkZhY3Rvcmllcy5qcy5tYXAiLCJpbXBvcnQgeyBfX2V4dGVuZHMsIF9fcmVhZCwgX19zcHJlYWRBcnJheSB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7IGlzU3Vic2NyaXB0aW9uLCBTdWJzY3JpcHRpb24gfSBmcm9tICcuL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyByZXBvcnRVbmhhbmRsZWRFcnJvciB9IGZyb20gJy4vdXRpbC9yZXBvcnRVbmhhbmRsZWRFcnJvcic7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi91dGlsL25vb3AnO1xuaW1wb3J0IHsgbmV4dE5vdGlmaWNhdGlvbiwgZXJyb3JOb3RpZmljYXRpb24sIENPTVBMRVRFX05PVElGSUNBVElPTiB9IGZyb20gJy4vTm90aWZpY2F0aW9uRmFjdG9yaWVzJztcbmltcG9ydCB7IHRpbWVvdXRQcm92aWRlciB9IGZyb20gJy4vc2NoZWR1bGVyL3RpbWVvdXRQcm92aWRlcic7XG52YXIgU3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU3Vic2NyaWJlcihkZXN0aW5hdGlvbikge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5pc1N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uKSB7XG4gICAgICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xuICAgICAgICAgICAgaWYgKGlzU3Vic2NyaXB0aW9uKGRlc3RpbmF0aW9uKSkge1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLmFkZChfdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IEVNUFRZX09CU0VSVkVSO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU3Vic2NyaWJlci5jcmVhdGUgPSBmdW5jdGlvbiAobmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2FmZVN1YnNjcmliZXIobmV4dCwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBoYW5kbGVTdG9wcGVkTm90aWZpY2F0aW9uKG5leHROb3RpZmljYXRpb24odmFsdWUpLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX25leHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBoYW5kbGVTdG9wcGVkTm90aWZpY2F0aW9uKGVycm9yTm90aWZpY2F0aW9uKGVyciksIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgaGFuZGxlU3RvcHBlZE5vdGlmaWNhdGlvbihDT01QTEVURV9OT1RJRklDQVRJT04sIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUudW5zdWJzY3JpYmUuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fbmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX2Vycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBTdWJzY3JpYmVyO1xufShTdWJzY3JpcHRpb24pKTtcbmV4cG9ydCB7IFN1YnNjcmliZXIgfTtcbnZhciBTYWZlU3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNhZmVTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNhZmVTdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgdmFyIG5leHQ7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9ic2VydmVyT3JOZXh0KSkge1xuICAgICAgICAgICAgbmV4dCA9IG9ic2VydmVyT3JOZXh0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9ic2VydmVyT3JOZXh0KSB7XG4gICAgICAgICAgICAobmV4dCA9IG9ic2VydmVyT3JOZXh0Lm5leHQsIGVycm9yID0gb2JzZXJ2ZXJPck5leHQuZXJyb3IsIGNvbXBsZXRlID0gb2JzZXJ2ZXJPck5leHQuY29tcGxldGUpO1xuICAgICAgICAgICAgdmFyIGNvbnRleHRfMTtcbiAgICAgICAgICAgIGlmIChfdGhpcyAmJiBjb25maWcudXNlRGVwcmVjYXRlZE5leHRDb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgY29udGV4dF8xID0gT2JqZWN0LmNyZWF0ZShvYnNlcnZlck9yTmV4dCk7XG4gICAgICAgICAgICAgICAgY29udGV4dF8xLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMudW5zdWJzY3JpYmUoKTsgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRleHRfMSA9IG9ic2VydmVyT3JOZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dCA9IG5leHQgPT09IG51bGwgfHwgbmV4dCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV4dC5iaW5kKGNvbnRleHRfMSk7XG4gICAgICAgICAgICBlcnJvciA9IGVycm9yID09PSBudWxsIHx8IGVycm9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlcnJvci5iaW5kKGNvbnRleHRfMSk7XG4gICAgICAgICAgICBjb21wbGV0ZSA9IGNvbXBsZXRlID09PSBudWxsIHx8IGNvbXBsZXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb21wbGV0ZS5iaW5kKGNvbnRleHRfMSk7XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSB7XG4gICAgICAgICAgICBuZXh0OiBuZXh0ID8gd3JhcEZvckVycm9ySGFuZGxpbmcobmV4dCwgX3RoaXMpIDogbm9vcCxcbiAgICAgICAgICAgIGVycm9yOiB3cmFwRm9yRXJyb3JIYW5kbGluZyhlcnJvciAhPT0gbnVsbCAmJiBlcnJvciAhPT0gdm9pZCAwID8gZXJyb3IgOiBkZWZhdWx0RXJyb3JIYW5kbGVyLCBfdGhpcyksXG4gICAgICAgICAgICBjb21wbGV0ZTogY29tcGxldGUgPyB3cmFwRm9yRXJyb3JIYW5kbGluZyhjb21wbGV0ZSwgX3RoaXMpIDogbm9vcCxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gU2FmZVN1YnNjcmliZXI7XG59KFN1YnNjcmliZXIpKTtcbmV4cG9ydCB7IFNhZmVTdWJzY3JpYmVyIH07XG5mdW5jdGlvbiB3cmFwRm9yRXJyb3JIYW5kbGluZyhoYW5kbGVyLCBpbnN0YW5jZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGhhbmRsZXIuYXBwbHkodm9pZCAwLCBfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQoYXJncykpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoY29uZmlnLnVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuX3N5bmNFcnJvckhhY2tfaXNTdWJzY3JpYmluZykge1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5fX3N5bmNFcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXBvcnRVbmhhbmRsZWRFcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRFcnJvckhhbmRsZXIoZXJyKSB7XG4gICAgdGhyb3cgZXJyO1xufVxuZnVuY3Rpb24gaGFuZGxlU3RvcHBlZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24sIHN1YnNjcmliZXIpIHtcbiAgICB2YXIgb25TdG9wcGVkTm90aWZpY2F0aW9uID0gY29uZmlnLm9uU3RvcHBlZE5vdGlmaWNhdGlvbjtcbiAgICBvblN0b3BwZWROb3RpZmljYXRpb24gJiYgdGltZW91dFByb3ZpZGVyLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gb25TdG9wcGVkTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbiwgc3Vic2NyaWJlcik7IH0pO1xufVxuZXhwb3J0IHZhciBFTVBUWV9PQlNFUlZFUiA9IHtcbiAgICBjbG9zZWQ6IHRydWUsXG4gICAgbmV4dDogbm9vcCxcbiAgICBlcnJvcjogZGVmYXVsdEVycm9ySGFuZGxlcixcbiAgICBjb21wbGV0ZTogbm9vcCxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJzY3JpYmVyLmpzLm1hcCIsImV4cG9ydCB2YXIgb2JzZXJ2YWJsZSA9IChmdW5jdGlvbiAoKSB7IHJldHVybiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wub2JzZXJ2YWJsZSkgfHwgJ0BAb2JzZXJ2YWJsZSc7IH0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZhYmxlLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBpZGVudGl0eSh4KSB7XG4gICAgcmV0dXJuIHg7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pZGVudGl0eS5qcy5tYXAiLCJpbXBvcnQgeyBpZGVudGl0eSB9IGZyb20gJy4vaWRlbnRpdHknO1xuZXhwb3J0IGZ1bmN0aW9uIHBpcGUoKSB7XG4gICAgdmFyIGZucyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGZuc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gcGlwZUZyb21BcnJheShmbnMpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBpcGVGcm9tQXJyYXkoZm5zKSB7XG4gICAgaWYgKGZucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGlkZW50aXR5O1xuICAgIH1cbiAgICBpZiAoZm5zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gZm5zWzBdO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gcGlwZWQoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGZucy5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGZuKSB7IHJldHVybiBmbihwcmV2KTsgfSwgaW5wdXQpO1xuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1waXBlLmpzLm1hcCIsImltcG9ydCB7IFNhZmVTdWJzY3JpYmVyLCBTdWJzY3JpYmVyIH0gZnJvbSAnLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IGlzU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgb2JzZXJ2YWJsZSBhcyBTeW1ib2xfb2JzZXJ2YWJsZSB9IGZyb20gJy4vc3ltYm9sL29ic2VydmFibGUnO1xuaW1wb3J0IHsgcGlwZUZyb21BcnJheSB9IGZyb20gJy4vdXRpbC9waXBlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL3V0aWwvaXNGdW5jdGlvbic7XG52YXIgT2JzZXJ2YWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT2JzZXJ2YWJsZShzdWJzY3JpYmUpIHtcbiAgICAgICAgaWYgKHN1YnNjcmliZSkge1xuICAgICAgICAgICAgdGhpcy5fc3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgICAgICB9XG4gICAgfVxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmxpZnQgPSBmdW5jdGlvbiAob3BlcmF0b3IpIHtcbiAgICAgICAgdmFyIG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgpO1xuICAgICAgICBvYnNlcnZhYmxlLnNvdXJjZSA9IHRoaXM7XG4gICAgICAgIG9ic2VydmFibGUub3BlcmF0b3IgPSBvcGVyYXRvcjtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAob2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICB2YXIgc3Vic2NyaWJlciA9IGlzU3Vic2NyaWJlcihvYnNlcnZlck9yTmV4dCkgPyBvYnNlcnZlck9yTmV4dCA6IG5ldyBTYWZlU3Vic2NyaWJlcihvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICAgICAgaWYgKGNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9kZXByZWNhdGVkU3luY0Vycm9yU3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIF9hID0gdGhpcywgb3BlcmF0b3IgPSBfYS5vcGVyYXRvciwgc291cmNlID0gX2Euc291cmNlO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5hZGQob3BlcmF0b3JcbiAgICAgICAgICAgICAgICA/XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdG9yLmNhbGwoc3Vic2NyaWJlciwgc291cmNlKVxuICAgICAgICAgICAgICAgIDogc291cmNlXG4gICAgICAgICAgICAgICAgICAgID9cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N1YnNjcmliZShzdWJzY3JpYmVyKVxuICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90cnlTdWJzY3JpYmUoc3Vic2NyaWJlcikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJzY3JpYmVyO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuX2RlcHJlY2F0ZWRTeW5jRXJyb3JTdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgbG9jYWxTdWJzY3JpYmVyID0gc3Vic2NyaWJlcjtcbiAgICAgICAgbG9jYWxTdWJzY3JpYmVyLl9zeW5jRXJyb3JIYWNrX2lzU3Vic2NyaWJpbmcgPSB0cnVlO1xuICAgICAgICB2YXIgb3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yO1xuICAgICAgICBpZiAob3BlcmF0b3IpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuYWRkKG9wZXJhdG9yLmNhbGwoc3Vic2NyaWJlciwgdGhpcy5zb3VyY2UpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGxvY2FsU3Vic2NyaWJlci5fX3N5bmNFcnJvciA9IGVycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVzdCA9IGxvY2FsU3Vic2NyaWJlcjtcbiAgICAgICAgd2hpbGUgKGRlc3QpIHtcbiAgICAgICAgICAgIGlmICgnX19zeW5jRXJyb3InIGluIGRlc3QpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBkZXN0Ll9fc3luY0Vycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlc3QgPSBkZXN0LmRlc3RpbmF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGxvY2FsU3Vic2NyaWJlci5fc3luY0Vycm9ySGFja19pc1N1YnNjcmliaW5nID0gZmFsc2U7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5fdHJ5U3Vic2NyaWJlID0gZnVuY3Rpb24gKHNpbmspIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJzY3JpYmUoc2luayk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgc2luay5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKG5leHQsIHByb21pc2VDdG9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHByb21pc2VDdG9yID0gZ2V0UHJvbWlzZUN0b3IocHJvbWlzZUN0b3IpO1xuICAgICAgICByZXR1cm4gbmV3IHByb21pc2VDdG9yKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciBzdWJzY3JpcHRpb247XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24gPSBfdGhpcy5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9PT0gbnVsbCB8fCBzdWJzY3JpcHRpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHJlamVjdCwgcmVzb2x2ZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMuc291cmNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGVbU3ltYm9sX29ic2VydmFibGVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvcGVyYXRpb25zID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBvcGVyYXRpb25zW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbnMubGVuZ3RoID8gcGlwZUZyb21BcnJheShvcGVyYXRpb25zKSh0aGlzKSA6IHRoaXM7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS50b1Byb21pc2UgPSBmdW5jdGlvbiAocHJvbWlzZUN0b3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcHJvbWlzZUN0b3IgPSBnZXRQcm9taXNlQ3Rvcihwcm9taXNlQ3Rvcik7XG4gICAgICAgIHJldHVybiBuZXcgcHJvbWlzZUN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgX3RoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uICh4KSB7IHJldHVybiAodmFsdWUgPSB4KTsgfSwgZnVuY3Rpb24gKGVycikgeyByZXR1cm4gcmVqZWN0KGVycik7IH0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlc29sdmUodmFsdWUpOyB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLmNyZWF0ZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZSk7XG4gICAgfTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZTtcbn0oKSk7XG5leHBvcnQgeyBPYnNlcnZhYmxlIH07XG5mdW5jdGlvbiBnZXRQcm9taXNlQ3Rvcihwcm9taXNlQ3Rvcikge1xuICAgIHZhciBfYTtcbiAgICByZXR1cm4gKF9hID0gcHJvbWlzZUN0b3IgIT09IG51bGwgJiYgcHJvbWlzZUN0b3IgIT09IHZvaWQgMCA/IHByb21pc2VDdG9yIDogY29uZmlnLlByb21pc2UpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFByb21pc2U7XG59XG5mdW5jdGlvbiBpc09ic2VydmVyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIGlzRnVuY3Rpb24odmFsdWUubmV4dCkgJiYgaXNGdW5jdGlvbih2YWx1ZS5lcnJvcikgJiYgaXNGdW5jdGlvbih2YWx1ZS5jb21wbGV0ZSk7XG59XG5mdW5jdGlvbiBpc1N1YnNjcmliZXIodmFsdWUpIHtcbiAgICByZXR1cm4gKHZhbHVlICYmIHZhbHVlIGluc3RhbmNlb2YgU3Vic2NyaWJlcikgfHwgKGlzT2JzZXJ2ZXIodmFsdWUpICYmIGlzU3Vic2NyaXB0aW9uKHZhbHVlKSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYnNlcnZhYmxlLmpzLm1hcCIsImltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL2lzRnVuY3Rpb24nO1xuZXhwb3J0IGZ1bmN0aW9uIGhhc0xpZnQoc291cmNlKSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24oc291cmNlID09PSBudWxsIHx8IHNvdXJjZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc291cmNlLmxpZnQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG9wZXJhdGUoaW5pdCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgIGlmIChoYXNMaWZ0KHNvdXJjZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2UubGlmdChmdW5jdGlvbiAobGlmdGVkU291cmNlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluaXQobGlmdGVkU291cmNlLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5hYmxlIHRvIGxpZnQgdW5rbm93biBPYnNlcnZhYmxlIHR5cGUnKTtcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGlmdC5qcy5tYXAiLCJpbXBvcnQgeyBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbnZhciBPcGVyYXRvclN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhPcGVyYXRvclN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gT3BlcmF0b3JTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCBvbk5leHQsIG9uQ29tcGxldGUsIG9uRXJyb3IsIG9uRmluYWxpemUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgZGVzdGluYXRpb24pIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLm9uRmluYWxpemUgPSBvbkZpbmFsaXplO1xuICAgICAgICBfdGhpcy5fbmV4dCA9IG9uTmV4dFxuICAgICAgICAgICAgPyBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBvbk5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBfc3VwZXIucHJvdG90eXBlLl9uZXh0O1xuICAgICAgICBfdGhpcy5fZXJyb3IgPSBvbkVycm9yXG4gICAgICAgICAgICA/IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBvbkVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IF9zdXBlci5wcm90b3R5cGUuX2Vycm9yO1xuICAgICAgICBfdGhpcy5fY29tcGxldGUgPSBvbkNvbXBsZXRlXG4gICAgICAgICAgICA/IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IF9zdXBlci5wcm90b3R5cGUuX2NvbXBsZXRlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9wZXJhdG9yU3Vic2NyaWJlci5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdmFyIGNsb3NlZCA9IHRoaXMuY2xvc2VkO1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlLmNhbGwodGhpcyk7XG4gICAgICAgICFjbG9zZWQgJiYgKChfYSA9IHRoaXMub25GaW5hbGl6ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwodGhpcykpO1xuICAgIH07XG4gICAgcmV0dXJuIE9wZXJhdG9yU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcikpO1xuZXhwb3J0IHsgT3BlcmF0b3JTdWJzY3JpYmVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PcGVyYXRvclN1YnNjcmliZXIuanMubWFwIiwiaW1wb3J0IHsgb3BlcmF0ZSB9IGZyb20gJy4uL3V0aWwvbGlmdCc7XG5pbXBvcnQgeyBPcGVyYXRvclN1YnNjcmliZXIgfSBmcm9tICcuL09wZXJhdG9yU3Vic2NyaWJlcic7XG5leHBvcnQgZnVuY3Rpb24gbWFwKHByb2plY3QsIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gb3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUobmV3IE9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChwcm9qZWN0LmNhbGwodGhpc0FyZywgdmFsdWUsIGluZGV4KyspKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwLmpzLm1hcCIsImV4cG9ydCB2YXIgaXNBcnJheUxpa2UgPSAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHggJiYgdHlwZW9mIHgubGVuZ3RoID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgeCAhPT0gJ2Z1bmN0aW9uJzsgfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0FycmF5TGlrZS5qcy5tYXAiLCJpbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSBcIi4vaXNGdW5jdGlvblwiO1xuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvbWlzZSh2YWx1ZSkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2YWx1ZS50aGVuKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzUHJvbWlzZS5qcy5tYXAiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5leHBvcnQgZnVuY3Rpb24gc2NoZWR1bGVBcnJheShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gaW5wdXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGlucHV0W2krK10pO1xuICAgICAgICAgICAgICAgIGlmICghc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZUFycmF5LmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBnZXRTeW1ib2xJdGVyYXRvcigpIHtcbiAgICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ2Z1bmN0aW9uJyB8fCAhU3ltYm9sLml0ZXJhdG9yKSB7XG4gICAgICAgIHJldHVybiAnQEBpdGVyYXRvcic7XG4gICAgfVxuICAgIHJldHVybiBTeW1ib2wuaXRlcmF0b3I7XG59XG5leHBvcnQgdmFyIGl0ZXJhdG9yID0gZ2V0U3ltYm9sSXRlcmF0b3IoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWl0ZXJhdG9yLmpzLm1hcCIsImltcG9ydCB7IG9ic2VydmFibGUgYXMgU3ltYm9sX29ic2VydmFibGUgfSBmcm9tICcuLi9zeW1ib2wvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi9pc0Z1bmN0aW9uJztcbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVyb3BPYnNlcnZhYmxlKGlucHV0KSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24oaW5wdXRbU3ltYm9sX29ic2VydmFibGVdKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzSW50ZXJvcE9ic2VydmFibGUuanMubWFwIiwiaW1wb3J0IHsgaXRlcmF0b3IgYXMgU3ltYm9sX2l0ZXJhdG9yIH0gZnJvbSAnLi4vc3ltYm9sL2l0ZXJhdG9yJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL2lzRnVuY3Rpb24nO1xuZXhwb3J0IGZ1bmN0aW9uIGlzSXRlcmFibGUoaW5wdXQpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbihpbnB1dCA9PT0gbnVsbCB8fCBpbnB1dCA9PT0gdm9pZCAwID8gdm9pZCAwIDogaW5wdXRbU3ltYm9sX2l0ZXJhdG9yXSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0l0ZXJhYmxlLmpzLm1hcCIsImltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL2lzRnVuY3Rpb24nO1xuZXhwb3J0IGZ1bmN0aW9uIGlzQXN5bmNJdGVyYWJsZShvYmopIHtcbiAgICByZXR1cm4gU3ltYm9sLmFzeW5jSXRlcmF0b3IgJiYgaXNGdW5jdGlvbihvYmogPT09IG51bGwgfHwgb2JqID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvYmpbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzQXN5bmNJdGVyYWJsZS5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlSW52YWxpZE9ic2VydmFibGVUeXBlRXJyb3IoaW5wdXQpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihcIllvdSBwcm92aWRlZCBcIiArIChpbnB1dCAhPT0gbnVsbCAmJiB0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnID8gJ2FuIGludmFsaWQgb2JqZWN0JyA6IFwiJ1wiICsgaW5wdXQgKyBcIidcIikgKyBcIiB3aGVyZSBhIHN0cmVhbSB3YXMgZXhwZWN0ZWQuIFlvdSBjYW4gcHJvdmlkZSBhbiBPYnNlcnZhYmxlLCBQcm9taXNlLCBSZWFkYWJsZVN0cmVhbSwgQXJyYXksIEFzeW5jSXRlcmFibGUsIG9yIEl0ZXJhYmxlLlwiKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRocm93VW5vYnNlcnZhYmxlRXJyb3IuanMubWFwIiwiaW1wb3J0IHsgX19hc3luY0dlbmVyYXRvciwgX19hd2FpdCwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL2lzRnVuY3Rpb24nO1xuZXhwb3J0IGZ1bmN0aW9uIHJlYWRhYmxlU3RyZWFtTGlrZVRvQXN5bmNHZW5lcmF0b3IocmVhZGFibGVTdHJlYW0pIHtcbiAgICByZXR1cm4gX19hc3luY0dlbmVyYXRvcih0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uIHJlYWRhYmxlU3RyZWFtTGlrZVRvQXN5bmNHZW5lcmF0b3JfMSgpIHtcbiAgICAgICAgdmFyIHJlYWRlciwgX2EsIHZhbHVlLCBkb25lO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICByZWFkZXIgPSByZWFkYWJsZVN0cmVhbS5nZXRSZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFsxLCAsIDksIDEwXSk7XG4gICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMjtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGlmICghdHJ1ZSkgcmV0dXJuIFszLCA4XTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBfX2F3YWl0KHJlYWRlci5yZWFkKCkpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIF9hID0gX2Iuc2VudCgpLCB2YWx1ZSA9IF9hLnZhbHVlLCBkb25lID0gX2EuZG9uZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkb25lKSByZXR1cm4gWzMsIDVdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIF9fYXdhaXQodm9pZCAwKV07XG4gICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIsIF9iLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzQsIF9fYXdhaXQodmFsdWUpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDY6IHJldHVybiBbNCwgX2Iuc2VudCgpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAyXTtcbiAgICAgICAgICAgICAgICBjYXNlIDg6IHJldHVybiBbMywgMTBdO1xuICAgICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnJlbGVhc2VMb2NrKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbN107XG4gICAgICAgICAgICAgICAgY2FzZSAxMDogcmV0dXJuIFsyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNSZWFkYWJsZVN0cmVhbUxpa2Uob2JqKSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24ob2JqID09PSBudWxsIHx8IG9iaiA9PT0gdm9pZCAwID8gdm9pZCAwIDogb2JqLmdldFJlYWRlcik7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc1JlYWRhYmxlU3RyZWFtTGlrZS5qcy5tYXAiLCJpbXBvcnQgeyBfX2FzeW5jVmFsdWVzLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yLCBfX3ZhbHVlcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgaXNBcnJheUxpa2UgfSBmcm9tICcuLi91dGlsL2lzQXJyYXlMaWtlJztcbmltcG9ydCB7IGlzUHJvbWlzZSB9IGZyb20gJy4uL3V0aWwvaXNQcm9taXNlJztcbmltcG9ydCB7IG9ic2VydmFibGUgYXMgU3ltYm9sX29ic2VydmFibGUgfSBmcm9tICcuLi9zeW1ib2wvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBzY2hlZHVsZWQgfSBmcm9tICcuLi9zY2hlZHVsZWQvc2NoZWR1bGVkJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHsgcmVwb3J0VW5oYW5kbGVkRXJyb3IgfSBmcm9tICcuLi91dGlsL3JlcG9ydFVuaGFuZGxlZEVycm9yJztcbmltcG9ydCB7IGlzSW50ZXJvcE9ic2VydmFibGUgfSBmcm9tICcuLi91dGlsL2lzSW50ZXJvcE9ic2VydmFibGUnO1xuaW1wb3J0IHsgaXNBc3luY0l0ZXJhYmxlIH0gZnJvbSAnLi4vdXRpbC9pc0FzeW5jSXRlcmFibGUnO1xuaW1wb3J0IHsgY3JlYXRlSW52YWxpZE9ic2VydmFibGVUeXBlRXJyb3IgfSBmcm9tICcuLi91dGlsL3Rocm93VW5vYnNlcnZhYmxlRXJyb3InO1xuaW1wb3J0IHsgaXNJdGVyYWJsZSB9IGZyb20gJy4uL3V0aWwvaXNJdGVyYWJsZSc7XG5pbXBvcnQgeyBpc1JlYWRhYmxlU3RyZWFtTGlrZSwgcmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvciB9IGZyb20gJy4uL3V0aWwvaXNSZWFkYWJsZVN0cmVhbUxpa2UnO1xuZXhwb3J0IGZ1bmN0aW9uIGZyb20oaW5wdXQsIHNjaGVkdWxlcikge1xuICAgIHJldHVybiBzY2hlZHVsZXIgPyBzY2hlZHVsZWQoaW5wdXQsIHNjaGVkdWxlcikgOiBpbm5lckZyb20oaW5wdXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlubmVyRnJvbShpbnB1dCkge1xuICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cbiAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNJbnRlcm9wT2JzZXJ2YWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tSW50ZXJvcE9ic2VydmFibGUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5TGlrZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQcm9taXNlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb21Qcm9taXNlKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBc3luY0l0ZXJhYmxlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb21Bc3luY0l0ZXJhYmxlKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNJdGVyYWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tSXRlcmFibGUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1JlYWRhYmxlU3RyZWFtTGlrZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tUmVhZGFibGVTdHJlYW1MaWtlKGlucHV0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBjcmVhdGVJbnZhbGlkT2JzZXJ2YWJsZVR5cGVFcnJvcihpbnB1dCk7XG59XG5mdW5jdGlvbiBmcm9tSW50ZXJvcE9ic2VydmFibGUob2JqKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBvYnMgPSBvYmpbU3ltYm9sX29ic2VydmFibGVdKCk7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9icy5zdWJzY3JpYmUpKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JzLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm92aWRlZCBvYmplY3QgZG9lcyBub3QgY29ycmVjdGx5IGltcGxlbWVudCBTeW1ib2wub2JzZXJ2YWJsZScpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21BcnJheUxpa2UoYXJyYXkpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGggJiYgIXN1YnNjcmliZXIuY2xvc2VkOyBpKyspIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChhcnJheVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZnJvbVByb21pc2UocHJvbWlzZSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBwcm9taXNlXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikgeyByZXR1cm4gc3Vic2NyaWJlci5lcnJvcihlcnIpOyB9KVxuICAgICAgICAgICAgLnRoZW4obnVsbCwgcmVwb3J0VW5oYW5kbGVkRXJyb3IpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZnJvbUl0ZXJhYmxlKGl0ZXJhYmxlKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBlXzEsIF9hO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgaXRlcmFibGVfMSA9IF9fdmFsdWVzKGl0ZXJhYmxlKSwgaXRlcmFibGVfMV8xID0gaXRlcmFibGVfMS5uZXh0KCk7ICFpdGVyYWJsZV8xXzEuZG9uZTsgaXRlcmFibGVfMV8xID0gaXRlcmFibGVfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBpdGVyYWJsZV8xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZXJhYmxlXzFfMSAmJiAhaXRlcmFibGVfMV8xLmRvbmUgJiYgKF9hID0gaXRlcmFibGVfMS5yZXR1cm4pKSBfYS5jYWxsKGl0ZXJhYmxlXzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGZyb21Bc3luY0l0ZXJhYmxlKGFzeW5jSXRlcmFibGUpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgcHJvY2Vzcyhhc3luY0l0ZXJhYmxlLCBzdWJzY3JpYmVyKS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBzdWJzY3JpYmVyLmVycm9yKGVycik7IH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZnJvbVJlYWRhYmxlU3RyZWFtTGlrZShyZWFkYWJsZVN0cmVhbSkge1xuICAgIHJldHVybiBmcm9tQXN5bmNJdGVyYWJsZShyZWFkYWJsZVN0cmVhbUxpa2VUb0FzeW5jR2VuZXJhdG9yKHJlYWRhYmxlU3RyZWFtKSk7XG59XG5mdW5jdGlvbiBwcm9jZXNzKGFzeW5jSXRlcmFibGUsIHN1YnNjcmliZXIpIHtcbiAgICB2YXIgYXN5bmNJdGVyYWJsZV8xLCBhc3luY0l0ZXJhYmxlXzFfMTtcbiAgICB2YXIgZV8yLCBfYTtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2YWx1ZSwgZV8yXzE7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMCwgNSwgNiwgMTFdKTtcbiAgICAgICAgICAgICAgICAgICAgYXN5bmNJdGVyYWJsZV8xID0gX19hc3luY1ZhbHVlcyhhc3luY0l0ZXJhYmxlKTtcbiAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFs0LCBhc3luY0l0ZXJhYmxlXzEubmV4dCgpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKGFzeW5jSXRlcmFibGVfMV8xID0gX2Iuc2VudCgpLCAhYXN5bmNJdGVyYWJsZV8xXzEuZG9uZSkpIHJldHVybiBbMywgNF07XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gYXN5bmNJdGVyYWJsZV8xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gWzMsIDFdO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFszLCAxMV07XG4gICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICBlXzJfMSA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZV8yID0geyBlcnJvcjogZV8yXzEgfTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAxMV07XG4gICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzYsICwgOSwgMTBdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoYXN5bmNJdGVyYWJsZV8xXzEgJiYgIWFzeW5jSXRlcmFibGVfMV8xLmRvbmUgJiYgKF9hID0gYXN5bmNJdGVyYWJsZV8xLnJldHVybikpKSByZXR1cm4gWzMsIDhdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIF9hLmNhbGwoYXN5bmNJdGVyYWJsZV8xKV07XG4gICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gODtcbiAgICAgICAgICAgICAgICBjYXNlIDg6IHJldHVybiBbMywgMTBdO1xuICAgICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzddO1xuICAgICAgICAgICAgICAgIGNhc2UgMTA6IHJldHVybiBbN107XG4gICAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZyb20uanMubWFwIiwiaW1wb3J0IHsgbWFwIH0gZnJvbSAnLi9tYXAnO1xuaW1wb3J0IHsgaW5uZXJGcm9tIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9mcm9tJztcbmltcG9ydCB7IG9wZXJhdGUgfSBmcm9tICcuLi91dGlsL2xpZnQnO1xuaW1wb3J0IHsgbWVyZ2VJbnRlcm5hbHMgfSBmcm9tICcuL21lcmdlSW50ZXJuYWxzJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi91dGlsL2lzRnVuY3Rpb24nO1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlTWFwKHByb2plY3QsIHJlc3VsdFNlbGVjdG9yLCBjb25jdXJyZW50KSB7XG4gICAgaWYgKGNvbmN1cnJlbnQgPT09IHZvaWQgMCkgeyBjb25jdXJyZW50ID0gSW5maW5pdHk7IH1cbiAgICBpZiAoaXNGdW5jdGlvbihyZXN1bHRTZWxlY3RvcikpIHtcbiAgICAgICAgcmV0dXJuIG1lcmdlTWFwKGZ1bmN0aW9uIChhLCBpKSB7IHJldHVybiBtYXAoZnVuY3Rpb24gKGIsIGlpKSB7IHJldHVybiByZXN1bHRTZWxlY3RvcihhLCBiLCBpLCBpaSk7IH0pKGlubmVyRnJvbShwcm9qZWN0KGEsIGkpKSk7IH0sIGNvbmN1cnJlbnQpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgcmVzdWx0U2VsZWN0b3IgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGNvbmN1cnJlbnQgPSByZXN1bHRTZWxlY3RvcjtcbiAgICB9XG4gICAgcmV0dXJuIG9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikgeyByZXR1cm4gbWVyZ2VJbnRlcm5hbHMoc291cmNlLCBzdWJzY3JpYmVyLCBwcm9qZWN0LCBjb25jdXJyZW50KTsgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZU1hcC5qcy5tYXAiLCJpbXBvcnQgeyBpbm5lckZyb20gfSBmcm9tICcuLi9vYnNlcnZhYmxlL2Zyb20nO1xuaW1wb3J0IHsgT3BlcmF0b3JTdWJzY3JpYmVyIH0gZnJvbSAnLi9PcGVyYXRvclN1YnNjcmliZXInO1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlSW50ZXJuYWxzKHNvdXJjZSwgc3Vic2NyaWJlciwgcHJvamVjdCwgY29uY3VycmVudCwgb25CZWZvcmVOZXh0LCBleHBhbmQsIGlubmVyU3ViU2NoZWR1bGVyLCBhZGRpdGlvbmFsVGVhcmRvd24pIHtcbiAgICB2YXIgYnVmZmVyID0gW107XG4gICAgdmFyIGFjdGl2ZSA9IDA7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgaXNDb21wbGV0ZSA9IGZhbHNlO1xuICAgIHZhciBjaGVja0NvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoaXNDb21wbGV0ZSAmJiAhYnVmZmVyLmxlbmd0aCAmJiAhYWN0aXZlKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZhciBvdXRlck5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIChhY3RpdmUgPCBjb25jdXJyZW50ID8gZG9Jbm5lclN1Yih2YWx1ZSkgOiBidWZmZXIucHVzaCh2YWx1ZSkpOyB9O1xuICAgIHZhciBkb0lubmVyU3ViID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGV4cGFuZCAmJiBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICBhY3RpdmUrKztcbiAgICAgICAgdmFyIGlubmVyQ29tcGxldGUgPSBmYWxzZTtcbiAgICAgICAgaW5uZXJGcm9tKHByb2plY3QodmFsdWUsIGluZGV4KyspKS5zdWJzY3JpYmUobmV3IE9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAoaW5uZXJWYWx1ZSkge1xuICAgICAgICAgICAgb25CZWZvcmVOZXh0ID09PSBudWxsIHx8IG9uQmVmb3JlTmV4dCA9PT0gdm9pZCAwID8gdm9pZCAwIDogb25CZWZvcmVOZXh0KGlubmVyVmFsdWUpO1xuICAgICAgICAgICAgaWYgKGV4cGFuZCkge1xuICAgICAgICAgICAgICAgIG91dGVyTmV4dChpbm5lclZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChpbm5lclZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaW5uZXJDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIH0sIHVuZGVmaW5lZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGlubmVyQ29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmUtLTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnVmZmVyZWRWYWx1ZSA9IGJ1ZmZlci5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJTdWJTY2hlZHVsZXIgPyBzdWJzY3JpYmVyLmFkZChpbm5lclN1YlNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7IHJldHVybiBkb0lubmVyU3ViKGJ1ZmZlcmVkVmFsdWUpOyB9KSkgOiBkb0lubmVyU3ViKGJ1ZmZlcmVkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoYnVmZmVyLmxlbmd0aCAmJiBhY3RpdmUgPCBjb25jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfbG9vcF8xKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIHNvdXJjZS5zdWJzY3JpYmUobmV3IE9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBvdXRlck5leHQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXNDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIGNoZWNrQ29tcGxldGUoKTtcbiAgICB9KSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYWRkaXRpb25hbFRlYXJkb3duID09PSBudWxsIHx8IGFkZGl0aW9uYWxUZWFyZG93biA9PT0gdm9pZCAwID8gdm9pZCAwIDogYWRkaXRpb25hbFRlYXJkb3duKCk7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lcmdlSW50ZXJuYWxzLmpzLm1hcCIsImltcG9ydCB7IF9fcmVhZCwgX19zcHJlYWRBcnJheSB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSBcIi4uL29wZXJhdG9ycy9tYXBcIjtcbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbmZ1bmN0aW9uIGNhbGxPckFwcGx5KGZuLCBhcmdzKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkoYXJncykgPyBmbi5hcHBseSh2b2lkIDAsIF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZChhcmdzKSkpIDogZm4oYXJncyk7XG59XG5leHBvcnQgZnVuY3Rpb24gbWFwT25lT3JNYW55QXJncyhmbikge1xuICAgIHJldHVybiBtYXAoZnVuY3Rpb24gKGFyZ3MpIHsgcmV0dXJuIGNhbGxPckFwcGx5KGZuLCBhcmdzKTsgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBPbmVPck1hbnlBcmdzLmpzLm1hcCIsImltcG9ydCB7IF9fcmVhZCB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgbWVyZ2VNYXAgfSBmcm9tICcuLi9vcGVyYXRvcnMvbWVyZ2VNYXAnO1xuaW1wb3J0IHsgaXNBcnJheUxpa2UgfSBmcm9tICcuLi91dGlsL2lzQXJyYXlMaWtlJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHsgbWFwT25lT3JNYW55QXJncyB9IGZyb20gJy4uL3V0aWwvbWFwT25lT3JNYW55QXJncyc7XG5pbXBvcnQgeyBpbnRlcm5hbEZyb21BcnJheSB9IGZyb20gJy4vZnJvbUFycmF5JztcbnZhciBub2RlRXZlbnRFbWl0dGVyTWV0aG9kcyA9IFsnYWRkTGlzdGVuZXInLCAncmVtb3ZlTGlzdGVuZXInXTtcbnZhciBldmVudFRhcmdldE1ldGhvZHMgPSBbJ2FkZEV2ZW50TGlzdGVuZXInLCAncmVtb3ZlRXZlbnRMaXN0ZW5lciddO1xudmFyIGpxdWVyeU1ldGhvZHMgPSBbJ29uJywgJ29mZiddO1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21FdmVudCh0YXJnZXQsIGV2ZW50TmFtZSwgb3B0aW9ucywgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgICByZXN1bHRTZWxlY3RvciA9IG9wdGlvbnM7XG4gICAgICAgIG9wdGlvbnMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChyZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gZnJvbUV2ZW50KHRhcmdldCwgZXZlbnROYW1lLCBvcHRpb25zKS5waXBlKG1hcE9uZU9yTWFueUFyZ3MocmVzdWx0U2VsZWN0b3IpKTtcbiAgICB9XG4gICAgdmFyIF9hID0gX19yZWFkKGlzRXZlbnRUYXJnZXQodGFyZ2V0KVxuICAgICAgICA/IGV2ZW50VGFyZ2V0TWV0aG9kcy5tYXAoZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHsgcmV0dXJuIGZ1bmN0aW9uIChoYW5kbGVyKSB7IHJldHVybiB0YXJnZXRbbWV0aG9kTmFtZV0oZXZlbnROYW1lLCBoYW5kbGVyLCBvcHRpb25zKTsgfTsgfSlcbiAgICAgICAgOlxuICAgICAgICAgICAgaXNOb2RlU3R5bGVFdmVudEVtaXR0ZXIodGFyZ2V0KVxuICAgICAgICAgICAgICAgID8gbm9kZUV2ZW50RW1pdHRlck1ldGhvZHMubWFwKHRvQ29tbW9uSGFuZGxlclJlZ2lzdHJ5KHRhcmdldCwgZXZlbnROYW1lKSlcbiAgICAgICAgICAgICAgICA6IGlzSlF1ZXJ5U3R5bGVFdmVudEVtaXR0ZXIodGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICA/IGpxdWVyeU1ldGhvZHMubWFwKHRvQ29tbW9uSGFuZGxlclJlZ2lzdHJ5KHRhcmdldCwgZXZlbnROYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgOiBbXSwgMiksIGFkZCA9IF9hWzBdLCByZW1vdmUgPSBfYVsxXTtcbiAgICBpZiAoIWFkZCkge1xuICAgICAgICBpZiAoaXNBcnJheUxpa2UodGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlTWFwKGZ1bmN0aW9uIChzdWJUYXJnZXQpIHsgcmV0dXJuIGZyb21FdmVudChzdWJUYXJnZXQsIGV2ZW50TmFtZSwgb3B0aW9ucyk7IH0pKGludGVybmFsRnJvbUFycmF5KHRhcmdldCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghYWRkKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgZXZlbnQgdGFyZ2V0Jyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdWJzY3JpYmVyLm5leHQoMSA8IGFyZ3MubGVuZ3RoID8gYXJncyA6IGFyZ3NbMF0pO1xuICAgICAgICB9O1xuICAgICAgICBhZGQoaGFuZGxlcik7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiByZW1vdmUoaGFuZGxlcik7IH07XG4gICAgfSk7XG59XG5mdW5jdGlvbiB0b0NvbW1vbkhhbmRsZXJSZWdpc3RyeSh0YXJnZXQsIGV2ZW50TmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAobWV0aG9kTmFtZSkgeyByZXR1cm4gZnVuY3Rpb24gKGhhbmRsZXIpIHsgcmV0dXJuIHRhcmdldFttZXRob2ROYW1lXShldmVudE5hbWUsIGhhbmRsZXIpOyB9OyB9O1xufVxuZnVuY3Rpb24gaXNOb2RlU3R5bGVFdmVudEVtaXR0ZXIodGFyZ2V0KSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24odGFyZ2V0LmFkZExpc3RlbmVyKSAmJiBpc0Z1bmN0aW9uKHRhcmdldC5yZW1vdmVMaXN0ZW5lcik7XG59XG5mdW5jdGlvbiBpc0pRdWVyeVN0eWxlRXZlbnRFbWl0dGVyKHRhcmdldCkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKHRhcmdldC5vbikgJiYgaXNGdW5jdGlvbih0YXJnZXQub2ZmKTtcbn1cbmZ1bmN0aW9uIGlzRXZlbnRUYXJnZXQodGFyZ2V0KSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24odGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIpICYmIGlzRnVuY3Rpb24odGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnJvbUV2ZW50LmpzLm1hcCIsImltcG9ydCB7IHNjaGVkdWxlQXJyYXkgfSBmcm9tICcuLi9zY2hlZHVsZWQvc2NoZWR1bGVBcnJheSc7XG5pbXBvcnQgeyBmcm9tQXJyYXlMaWtlIH0gZnJvbSAnLi9mcm9tJztcbmV4cG9ydCBmdW5jdGlvbiBpbnRlcm5hbEZyb21BcnJheShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIHNjaGVkdWxlciA/IHNjaGVkdWxlQXJyYXkoaW5wdXQsIHNjaGVkdWxlcikgOiBmcm9tQXJyYXlMaWtlKGlucHV0KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZyb21BcnJheS5qcy5tYXAiLCJpbXBvcnQgeyBmcm9tRXZlbnQsIE9ic2VydmFibGUgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTaG90IH0gZnJvbSBcIi4vc2hvdFwiO1xuXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcblx0Ly8gY2FudmFzIGNvbnRleHQgZm9yIGRyYXdpbmcgc2hhcGVzXG5cdHByaXZhdGUgX2NvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcblxuXHRwcml2YXRlIF9zaG90OiBTaG90O1xuXG5cdC8vIGNvbXBsZXRlIHRpbGUgc2hlZXRcblx0cHJpdmF0ZSBfc2hlZXQgPSBuZXcgSW1hZ2UoKTtcblxuXHQvLyBjb250cm9sIGtleXMgZm9yIG1vdmluZyBsZWZ0IGFuZCByaWdodCBhbmQgZmlyZSBhIHNob3Rcblx0cHJpdmF0ZSBfbGVmdDogc3RyaW5nO1xuXHRwcml2YXRlIF9yaWdodDogc3RyaW5nO1xuXHRwcml2YXRlIF9maXJlOiBzdHJpbmc7XG5cblx0Ly8gcGxheWVyIGNvb3JkaW5hdGVzIGFuZCB2ZWxvY2l0eVxuXHRwcml2YXRlIF94OiBudW1iZXI7XG5cdHByaXZhdGUgX3k6IG51bWJlcjtcblx0cHJpdmF0ZSBfdmVsb2NpdHk6IG51bWJlciA9IDQ7XG5cblx0Ly8gc2F2ZSBhIGxpc3Qgb2YgcHJlc3NlZCBrZXlzIHRvIGFsbG93IG11bHRpcGxlIHByZXNzZWQga2V5cyBhdCB0aGUgc2FtZSB0aW1lXG5cdHByaXZhdGUgcHJlc3NlZF9rZXlzOiBzdHJpbmdbXSA9IFtdO1xuXG5cdC8vIHJlY29nbml6ZSB3aGVuIGEga2V5IGlzIGRvd24gb24gdGhlIGtleWJvYXJkXG5cdHByaXZhdGUgX2tleWRvd24gPSBmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4oZG9jdW1lbnQsIFwia2V5ZG93blwiKTtcblx0cHJpdmF0ZSBfa2V5ZG93biQ6IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLl9rZXlkb3duLnBpcGUoXG5cdFx0bWFwKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuXHRcdFx0Ly8gYWRkIGtleSB0byBwcmVzc2VkIGtleXMgd2hlbiBwcmVzc2VkXG5cdFx0XHR0aGlzLnByZXNzZWRfa2V5cy5wdXNoKGV2ZW50LmtleSk7XG5cdFx0fSlcblx0KTtcblxuXHQvLyByZWNvZ25pemUgd2hlbiBhIGtleSBpcyB1cCBhZnRlciBhIGtleSB3YXMgZG93biBvbiB0aGUga2V5Ym9hcmRcblx0cHJpdmF0ZSBfa2V5dXAgPSBmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4oZG9jdW1lbnQsIFwia2V5dXBcIik7XG5cdHByaXZhdGUgX2tleXVwJDogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX2tleXVwLnBpcGUoXG5cdFx0bWFwKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuXHRcdFx0Ly8gcmVtb3ZlIGtleSBmcm9tIHByZXNzZWQga2V5cyB3aGVuIG5vdCBwcmVzc2VkIGFueW1vcmVcblx0XHRcdHRoaXMucHJlc3NlZF9rZXlzID0gdGhpcy5wcmVzc2VkX2tleXMuZmlsdGVyKChrKSA9PiBrICE9PSBldmVudC5rZXkpO1xuXHRcdH0pXG5cdCk7XG5cblx0a2V5ZG93blN1YnNjcmlwdGlvbiA9IHRoaXMuX2tleWRvd24kLnN1YnNjcmliZSgpO1xuXHRrZXl1cFN1YnNjcmlwdGlvbiA9IHRoaXMuX2tleXVwJC5zdWJzY3JpYmUoKTtcblxuXHQvLyB0aWxlIHNldHRpbmdzXG5cdHByaXZhdGUgX3pvb21lZFNpemU6IG51bWJlcjtcblx0cHJpdmF0ZSBfdGlsZVNpemU6IG51bWJlciA9IDk7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0Y29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxuXHRcdHNob3Q6IFNob3QsXG5cdFx0bGVmdDogc3RyaW5nLFxuXHRcdHJpZ2h0OiBzdHJpbmcsXG5cdFx0ZmlyZTogc3RyaW5nLFxuXHRcdHpvb206IG51bWJlclxuXHQpIHtcblx0XHQvLyBhc3NpZ24gY29udGV4dFxuXHRcdHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuXG5cdFx0Ly8gYXNzaWduIHNob3Rcblx0XHR0aGlzLl9zaG90ID0gc2hvdDtcblxuXHRcdC8vIGFzc2lnbiBwbGF5ZXIgY29udHJvbHNcblx0XHR0aGlzLl9sZWZ0ID0gbGVmdDtcblx0XHR0aGlzLl9yaWdodCA9IHJpZ2h0O1xuXHRcdHRoaXMuX2ZpcmUgPSBmaXJlO1xuXG5cdFx0Ly8gYXNzaWduIHpvb21lZCBzaXplXG5cdFx0dGhpcy5fem9vbWVkU2l6ZSA9IHpvb20gKiB0aGlzLl90aWxlU2l6ZTtcblxuXHRcdC8vIGFzc2lnbiBjb29yZGluYXRlc1xuXHRcdHRoaXMuX3kgPSBjb250ZXh0LmNhbnZhcy5oZWlnaHQgLSB0aGlzLl96b29tZWRTaXplO1xuXHRcdHRoaXMuX3ggPSAoY29udGV4dC5jYW52YXMud2lkdGggLSB0aGlzLl96b29tZWRTaXplKSAvIDI7XG5cblx0XHQvLyBhc3NpZ24gdGlsZSBzaGVldFxuXHRcdHRoaXMuX3NoZWV0LnNyYyA9IFwiLi4vaW1nL2ppLXNoZWV0LnBuZ1wiO1xuXG5cdFx0Ly8gZHJhdyBwbGF5ZXIgb24gcGFnZSBsb2FkXG5cdFx0dGhpcy5fcmVuZGVyKHRydWUpO1xuXHR9XG5cblx0cHVibGljIGhhbmRsZUlucHV0KCkge1xuXHRcdC8vIGV4ZWN1dGUgZXZlbnRzIG9mIHBsYXllciBvbiBpbnB1dFxuXHRcdGlmICh0aGlzLnByZXNzZWRfa2V5cy5pbmNsdWRlcyh0aGlzLl9sZWZ0KSkgdGhpcy5fbW92ZUxlZnQoKTtcblx0XHRpZiAodGhpcy5wcmVzc2VkX2tleXMuaW5jbHVkZXModGhpcy5fcmlnaHQpKSB0aGlzLl9tb3ZlUmlnaHQoKTtcblx0XHRpZiAodGhpcy5wcmVzc2VkX2tleXMuaW5jbHVkZXModGhpcy5fZmlyZSkpIHRoaXMuX2ZpcmVTaG90KCk7XG5cblx0XHQvLyB1cGRhdGUgcGxheWVyXG5cdFx0dGhpcy5fY2xlYXIoKTtcblx0XHR0aGlzLl9yZW5kZXIoKTtcblx0fVxuXG5cdC8vIG1vdmVzIGxlZnQgYnV0IG5vdCBvdXQgb2YgdGhlIHNjcmVlblxuXHRwcml2YXRlIF9tb3ZlTGVmdCgpIHtcblx0XHR0aGlzLl94ID0gdGhpcy5feCAtIHRoaXMuX3ZlbG9jaXR5ID49IDAgPyB0aGlzLl94IC0gdGhpcy5fdmVsb2NpdHkgOiAwO1xuXHR9XG5cblx0Ly8gbW92ZXMgcmlnaHQgYnV0IG5vdCBvdXQgb2YgdGhlIHNjcmVlblxuXHRwcml2YXRlIF9tb3ZlUmlnaHQoKSB7XG5cdFx0dGhpcy5feCA9XG5cdFx0XHR0aGlzLl94ICsgdGhpcy5fem9vbWVkU2l6ZSA8PSB0aGlzLl9jb250ZXh0LmNhbnZhcy53aWR0aFxuXHRcdFx0XHQ/IHRoaXMuX3ggKyB0aGlzLl92ZWxvY2l0eVxuXHRcdFx0XHQ6IHRoaXMuX3g7XG5cdH1cblxuXHRwcml2YXRlIF9maXJlU2hvdCgpIHtcblx0XHR0aGlzLl9zaG90LnNob290KHRoaXMuX3ggKyB0aGlzLl96b29tZWRTaXplIC8gMiwgdGhpcy5feSk7XG5cdH1cblxuXHQvLyBjbGVhciBwbGF5ZXIgb24gc2NyZWVuXG5cdHByaXZhdGUgX2NsZWFyKCkge1xuXHRcdHRoaXMuX2NvbnRleHQuY2xlYXJSZWN0KFxuXHRcdFx0dGhpcy5feCAtIHRoaXMuX3ZlbG9jaXR5LFxuXHRcdFx0dGhpcy5feSxcblx0XHRcdHRoaXMuX2NvbnRleHQuY2FudmFzLndpZHRoLFxuXHRcdFx0dGhpcy5fY29udGV4dC5jYW52YXMuaGVpZ2h0XG5cdFx0KTtcblx0fVxuXG5cdC8vIGRyYXcgcGxheWVyIG9uIHNjcmVlblxuXHRwcml2YXRlIF9yZW5kZXIob25sb2FkPzogYm9vbGVhbikge1xuXHRcdGlmIChvbmxvYWQpIHtcblx0XHRcdGNvbnN0IHRoYXQgPSB0aGlzO1xuXHRcdFx0dGhpcy5fc2hlZXQub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0aGF0Ll9jb250ZXh0LmRyYXdJbWFnZShcblx0XHRcdFx0XHR0aGF0Ll9zaGVldCxcblx0XHRcdFx0XHQwLFxuXHRcdFx0XHRcdDAsXG5cdFx0XHRcdFx0OSxcblx0XHRcdFx0XHQ5LFxuXHRcdFx0XHRcdHRoYXQuX3gsXG5cdFx0XHRcdFx0dGhhdC5feSxcblx0XHRcdFx0XHR0aGF0Ll96b29tZWRTaXplLFxuXHRcdFx0XHRcdHRoYXQuX3pvb21lZFNpemVcblx0XHRcdFx0KTtcblx0XHRcdH07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2NvbnRleHQuZHJhd0ltYWdlKFxuXHRcdFx0XHR0aGlzLl9zaGVldCxcblx0XHRcdFx0MCxcblx0XHRcdFx0MCxcblx0XHRcdFx0OSxcblx0XHRcdFx0OSxcblx0XHRcdFx0dGhpcy5feCxcblx0XHRcdFx0dGhpcy5feSxcblx0XHRcdFx0dGhpcy5fem9vbWVkU2l6ZSxcblx0XHRcdFx0dGhpcy5fem9vbWVkU2l6ZVxuXHRcdFx0KTtcblx0XHR9XG5cdH1cbn1cbiIsImV4cG9ydCBjbGFzcyBTaG90IHtcblx0Ly8gY2FudmFzIGNvbnRleHQgZm9yIGRyYXdpbmcgc2hhcGVzXG5cdHByaXZhdGUgX2NvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcblxuXHQvLyBzaG90IGNvb3JkaW5hdGVzIGFuZCB2ZWxvY2l0eVxuXHRwcml2YXRlIF94OiBudW1iZXI7XG5cdHByaXZhdGUgX3k6IG51bWJlcjtcblx0cHJpdmF0ZSBfdmVsb2NpdHk6IG51bWJlciA9IDIwO1xuXG5cdC8vIGRlZmluZXMgdGhlIHNob3QgbGVuZ3RoIGFuZCB0aGlja25lc3MgZm9yIHRoZSBkcmF3aW5nIG9mIHNob3Rcblx0cHJpdmF0ZSBfbGVuZ3RoOiBudW1iZXIgPSAxMDtcblx0cHJpdmF0ZSBfdGhpY2tuZXNzOiBudW1iZXIgPSA1O1xuXG5cdGNvbnN0cnVjdG9yKGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xuXHRcdHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuXHRcdHRoaXMuX3ggPSAwO1xuXHRcdHRoaXMuX3kgPSAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIHNob290IGlmIHRoZXJlIGlzIG5vIGFjdHVhbCBzaG9vdCBhbiB0aGUgZmllbGRcblx0ICovXG5cdHB1YmxpYyBzaG9vdChwb3NpdGlvblg6IG51bWJlciwgcG9zaXRpb25ZOiBudW1iZXIpIHtcblx0XHRpZiAodGhpcy5feSA8PSAwKSB7XG5cdFx0XHR0aGlzLl9jbGVhcigpO1xuXHRcdFx0dGhpcy5feCA9IHBvc2l0aW9uWDtcblx0XHRcdHRoaXMuX3kgPSBwb3NpdGlvblk7XG5cdFx0fVxuXHR9XG5cdC8qKlxuXHQgKiBoaXQgc2hvdWxkIGJlIGNhbGxlZCB3aGVuIGFueXRoaW5nIGlzIGhpdHRlbiBieSB0aGUgc2hvdFxuXHQgKi9cblx0cHVibGljIGhpdCgpIHtcblx0XHR0aGlzLl9jbGVhcigpO1xuXHRcdHRoaXMuX3kgPSAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIGNoZWNrcyBpZiB0aGUgc2hvb3QgaXMgaW4gdGhlIGZpZWxkXG5cdCAqIHRoYW4gaXQgY2xlYXJzIHRoZSBvbGQgc2hvb3Rcblx0ICogdGhhbiBpdCBtb3ZlcyB0aGUgc2hvb3QgdXAgYW5kIHBhaW50IGl0XG5cdCAqL1xuXHRwdWJsaWMgc2hvb3RBbmltYXRpb24oKSB7XG5cdFx0aWYgKHRoaXMuX3kgPD0gMCkge1xuXHRcdFx0dGhpcy5fY2xlYXIoKTtcblx0XHR9XG5cblx0XHR0aGlzLl9jbGVhcigpO1xuXHRcdHRoaXMuX3kgLT0gdGhpcy5fdmVsb2NpdHk7XG5cdFx0dGhpcy5fcmVuZGVyKCk7XG5cdH1cblxuXHQvKipcblx0ICogY2xlYXJzIHRoZSBjdXJyZW50IHNob290XG5cdCAqL1xuXHRwcml2YXRlIF9jbGVhcigpIHtcblx0XHR0aGlzLl9jb250ZXh0LmNsZWFyUmVjdChcblx0XHRcdHRoaXMuX3ggLSB0aGlzLl90aGlja25lc3MgLyAyLFxuXHRcdFx0dGhpcy5feSAtIHRoaXMuX2xlbmd0aCxcblx0XHRcdHRoaXMuX3RoaWNrbmVzcyArIDAuNSxcblx0XHRcdHRoaXMuX2xlbmd0aCArIDAuMVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogZHJhd3MgdGhlIHNob3Qgb24gc2NyZWVuXG5cdCAqL1xuXHRwcml2YXRlIF9yZW5kZXIoKSB7XG5cdFx0dGhpcy5fY29udGV4dC5maWxsU3R5bGUgPSBcInJlZFwiO1xuXHRcdHRoaXMuX2NvbnRleHQuZmlsbFJlY3QoXG5cdFx0XHR0aGlzLl94IC0gdGhpcy5fdGhpY2tuZXNzIC8gMixcblx0XHRcdHRoaXMuX3kgLSB0aGlzLl9sZW5ndGgsXG5cdFx0XHR0aGlzLl90aGlja25lc3MsXG5cdFx0XHR0aGlzLl9sZW5ndGhcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIGdldCB4IHBvc2l0aW9uIG9mIHRoZSBzaG90XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGdldFgoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy5feDtcblx0fVxuXHQvKipcblx0ICogZ2V0IHkgcG9zaXRpb24gb2YgdGhlIHNob3Rcblx0ICovXG5cdHB1YmxpYyBnZXQgZ2V0WSgpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLl95O1xuXHR9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVFcnJvckNsYXNzIH0gZnJvbSAnLi9jcmVhdGVFcnJvckNsYXNzJztcbmV4cG9ydCB2YXIgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IgPSBjcmVhdGVFcnJvckNsYXNzKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JJbXBsKCkge1xuICAgICAgICBfc3VwZXIodGhpcyk7XG4gICAgICAgIHRoaXMubmFtZSA9ICdPYmplY3RVbnN1YnNjcmliZWRFcnJvcic7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICdvYmplY3QgdW5zdWJzY3JpYmVkJztcbiAgICB9O1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYmplY3RVbnN1YnNjcmliZWRFcnJvci5qcy5tYXAiLCJpbXBvcnQgeyBfX2V4dGVuZHMsIF9fdmFsdWVzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgRU1QVFlfU1VCU0NSSVBUSU9OIH0gZnJvbSAnLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IgfSBmcm9tICcuL3V0aWwvT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3InO1xuaW1wb3J0IHsgYXJyUmVtb3ZlIH0gZnJvbSAnLi91dGlsL2FyclJlbW92ZSc7XG52YXIgU3ViamVjdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN1YmplY3QsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU3ViamVjdCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIF90aGlzLm9ic2VydmVycyA9IFtdO1xuICAgICAgICBfdGhpcy5pc1N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMuaGFzRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMudGhyb3duRXJyb3IgPSBudWxsO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFN1YmplY3QucHJvdG90eXBlLmxpZnQgPSBmdW5jdGlvbiAob3BlcmF0b3IpIHtcbiAgICAgICAgdmFyIHN1YmplY3QgPSBuZXcgQW5vbnltb3VzU3ViamVjdCh0aGlzLCB0aGlzKTtcbiAgICAgICAgc3ViamVjdC5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICByZXR1cm4gc3ViamVjdDtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLl90aHJvd0lmQ2xvc2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBlXzEsIF9hO1xuICAgICAgICB0aGlzLl90aHJvd0lmQ2xvc2VkKCk7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHZhciBjb3B5ID0gdGhpcy5vYnNlcnZlcnMuc2xpY2UoKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgY29weV8xID0gX192YWx1ZXMoY29weSksIGNvcHlfMV8xID0gY29weV8xLm5leHQoKTsgIWNvcHlfMV8xLmRvbmU7IGNvcHlfMV8xID0gY29weV8xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBjb3B5XzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3B5XzFfMSAmJiAhY29weV8xXzEuZG9uZSAmJiAoX2EgPSBjb3B5XzEucmV0dXJuKSkgX2EuY2FsbChjb3B5XzEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICB0aGlzLl90aHJvd0lmQ2xvc2VkKCk7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzRXJyb3IgPSB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnRocm93bkVycm9yID0gZXJyO1xuICAgICAgICAgICAgdmFyIG9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJzO1xuICAgICAgICAgICAgd2hpbGUgKG9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlcnMuc2hpZnQoKS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdGhyb3dJZkNsb3NlZCgpO1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnM7XG4gICAgICAgICAgICB3aGlsZSAob2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG9ic2VydmVycy5zaGlmdCgpLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMgPSBudWxsO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX3RyeVN1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHRoaXMuX3Rocm93SWZDbG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuX3RyeVN1YnNjcmliZS5jYWxsKHRoaXMsIHN1YnNjcmliZXIpO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHRoaXMuX3Rocm93SWZDbG9zZWQoKTtcbiAgICAgICAgdGhpcy5fY2hlY2tGaW5hbGl6ZWRTdGF0dXNlcyhzdWJzY3JpYmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lubmVyU3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX2lubmVyU3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgaGFzRXJyb3IgPSBfYS5oYXNFcnJvciwgaXNTdG9wcGVkID0gX2EuaXNTdG9wcGVkLCBvYnNlcnZlcnMgPSBfYS5vYnNlcnZlcnM7XG4gICAgICAgIHJldHVybiBoYXNFcnJvciB8fCBpc1N0b3BwZWRcbiAgICAgICAgICAgID8gRU1QVFlfU1VCU0NSSVBUSU9OXG4gICAgICAgICAgICA6IChvYnNlcnZlcnMucHVzaChzdWJzY3JpYmVyKSwgbmV3IFN1YnNjcmlwdGlvbihmdW5jdGlvbiAoKSB7IHJldHVybiBhcnJSZW1vdmUob2JzZXJ2ZXJzLCBzdWJzY3JpYmVyKTsgfSkpO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX2NoZWNrRmluYWxpemVkU3RhdHVzZXMgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBoYXNFcnJvciA9IF9hLmhhc0Vycm9yLCB0aHJvd25FcnJvciA9IF9hLnRocm93bkVycm9yLCBpc1N0b3BwZWQgPSBfYS5pc1N0b3BwZWQ7XG4gICAgICAgIGlmIChoYXNFcnJvcikge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcih0aHJvd25FcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLmFzT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgpO1xuICAgICAgICBvYnNlcnZhYmxlLnNvdXJjZSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH07XG4gICAgU3ViamVjdC5jcmVhdGUgPSBmdW5jdGlvbiAoZGVzdGluYXRpb24sIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gbmV3IEFub255bW91c1N1YmplY3QoZGVzdGluYXRpb24sIHNvdXJjZSk7XG4gICAgfTtcbiAgICByZXR1cm4gU3ViamVjdDtcbn0oT2JzZXJ2YWJsZSkpO1xuZXhwb3J0IHsgU3ViamVjdCB9O1xudmFyIEFub255bW91c1N1YmplY3QgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBbm9ueW1vdXNTdWJqZWN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFub255bW91c1N1YmplY3QoZGVzdGluYXRpb24sIHNvdXJjZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xuICAgICAgICBfdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAoX2IgPSAoX2EgPSB0aGlzLmRlc3RpbmF0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmV4dCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EsIHZhbHVlKTtcbiAgICB9O1xuICAgIEFub255bW91c1N1YmplY3QucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAoX2IgPSAoX2EgPSB0aGlzLmRlc3RpbmF0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZXJyb3IpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hLCBlcnIpO1xuICAgIH07XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIChfYiA9IChfYSA9IHRoaXMuZGVzdGluYXRpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb21wbGV0ZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EpO1xuICAgIH07XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHJldHVybiAoX2IgPSAoX2EgPSB0aGlzLnNvdXJjZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnN1YnNjcmliZShzdWJzY3JpYmVyKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogRU1QVFlfU1VCU0NSSVBUSU9OO1xuICAgIH07XG4gICAgcmV0dXJuIEFub255bW91c1N1YmplY3Q7XG59KFN1YmplY3QpKTtcbmV4cG9ydCB7IEFub255bW91c1N1YmplY3QgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YmplY3QuanMubWFwIiwiaW1wb3J0IHsgRW5lbXkgfSBmcm9tIFwiLi9lbmVteVwiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBFbmVteUhhbmRsZXIgfSBmcm9tIFwiLi9lbmVteUhhbmRsZXJcIjtcbmltcG9ydCB7IFNob3QgfSBmcm9tIFwiLi9zaG90XCI7XG5pbXBvcnQgeyBHYW1lU2V0dGluZ3MgfSBmcm9tIFwiLi9nYW1lLXNldHRpbmdzXCI7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tIFwicnhqc1wiO1xuXG5jb25zdCBzdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgyMyk7XG5jb25zdCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gPEhUTUxDYW52YXNFbGVtZW50Pihcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqa29uc0ludmFkZXJcIilcbik7XG5jb25zdCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBjYW52YXMuZ2V0Q29udGV4dChcblx0XCIyZFwiXG4pIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbmNvbnN0IGVuZW15SGFuZGxlcjogRW5lbXlIYW5kbGVyID0gbmV3IEVuZW15SGFuZGxlcigpO1xuY29uc3Qgc2V0dGluZ3M6IEdhbWVTZXR0aW5ncyA9IG5ldyBHYW1lU2V0dGluZ3MoY2FudmFzKTtcbmNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cbnN1YmplY3Quc3Vic2NyaWJlKGNvbnNvbGUubG9nKTtcbmxldCBzaG90cyA9IG5ldyBBcnJheSgpO1xubGV0IHBsYXllcnMgPSBuZXcgQXJyYXkoKTtcbmxldCBnYW1lU3RhcnRlZDogYm9vbGVhbiA9IGZhbHNlO1xubGV0IGFjdHVhbFNjb3JlOiBudW1iZXIgPSAwO1xubGV0IHNjb3JlRWxlbWVudDogSFRNTE91dHB1dEVsZW1lbnQgPSA8SFRNTE91dHB1dEVsZW1lbnQ+KFxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjb3JlXCIpXG4pO1xubGV0IGFuaW1hdGlvbjogbnVtYmVyO1xubGV0IGFuaW1hdGlvblNwZWVkOiBudW1iZXIgPSAxIC8gNjA7XG4vLyAhIFNob3VsZCBub3QgYmUsIGJ1dCBkdW1teSBlbmVteSBmb3Igem9vbSBhbmQgdGlsZSBzaXplLCB0aWxsIGdhbWUgc2V0dGluZ3MgYW5kIHRpbGUgY29uZmlnIGlzIGNyZWF0ZWQuXG5jb25zdCBwbGF5ZXIgPSBuZXdQbGF5ZXIoXCJhXCIsIFwiZFwiLCBcIiBcIik7XG5cbmNvbnN0IGVuZW15OiBFbmVteSA9IG5ldyBFbmVteShjb250ZXh0LCBzaG90cywgZW5lbXlIYW5kbGVyLCAxLCAwLCAwKTtcbmNvbnN0IHNwYWNlQmV0d2VlbiA9IHNldHRpbmdzLnpvb20gKiBlbmVteS50aWxlV2lkdGg7XG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChrZXlib2FyZCkgPT4ge1xuXHRcdHN3aXRjaCAoa2V5Ym9hcmQua2V5KSB7XG5cdFx0XHRjYXNlIFwiclwiOlxuXHRcdFx0XHRpZiAoZ2FtZVN0YXJ0ZWQgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0Z2FtZVN0YXJ0ZWQgPSB0cnVlO1xuXHRcdFx0XHRcdGFuaW1hdGUoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpbml0KCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGdhbWVTdGFydGVkID0gZmFsc2U7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fSk7XG59XG5mb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcblx0ZW5lbXlIYW5kbGVyLmFkZEVuZW15KFxuXHRcdG5ldyBFbmVteShjb250ZXh0LCBzaG90cywgZW5lbXlIYW5kbGVyLCBzZXR0aW5ncy56b29tLCBpICogc3BhY2VCZXR3ZWVuLCAwKVxuXHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2FtZU92ZXIoKSB7fVxuXG5mdW5jdGlvbiBhbmltYXRlKCk6IHZvaWQge1xuXHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRwbGF5ZXIuaGFuZGxlSW5wdXQoKTtcblx0XHRlbmVteUhhbmRsZXIubW92ZUVuZW1pZXMoKTtcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IHNob3RzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRzaG90c1tqXS5zaG9vdEFuaW1hdGlvbigpO1xuXHRcdH1cblx0XHRhbmltYXRpb24gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG5cdH0sIGFuaW1hdGlvblNwZWVkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjb3JlKCkge1xuXHRhY3R1YWxTY29yZSsrO1xuXHQvLyBzY29yZUVsZW1lbnQudmFsdWUgPSBhY3R1YWxTY29yZS50b1N0cmluZygpO1xufVxuXG5mdW5jdGlvbiBuZXdQbGF5ZXIobGVmdDogc3RyaW5nLCByaWdodDogc3RyaW5nLCBmaXJlOiBzdHJpbmcpOiBQbGF5ZXIge1xuXHRjb25zdCBzaG90OiBTaG90ID0gbmV3IFNob3QoY29udGV4dCk7XG5cdGNvbnN0IHBsYXllcjogUGxheWVyID0gbmV3IFBsYXllcihcblx0XHRjb250ZXh0LFxuXHRcdHNob3QsXG5cdFx0bGVmdCxcblx0XHRyaWdodCxcblx0XHRmaXJlLFxuXHRcdHNldHRpbmdzLnpvb21cblx0KTtcblxuXHRzaG90cy5wdXNoKHNob3QpO1xuXHRwbGF5ZXJzLnB1c2gocGxheWVyKTtcblxuXHRyZXR1cm4gcGxheWVyO1xufVxuXG5mdW5jdGlvbiBzdG9wKCkge1xuXHRjb25zb2xlLmxvZyhcInN0b3BcIik7XG5cblx0Y2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uKTtcbn1cblxuaW5pdCgpO1xuIiwiaW1wb3J0IHsgX19leHRlbmRzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAnLi9TdWJqZWN0JztcbnZhciBCZWhhdmlvclN1YmplY3QgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCZWhhdmlvclN1YmplY3QsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQmVoYXZpb3JTdWJqZWN0KF92YWx1ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5fdmFsdWUgPSBfdmFsdWU7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJlaGF2aW9yU3ViamVjdC5wcm90b3R5cGUsIFwidmFsdWVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFZhbHVlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBCZWhhdmlvclN1YmplY3QucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gX3N1cGVyLnByb3RvdHlwZS5fc3Vic2NyaWJlLmNhbGwodGhpcywgc3Vic2NyaWJlcik7XG4gICAgICAgICFzdWJzY3JpcHRpb24uY2xvc2VkICYmIHN1YnNjcmliZXIubmV4dCh0aGlzLl92YWx1ZSk7XG4gICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgfTtcbiAgICBCZWhhdmlvclN1YmplY3QucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBoYXNFcnJvciA9IF9hLmhhc0Vycm9yLCB0aHJvd25FcnJvciA9IF9hLnRocm93bkVycm9yLCBfdmFsdWUgPSBfYS5fdmFsdWU7XG4gICAgICAgIGlmIChoYXNFcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgdGhyb3duRXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdGhyb3dJZkNsb3NlZCgpO1xuICAgICAgICByZXR1cm4gX3ZhbHVlO1xuICAgIH07XG4gICAgQmVoYXZpb3JTdWJqZWN0LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUubmV4dC5jYWxsKHRoaXMsICh0aGlzLl92YWx1ZSA9IHZhbHVlKSk7XG4gICAgfTtcbiAgICByZXR1cm4gQmVoYXZpb3JTdWJqZWN0O1xufShTdWJqZWN0KSk7XG5leHBvcnQgeyBCZWhhdmlvclN1YmplY3QgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJlaGF2aW9yU3ViamVjdC5qcy5tYXAiLCJpbXBvcnQgeyBFbmVteSB9IGZyb20gXCIuL2VuZW15XCI7XG5leHBvcnQgY2xhc3MgRW5lbXlIYW5kbGVyIHtcblx0cHJpdmF0ZSBlbmVtaWVzOiBFbmVteVtdO1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmVuZW1pZXMgPSBbXTtcblx0fVxuXG5cdGFkZEVuZW15KGVuZW15OiBFbmVteSkge1xuXHRcdHRoaXMuZW5lbWllcy5wdXNoKGVuZW15KTtcblx0fVxuXG5cdGFkZEVuZW1pZXMoZW5lbWllczogRW5lbXlbXSkge1xuXHRcdHRoaXMuZW5lbWllcy5jb25jYXQoZW5lbWllcyk7XG5cdH1cblxuXHRyZW1vdmVFbmVteShlbmVteTogRW5lbXkpIHtcblx0XHR0aGlzLmVuZW1pZXMuc3BsaWNlKHRoaXMuZW5lbWllcy5pbmRleE9mKGVuZW15KSwgMSk7XG5cdH1cblxuXHRtb3ZlRW5lbWllcygpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZW5lbWllcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGhpcy5lbmVtaWVzW2ldLm1vdmVFbmVteSgpO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBnZXQgZ2V0RW5lbWllc1koKTogbnVtYmVyW10ge1xuXHRcdGNvbnN0IHlMaXN0OiBudW1iZXJbXSA9IFtdO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5lbmVtaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR5TGlzdC5wdXNoKHRoaXMuZW5lbWllc1tpXS55KTtcblx0XHR9XG5cdFx0cmV0dXJuIHlMaXN0O1xuXHR9XG59XG4iLCJleHBvcnQgY2xhc3MgR2FtZVNldHRpbmdzIHtcbiAgcHJpdmF0ZSBfem9vbTogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSBfY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgcHJpdmF0ZSBzaXplOiBudW1iZXIgPSAwO1xuICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgdGhpcy5fY2FudmFzID0gY2FudmFzO1xuICAgIHRoaXMucmVzaXplQ2FudmFzKCk7XG4gICAgXG4gICAgLy8gV2Via2l0L0JsaW5rIHdpbGwgZmlyZSB0aGlzIG9uIGxvYWQsIGJ1dCBHZWNrbyBkb2Vzbid0LlxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICAgIHRoaXMucmVzaXplQ2FudmFzKClcbiAgICB9KTtcbiAgfVxuICBcbiAgcHJpdmF0ZSByZXNpemVDYW52YXMoKSB7XG4gICAgLy8gcmVzaXplIGNhbnZhcyBpZiB0aGUgd2luZG93IHNpemUgcmVhY2hlZCBhIHNwZWNpZmljIHNpemVcbiAgICAgIGlmIChpbm5lckhlaWdodCA8PSA0NTApIHtcbiAgICAgICAgdGhpcy56b29tID0gMTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlubmVySGVpZ2h0IDw9IDY5MCB8fCBpbm5lcldpZHRoIDw9IDY3NSApIHtcbiAgICAgICAgdGhpcy56b29tID0gMjtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlubmVySGVpZ2h0IDw9IDkxNSB8fCBpbm5lcldpZHRoIDw9IDkwMCkge1xuICAgICAgICB0aGlzLnpvb20gPSAzO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuem9vbSA9IDQ7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2l6ZSA9IDIyNSAqIHRoaXMuem9vbTtcbiAgICAgICAgLy8gU2V0IGNhbnZhcyBoZWlnaHQgYW5kIHdpdGggaW4gSlMsIGJlY2F1c2Ugd2l0aCBhbmQgaGVpZ2h0IHNldCBpbiBDU1MgZGlzdG9ydCBkcmF3biBzaGFwZXNcbiAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IHRoaXMuc2l6ZTtcbiAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSB0aGlzLnNpemU7XG4gIH07XG5cbiAgcHVibGljIHNldCB6b29tKHpvb206IG51bWJlcikge1xuICAgIHRoaXMuX3pvb20gPSB6b29tO1xuICB9XG5cbiAgcHVibGljIGdldCB6b29tKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3pvb207XG4gIH1cbiAgXG59Il0sInNvdXJjZVJvb3QiOiIifQ==
