# -*- coding: UTF-8 -*-
from rest_framework import views, status
from rest_framework.response import Response

class <%= classifiedName %>View(views.APIView):<% if (!addGet && !addPost && !addPut && !addDelete){ %>
    pass<% } %><% if(addGet){ %>

    def get(self, request):
        raise NotImplementedError<% } %><% if(addPost){ %>

    def post(self, request):
        raise NotImplementedError<% } %><% if(addPut){ %>

    def put(self, request):
        raise NotImplementedError<% } %><% if(addDelete){ %>

    def delete(self, request):
        raise NotImplementedError<% } %>
