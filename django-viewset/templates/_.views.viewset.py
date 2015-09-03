# -*- coding: UTF-8 -*-
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

class <%= classifiedName %>ViewSet(viewsets.ViewSet):
    """
    TODO: describe it here
    --
    See also
      http://www.django-rest-framework.org/api-guide/viewsets/
      http://www.django-rest-framework.org/api-guide/permissions/
    """
    lookup_field = 'pk'
    permission_classes = (IsAuthenticatedOrReadOnly,)
    <% if(addList){ %>

    def list(self, request):
        raise NotImplementedError<% } %><% if(addRetrieve){ %>

    def retrieve(self, request, pk):
        raise NotImplementedError<% } %><% if(addCreate){ %>

    def create(self, request, pk):
        raise NotImplementedError<% } %><% if(addUpdate){ %>

    def update(self, request, pk):
        raise NotImplementedError<% } %><% if(addDestroy){ %>

    def destroy(self, request, pk):
        raise NotImplementedError<% } %>
