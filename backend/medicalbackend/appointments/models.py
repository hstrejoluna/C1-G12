from django.db import models
from users.models import Doctor, Pacient

# Create your models here.
class Appointment(models.Model):
    # appointment definition
    Pacient = models.ForeignKey(Pacient, on_delete = models.CASCADE)
    Doctor = models.ForeignKey(Doctor, on_delete = models.CASCADE)
    # Doctor Fields
    Date = models.DateField()
    Time = models.TimeField()
