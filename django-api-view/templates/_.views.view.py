# -*- coding: UTF-8 -*-
import logging
from rest_framework import views, status
from rest_framework.response import Response

logger = logging.getLogger(__name__)

class <%= classifiedName %>View(views.APIView):<% if (!addGet && !addPost && !addPut && !addDelete){ %>
    pass<% } %><% if(addGet){ %>

    def get(self, request):
        raise NotImplementedError<% } %><% if(addPost){ %>

    def post(self, request):
        raise NotImplementedError<% } %><% if(addPut){ %>

    def put(self, request, pk):
        raise NotImplementedError<% } %><% if(addDelete){ %>

    def delete(self, request, pk):
        raise NotImplementedError<% } %>
