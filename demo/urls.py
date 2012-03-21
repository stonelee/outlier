from django.conf.urls.defaults import patterns, include, url

from tastypie.api import Api
from demo.api import StudentResource

v1_api = Api(api_name = 'v1')
v1_api.register(StudentResource())

urlpatterns = patterns('',
    (r'^api/',include(v1_api.urls)),
)
