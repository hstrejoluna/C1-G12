import graphene
from graphql_auth import mutations
from django.contrib.auth import get_user_model
from .models import Patient
from .query import PatientType, DoctorType, UserType
from graphene_django import DjangoObjectType

User = get_user_model()

class CreatePatient(graphene.Mutation):
    """
    This is the main class where user object is created.
    This class must implement a mutate method.
    """
    class Arguments:
      name = graphene.String()
      surname = graphene.String()
      email = graphene.String()
      dni = graphene.String()
      age = graphene.Date()
      gender = graphene.String()
      phone = graphene.String()
      social = graphene.String()
      plan = graphene.String()
      password1 = graphene.String()
      password2 = graphene.String()

    user = graphene.Field(UserType)
    patient = graphene.Field(PatientType)

    @classmethod
    def mutate(cls, root, info, **user_data):
         # Create User
         user = User(
            username= "usr" + str(User.objects.all().count()), #user_data.get('username'),
            first_name=user_data.get('name'),
            last_name=user_data.get('surname'),
            email=user_data.get('email'),
            is_patient=True
         )
         user.set_password(user_data.get('password1'))  # This will hash the password
         user.save()
        # Create pacient
         patient = Patient(
            user=user,
            name=user_data.get('name'),
            surname=user_data.get('surname'),
            email=user_data.get('email'),
            dni=user_data.get('dni'),
            age=user_data.get('age'),
            gender=user_data.get('gender'),
            phone=user_data.get('phone'),
            social=user_data.get('social'),
            plan=user_data.get('plan')
         )
         patient.save()
         return CreatePatient(patient=patient, user=user)
