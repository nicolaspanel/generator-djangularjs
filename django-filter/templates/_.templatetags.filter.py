# -*- coding: UTF-8 -*-
from django import template

register = template.Library()

@register.filter(name='<%= underscoredName %>')
def <%= underscoredName %>(value):
    return str(value)  # TODO
