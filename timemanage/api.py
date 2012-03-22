from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.constants import ALL

from timemanage.models import Record

class RecordResource(ModelResource):
    class Meta:
        queryset = Record.objects.all()
        authorization = Authorization()
        always_return_data = True
        filtering={
            'startTime':('gte',),
            'endTime':('lte',),
            'tag':ALL,
        }

    def alter_detail_data_to_serialize(self,request,data):
        #TODO:set total_count to the real value
        return {'objects':data,'meta':{'total_count':1}}
