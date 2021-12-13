import graphene
from graphql_auth import mutations
from graphql_auth.schema import UserQuery, MeQuery
from django.contrib.auth import get_user_model
from graphene_django import DjangoListField

from users.models import Patient, Doctor
from users.query import DoctorType, PatientType
from users.mutation import CreatePatient
from appointments.models import Appointment
from appointments.query import AppointmentType
from appointments.mutation import CreateAppointment

# Include all classes
class AuthMutation(graphene.ObjectType):
   register = mutations.Register.Field()
   verify_account = mutations.VerifyAccount.Field()
   token_auth = mutations.ObtainJSONWebToken.Field()
   update_account = mutations.UpdateAccount.Field()
   resend_activation_email = mutations.ResendActivationEmail.Field()
   send_password_reset_email = mutations.SendPasswordResetEmail.Field()
   password_reset = mutations.PasswordReset.Field()
   password_change = mutations.PasswordChange.Field()
   createpatient = CreatePatient.Field()
   createappointment = CreateAppointment.Field()
#  
class Query(UserQuery, MeQuery, graphene.ObjectType):
   # All patients
   allpatients = DjangoListField(PatientType)
   # Doctor Filters
   alldoctors = DjangoListField(DoctorType)
   # Appointment Filters
   allappointments = DjangoListField(AppointmentType)
   dayappointments = graphene.List(AppointmentType, 
                        day=graphene.String(), 
                        status=graphene.String())
   allappointforpatient = graphene.List(AppointmentType,
                        id_patient=graphene.Int())
   allappointfordoctor = graphene.List(AppointmentType,
                        id_doctor=graphene.Int())

   # Resolve doctors
   def resolve_allpatients(self, info):
      return Patient.objects.all()

   # Resolve doctors
   def resolve_alldoctors(self, info):
      return Doctor.objects.all()

   # Resolve appointments
   def resolve_allappointments(self, info):
      return Appointment.objects.all()
   
   def resolve_dayappointments(self, info, day, status):
      return Appointment.objects.filter(Date=day, Status=status)
   
   def resolve_allappointforpatient(self, info, id_patient):
      return Appointment.objects.filter(Patient=id_patient)

   def resolve_allappointfordoctor(self, info, id_doctor):
      return Appointment.objects.filter(Doctor=id_doctor)

class Mutation(AuthMutation, graphene.ObjectType):
   pass

schema = graphene.Schema(query=Query, mutation=Mutation)