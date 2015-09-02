# -*- coding: UTF-8 -*-
from rest_framework import status
from djangular.tests import APITestCase

class Test<%= classifiedName %>View(APITestCase):<% if(!addGet && !addPost && !addPut && !addDelete){ %>
    pass<% } %><% if(addGet){ %>

    def test_get(self):
        self.http_get('/<% slugifiedName %>/',
                      user=None,
                      expected_status=status.HTTP_200_OK)<% } %><% if(addPost){ %>

    def test_post(self):
        self.http_post('/<%= slugifiedName %>/',
                       user=None,
                       data={},
                       expected_status=status.status.HTTP_201_CREATED)<% } %><% if(addPut){ %>

    def test_put(self):
        self.http_put('/<%= slugifiedName %>/0/',
                       user=None,
                       data={},
                       expected_status=status.status.HTTP_200_OK)<% } %><% if(addDelete){ %>

    def test_delete(self):
        self.http_delete('/<%= slugifiedName %>/0/',
                         user=None,
                         expected_status=status.status.HTTP_200_OK)<% } %>