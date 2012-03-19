from tastypie.resources import ModelResource
from tastypie.authorization import Authorization

from timemanage.models import Record

class RecordResource(ModelResource):
    class Meta:
        queryset = Record.objects.all()
        authorization = Authorization()
