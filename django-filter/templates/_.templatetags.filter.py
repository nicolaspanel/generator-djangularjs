# -*- coding: UTF-8 -*-
import logging
from django import template

logger = logging.getLogger(__name__)

register = template.Library()

@register.filter(name='<%= underscoredName %>')
def <%= underscoredName %>(value):
    return str(value)  # TODO
