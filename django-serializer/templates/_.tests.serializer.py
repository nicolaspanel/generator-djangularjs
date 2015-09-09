# -*- coding: UTF-8 -*-
from django.template import Template, Context, TemplateSyntaxError
from django.test import TestCase
from django.test.utils import override_settings

from ..serializers import <%= classifiedName %>Serializer
from .. import models

class Test<%= classifiedName %>Serializer(TestCase):
    pass