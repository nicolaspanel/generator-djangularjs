.state('<%= slugifiedName %>', {
                url: '/<%= slugifiedRoutePath %>',
                templateUrl: staticPath('<%= slugifiedModuleName %>/views/<%= slugifiedModuleName %>.<%= slugifiedViewName %>.view.html'),
                controller: '<%= classifiedControllerName %>Controller as ctrl',
                resolve: {
                    // Optional: inject stuffs into <%= classifiedControllerName %>Controller from here
                }
            })
            /* leave me here */