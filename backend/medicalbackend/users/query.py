import graphene
from django.contrib.auth import get_user_model
from .models import Doctor, Patient
from graphene_django import DjangoObjectType

User = get_user_model()

class DoctorType(DjangoObjectType):
   class Meta:
      model = Doctor
      fields = "__all__"

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'

class PatientType(DjangoObjectType):
    class Meta:
        model = Patient
        fields = '__all__'