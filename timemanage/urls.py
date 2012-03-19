from django.conf.urls.defaults import patterns, include, url

from tastypie.api import Api
from timemanage.api import RecordResource

v1_api = Api(api_name = 'v1')
v1_api.register(RecordResource())

urlpatterns = patterns('',
    (r'^api/',include(v1_api.urls)),
)
