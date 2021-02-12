/** *** */ ;(function () {
  // webpackBootstrap
  /** *** */

  // The require scope
  /** *** */ /** *** */ const __webpack_require__ = {} /* webpack/runtime/global */
  /** *** */
  /** ********************************************************************* */
  /** *** */ /** *** */ !(function () {
    /** *** */ __webpack_require__.g = (function () {
      /** *** */ if (typeof globalThis === 'object') return globalThis
      /** *** */ try {
        /** *** */ return this || new Function('return this')()
        /** *** */
      } catch (e) {
        /** *** */ if (typeof window === 'object') return window
        /** *** */
      }
      /** *** */
    })()
    /** *** */
  })() /* webpack/runtime/publicPath */
  /** *** */
  /** *** */ /** *** */ !(function () {
    /** *** */ let scriptUrl
    /** *** */ if (__webpack_require__.g.importScripts)
      scriptUrl = `${__webpack_require__.g.location}`
    /** *** */ const { document } = __webpack_require__.g
    /** *** */ if (!scriptUrl && document) {
      /** *** */ if (document.currentScript) /** *** */ scriptUrl = document.currentScript.src
      /** *** */ if (!scriptUrl) {
        /** *** */ const scripts = document.getElementsByTagName('script')
        /** *** */ if (scripts.length) scriptUrl = scripts[scripts.length - 1].src
        /** *** */
      }
      /** *** */
    } // When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration // or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
    /** *** */ /** *** */ /** *** */ if (!scriptUrl)
      throw new Error('Automatic publicPath is not supported in this browser')
    /** *** */ scriptUrl = scriptUrl
      .replace(/#.*$/, '')
      .replace(/\?.*$/, '')
      .replace(/\/[^\/]+$/, '/')
    /** *** */ __webpack_require__.p = scriptUrl
    /** *** */
  })()
  /** *** */
  /** ********************************************************************* */
  /* unused harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = `${__webpack_require__.p}c56602781489f988905e3068a960ef47.js`
  /** *** */
})()
