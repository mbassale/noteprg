from django.contrib.auth.models import User
from django.db import models


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, db_index=True)
    content = models.TextField()

