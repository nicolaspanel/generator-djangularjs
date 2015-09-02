# -*- coding: UTF-8 -*-
from django.template import Template, Context, TemplateSyntaxError
from django.test import TestCase
from django.test.utils import override_settings

class Test<%= classifiedName %>Filter(TestCase):
    def setUp(self):
        self.context = {}

    def _render(self, template):
        return Template(template).render(Context(self.context)).strip()

    def test_filter(self):
        self.context = {'foo': 'bar'}
        template = """
            {% load <%= underscoredName %> %}
            {{ foo | <%= underscoredName %> }}
        """
        self.assertEqual(self._render(template), 'bar')