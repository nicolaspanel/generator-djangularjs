Scaffolding tools for __[DjangularJS](https://github.com/nicolaspanel/djangularjs)__


[![Build Status](https://travis-ci.org/nicolaspanel/generator-djangularjs.png)](https://travis-ci.org/nicolaspanel/generator-djangularjs)

__STATUS__: under active development


## Getting Started

Before you begin make sure you have the [yo scaffolding tool](http://yeoman.io/generators/) installed (as it is part of the Yeoman tool set you might have installed it before). To globally install *yo* you will need to use npm:


```
$ npm install -g yo
```


Once you have *yo* installed, you will need to install the DjangularJS generator as well:


```
$ npm install -g generator-djangularjs
```

## Generators

Available generators:

* [djangularjs](#application-generator) -- OK
* [djangularjs:angular-module](#angularjs-module-sub-generator) -- OK
* [djangularjs:angular-route](#angularjs-route-sub-generator) -- OK
* [djangularjs:angular-controller](#angularjs-controller-sub-generator) -- OK
* [djangularjs:angular-service](#angularjs-service-sub-generator) -- OK
* [djangularjs:angular-directive](#angularjs-directive-sub-generator) -- OK
* [djangularjs:angular-filter](#angularjs-filter-sub-generator) -- OK
* [djangularjs:angular-modal](#angularjs-modal-sub-generator) -- OK


**Note: Generators are to be run from the root directory of your app.**


## Application Generator (TODO)

The application generator will help you create a fresh new application in your working folder. To create your application, navigate to a new project folder, and then use *yo* to generate your application:


```
$ mkdir <project-name> && cd <project-name>
$ yo djangularjs
```


## AngularJS Sub-Generators

### AngularJS Module Sub-Generator


```
$ yo djangularjs:angular-module <module-name>
```

The sub-generator will ask for more information about your folder structure, and will create the empty new AngularJS module. Now, to fill that new module with your business logic, we provided you with several AngularJS entities sub-generators.



### AngularJS Route Sub-Generator

The AngularJS route sub-generator will help you create a view, controller and a proper route in your **public/core/core.module.js** file. 

Creating a new AngularJS route will involve executing this command:


```
$ yo djangularjs:angular-route <route-name>
```

__Note__: ui-router take care of the binding between the view and the controller.


### AngularJS Controller Sub-Generator

The AngularJS Controller sub-generator will create a new AngularJS controller in the specified module's **controllers** folder. 

To create a new AngularJS controller run *yo* again by using this command:


```
$ yo djangularjs:angular-controller <controller-name>
```


### AngularJS Modal Sub-Generator

The AngularJS Modal sub-generator will create a new AngularJS modal in the specified module's **modals** folder.
 
 To create a new AngularJS modal run *yo* again by using this command:


```
$ yo djangularjs:angular-modal <modal-name>
```


### AngularJS Service Sub-Generator

The AngularJS service sub-generator will create a new AngularJS service in the specified module's **services** folder. 

To create a new AngularJS service you will need to execute this command:


```
$ yo djangularjs:angular-service <service-name>
```


### AngularJS Directive Sub-Generator

The AngularJS directive sub-generator will create a new AngularJS directive in the specified module's **directives** folder. 

Creating a new AngularJS directive should already look familiar:

```
$ yo djangularjs:angular-directive <directive-name>
```


### AngularJS Filter Sub-Generator

The AngularJS filter sub-generator will create a new AngularJS filter in a specified module's **filters** folder. 

```
$ yo djangularjs:angular-filter <filter-name>
```


## Django Sub-Generators

### Django Module Sub-Generator

```
$ yo djangularjs:django-module <module-name>
```


### Django Template Tag Sub-Generator

```
$ yo djangularjs:django-templatetag <templatetag-name>
```

See [Django template tags](https://docs.djangoproject.com/en/1.8/howto/custom-template-tags/#writing-custom-template-tags)


### Django Filter Sub-Generator

```
$ yo djangularjs:django-filter <filter-name>
```

See [Django filters](https://docs.djangoproject.com/en/1.8/howto/custom-template-tags/#writing-custom-template-filters)


### Django APIView generator

```
$ yo djangularjs:django-api-view <api-view-name>
```

See [Django Rest Framework APIView](http://www.django-rest-framework.org/api-guide/views/) for information


### Django ViewSet generator

```
$ yo djangularjs:django-viewset <viewset-name>
```

See [Django Rest Framework ViewSet](http://www.django-rest-framework.org/api-guide/viewsets/) for more information
 
 
## Credits

Inspired from [MEAN.JS](http://meanjs.org/)


# License

The MIT License (MIT)

Copyright (c) 2015 Nicolas Panel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

