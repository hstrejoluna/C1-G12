from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class ExtendUser(AbstractUser):
    name = models.CharField(max_length=40)
    surname = models.CharField(max_length=40)
    is_pacient = models.BooleanField('pacient status', default=False)
    is_doctor = models.BooleanField('doctor status', default=False)
    is_sysadmin = models.BooleanField('sysadmin status', default=False)

class Pacient(models.Model):
    # Pacient definition
    user = models.OneToOneField(ExtendUser, on_delete=models.CASCADE, primary_key=True)
    # Pacient Fields
    email = models.EmailField(blank=False, max_length=255, verbose_name="email")
    dni = models.CharField(max_length=15)
    age = models.DateField()
    gender = models.CharField(max_length=15)
    phone = models.CharField(max_length=15)
    social = models.CharField(max_length=30)
    plan = models.CharField(max_length=30)

    #USERNAME_FIELD = "username"
    #EMAIL_FIELD = "email"

class Doctor(models.Model):
    # Doctor definition
    user = models.OneToOneField(ExtendUser, on_delete=models.CASCADE, primary_key=True)
    # Doctor Fields
    speciality = models.CharField(max_length=20)
    turn = models.CharField(max_length=15)

class SysAdmin(models.Model):
    # Pacient definition
    user = models.OneToOneField(ExtendUser, on_delete=models.CASCADE, primary_key=True)

