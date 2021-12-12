import graphene
from .models import Appointment
from graphene_django import DjangoObjectType

class AppointmentType(DjangoObjectType):
   class Meta:
      model = Appointment
      fields = "__all__"
