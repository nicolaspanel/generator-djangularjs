# -*- coding: UTF-8 -*-
"""
Use `urlpatterns` to list both both APIViews and viewsets for this module.

NOTE: __generator-djangularjs__ may automatically modified this file.
"""

from django.conf.urls import url, include
from rest_framework import routers
from . import views

router = routers.SimpleRouter()

router.register(r'<%= slugifiedRoutePath %>', views.<%= classifiedName %>ViewSet, base_name='<%= slugifiedName %>')

urlpatterns = [
    url(r'^', include(router.urls)),
]
