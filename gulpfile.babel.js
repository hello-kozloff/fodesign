"use strict";

const args = require("yargs").argv;
const fs = require("fs");

import gulp from "gulp";
import pug from "gulp-pug";
import sass from "gulp-sass";
import contact from "gulp-concat";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import smartGrid from "smart-grid";
import imagemin from "gulp-imagemin";

const buildingStyles = [
  "build:blocks-style",
  "build:main-style",
  "build:vendor-style",
  "build:site-style",
  "bundle:style"
];

const buildingScripts = [
  "build:blocks-script",
  "build:vendors-script",
  "bundle:script"
];

/**
 * This task build pug pages
 */
gulp.task("build-pages", function () {
  return gulp.src("src/pages/*.pug")
    .pipe(pug({
      basedir: __dirname,
      pretty: true,
      cache: false
    }))
    .pipe(gulp.dest("static"))
});

/**
 * This task create block (https://ru.bem.info)
 * Example: gulp task --block my-block
 */
gulp.task("create", function () {
  const blockName = args.block;

  if ((typeof blockName !== "string") || blockName.length <= 0) {
    return console.log("[Invalid parameter] Block name is string. Example: create --block example-block");
  }

  const fileTypes = [
    "sass",
    "pug",
    "js"
  ];

  fs.mkdirSync(`src/blocks/${blockName}`);

  fileTypes.forEach(file => {
    let content = '';

    if (file === "sass" || file === "pug") {
      content = `.${blockName}`;
    } else if (file === 'js') {
      content = `$(document).ready(() => { /* ${blockName} */ });`;
    }

    fs.writeFile(`src/blocks/${blockName}/${blockName}.${file}`, content, (error) => {
      if (error) throw error;
    });
  });
});

/**
 * This task build blocks style
 */
gulp.task("build:blocks-style", () => {
  const cleanCssSettings = {
    level: {
      1: { specialComments: 0 }
    }
  };

  return gulp.src("src/blocks/**/*.sass")
    .pipe(sass().on("error", sass.logError))
    .pipe(contact("blocks.css"))
    .pipe(gulp.dest("static/css"))
    .pipe(autoprefixer(["last 15 versions"]))
    .pipe(cleanCss(cleanCssSettings))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("static/css"))
});

/**
 * This task build main style
 */
gulp.task("build:main-style", () => {
  const cleanCssSettings = {
    level: {
      1: { specialComments: 0 }
    }
  };

  return gulp.src("src/sass/main.sass")
    .pipe(sass().on("error", sass.logError))
    .pipe(contact("main.css"))
    .pipe(gulp.dest("static/css"))
    .pipe(autoprefixer(["last 15 versions"]))
    .pipe(cleanCss(cleanCssSettings))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("static/css"))
});

/**
 * This task build vendor style
 */
gulp.task("build:vendor-style", () => {
  const cleanCssSettings = {
    level: {
      1: { specialComments: 0 }
    }
  };

  return gulp.src([
    "node_modules/normalize.css/normalize.css",
    "node_modules/flickity-fade/flickity-fade.css",
    "node_modules/ion-rangeslider/css/ion.rangeSlider.css"
  ])
    .pipe(contact("vendor.css"))
    .pipe(gulp.dest("static/css"))
    .pipe(autoprefixer(["last 15 versions"]))
    .pipe(cleanCss(cleanCssSettings))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("static/css"))
});

/**
 * This task build site styles
 */
gulp.task("build:site-style", () => {
  const cleanCssSettings = {
    level: {
      1: { specialComments: 0 }
    }
  };

  return gulp.src([
    "static/css/main.css",
    "static/css/blocks.css"
  ])
    .pipe(contact("styles.css"))
    .pipe(gulp.dest("static/css"))
    .pipe(autoprefixer(["last 15 versions"]))
    .pipe(cleanCss(cleanCssSettings))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("static/css"))
});

/**
 * This task build blocks scripts
 */
gulp.task("build:blocks-script", () => {
  const babelSettings = {
    presets: ["@babel/preset-env"]
  };

  return gulp.src("src/blocks/**/*.js")
    .pipe(babel(babelSettings))
    .pipe(contact("blocks.js"))
    .pipe(gulp.dest("static/js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("static/js"))
});

/**
 * This task build vendors script
 */
gulp.task("build:vendors-script", () => {
  return gulp.src([
    "node_modules/jquery/dist/jquery.js",
    "node_modules/lazysizes/lazysizes.min.js",
    "node_modules/lazysizes/plugins/bgset/ls.bgset.min.js",
    "node_modules/flickity/dist/flickity.pkgd.js",
    "node_modules/flickity-fade/flickity-fade.js",
    "node_modules/ion-rangeslider/js/ion.rangeSlider.js"
  ])
    .pipe(contact("vendor.js"))
    .pipe(gulp.dest("static/js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("static/js"))
});

/**
 * This task build bundle style
 */
gulp.task("bundle:style", () => {
  const cleanCssSettings = {
    level: {
      1: { specialComments: 0 }
    }
  };

  return gulp.src([
    "static/css/vendor.css",
    "static/css/styles.css"
  ])
    .pipe(contact("bundle.css"))
    .pipe(gulp.dest("static/css"))
    .pipe(autoprefixer(["last 15 versions"]))
    .pipe(cleanCss(cleanCssSettings))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("static/css"))
});

/**
 * This task build bundle script
 */
gulp.task("bundle:script", () => {
  return gulp.src([
    "static/js/vendor.js",
    "static/js/blocks.js"
  ])
    .pipe(contact("bundle.js"))
    .pipe(gulp.dest("static/js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("static/js"))
});

/**
 * This task build fonts
 */
gulp.task("build:fonts", () => {
  return gulp.src("src/fonts/**/*")
    .pipe(gulp.dest("static/fonts"));
});

/**
 * This task build smart-grid
 */
gulp.task("build:smart-grid", () => {
  const smart_grid_settings = {
    outputStyle: "sass",
    columns: 12,
    offset: "30px",
    mobileFirst: false,
    container: {
      maxWidth: "1760px",
      fields: "20px"
    },
    breakPoints: {
      largeDesktop: {
        width: '1760px'
      },
      desktop: {
        width: '1160px'
      },
      mediumDesktop: {
        width: '1200px'
      },
      largeTablet: {
        width: '992px'
      },
      smallTablet: {
        width: '768px'
      },
      phone: {
        width: '576px'
      },
      smallPhone: {
        width: '100%'
      }
    }
  };

  smartGrid("src/sass", smart_grid_settings);
});

/**
 * This task build images
 */
gulp.task("build:images", () => {
  return gulp.src("src/images/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("static/images"));
});

/**
 * This task build production
 */
gulp.task("build:production", () => {
  gulp.src("static/*.html").pipe(gulp.dest("build"));
  gulp.src("static/css/bundle.min.css").pipe(gulp.dest("build/css"));
  gulp.src("static/js/bundle.min.js").pipe(gulp.dest("build/js"));
  gulp.src("static/images/**/*").pipe(gulp.dest("build/images"));
  gulp.src("static/fonts/**/*").pipe(gulp.dest("build/fonts"));
});

/**
 * This task watch in files
 */
gulp.task("watch", () => {
  gulp.watch("src/blocks/**/*.js", gulp.series(buildingScripts));
  gulp.watch("src/blocks/**/*.sass", gulp.series(buildingStyles));
  gulp.watch("src/blocks/**/*.scss", gulp.series(buildingStyles));
  gulp.watch("src/blocks/**/*.pug", gulp.series("build-pages"));
  gulp.watch("src/sass/**/*.sass", gulp.series(buildingStyles));
  gulp.watch("src/pages/**/*.pug", gulp.series("build-pages"));
  // gulp.watch("src/images/**/*", gulp.series("build:images"));
  gulp.watch("src/fonts/**/*", gulp.series("build:fonts"));
});

gulp.task("default", gulp.series("build-pages", "build:fonts", ...buildingStyles, ...buildingScripts, "watch"));
