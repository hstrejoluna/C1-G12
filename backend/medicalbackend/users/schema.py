import graphene
from graphql_auth import mutations
from graphql_auth.schema import UserQuery, MeQuery
from django.contrib.auth import get_user_model
from .models import Pacient
from graphene_django import DjangoObjectType

User = get_user_model()

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'

class PacientType(DjangoObjectType):
    class Meta:
        model = Pacient
        fields = '__all__'

class CreatePacient(graphene.Mutation):
    """
    This is the main class where user object is created.
    This class must implement a mutate method.
    """
    class Arguments:
      username = graphene.String()
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
    pacient = graphene.Field(PacientType)

    @classmethod
    def mutate(cls, root, info, **user_data):
         # Create User
         user = User(
            username=user_data.get('username'),
            name=user_data.get('name'),
            surname=user_data.get('surname'),
            email=user_data.get('email'),
            is_pacient=True
         )
         user.set_password(user_data.get('password1'))  # This will hash the password
         user.save()
        # Create pacient
         pacient = Pacient(
            user=user,
            email=user_data.get('email'),
            dni=user_data.get('dni'),
            age=user_data.get('age'),
            gender=user_data.get('gender'),
            phone=user_data.get('phone'),
            social=user_data.get('social'),
            plan=user_data.get('plan')
         )
         pacient.save()
         return CreatePacient(user=pacient)


class AuthMutation(graphene.ObjectType):
   register = mutations.Register.Field()
   verify_account = mutations.VerifyAccount.Field()
   token_auth = mutations.ObtainJSONWebToken.Field()
   update_account = mutations.UpdateAccount.Field()
   resend_activation_email = mutations.ResendActivationEmail.Field()
   send_password_reset_email = mutations.SendPasswordResetEmail.Field()
   password_reset = mutations.PasswordReset.Field()
   password_change = mutations.PasswordChange.Field()
   createpacient = CreatePacient.Field()
  
class Query(UserQuery, MeQuery, graphene.ObjectType):
   pass

class Mutation(AuthMutation, graphene.ObjectType):
   pass

schema = graphene.Schema(query=Query, mutation=Mutation)