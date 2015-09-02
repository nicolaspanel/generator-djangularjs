# -*- coding: UTF-8 -*-
from django import template

register = template.Library()


class <%= classifiedName %>Renderer(template.Node):
    def render(self, context):
        return ''  # TODO

@register.tag
def <%= underscoredName %>(parser, token):
    return <%= classifiedName %>Renderer()
