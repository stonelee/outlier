from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.constants import ALL

from timemanage.models import Record

class RecordResource(ModelResource):
    class Meta:
        queryset = Record.objects.all()
        authorization = Authorization()
        filtering={
            'startTime':('gte',),
            'endTime':('lte',),
            'tag':ALL,
        }
