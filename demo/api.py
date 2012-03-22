from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.constants import ALL

from demo.models import Student

class StudentResource(ModelResource):
    class Meta:
        queryset = Student.objects.all()
        authorization = Authorization()
        always_return_data = True
        filtering={
            'name':ALL,
        }

    def alter_detail_data_to_serialize(self,request,data):
        return {'objects':data}
