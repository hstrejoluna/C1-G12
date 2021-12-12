import graphene
from .models import Appointment
from users.models import Patient, Doctor
from appointments.query import AppointmentType
from graphene_django import DjangoObjectType, DjangoListField

patient = Patient
doctor = Doctor

class CreateAppointment(graphene.Mutation):
    """
    This is the main class where user object is created.
    This class must implement a mutate method.
    """
    class Arguments:
        id_patient = graphene.Int()                
        id_doctor = graphene.Int()
        Date = graphene.Date()                                             
        Time = graphene.Time()
        #Status = graphene.String()

    appointment = graphene.Field(AppointmentType)

    @classmethod
    def mutate(cls, root, info, **app_data):
         # Create Appointment
         appointment = Appointment(
            Patient = Patient.objects.filter(pk=app_data.get('id_patient')).first(),
            Doctor = Doctor.objects.filter(pk=app_data.get('id_doctor')).first(),
            Date = app_data.get('Date'),
            Time = app_data.get('Time'),
            Status = "Pending"
         )
         appointment.save()

         return CreateAppointment(appointment=appointment)