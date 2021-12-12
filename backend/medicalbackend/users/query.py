import graphene
from .models import Doctor
from graphene_django import DjangoObjectType

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
        model = Pacient
        fields = '__all__'