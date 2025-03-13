from django.db import models
from django.contrib.auth.models import User

class NOTE(models.Model):
    srno = models.AutoField(primary_key=True, auto_created=True)  # Auto-incrementing primary key
    title = models.CharField(max_length=25)  # Title of the note
    date = models.DateTimeField(auto_now_add=True)  # Stores the timestamp when the note was created
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Links each note to a user
    content = models.TextField(default="No content")   
   
  
