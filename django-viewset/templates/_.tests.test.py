# -*- coding: UTF-8 -*-
from rest_framework import status
from server.util.tests import APITestCase

class Test<%= classifiedName %>ViewSet(APITestCase):<% if(!addList && !addRetrieve && !addCreate && !addUpdate && !addDestroy){ %>
    pass<% } %><% if(addList){ %>

    def test_list_when_logged_out(self):
        self.http_get('/<%= slugifiedName %>/',
                      user=None,
                      expected_status=status.HTTP_200_OK)<% } %><% if(addRetrieve){ %>

    def test_retrieve_when_logged_out(self):
        self.http_get('/<%= slugifiedName %>/0/',
                      user=None,
                      expected_status=status.HTTP_200_OK)<% } %><% if(addCreate){ %>

    def test_create_when_logged_out(self):
        self.http_post('/<%= slugifiedName %>/',
                       user=None,
                       data={},
                       expected_status=status.HTTP_401_UNAUTHORIZED)<% } %><% if(addUpdate){ %>

    def test_update_when_logged_out(self):
        self.http_put('/<%= slugifiedName %>/0/',
                       user=None,
                       data={},
                       expected_status=status.HTTP_401_UNAUTHORIZED)<% } %><% if(addDestroy){ %>

    def test_destroy_when_logged_out(self):
        self.http_delete('/<%= slugifiedName %>/0/',
                         user=None,
                         expected_status=status.HTTP_401_UNAUTHORIZED)<% } %>