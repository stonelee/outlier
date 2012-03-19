from django.db import models

class Record(models.Model):
    startTime = models.DateTimeField()
    endTime = models.DateTimeField()
    tag = models.CharField(max_length=20)
    content = models.CharField(max_length=200)

    def __unicode__(self):
        return self.content
