# Finansys

## Dependencies/Install:

```
  npm i jquery --save
  npm i bootstrap --save
  npm i angular-imask --save
  npm i currency-formatter --save
  npm i moment --save
  npm i toastr --save
  npm i primeng --save
  npm i primeicons --save
  npm i angular-in-memory-web-api
  npm i chart.js --save
```

## Dependencies/Imports:

File: angular.json

```
			"styles": [
              "src/styles.css",
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "node_modules/toastr/build/toastr.min.css",
              "node_modules/primeicons/primeicons.css",
              "node_modules/primeng/resources/themes/fluent-light/theme.css",
              "node_modules/primeng/resources/primeng.min.css"
            ],
            "scripts": [
              "node_modules/jquery/dist/jquery.min.js",
              "node_modules/bootstrap/dist/js/bootstrap.min.js",
              "node_modules/chart.js/dist/chart.bundle.js"
            ]
```

## Component pages/categories command

```
1 - create module/routing categories => ng g m pages/categories --routing
2 - create componet caterory-list => ng g c pages/categories/caterory-list
3 - create componet caterory-form => ng g c pages/categories/caterory-form
```
