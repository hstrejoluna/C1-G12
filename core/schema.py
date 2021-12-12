import graphene
from graphql_auth import mutations
from graphql_auth.schema import UserQuery, MeQuery
from django.contrib.auth import get_user_model
from graphene_django import DjangoListField

from users.models import Patient, Doctor
from users.query import DoctorType
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
   doctors = DjangoListField(DoctorType)
   allappointments = DjangoListField(AppointmentType)
   dayappointments = graphene.List(AppointmentType, day=graphene.String(), status=graphene.String())

   def resolve_doctors(self, info):
      return Doctor.objects.all()

   def resolve_allappointments(self, info):
      return Appointment.objects.all()
   
   def resolve_dayappointments(self, info, day, status):
      return Appointment.objects.filter(Date=day, Status=status)
   pass

class Mutation(AuthMutation, graphene.ObjectType):
   pass

schema = graphene.Schema(query=Query, mutation=Mutation)