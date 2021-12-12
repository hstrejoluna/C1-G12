from django.db import models
from users.models import Doctor, Patient

# Create your models here.
class Appointment(models.Model):
    # appointment definition
    Patient = models.ForeignKey(Patient, on_delete = models.CASCADE)
    Doctor = models.ForeignKey(Doctor, on_delete = models.CASCADE)
    # Doctor Fields
    Date = models.DateField()
    Time = models.TimeField()
    Status = models.CharField(max_length=10)
